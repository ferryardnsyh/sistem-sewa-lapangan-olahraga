import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  FileText,
  Search,
  Eye,
  CheckCircle,
  XCircle
} from "lucide-react";

function DataBooking() {
  const [search, setSearch] = useState("");
  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3000/admin/bookings"
      );

      setBookings(response.data);

    } catch (error) {

      console.log(error);

    }

  };
  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:3000/admin/bookings/${id}`,
        { status }
      );

      getBookings();

    } catch (error) {

      console.log(error);

    }

  };
  const [bookings, setBookings] = useState([]);


  const filteredData = bookings.filter(
    (item) =>
      item.nama_user
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      item.id
        .toString()
        .includes(search)
  );

  const lihatDetail = (item) => {

    alert(`
      ID Booking : ${item.id}
      User : ${item.nama_user}
      Lapangan : ${item.nama_lapangan}
      Tanggal : ${item.tanggal}
      Jam : ${item.jam_mulai} - ${item.jam_selesai}
      Total : Rp ${item.total_harga}
      Status : ${item.status}
  `);

  };

  return (
    <div className="min-h-screen bg-[#071426] text-white flex">

      <aside className="w-72 shrink-0 bg-[#08182d] border-r border-white/10 min-h-screen">

        <div className="p-6 border-b border-white/10">

          <h1 className="text-2xl font-black italic">
            SPORT CENTER
          </h1>

          <p className="text-white/50 text-sm mt-1">
            Admin Panel
          </p>

        </div>

        <nav className="p-4 space-y-2">

          <Link
            to="/dashboardadmin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/admin/booking"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600"
          >
            <CalendarDays size={18} />
            Data Booking
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10"
          >
            <Users size={18} />
            Data User
          </Link>

          <Link
            to="/admin/laporan"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10"
          >
            <FileText size={18} />
            Laporan
          </Link>

        </nav>

      </aside>

      {/* HEADER */}
      <main className="flex-1 p-8">
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
              {bookings.length}
            </h2>

          </div>

          <div className="bg-[#0b1f38] rounded-2xl p-6 border border-white/10">

            <p className="text-white/50 text-sm">
              Menunggu Konfirmasi
            </p>

            <h2 className="text-4xl font-black mt-3">
              {
                bookings.filter(
                  (item) => item.status === "pending"
                ).length
              }
            </h2>

          </div>

          <div className="bg-[#0b1f38] rounded-2xl p-6 border border-white/10">

            <p className="text-white/50 text-sm">
              Booking Selesai
            </p>

            <h2 className="text-4xl font-black mt-3">
              {
                bookings.filter(
                  (item) => item.status === "selesai"
                ).length
              }
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
                    {item.nama_user}
                  </td>

                  <td className="px-6 py-5">
                    {item.nama_lapangan}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">

                      <CalendarDays size={16} />
                      {new Date(item.tanggal)
                        .toLocaleDateString("id-ID")}

                    </div>

                    <p className="text-xs text-white/50 mt-1">
                      {item.jam_mulai} - {item.jam_selesai}
                    </p>

                  </td>

                  <td className="px-6 py-5 font-semibold">
                    Rp {Number(item.total_harga)
                      .toLocaleString("id-ID")}
                  </td>

                  <td className="px-6 py-5">


                    {item.status === "pending" && (
                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs">
                        Pending
                      </span>
                    )}

                    {item.status === "selesai" && (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                        Selesai
                      </span>
                    )}
                    {item.status === "dibatalkan" && (
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs">
                        Dibatalkan
                      </span>
                    )}

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => lihatDetail(item)}
                        className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded-lg"
                        title="Detail"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(item.id, "selesai")
                        }
                        className="bg-green-600 hover:bg-green-700 p-2 rounded-lg"
                        title="Konfirmasi"
                      >
                        <CheckCircle size={18} />
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(item.id, "dibatalkan")
                        }
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
      </main>
    </div>
  );
}

export default DataBooking;