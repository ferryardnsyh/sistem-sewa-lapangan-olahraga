import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F3F5F9] font-[Inter]">

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

      {/* ================= NAVBAR ================= */}
      <header className="bg-[#03112B] border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2">

            <span className="material-symbols-outlined text-blue-500">
              sports_soccer
            </span>

            <h1 className="text-white text-2xl font-black uppercase font-[Montserrat]">
              SPORT CENTER
            </h1>

          </div>

          {/* LOGIN */}
          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm flex items-center gap-2 transition"
          >

            <span className="material-symbols-outlined text-[18px]">
              logout
            </span>

            Logout

          </button>

        </div>

      </header>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* WELCOME */}
        <div className="mb-8">

          <h2 className="text-[#03112B] text-2xl font-bold">
            Halo, {user?.nama_user}!
          </h2>

          <p className="text-gray-500 mt-2">
            Selamat datang kembali di dashboard performa Anda.
          </p>

        </div>

        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-3 space-y-6">

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              {/* CARD 1 */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                <div className="flex items-center justify-between">

                  <span className="material-symbols-outlined text-blue-600">
                    calendar_month
                  </span>

                </div>

                <p className="text-gray-400 text-xs uppercase mt-4">
                  Total Booking
                </p>

                <h3 className="text-4xl font-black text-[#03112B] mt-2">
                  42
                </h3>

              </div>

              {/* CARD 2 */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                <div className="flex items-center justify-between">

                  <span className="material-symbols-outlined text-blue-600">
                    inventory
                  </span>

                </div>

                <p className="text-gray-400 text-xs uppercase mt-4">
                  Booking Active
                </p>

                <h3 className="text-4xl font-black text-[#03112B] mt-2">
                  3
                </h3>

              </div>

              {/* CARD 3 */}
              <div className="bg-gradient-to-r from-[#0C4DDE] to-[#2563EB] rounded-2xl p-5 shadow-lg text-white">

                <div className="flex items-center justify-between">

                  <span className="material-symbols-outlined">
                    verified
                  </span>

                </div>

                <p className="text-white/70 text-xs uppercase mt-4">
                  Poin Reward
                </p>

                <h3 className="text-4xl font-black mt-2">
                  1.250
                </h3>

              </div>

            </div>

            {/* JADWAL */}
            <div>

              <div className="flex items-center gap-2 mb-4">

                <span className="material-symbols-outlined text-[#03112B]">
                  schedule
                </span>

                <h3 className="font-semibold text-[#03112B]">
                  Jadwal Mendatang
                </h3>

              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                <div className="grid md:grid-cols-[240px_1fr]">

                  {/* IMAGE */}
                  <div className="relative">

                    <img
                      src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1200&auto=format&fit=crop"
                      alt="Lapangan"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                      BESOK
                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h3 className="text-xl font-bold text-[#03112B]">
                          Badminton - Court 4
                        </h3>

                        <div className="flex flex-wrap items-center gap-5 mt-4 text-gray-500 text-sm">

                          <div className="flex items-center gap-2">

                            <span className="material-symbols-outlined text-[18px]">
                              calendar_month
                            </span>

                            Selasa, 24 Mei 2024

                          </div>

                          <div className="flex items-center gap-2">

                            <span className="material-symbols-outlined text-[18px]">
                              schedule
                            </span>

                            19:00 - 21:00

                          </div>

                        </div>

                        <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm">

                          <span className="material-symbols-outlined text-[18px]">
                            location_on
                          </span>

                          Sport Center - Hall B

                        </div>

                      </div>

                      <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-semibold">
                        Premium
                      </span>

                    </div>

                    {/* BUTTON */}
                    <div className="flex gap-4 mt-6">

                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition">
                        Rincian Tiket
                      </button>

                      <button className="border border-gray-200 hover:bg-gray-100 text-gray-600 px-6 py-3 rounded-xl transition">
                        Reschedule
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* RIWAYAT */}
            <div>

              <div className="flex items-center justify-between mb-4">

                <h3 className="font-semibold text-[#03112B]">
                  Riwayat Terakhir
                </h3>

                <button className="text-blue-600 text-sm font-medium">
                  Lihat Semua →
                </button>

              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* HEADER */}
                <div className="grid grid-cols-3 bg-[#03112B] text-white text-xs uppercase px-6 py-4 font-semibold">

                  <p>Fasilitas</p>
                  <p>Tanggal</p>
                  <p>Status</p>

                </div>

                {/* ITEM 1 */}
                <div className="grid grid-cols-3 items-center px-6 py-5 border-b">

                  <div className="flex items-center gap-3">

                    <span className="material-symbols-outlined text-blue-600">
                      sports_soccer
                    </span>

                    <div>

                      <h4 className="font-medium text-[#03112B]">
                        Mini Soccer A
                      </h4>

                      <p className="text-xs text-gray-400">
                        VIP • B-001
                      </p>

                    </div>

                  </div>

                  <p className="text-gray-500">
                    20 Mei 2024
                  </p>

                  <span className="bg-green-100 text-green-600 text-xs font-semibold px-4 py-1 rounded-full w-fit">
                    SELESAI
                  </span>

                </div>

                {/* ITEM 2 */}
                <div className="grid grid-cols-3 items-center px-6 py-5">

                  <div className="flex items-center gap-3">

                    <span className="material-symbols-outlined text-blue-600">
                      sports_basketball
                    </span>

                    <div>

                      <h4 className="font-medium text-[#03112B]">
                        Kolam Renang VIP
                      </h4>

                      <p className="text-xs text-gray-400">
                        VIP • B-015
                      </p>

                    </div>

                  </div>

                  <p className="text-gray-500">
                    15 Mei 2024
                  </p>

                  <span className="bg-green-100 text-green-600 text-xs font-semibold px-4 py-1 rounded-full w-fit">
                    SELESAI
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="space-y-6">

            {/* QUICK ACTION */}
            <div className="bg-[#03112B] rounded-2xl p-6 text-white shadow-lg">

              <h3 className="font-semibold mb-6">
                Aksi Cepat
              </h3>

              <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl px-5 py-4 flex items-center justify-between transition">

                <div className="flex items-center gap-3">

                  <span className="material-symbols-outlined">
                    add_circle
                  </span>

                  Pesan Lapangan Baru

                </div>

                <span className="material-symbols-outlined">
                  arrow_forward
                </span>

              </button>

              <button className="w-full mt-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between transition">

                <div className="flex items-center gap-3">

                  <span className="material-symbols-outlined">
                    account_balance_wallet
                  </span>

                  Top Up Saldo

                </div>

                <span className="text-sm">
                  Rp 500k
                </span>

              </button>

            </div>

            {/* PROMO */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg">

              <img
                src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200&auto=format&fit=crop"
                alt="Promo"
                className="w-full h-56 object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20 p-5 flex flex-col justify-end">

                <span className="bg-orange-500 text-white text-[10px] uppercase px-3 py-1 rounded-full w-fit mb-3">
                  Promo Khusus
                </span>

                <h3 className="text-white text-lg font-bold leading-snug">
                  Dapatkan Diskon 50% Untuk Booking Baru!
                </h3>

              </div>

            </div>

            {/* STATISTIK */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

              <div className="flex items-center justify-between mb-5">

                <h3 className="font-semibold text-[#03112B]">
                  Statistik Mingguan
                </h3>

                <p className="text-xs text-blue-600 font-medium">
                  8-14 Juni
                </p>

              </div>

              {/* CHART */}
              <div className="flex items-end gap-3 h-40">

                <div className="bg-gray-200 rounded-t w-full h-10" />
                <div className="bg-blue-600 rounded-t w-full h-28" />
                <div className="bg-gray-200 rounded-t w-full h-20" />
                <div className="bg-gray-200 rounded-t w-full h-32" />
                <div className="bg-gray-200 rounded-t w-full h-16" />

              </div>

              <p className="text-center text-gray-400 text-xs mt-5">
                Progress Aktivitas Meningkat 12%
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= FOOTER ================= */}

        <footer className="bg-[#020817] py-16">

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>

            <h1 className="text-white text-2xl font-black italic uppercase">
              Sport Center
            </h1>

            <p className="text-white/50 mt-5 text-sm leading-relaxed">
              Platform booking lapangan olahraga online modern
              dan terpercaya di Indonesia.
            </p>

          </div>

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

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/40 text-sm">
          © 2024 Sport Center. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default Dashboard;