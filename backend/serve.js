require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("DB Connected!");
  }
});

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("Backend jalan!");
});

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  const {
    nama_user,
    email,
    no_telp,
    password,
    role
  } = req.body;
  try {
    const hashedPassword =
      await bcrypt.hash(password, 10);
    db.query(
      `
      INSERT INTO user
      (
        nama_user,
        email,
        no_telp,
        password,
        role
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        nama_user,
        email,
        no_telp,
        hashedPassword,
        role || "user"
      ],
      (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
              message: "Email sudah digunakan"
            });
          }
          return res.status(500).json({
            message: "Register gagal"
          });
        }
        res.json({
          message: "Register berhasil"
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});

// ================= LOGIN =================
app.post("/login", (req, res) => {
  const {
    email,
    password
  } = req.body;
  db.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "DB Error"
        });

      }
      if (result.length === 0) {

        return res.status(400).json({
          message: "Email tidak ditemukan"
        });

      }
      const user = result[0];
      const check =
        await bcrypt.compare(
          password,
          user.password
        );
      if (!check) {
        return res.status(400).json({
          message: "Password salah"
        });
      }
      res.json({
        message: "Login berhasil",
        user: {
          id: user.id_user,
          nama_user: user.nama_user,
          email: user.email,
          role: user.role
        }
      });
    }
  );
});

// ================= CREATE BOOKING =================
app.post("/booking", (req, res) => {
  const {
    user_id,
    lapangan_id,
    tanggal,
    jam_mulai,
    jam_selesai,
    durasi,
    total_harga
  } = req.body;
  if (
    !user_id ||
    !lapangan_id ||
    !tanggal ||
    !jam_mulai ||
    !jam_selesai ||
    !durasi ||
    !total_harga
  ) {
    return res.status(400).json({
      message: "Data booking tidak lengkap"
    });
  }

  // cek bentrok jadwal
  db.query(
    `
    SELECT *
    FROM booking
    WHERE lapangan_id = ?
    AND tanggal = ?
    AND jam_mulai = ?
    `,
    [
      lapangan_id,
      tanggal,
      jam_mulai
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "DB Error"
        });
      }
      if (result.length > 0) {
        return res.status(400).json({
          message: "Jam sudah dibooking"
        });
      }
      db.query(
        `
        INSERT INTO booking
        (
          user_id,
          lapangan_id,
          tanggal,
          jam_mulai,
          jam_selesai,
          durasi,
          total_harga,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
        `,
        [
          user_id,
          lapangan_id,
          tanggal,
          jam_mulai,
          jam_selesai,
          durasi,
          total_harga
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: "Gagal menyimpan booking"
            });

          }
          res.json({
            message: "Booking berhasil dibuat",
            booking_id: result.insertId
          });
        }
      );
    }
  );
});

// ================= GET PESANAN USER =================
app.get("/booking/user/:id", (req, res) => {
  const userId = req.params.id;
  db.query(
    `
    SELECT
      booking.id,
      booking.tanggal,
      booking.jam_mulai,
      booking.jam_selesai,
      booking.durasi,
      booking.total_harga,
      booking.status,
      lapangan.nama_lapangan,
      lapangan.kategori,
      lapangan.lokasi,
      lapangan.gambar
    FROM booking
    JOIN lapangan
    ON booking.lapangan_id =
    lapangan.id_lapangan
    WHERE booking.user_id = ?
    ORDER BY booking.id DESC

    `,
    [userId],

    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Gagal mengambil pesanan"
        });
      }
      res.json(result);
    }
  );
});

// ================= DETAIL BOOKING PEMBAYARAN =================
app.get("/booking/detail/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    `
    SELECT
      booking.id,
      booking.tanggal,
      booking.jam_mulai,
      booking.jam_selesai,
      booking.durasi,
      booking.total_harga,
      booking.status,
      lapangan.nama_lapangan,
      lapangan.kategori,
      lapangan.gambar
    FROM booking
    JOIN lapangan
    ON booking.lapangan_id =
    lapangan.id_lapangan
    WHERE booking.id = ?

    `,
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "DB Error"
        });
      }
      res.json(result[0]);
    }
  );
});

// ================= LAPANGAN =================
app.get("/lapangan", (req, res) => {
  db.query(
    "SELECT * FROM lapangan",
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "DB Error"
        });

      }
      res.json(result);
    }
  );
});

// ================= DASHBOARD =================
app.get("/dashboard/:id", (req, res) => {
  db.query(
    `
    SELECT COUNT(*) AS total_booking
    FROM booking
    WHERE user_id = ?
    `,

    [req.params.id],


    (err, result) => {


      if (err) {

        return res.status(500).json({
          message: "DB Error"
        });

      }


      res.json({

        total_booking:
          result[0].total_booking

      });


    }


  );


});

// ================= RUN =================
app.listen(process.env.PORT, () => {

  console.log(
    `Server jalan di http://localhost:${process.env.PORT}`
  );

});