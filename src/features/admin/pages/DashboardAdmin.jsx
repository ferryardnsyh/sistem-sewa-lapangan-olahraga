import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  CheckCircle,
  LogOut,
  FileText,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    total_booking: 0,
    total_user: 0,
    total_lapangan: 0,
    total_pendapatan: 0,
  });
  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3000/admin/dashboard"
      );

      setDashboard(response.data.summary);

      setRecentBookings(
        response.data.recentBookings
      );

      setRecentUsers(
        response.data.recentUsers
      );

    } catch (error) {

      console.log(error);

    }

  };

  const [recentBookings, setRecentBookings] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/homepage");
  };

  return (
    <div className="min-h-screen bg-[#071426] text-white flex">

      {/* GOOGLE FONT */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-[#08182d] border-r border-white/10 flex flex-col">

        {/* LOGO */}
        <div className="px-6 py-6 border-b border-white/10">

          <h1 className="text-2xl font-black italic">
            SPORT CENTER
          </h1>

          <p className="text-white/50 text-sm mt-1">
            Admin Panel
          </p>

        </div>

        {/* MENU */}
        <div className="p-4 space-y-2 flex-1">

          <button className="w-full flex items-center gap-3 bg-blue-600 px-4 py-3 rounded-xl font-medium">

            <LayoutDashboard size={18} />
            Dashboard

          </button>

          <button
            onClick={() => navigate("/admin/booking")}
            className="w-full flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-xl transition"
          >
            <CalendarDays size={18} />
            Data Booking
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="w-full flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-xl transition"
          >
            <Users size={18} />
            Data User
          </button>

          <button
            onClick={() => navigate("/admin/laporan")}
            className="w-full flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-xl transition"
          >
            <FileText size={18} />
            Laporan
          </button>

        </div>

        {/* LOGOUT */}
        <div className="p-4 border-t border-white/10">

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Dashboard Admin
          </h2>

          <p className="text-white/50 mt-2">
            Kelola booking lapangan dan pengguna.
          </p>

        </div>

        {/* ================= STATISTICS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          {/* TOTAL BOOKING */}
          <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-6">

            <p className="text-white/50 text-sm uppercase">
              Total Booking
            </p>

            <h3 className="text-4xl font-black mt-3">
              {dashboard.total_booking}
            </h3>

          </div>

          {/* MENUNGGU */}
          <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-6">

            <p className="text-white/50 text-sm uppercase">
              Menunggu Konfirmasi
            </p>

            <h3 className="text-4xl font-black mt-3">
              {dashboard.total_pending}
            </h3>

          </div>

          {/* SELESAI */}
          <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-6">

            <p className="text-white/50 text-sm uppercase">
              Booking Selesai
            </p>

            <h3 className="text-4xl font-black mt-3">
              {dashboard.total_selesai}
            </h3>

          </div>

          {/* PENDAPATAN */}
          <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-6">

            <p className="text-white/50 text-sm uppercase">
              Pendapatan
            </p>

            <h3 className="text-xl font-black mt-3">
              Rp {Number(
                dashboard.total_pendapatan
              ).toLocaleString("id-ID")}
            </h3>

          </div>

        </div>

        {/* ================= TABLES ================= */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* BOOKING TERBARU */}
          <div className="bg-[#0b1f38] border border-white/10 rounded-2xl overflow-hidden">

            <div className="px-6 py-4 border-b border-white/10">

              <h3 className="font-semibold text-lg">
                Booking Terbaru
              </h3>

            </div>

            <table className="w-full">

              <thead>

                <tr className="text-left text-white/50 text-sm">

                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Lapangan</th>
                  <th className="px-6 py-4">Status</th>

                </tr>

              </thead>

              <tbody>

                {recentBookings.map((item, index) => (

                  <tr
                    key={index}
                    className="border-t border-white/5"
                  >

                    <td className="px-6 py-4">
                      {item.nama_user}
                    </td>

                    <td className="px-6 py-4">
                      {item.nama_lapangan}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs
          ${item.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : item.status === "selesai"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* USER TERBARU */}
          <div className="bg-[#0b1f38] border border-white/10 rounded-2xl overflow-hidden">

            <div className="px-6 py-4 border-b border-white/10">

              <h3 className="font-semibold text-lg">
                User Terbaru
              </h3>

            </div>

            <div className="p-6 space-y-5">

              {recentUsers.map((user, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between border-b border-white/5 pb-4"
                >

                  <div>

                    <h4 className="font-medium">
                      {user.nama_user}
                    </h4>

                    <p className="text-sm text-white/50">
                      {user.email}
                    </p>

                  </div>

                  <CheckCircle
                    size={18}
                    className="text-green-400"
                  />

                </div>

              ))}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;