require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

// koneksi database
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

  const { nama_user, email, no_telp, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO user (nama_user, email, no_telp, password, role) VALUES (?, ?, ?, ?, ?)",
    [nama_user, email, no_telp, hashedPassword, role || "user"],
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
          message: "DB error"
        });
      }

      if (results.length === 0) {
        return res.status(400).json({
          message: "Email tidak ditemukan"
        });
      }

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Password salah"
        });
      }

      res.json({
        message: "Login berhasil",
        user: {
          id: user.id,
          nama_user: user.nama_user,
          email: user.email,
          role: user.role
        }
      });
    }
  );
});

// ================= booking =================
app.post("/booking", (req, res) => {
  const { user_id, lapangan_id, tanggal, jam_mulai, jam_selesai } = req.body;

  if (!user_id || !lapangan_id || !tanggal || !jam_mulai || !jam_selesai) {
    return res.status(400).json({
      message: "Data booking tidak lengkap"
    });
  }

  db.query(
    "INSERT INTO booking (user_id, lapangan_id, tanggal, jam_mulai, jam_selesai, status) VALUES (?, ?, ?, ?, ?, 'pending')",
    [user_id, lapangan_id, tanggal, jam_mulai, jam_selesai],
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
});

// ================= RUN =================
app.listen(process.env.PORT, () => {
  console.log(
    `Server jalan di http://localhost:${process.env.PORT}`
  );
});