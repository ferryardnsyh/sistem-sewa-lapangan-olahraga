import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [pesanan, setPesanan] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= FETCH BOOKING =================
  useEffect(() => {
    fetchPesanan();
  }, []);

  const fetchPesanan = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/booking/user/${user.id}`,
      );

      setPesanan(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FORMAT TANGGAL =================
  const formatTanggal = (tanggalDB) => {
    const date = new Date(tanggalDB);

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ================= FILTER =================
  const filteredPesanan = pesanan.filter((item) => {
    const cocokStatus =
      statusFilter === "Semua"
        ? true
        : item.status.toLowerCase() === statusFilter.toLowerCase();

    const cocokSearch = item.nama_lapangan
      .toLowerCase()
      .includes(search.toLowerCase());

    return cocokStatus && cocokSearch;
  });

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
            <Link to="/dashboard" className="hover:text-white transition">
              Beranda
            </Link>

            <Link to="/booking" className="hover:text-white transition">
              Booking
            </Link>

            <Link to="/halamanpesan" className="text-blue-400">
              Pesanan
            </Link>
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
            Lihat seluruh riwayat booking lapangan dan status pemesanan
            realtime.
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="-mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#0b1f38] border border-white/10 rounded-3xl p-6 flex flex-col lg:flex-row gap-5 justify-between">
            {/* SEARCH */}
            <div className="relative w-full lg:w-[350px]">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                size={18}
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari pesanan..."
                className="w-full bg-[#08182d] border border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none"
              />
            </div>

            {/* FILTER STATUS */}
            <div className="flex gap-3 flex-wrap">
              {["Semua", "Pending", "Selesai", "Dibatalkan"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-5 py-3 rounded-2xl font-semibold transition ${statusFilter === status
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
          {filteredPesanan.length === 0 && (
            <div className="text-center text-white/50 text-lg">
              Belum ada pesanan booking
            </div>
          )}

          {filteredPesanan.map((item, index) => (
            <div
              key={index}
              className="bg-[#0b1f38] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500 transition"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4">
                {/* IMAGE */}
                <div className="relative h-[260px] lg:h-full">
                  <img
                    src={item.gambar}
                    alt={item.nama_lapangan}
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
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-3xl font-extrabold italic">
                          {item.nama_lapangan}
                        </h2>

                        {item.status === "selesai" && (
                          <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                            <CircleCheck size={16} />
                            Selesai
                          </div>
                        )}

                        {item.status === "pending" && (
                          <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                            Pending
                          </div>
                        )}

                        {item.status === "dibatalkan" && (
                          <div className="flex items-center gap-1 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                            <CircleX size={16} />
                            Dibatalkan
                          </div>
                        )}
                      </div>

                      <p className="text-white/40 mt-3">
                        ID Pesanan: #{item.id_booking}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                        {/* TANGGAL */}
                        <div className="flex items-center gap-4 bg-[#08182d] rounded-2xl p-4">
                          <CalendarDays className="text-blue-400" />

                          <div>
                            <p className="text-white/40 text-sm">Tanggal</p>

                            <h3 className="font-semibold">
                              {formatTanggal(item.tanggal)}
                            </h3>
                          </div>
                        </div>

                        {/* JAM */}
                        <div className="flex items-center gap-4 bg-[#08182d] rounded-2xl p-4">
                          <Clock3 className="text-blue-400" />

                          <div>
                            <p className="text-white/40 text-sm">Jam Main</p>

                            <h3 className="font-semibold">
                              {item.jam_mulai?.slice(0, 5)} -{" "}
                              {item.jam_selesai?.slice(0, 5)}
                            </h3>
                          </div>
                        </div>

                        {/* LOKASI */}
                        <div className="flex items-center gap-4 bg-[#08182d] rounded-2xl p-4">
                          <MapPin className="text-blue-400" />

                          <div>
                            <p className="text-white/40 text-sm">Lokasi</p>

                            <h3 className="font-semibold">{item.lokasi}</h3>
                          </div>
                        </div>

                        {/* HARGA */}
                        <div className="flex items-center gap-4 bg-[#08182d] rounded-2xl p-4">
                          <Wallet className="text-blue-400" />

                          <div>
                            <p className="text-white/40 text-sm">
                              Total Pembayaran
                            </p>

                            <h3 className="font-semibold">
                              Rp{" "}
                              {Number(item.total_harga).toLocaleString("id-ID")}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ACTION */}
                    {/* ACTION */}
<div className="flex flex-col gap-4 lg:w-[220px]">

{/* BUTTON 1: lihat detail */}
<button
  onClick={() => navigate(`/pembayaran/${item.id}`)}
  className="bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-bold"
>
  Lihat Detail
</button>

</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section >

      {/* FOOTER */}
      < footer className="bg-[#020817] py-16 mt-16" >
        <div className="max-w-7xl mx-auto px-6 text-center text-white/40 text-sm">
          © 2026 Sport Center. All rights reserved.
        </div>
      </footer >
    </div >
  );
}

export default HalamanPesanan;