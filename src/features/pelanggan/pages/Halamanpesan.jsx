import React, { useState } from "react";
import {
  Search,
  CalendarDays,
  Clock3,
  MapPin,
  CircleCheck,
  CircleX,
  Wallet,
} from "lucide-react";

function HalamanPesanan() {
  const [statusFilter, setStatusFilter] = useState("Semua");

  const pesanan = [
    {
      id: "#ORD-1024",
      lapangan: "Arena Utama 1",
      kategori: "Futsal",
      tanggal: "20 Mei 2025",
      jam: "19:00 - 20:00",
      lokasi: "Jakarta Selatan",
      harga: "Rp150.000",
      status: "Selesai",
      img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    },

    {
      id: "#ORD-1025",
      lapangan: "Court Badminton B",
      kategori: "Badminton",
      tanggal: "22 Mei 2025",
      jam: "15:00 - 16:00",
      lokasi: "Bandung",
      harga: "Rp50.000",
      status: "Aktif",
      img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
    },

    {
      id: "#ORD-1026",
      lapangan: "Hall Basket VIP",
      kategori: "Basket",
      tanggal: "25 Mei 2025",
      jam: "20:00 - 21:00",
      lokasi: "Jakarta Barat",
      harga: "Rp200.000",
      status: "Dibatalkan",
      img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const filteredPesanan =
    statusFilter === "Semua"
      ? pesanan
      : pesanan.filter((item) => item.status === statusFilter);

  return (
    <div className="min-h-screen bg-[#071426] text-white">

      {/* FONT */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* NAVBAR */}
      <header className="bg-[#08182d] border-b border-white/10 sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <h1 className="text-2xl font-extrabold italic uppercase">
            Sport Center
          </h1>

          <nav className="hidden md:flex gap-10 text-sm text-white/80">

            <a href="#" className="hover:text-white transition">
              Home
            </a>

            <a href="#" className="hover:text-white transition">
              Booking
            </a>

            <a href="#" className="text-blue-400">
              Pesanan
            </a>

          </nav>

        </div>

      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">

        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=80"
            alt="Sport"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#001433]/85"></div>

        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">

          <h1 className="text-5xl md:text-6xl font-extrabold italic uppercase mt-5 leading-tight">

            Daftar <br />
            Pesanan Saya

          </h1>

          <p className="text-white/70 mt-6 max-w-2xl leading-relaxed">
            Lihat seluruh riwayat booking lapangan, status pemesanan,
            dan detail transaksi secara realtime.
          </p>

        </div>

      </section>

      {/* FILTER */}
      <section className="-mt-10 relative z-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-[#0b1f38] border border-white/10 rounded-3xl p-6 flex flex-col lg:flex-row gap-5 justify-between">

            <div className="relative w-full lg:w-[350px]">

              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                size={18}
              />

              <input
                type="text"
                placeholder="Cari pesanan..."
                className="w-full bg-[#08182d] border border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none"
              />

            </div>

            <div className="flex gap-3 flex-wrap">

              {["Semua", "Aktif", "Selesai", "Dibatalkan"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-5 py-3 rounded-2xl font-semibold transition ${
                    statusFilter === status
                      ? "bg-blue-600"
                      : "bg-[#08182d] border border-white/10 hover:border-blue-500"
                  }`}
                >

                  {status}

                </button>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="space-y-8">

          {filteredPesanan.map((item, index) => (
            <div
              key={index}
              className="bg-[#0b1f38] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500 transition"
            >

              <div className="grid grid-cols-1 lg:grid-cols-4">

                {/* IMAGE */}
                <div className="relative h-[260px] lg:h-full">

                  <img
                    src={item.img}
                    alt={item.lapangan}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-5 left-5 bg-blue-600 px-4 py-2 rounded-full text-sm font-bold uppercase">

                    {item.kategori}

                  </div>

                </div>

                {/* DETAIL */}
                <div className="lg:col-span-3 p-8">

                  <div className="flex flex-col lg:flex-row justify-between gap-8">

                    <div>

                      <div className="flex items-center gap-3">

                        <h2 className="text-3xl font-extrabold italic">
                          {item.lapangan}
                        </h2>

                        {item.status === "Selesai" && (
                          <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">

                            <CircleCheck size={16} />

                            Selesai

                          </div>
                        )}

                        {item.status === "Aktif" && (
                          <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                            Aktif
                          </div>
                        )}

                        {item.status === "Dibatalkan" && (
                          <div className="flex items-center gap-1 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">

                            <CircleX size={16} />

                            Dibatalkan

                          </div>
                        )}

                      </div>

                      <p className="text-white/40 mt-3">
                        ID Pesanan: {item.id}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

                        <div className="flex items-center gap-4 bg-[#08182d] rounded-2xl p-4">

                          <CalendarDays className="text-blue-400" />

                          <div>

                            <p className="text-white/40 text-sm">
                              Tanggal
                            </p>

                            <h3 className="font-semibold">
                              {item.tanggal}
                            </h3>

                          </div>

                        </div>

                        <div className="flex items-center gap-4 bg-[#08182d] rounded-2xl p-4">

                          <Clock3 className="text-blue-400" />

                          <div>

                            <p className="text-white/40 text-sm">
                              Jam Main
                            </p>

                            <h3 className="font-semibold">
                              {item.jam}
                            </h3>

                          </div>

                        </div>

                        <div className="flex items-center gap-4 bg-[#08182d] rounded-2xl p-4">

                          <MapPin className="text-blue-400" />

                          <div>

                            <p className="text-white/40 text-sm">
                              Lokasi
                            </p>

                            <h3 className="font-semibold">
                              {item.lokasi}
                            </h3>

                          </div>

                        </div>

                        <div className="flex items-center gap-4 bg-[#08182d] rounded-2xl p-4">

                          <Wallet className="text-blue-400" />

                          <div>

                            <p className="text-white/40 text-sm">
                              Total Pembayaran
                            </p>

                            <h3 className="font-semibold">
                              {item.harga}
                            </h3>

                          </div>

                        </div>

                      </div>

                    </div>

                    {/* ACTION */}
                    <div className="flex flex-col gap-4 lg:w-[220px]">

                      <button className="bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-bold">
                        Lihat Detail
                      </button>

                      <button className="bg-[#08182d] border border-white/10 hover:border-blue-500 transition py-4 rounded-2xl font-bold">
                        Download Invoice
                      </button>

                      {item.status === "Aktif" && (
                        <button className="bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition py-4 rounded-2xl font-bold text-red-400">
                          Batalkan Booking
                        </button>
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-[#08182d] border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl font-extrabold italic uppercase">
              Sport Center
            </h2>

            <p className="text-white/60 mt-5 leading-relaxed">
              Platform booking lapangan olahraga modern dengan
              pelayanan terbaik dan sistem realtime.
            </p>

          </div>

          <div>

            <h3 className="text-blue-400 uppercase tracking-widest font-semibold mb-5">
              Navigasi
            </h3>

            <ul className="space-y-3 text-white/70">
              <li>Home</li>
              <li>Booking</li>
              <li>Pesanan</li>
              <li>Kontak</li>
            </ul>

          </div>

          <div>

            <h3 className="text-blue-400 uppercase tracking-widest font-semibold mb-5">
              Bantuan
            </h3>

            <ul className="space-y-3 text-white/70">
              <li>FAQ</li>
              <li>Cara Booking</li>
              <li>Kebijakan Privasi</li>
            </ul>

          </div>

          <div>

            <h3 className="text-blue-400 uppercase tracking-widest font-semibold mb-5">
              Hubungi Kami
            </h3>

            <ul className="space-y-4 text-white/70">

              <li>📍 Bandung, Indonesia</li>
              <li>📞 0821-1234-5678</li>
              <li>✉ info@sportcenter.com</li>

            </ul>

          </div>

        </div>

        <div className="border-t border-white/10 text-center py-6 text-white/40 text-sm">
          © 2026 Sport Center. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
}

export default HalamanPesanan;