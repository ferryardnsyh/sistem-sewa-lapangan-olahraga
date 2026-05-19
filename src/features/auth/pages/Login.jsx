import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // AUTO LOGIN CHECK
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {

    if (user.role === "admin") {
      navigate("/dashboardadmin");
    } else {
      navigate("/dashboard");
    }

  }

}, [navigate]);

  // HANDLE LOGIN
  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      return alert("Isi semua field!");
    }

    if (!emailRegex.test(email)) {
      return alert("Format email tidak valid!");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        }
      );

      const user = response.data.user;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      alert(response.data.message);

      if (user.role === "admin") {
        navigate("/dashboardadmin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server error");
      }

    }
  };

  return (
    <div className="min-h-screen bg-[#020B1D] overflow-hidden relative font-[Inter]">

      {/* GOOGLE FONT */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* MATERIAL ICON */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBk56rjvLSjj2YHIn2h32KMw8XtaZ41K0L-vmCl_6wPkv4tAC0A2X0D2roB1BOzuEDcgU9RUAaJRdFfr8BauZr41PgF9qdU_jvJwXs_Uuxa6O-ZY659jttC5tUl_m6rFtWTT5-IzCFxSm3utMS7djPnicf2-NyUt_a5QOwMTx5Zki5kpB4i3IdAyFzjt6JkLg_TzXoL7F6AJRQlxU5mygZl7P4FGBtXHi0L0Qp9QGPc2H-KUzBtKV8TI2ZnaZ7B6qGISntHNusAzIE')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020B1D]/70 via-[#031633]/75 to-[#020B1D]/85" />

      {/* ================= NAVBAR ================= */}
      <header className="relative z-20 border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          {/* LOGO */}
          <h1 className="text-white text-2xl font-black uppercase font-[Montserrat]">
            SPORT CENTER
          </h1>

          {/* MENU */}
          <nav className="hidden md:flex items-center gap-10 text-white/70 text-sm">

            <Link
              to="/homepage"
              className="hover:text-gray-300 transition"
            >
              Home
            </Link>

            <a
              href="#kontak"
              className="hover:text-white transition"
            >
              Kontak
            </a>

          </nav>

        </div>

      </header>

      {/* ================= LOGIN CARD ================= */}
      <div className="relative z-10 flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-md bg-[#081A38]/90 border border-white/10 backdrop-blur-xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-10">

          {/* TITLE */}
          <div className="text-center mb-10">

            <h2 className="text-white text-4xl font-black uppercase font-[Montserrat]">
              Selamat Datang
            </h2>

            <p className="text-white/60 mt-3 leading-relaxed">
              Silakan login untuk mengelola aktivitas olahraga Anda.
            </p>

          </div>

          {/* EMAIL */}
          <div className="mb-6">

            <label className="block text-white text-sm mb-3">
              Email atau Username
            </label>

            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4">

              <span className="material-symbols-outlined text-white/40 mr-3">
                person
              </span>

              <input
                type="email"
                placeholder="Contoh: user@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent py-4 text-white placeholder:text-white/30 outline-none"
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div className="mb-3">

            <div className="flex items-center justify-between mb-3">

              <label className="text-white text-sm">
                Kata Sandi
              </label>

              <button className="text-blue-400 text-sm hover:text-blue-300 transition">
                Lupa Kata Sandi?
              </button>

            </div>

            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4">

              <span className="material-symbols-outlined text-white/40 mr-3">
                lock
              </span>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent py-4 text-white placeholder:text-white/30 outline-none"
              />

            </div>

          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full mt-8 bg-gradient-to-r from-[#0C4DDE] to-[#2563EB] hover:opacity-90 text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2"
          >

            LOGIN SEKARANG

            <span className="material-symbols-outlined text-[20px]">
              arrow_forward
            </span>

          </button>

          {/* OR */}
          <div className="flex items-center gap-4 my-8">

            <div className="flex-1 h-[1px] bg-white/10" />

            <span className="text-white/40 text-xs uppercase tracking-[3px]">
              atau
            </span>

            <div className="flex-1 h-[1px] bg-white/10" />

          </div>

          {/* REGISTER */}
          <p className="text-center text-white/50 text-sm">

            Belum memiliki akun?{" "}

            <span
              onClick={() => navigate("/register")}
              className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium"
            >
              Daftar Sekarang
            </span>

          </p>

          {/* SECURITY */}
          <div className="mt-10 flex items-center justify-center gap-2 text-white/30 text-xs">

            <span className="material-symbols-outlined text-[15px]">
              verified_user
            </span>

            Koneksi Aman & Terproteksi

          </div>

        </div>

      </div>

      {/* ================= FOOTER ================= */}
      <footer
        id="kontak"
        className="relative z-20 border-b border-white/10"
      >

        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* LOGO */}
          <div>

            <h1 className="text-white text-2xl font-black italic uppercase">
              Sport Center
            </h1>

            <p className="text-white/50 mt-5 text-sm leading-relaxed">
              Platform booking lapangan olahraga online modern
              dan terpercaya di Indonesia.
            </p>

          </div>

          {/* MENU */}
          <div>

            <h3 className="text-white font-bold uppercase text-sm mb-5">
              Menu
            </h3>

            <ul className="space-y-3 text-white/50 text-sm">
              <li>Home</li>
              <li>About</li>
              <li>Venue</li>
            </ul>

          </div>

          {/* BANTUAN */}
          <div>

            <h3 className="text-white font-bold uppercase text-sm mb-5">
              Bantuan
            </h3>

            <ul className="space-y-3 text-white/50 text-sm">
              <li>FAQ</li>
              <li>Cara Booking</li>
              <li>Privacy Policy</li>
            </ul>

          </div>

          {/* KONTAK */}
          <div>

            <h3 className="text-white font-bold uppercase text-sm mb-5">
              Hubungi Kami
            </h3>

            <ul className="space-y-4 text-white/50 text-sm">

              <li className="flex items-center gap-2">

                <span className="material-symbols-outlined text-[18px]">
                  call
                </span>

                0821-1234-5678

              </li>

              <li className="flex items-center gap-2">

                <span className="material-symbols-outlined text-[18px]">
                  mail
                </span>

                info@sportcenter.com

              </li>

              <li className="flex items-center gap-2">

                <span className="material-symbols-outlined text-[18px]">
                  location_on
                </span>

                Bandung, Indonesia

              </li>

            </ul>

          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/40 text-sm">
          © 2026 Sport Center. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default Login;