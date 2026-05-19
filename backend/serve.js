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
  database: process.env.DB_NAME
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

  console.log("🔥 KENA HIT REGISTER");
  console.log("DATA:", req.body);

  const {
    nama_user,
    email,
    no_telp,
    password,
    role
  } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      `INSERT INTO user
      (nama_user, email, no_telp, password, role)
      VALUES (?, ?, ?, ?, ?)`,
      [
        nama_user,
        email,
        no_telp,
        hashedPassword,
        role || "user"
      ],
      (err, result) => {

        if (err) {

          console.log("ERROR DB:", err);

          if (err.code === "ER_DUP_ENTRY") {

            return res.status(400).json({
              message: "Email sudah digunakan"
            });

          }

          return res.status(500).json({
            message: "Terjadi kesalahan server"
          });

        }

        res.json({
          message: "Register berhasil"
        });

      }
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

// ================= LOGIN =================
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  db.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    async (err, results) => {

      if (err) {

        return res.status(500).json({
          message: "DB Error"
        });

      }

      if (results.length === 0) {

        return res.status(400).json({
          message: "Email tidak ditemukan"
        });

      }

      const user = results[0];

      const isMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isMatch) {

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

// ================= BOOKING =================
app.post("/booking", (req, res) => {

  const {
    user_id,
    lapangan_id,
    tanggal,
    jam_mulai,
    jam_selesai,
    total_harga
  } = req.body;

  // VALIDASI
  if (
    !user_id ||
    !lapangan_id ||
    !tanggal ||
    !jam_mulai ||
    !jam_selesai ||
    !total_harga
  ) {

    return res.status(400).json({
      message: "Data booking tidak lengkap"
    });

  }

  // CEK JADWAL SUDAH DIBOOKING
  db.query(
    `SELECT * FROM booking
    WHERE lapangan_id = ?
    AND tanggal = ?
    AND jam_mulai = ?`,
    [lapangan_id, tanggal, jam_mulai],
    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          message: "DB Error"
        });

      }

      // JIKA SUDAH ADA
      if (result.length > 0) {

        return res.status(400).json({
          message: "Jadwal sudah dibooking"
        });

      }

      // INSERT BOOKING
      db.query(
        `INSERT INTO booking
        (
          user_id,
          lapangan_id,
          tanggal,
          jam_mulai,
          jam_selesai,
          total_harga,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          user_id,
          lapangan_id,
          tanggal,
          jam_mulai,
          jam_selesai,
          total_harga,
          "pending"
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

// ================= DASHBOARD =================
app.get("/dashboard/:id", (req, res) => {

  const userId = req.params.id;

  db.query(
    `SELECT COUNT(*) AS total_booking
    FROM booking
    WHERE user_id = ?`,
    [userId],
    (err, result) => {

      if (err) {

        return res.status(500).json({
          message: "DB Error"
        });

      }

      res.json({
        total_booking: result[0].total_booking
      });

    }
  );

});

// ================= GET LAPANGAN =================
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

// ================= GET BOOKED SLOT =================
app.get("/booking/jadwal/:lapangan_id/:tanggal", (req, res) => {

  const { lapangan_id, tanggal } = req.params;

  db.query(
    `SELECT jam_mulai
    FROM booking
    WHERE lapangan_id = ?
    AND tanggal = ?`,
    [lapangan_id, tanggal],
    (err, result) => {

      if (err) {

        return res.status(500).json({
          message: "DB Error"
        });

      }

      const booked = result.map((item) =>
        item.jam_mulai.slice(0, 5)
      );

      res.json(booked);

    }
  );

});

// ================= RUN SERVER =================
app.listen(process.env.PORT, () => {

  console.log(
    `Server jalan di http://localhost:${process.env.PORT}`
  );

});