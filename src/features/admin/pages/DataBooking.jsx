import React, { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, LayoutDashboard, CalendarDays, Users, Search, Eye, CheckCircle, XCircle, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function DataBooking() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/homepage");
  };

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/bookings");
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/admin/bookings/${id}`, { status });
      getBookings();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = bookings.filter(
    (item) =>
      item.nama_user.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toString().includes(search)
  );

  const lihatDetail = (item) => {
    alert(`
ID Booking : ${item.id}
User       : ${item.nama_user}
Lapangan   : ${item.nama_lapangan}
Tanggal    : ${item.tanggal}
Jam        : ${item.jam_mulai} - ${item.jam_selesai}
Total      : Rp ${item.total_harga}
Status     : ${item.status}
    `);
  };

  const statusBadge = (status) => {
    const map = {
      pending: "bg-yellow-500/20 text-yellow-400",
      selesai: "bg-green-500/20 text-green-400",
      dibatalkan: "bg-red-500/20 text-red-400",
    };
    const label = { pending: "Pending", selesai: "Selesai", dibatalkan: "Dibatalkan" };
    return (
      <span className={`${map[status] || "bg-white/10 text-white/50"} px-3 py-1 rounded-full text-xs font-medium`}>
        {label[status] || status}
      </span>
    );
  };

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
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
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

        {/* Nav */}
        <nav className="p-4 space-y-2 flex-1">
          <Link
            to="/dashboardadmin"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link
            to="/admin/booking"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 font-medium"
          >
            <CalendarDays size={18} />
            Data Booking
          </Link>
          <Link
            to="/admin/users"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
          >
            <Users size={18} />
            Data User
          </Link>
        </nav>

        {/* Logout */}
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
          <div className="w-6" /> {/* spacer */}
        </header>

        <div className="p-4 md:p-6 lg:p-8 space-y-6">

          {/* Page title */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Data Booking</h1>
            <p className="text-white/50 mt-1 text-sm">Kelola seluruh booking pelanggan.</p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Total Booking", value: bookings.length },
              { label: "Menunggu Konfirmasi", value: bookings.filter((b) => b.status === "pending").length },
              { label: "Booking Selesai", value: bookings.filter((b) => b.status === "selesai").length },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#0b1f38] rounded-2xl p-5 border border-white/10">
                <p className="text-white/50 text-sm">{label}</p>
                <h2 className="text-4xl font-black mt-2">{value}</h2>
              </div>
            ))}
          </div>

          {/* SEARCH */}
          <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-4">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Cari booking berdasarkan nama atau ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-sm bg-[#08182d] border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* TABLE — desktop */}
          <div className="hidden md:block bg-[#0b1f38] border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-[#08182d] text-white/60 text-sm uppercase tracking-wide">
                  <tr>
                    {["ID", "Pelanggan", "Lapangan", "Jadwal", "Total", "Status", "Aksi"].map((h) => (
                      <th key={h} className={`px-5 py-4 text-left ${h === "Aksi" ? "text-center" : ""}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-white/40">
                        Tidak ada data booking ditemukan.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="border-t border-white/5 hover:bg-white/5 transition">
                        <td className="px-5 py-4 text-white/70 text-sm">#{item.id}</td>
                        <td className="px-5 py-4 font-medium">{item.nama_user}</td>
                        <td className="px-5 py-4">{item.nama_lapangan}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-sm">
                            <CalendarDays size={14} className="text-white/50" />
                            {new Date(item.tanggal).toLocaleDateString("id-ID")}
                          </div>
                          <p className="text-xs text-white/50 mt-1">{item.jam_mulai} – {item.jam_selesai}</p>
                        </td>
                        <td className="px-5 py-4 font-semibold">
                          Rp {Number(item.total_harga).toLocaleString("id-ID")}
                        </td>
                        <td className="px-5 py-4">{statusBadge(item.status)}</td>
                        <td className="px-5 py-4">
                          <div className="flex justify-center gap-2">
                            <button onClick={() => lihatDetail(item)} className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded-lg transition" title="Detail">
                              <Eye size={16} />
                            </button>
                            <button onClick={() => updateStatus(item.id, "selesai")} className="bg-green-600 hover:bg-green-700 p-2 rounded-lg transition" title="Konfirmasi Selesai">
                              <CheckCircle size={16} />
                            </button>
                            <button onClick={() => updateStatus(item.id, "dibatalkan")} className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition" title="Batalkan">
                              <XCircle size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* CARD LIST — mobile */}
          <div className="md:hidden space-y-3">
            {filteredData.length === 0 ? (
              <div className="text-center py-12 text-white/40 bg-[#0b1f38] rounded-2xl border border-white/10">
                Tidak ada data booking ditemukan.
              </div>
            ) : (
              filteredData.map((item) => (
                <div key={item.id} className="bg-[#0b1f38] border border-white/10 rounded-2xl p-4 space-y-3">
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40 font-mono">#{item.id}</span>
                    {statusBadge(item.status)}
                  </div>

                  {/* Info */}
                  <div>
                    <p className="font-semibold text-base">{item.nama_user}</p>
                    <p className="text-sm text-white/60 mt-0.5">{item.nama_lapangan}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={14} />
                      {new Date(item.tanggal).toLocaleDateString("id-ID")}
                    </div>
                    <span>{item.jam_mulai} – {item.jam_selesai}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/10">
                    <span className="font-bold">
                      Rp {Number(item.total_harga).toLocaleString("id-ID")}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => lihatDetail(item)} className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded-lg transition" title="Detail">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => updateStatus(item.id, "selesai")} className="bg-green-600 hover:bg-green-700 p-2 rounded-lg transition" title="Konfirmasi Selesai">
                        <CheckCircle size={16} />
                      </button>
                      <button onClick={() => updateStatus(item.id, "dibatalkan")} className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition" title="Batalkan">
                        <XCircle size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default DataBooking;