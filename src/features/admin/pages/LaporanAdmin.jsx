import React, { useState } from "react";
import {
  FileText,
  CalendarDays,
  DollarSign,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";

function LaporanAdmin() {
  const [search, setSearch] = useState("");

  const laporan = [
    {
      id: "TRX001",
      pelanggan: "Asep Tatang",
      lapangan: "Futsal A",
      tanggal: "02 Juni 2026",
      total: 155000,
      status: "Selesai",
    },
    {
      id: "TRX002",
      pelanggan: "Budi Santoso",
      lapangan: "Badminton B",
      tanggal: "03 Juni 2026",
      total: 55000,
      status: "Selesai",
    },
    {
      id: "TRX003",
      pelanggan: "Rina Putri",
      lapangan: "Basket VIP",
      tanggal: "05 Juni 2026",
      total: 405000,
      status: "Dibatalkan",
    },
  ];

  const filteredData = laporan.filter(
    (item) =>
      item.pelanggan.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPendapatan = laporan
    .filter((item) => item.status === "Selesai")
    .reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-[#071426] text-white p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Laporan Transaksi</h1>

          <p className="text-white/50 mt-2">
            Rekap booking dan pendapatan lapangan.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-medium transition">
          Export PDF
        </button>
      </div>

      {/* STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* TOTAL BOOKING */}
        <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-6">
          <FileText className="mb-3 text-blue-400" />

          <p className="text-white/50 text-sm">Total Booking</p>

          <h2 className="text-4xl font-black mt-2">
            {laporan.length}
          </h2>
        </div>

        {/* PENDAPATAN */}
        <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-6">
          <DollarSign className="mb-3 text-green-400" />

          <p className="text-white/50 text-sm">Pendapatan</p>

          <h2 className="text-2xl font-black mt-2">
            Rp {totalPendapatan.toLocaleString("id-ID")}
          </h2>
        </div>

        {/* SELESAI */}
        <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-6">
          <CheckCircle className="mb-3 text-green-400" />

          <p className="text-white/50 text-sm">Booking Selesai</p>

          <h2 className="text-4xl font-black mt-2">
            {
              laporan.filter(
                (item) => item.status === "Selesai"
              ).length
            }
          </h2>
        </div>

        {/* DIBATALKAN */}
        <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-6">
          <XCircle className="mb-3 text-red-400" />

          <p className="text-white/50 text-sm">Dibatalkan</p>

          <h2 className="text-4xl font-black mt-2">
            {
              laporan.filter(
                (item) => item.status === "Dibatalkan"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            className="bg-[#08182d] border border-white/10 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="date"
            className="bg-[#08182d] border border-white/10 rounded-xl px-4 py-3 outline-none"
          />

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-4 text-white/40"
            />

            <input
              type="text"
              placeholder="Cari transaksi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#08182d] border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none"
            />
          </div>
        </div>
      </div>

      {/* TABEL */}
      <div className="bg-[#0b1f38] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#08182d]">
              <tr>
                <th className="text-left px-6 py-4">ID</th>
                <th className="text-left px-6 py-4">Pelanggan</th>
                <th className="text-left px-6 py-4">Lapangan</th>
                <th className="text-left px-6 py-4">Tanggal</th>
                <th className="text-left px-6 py-4">Total</th>
                <th className="text-left px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-white/5 hover:bg-white/5"
                >
                  <td className="px-6 py-5">{item.id}</td>

                  <td className="px-6 py-5">
                    {item.pelanggan}
                  </td>

                  <td className="px-6 py-5">
                    {item.lapangan}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {item.tanggal}
                    </div>
                  </td>

                  <td className="px-6 py-5 font-semibold">
                    Rp {item.total.toLocaleString("id-ID")}
                  </td>

                  <td className="px-6 py-5">
                    {item.status === "Selesai" ? (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                        Selesai
                      </span>
                    ) : (
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs">
                        Dibatalkan
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-white/50"
                  >
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LaporanAdmin;