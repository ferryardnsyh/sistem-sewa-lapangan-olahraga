import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  CheckCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboard, setDashboard] = useState({
    total_booking: 0,
    total_user: 0,
    total_lapangan: 0,
    total_pendapatan: 0,
    total_pending: 0,
    total_selesai: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/dashboard");
      setDashboard(response.data.summary);
      setRecentBookings(response.data.recentBookings);
      setRecentUsers(response.data.recentUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/homepage");
  };

  const stats = [
    { label: "Total Booking", value: dashboard.total_booking },
    { label: "Menunggu Konfirmasi", value: dashboard.total_pending },
    { label: "Booking Selesai", value: dashboard.total_selesai },
    {
      label: "Pendapatan",
      value: `Rp ${Number(dashboard.total_pendapatan).toLocaleString("id-ID")}`,
      small: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#071426] text-white flex">

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 w-72 bg-[#08182d] border-r border-white/10
          flex flex-col transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black italic">SPORT CENTER</h1>
            <p className="text-white/50 text-sm mt-1">Admin Panel</p>
          </div>
          <button
            className="lg:hidden text-white/50 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-2 flex-1">
          <button className="w-full flex items-center gap-3 bg-blue-600 px-4 py-3 rounded-xl font-medium">
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          <button
            onClick={() => { navigate("/admin/booking"); setSidebarOpen(false); }}
            className="w-full flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-xl transition"
          >
            <CalendarDays size={18} />
            Data Booking
          </button>
          <button
            onClick={() => { navigate("/admin/users"); setSidebarOpen(false); }}
            className="w-full flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-xl transition"
          >
            <Users size={18} />
            Data User
          </button>
        </div>

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

      {/* MAIN */}
      <main className="flex-1 min-w-0 flex flex-col">

        {/* Top bar mobile */}
        <header className="lg:hidden flex items-center justify-between px-4 py-4 bg-[#08182d] border-b border-white/10 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white/70 hover:text-white"
          >
            <Menu size={24} />
          </button>
          <h1 className="font-black italic text-lg">SPORT CENTER</h1>
          <div className="w-6" />
        </header>

        <div className="p-4 md:p-6 lg:p-8 space-y-6">

          {/* Header */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Dashboard Admin</h2>
            <p className="text-white/50 mt-1 text-sm">Kelola booking lapangan dan pengguna.</p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map(({ label, value, small }) => (
              <div key={label} className="bg-[#0b1f38] border border-white/10 rounded-2xl p-5">
                <p className="text-white/50 text-xs uppercase tracking-wide">{label}</p>
                <h3 className={`font-black mt-2 ${small ? "text-lg md:text-xl" : "text-3xl md:text-4xl"}`}>
                  {value}
                </h3>
              </div>
            ))}
          </div>

          {/* TABLES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* BOOKING TERBARU */}
            <div className="bg-[#0b1f38] border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/10">
                <h3 className="font-semibold text-lg">Booking Terbaru</h3>
              </div>

              {/* Table — md+ */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-white/50 text-sm">
                      <th className="px-5 py-3">User</th>
                      <th className="px-5 py-3">Lapangan</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center py-8 text-white/40 text-sm">
                          Belum ada booking.
                        </td>
                      </tr>
                    ) : (
                      recentBookings.map((item, index) => (
                        <tr key={index} className="border-t border-white/5 hover:bg-white/5 transition">
                          <td className="px-5 py-4">{item.nama_user}</td>
                          <td className="px-5 py-4">{item.nama_lapangan}</td>
                          <td className="px-5 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : item.status === "selesai"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Card list — mobile */}
              <div className="sm:hidden divide-y divide-white/5">
                {recentBookings.length === 0 ? (
                  <p className="text-center py-8 text-white/40 text-sm">Belum ada booking.</p>
                ) : (
                  recentBookings.map((item, index) => (
                    <div key={index} className="px-5 py-4 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{item.nama_user}</p>
                        <p className="text-xs text-white/50 mt-0.5 truncate">{item.nama_lapangan}</p>
                      </div>
                      <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : item.status === "selesai"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* USER TERBARU */}
            <div className="bg-[#0b1f38] border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/10">
                <h3 className="font-semibold text-lg">User Terbaru</h3>
              </div>
              <div className="p-5 space-y-4">
                {recentUsers.length === 0 ? (
                  <p className="text-center py-4 text-white/40 text-sm">Belum ada user baru.</p>
                ) : (
                  recentUsers.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm">{user.nama_user}</h4>
                        <p className="text-xs text-white/50 mt-0.5 truncate">{user.email}</p>
                      </div>
                      <CheckCircle size={18} className="text-green-400 shrink-0 ml-3" />
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
