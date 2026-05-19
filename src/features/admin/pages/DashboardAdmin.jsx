import React from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Trophy,
  DollarSign,
  Settings,
  Users,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#071426] text-white flex flex-col">

      {/* NAVBAR */}
      <header className="w-full border-b border-white/10 bg-[#08182d]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <h1 className="text-2xl font-extrabold italic tracking-wide">
            SPORT CENTER
          </h1>

          <nav className="hidden md:flex items-center gap-10 text-sm text-white/80">
            <a href="#" className="hover:text-white transition">
              Home
            </a>

            <a href="#" className="hover:text-white transition">
              About
            </a>

            <a href="#" className="hover:text-white transition">
              Fasilitas
            </a>

            <a href="#" className="hover:text-white transition">
              Harga
            </a>

            <a href="#" className="hover:text-white transition">
              Kontak
            </a>
          </nav>

        </div>
      </header>

      {/* MAIN */}
      <div className="flex flex-1">

        {/* SIDEBAR */}
        <aside className="w-72 bg-[#08182d] border-r border-white/10 flex flex-col justify-between">

          <div>

            <div className="p-6">

              <h2 className="text-lg font-bold tracking-wide">
                Dashboard
              </h2>

            </div>

            <div className="px-4 space-y-2">

              <button className="w-full flex items-center gap-3 bg-blue-600 px-4 py-3 rounded-xl text-sm font-semibold">
                <LayoutDashboard size={18} />
                Dashboard
              </button>

              <button className="w-full flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-xl text-sm transition">
                <CalendarDays size={18} />
                Bookings
              </button>

              <button className="w-full flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-xl text-sm transition">
                <Trophy size={18} />
                Courts
              </button>

              <button className="w-full flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-xl text-sm transition">
                <DollarSign size={18} />
                Revenue
              </button>

              <button className="w-full flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-xl text-sm transition">
                <Settings size={18} />
                Settings
              </button>

            </div>

            {/* PROFILE */}
            <div className="mx-4 mt-8 bg-white/5 rounded-2xl p-4 flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center">
                <Users size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-sm">
                  Admin User
                </h3>

                <p className="text-xs text-white/50">
                  Super Admin
                </p>
              </div>

            </div>

          </div>

        </aside>

        {/* CONTENT */}
        <main className="flex-1 p-6 bg-[#071426]">

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* CARD 1 */}
            <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-white/50 text-sm uppercase tracking-wide">
                    Total Bookings
                  </p>

                  <h2 className="text-4xl font-extrabold mt-3">
                    1,284
                  </h2>

                  <p className="text-green-400 text-sm mt-3">
                    ↗ +12.5% vs last month
                  </p>
                </div>

                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                  <CalendarDays size={26} />
                </div>

              </div>

            </div>

            {/* CARD 2 */}
            <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-white/50 text-sm uppercase tracking-wide">
                    Revenue
                  </p>

                  <h2 className="text-4xl font-extrabold mt-3">
                    $42.5k
                  </h2>

                  <p className="text-cyan-400 text-sm mt-3">
                    ↗ +8.2% vs last month
                  </p>
                </div>

                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                  <DollarSign size={26} />
                </div>

              </div>

            </div>

            {/* CARD 3 */}
            <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-white/50 text-sm uppercase tracking-wide">
                    Active Courts
                  </p>

                  <h2 className="text-4xl font-extrabold mt-3">
                    18/24
                  </h2>

                  <p className="text-white/50 text-sm mt-3">
                    Peak time: 17:00 - 21:00
                  </p>
                </div>

                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                  <Trophy size={26} />
                </div>

              </div>

            </div>

          </div>

          {/* CHART + ACTIVITY */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

            {/* CHART */}
            <div className="lg:col-span-2 bg-[#0b1f38] border border-white/10 rounded-2xl p-6 min-h-[420px]">

              <div className="flex items-center justify-between">

                <h2 className="text-xl font-bold">
                  Booking Trends (Last 7 Days)
                </h2>

                <div className="flex gap-2">

                  <button className="bg-white/5 px-4 py-2 rounded-lg text-sm">
                    Daily
                  </button>

                  <button className="bg-blue-600 px-4 py-2 rounded-lg text-sm">
                    Weekly
                  </button>

                </div>

              </div>

              {/* CHART PLACEHOLDER */}
              <div className="h-[320px] mt-10 border border-white/5 rounded-xl flex items-end justify-between px-6 pb-10">

                {[60, 90, 70, 120, 95, 140, 110].map((height, index) => (
                  <div
                    key={index}
                    className="w-10 bg-blue-500 rounded-t-xl"
                    style={{ height: `${height}px` }}
                  ></div>
                ))}

              </div>

              <div className="flex justify-between text-xs text-white/40 mt-4 px-3">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

            </div>

            {/* ACTIVITIES */}
            <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-6">

              <h2 className="text-xl font-bold mb-6">
                Recent Activities
              </h2>

              <div className="space-y-6">

                <div className="border-l-2 border-cyan-400 pl-4">
                  <h3 className="font-semibold">
                    New Booking: Court #4
                  </h3>

                  <p className="text-sm text-white/50 mt-1">
                    John Doe • 2 minutes ago
                  </p>
                </div>

                <div className="border-l-2 border-green-400 pl-4">
                  <h3 className="font-semibold">
                    Payment Received: $45.00
                  </h3>

                  <p className="text-sm text-white/50 mt-1">
                    Booking ID: #A204 • 15 mins ago
                  </p>
                </div>

                <div className="border-l-2 border-red-400 pl-4">
                  <h3 className="font-semibold">
                    Cancellation: Court #12
                  </h3>

                  <p className="text-sm text-white/50 mt-1">
                    Sarah Smith • 1 hour ago
                  </p>
                </div>

                <div className="border-l-2 border-yellow-400 pl-4">
                  <h3 className="font-semibold">
                    Court Maintenance Completed
                  </h3>

                  <p className="text-sm text-white/50 mt-1">
                    Staff Admin • 3 hours ago
                  </p>
                </div>

              </div>

              <button className="w-full mt-10 border border-white/10 py-3 rounded-xl hover:bg-white/5 transition">
                View All Activities
              </button>

            </div>

          </div>

        </main>

      </div>

      {/* FOOTER */}
      <footer className="bg-[#08182d] border-t border-white/10 mt-auto">

        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>

            <h2 className="text-3xl font-extrabold italic">
              SPORT CENTER
            </h2>

            <p className="text-white/60 mt-4 leading-relaxed">
              Pusat olahraga terlengkap dan modern dengan standar internasional.
              Kami menyediakan fasilitas terbaik untuk atlet profesional dan komunitas olahraga.
            </p>

            <div className="flex gap-3 mt-6">

              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                f
              </div>

              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                in
              </div>

            </div>

          </div>

          {/* NAVIGASI */}
          <div>

            <h3 className="uppercase text-blue-400 font-semibold tracking-widest mb-6">
              Navigasi
            </h3>

            <ul className="space-y-4 text-white/70">
              <li>Beranda</li>
              <li>Fasilitas Kami</li>
              <li>Daftar Harga</li>
              <li>Tentang Kami</li>
            </ul>

          </div>

          {/* INFORMASI */}
          <div>

            <h3 className="uppercase text-blue-400 font-semibold tracking-widest mb-6">
              Informasi
            </h3>

            <ul className="space-y-4 text-white/70">
              <li>Syarat & Ketentuan</li>
              <li>Kebijakan Privasi</li>
              <li>Panduan Booking</li>
              <li>Bantuan</li>
            </ul>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="uppercase text-blue-400 font-semibold tracking-widest mb-6">
              Hubungi Kami
            </h3>

            <div className="space-y-5 text-white/70">

              <div className="flex gap-3">
                <MapPin size={18} />
                <p>
                  Bandung, Indonesia
                </p>
              </div>

              <div className="flex gap-3">
                <Phone size={18} />
                <p>
                  0821-1234-5678
                </p>
              </div>

              <div className="flex gap-3">
                <Mail size={18} />
                <p>
                  info@sportcenter.com
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 py-6 text-center text-white/40 text-sm">
          © 2026 SPORT CENTER - ALL RIGHTS RESERVED.
        </div>

      </footer>

    </div>
  );
}

export default AdminDashboard;