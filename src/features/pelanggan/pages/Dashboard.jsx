import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const footerRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/homepage");
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] font-[Inter]">

      {/* FONT */}
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
      <header className="sticky top-0 z-50 bg-[#001433]/95 backdrop-blur-md border-b border-white/10 shadow-lg">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">

              <span className="material-symbols-outlined text-white">
                sports_soccer
              </span>

            </div>

            <div>

              <h1 className="text-white text-2xl font-black uppercase leading-none font-[Montserrat]">
                SPORT CENTER
              </h1>

            </div>

          </div>

          {/* USER */}
          <div className="flex items-center gap-4">

            <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">

              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {user?.nama_user?.charAt(0)}
              </div>

              <div>

                <h3 className="text-sm text-white font-semibold">
                  {user?.nama_user}
                </h3>

                <p className="text-xs text-white/50">
                  Member Active
                </p>

              </div>

            </div>

            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm flex items-center gap-2 transition shadow-lg"
            >
              <span className="material-symbols-outlined text-[18px]">
                logout
              </span>
              Logout
            </button>

          </div>

        </div>

      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#001433]">

        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1400&auto=format&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">

          <div className="flex flex-col lg:flex-row justify-between gap-10 items-center">

            <div>

              <h1 className="text-white text-5xl md:text-6xl font-black italic uppercase mt-5 leading-tight font-[Montserrat]">

                Selamat Datang, <br />
                {user?.nama_user}

              </h1>

              <p className="text-white/70 mt-6 max-w-2xl leading-relaxed">
                Kelola jadwal booking, cek status pesanan,
                dan nikmati pengalaman booking lapangan olahraga
                modern dengan tampilan dashboard premium.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            {
              title: "Total Booking",
              value: "42",
              icon: "calendar_month",
            },
            {
              title: "Booking Aktif",
              value: "3",
              icon: "inventory",
            },
            {
              title: "Poin Reward",
              value: "1.250",
              icon: "verified",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition"
            >

              <div className="flex items-center justify-between">

                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <span className="material-symbols-outlined text-blue-600">
                    {item.icon}
                  </span>

                </div>

              </div>

              <p className="text-gray-400 text-sm mt-6">
                {item.title}
              </p>

              <h3 className="text-4xl font-black text-[#001433] mt-2">
                {item.value}
              </h3>

            </div>
          ))}

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* JADWAL */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">

                <div>

                  <h3 className="text-2xl font-bold text-[#001433]">
                    Jadwal Mendatang
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Booking yang akan datang
                  </p>

                </div>

                <button className="text-blue-600 font-semibold text-sm">
                  Lihat Semua
                </button>

              </div>

              <div className="grid md:grid-cols-[300px_1fr]">

                {/* IMAGE */}
                <div className="relative h-full">

                  <img
                    src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1200&auto=format&fit=crop"
                    alt="Lapangan"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-5 left-5 bg-blue-600 text-white text-xs px-4 py-2 rounded-full font-semibold shadow-lg">
                    BESOK
                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-8">

                  <div className="flex flex-col md:flex-row justify-between gap-5">

                    <div>

                      <h2 className="text-3xl font-black text-[#001433]">
                        Badminton Court 4
                      </h2>

                      <div className="space-y-3 mt-6 text-gray-500">

                        <div className="flex items-center gap-3">

                          <span className="material-symbols-outlined">
                            calendar_month
                          </span>

                          Selasa, 24 Mei 2026

                        </div>

                        <div className="flex items-center gap-3">

                          <span className="material-symbols-outlined">
                            schedule
                          </span>

                          19:00 - 21:00

                        </div>

                        <div className="flex items-center gap-3">

                          <span className="material-symbols-outlined">
                            location_on
                          </span>

                          Sport Center Hall B

                        </div>

                      </div>

                    </div>

                    <div className="bg-blue-100 text-blue-600 h-fit px-5 py-2 rounded-full text-sm font-bold">
                      PREMIUM
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            <div className="bg-[#001433] rounded-3xl p-8 text-white shadow-xl">

              <h3 className="text-2xl font-bold">
                Booking lapangan baru
              </h3>

              <button 
              onClick={() => navigate("/booking")}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 rounded-2xl px-6 py-5 flex items-center justify-between transition shadow-lg">

                <div className="flex items-center gap-3">

                  <span className="material-symbols-outlined">
                    add_circle
                  </span>

                  Pesan Lapangan

                </div>

                <span className="material-symbols-outlined">
                  arrow_forward
                </span>

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ================= FOOTER ================= */}
      <footer
        ref={footerRef}
        className="bg-[#020817] py-16 mt-16"
      >

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
          © 2026 Sport Center. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default Dashboard;