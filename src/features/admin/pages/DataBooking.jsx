import React, { useState } from "react";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  CalendarDays,
} from "lucide-react";

function DataBooking() {
  const [search, setSearch] = useState("");

  const bookings = [
    {
      id: "BK001",
      nama: "Asep Tatang",
      lapangan: "Futsal A",
      tanggal: "02 Juni 2026",
      jam: "19:00 - 20:00",
      total: "Rp 155.000",
      status: "pending",
    },
    {
      id: "BK002",
      nama: "Budi Santoso",
      lapangan: "Badminton B",
      tanggal: "03 Juni 2026",
      jam: "15:00 - 16:00",
      total: "Rp 55.000",
      status: "paid",
    },
    {
      id: "BK003",
      nama: "Rina Putri",
      lapangan: "Basket VIP",
      tanggal: "05 Juni 2026",
      jam: "18:00 - 20:00",
      total: "Rp 405.000",
      status: "completed",
    },
  ];

  const filteredData = bookings.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#071426] text-white p-8">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Data Booking
        </h1>

        <p className="text-white/50 mt-2">
          Kelola seluruh booking pelanggan.
        </p>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-[#0b1f38] rounded-2xl p-6 border border-white/10">

          <p className="text-white/50 text-sm">
            Total Booking
          </p>

          <h2 className="text-4xl font-black mt-3">
            128
          </h2>

        </div>

        <div className="bg-[#0b1f38] rounded-2xl p-6 border border-white/10">

          <p className="text-white/50 text-sm">
            Menunggu Konfirmasi
          </p>

          <h2 className="text-4xl font-black text-yellow-400 mt-3">
            14
          </h2>

        </div>

        <div className="bg-[#0b1f38] rounded-2xl p-6 border border-white/10">

          <p className="text-white/50 text-sm">
            Booking Selesai
          </p>

          <h2 className="text-4xl font-black text-green-400 mt-3">
            102
          </h2>

        </div>

      </div>

      {/* SEARCH */}
      <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-5 mb-6">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-white/40"
          />

          <input
            type="text"
            placeholder="Cari booking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#08182d] border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-[#0b1f38] border border-white/10 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#08182d]">

            <tr>

              <th className="text-left px-6 py-4">
                ID Booking
              </th>

              <th className="text-left px-6 py-4">
                Pelanggan
              </th>

              <th className="text-left px-6 py-4">
                Lapangan
              </th>

              <th className="text-left px-6 py-4">
                Jadwal
              </th>

              <th className="text-left px-6 py-4">
                Total
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-center px-6 py-4">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredData.map((item) => (

              <tr
                key={item.id}
                className="border-t border-white/5 hover:bg-white/5"
              >

                <td className="px-6 py-5">
                  {item.id}
                </td>

                <td className="px-6 py-5">
                  {item.nama}
                </td>

                <td className="px-6 py-5">
                  {item.lapangan}
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">

                    <CalendarDays size={16} />

                    {item.tanggal}

                  </div>

                  <p className="text-xs text-white/50 mt-1">
                    {item.jam}
                  </p>

                </td>

                <td className="px-6 py-5 font-semibold">
                  {item.total}
                </td>

                <td className="px-6 py-5">

                  {item.status === "pending" && (
                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  )}

                  {item.status === "paid" && (
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs">
                      Lunas
                    </span>
                  )}

                  {item.status === "completed" && (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                      Selesai
                    </span>
                  )}

                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-2">

                    <button
                      className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded-lg"
                      title="Detail"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      className="bg-green-600 hover:bg-green-700 p-2 rounded-lg"
                      title="Konfirmasi"
                    >
                      <CheckCircle size={18} />
                    </button>

                    <button
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                      title="Batalkan"
                    >
                      <XCircle size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DataBooking;