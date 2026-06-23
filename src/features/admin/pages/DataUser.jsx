import React, { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, Search, Eye, UserCheck, UserX, LayoutDashboard, CalendarDays, Users, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function DataUser() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  
  // State Tambahan untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/homepage");
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Reset halaman ke 1 saat admin melakukan pencarian data
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/admin/users/status/${id}`, { status });
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nama_user.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Logika Pemotongan Data untuk Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

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
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
          >
            <CalendarDays size={18} />
            Data Booking
          </Link>
          <Link
            to="/admin/users"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 font-medium"
          >
            <Users size={18} />
            Data User
          </Link>
        </nav>

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
          {/* Page title */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Data User</h1>
            <p className="text-white/50 mt-1 text-sm">Kelola seluruh akun pengguna.</p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Total User", value: users.length, color: "text-white" },
              { label: "User Aktif", value: users.filter((u) => u.status === "active").length, color: "text-green-400" },
              { label: "User Nonaktif", value: users.filter((u) => u.status === "inactive").length, color: "text-red-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-[#0b1f38] rounded-2xl p-5 border border-white/10">
                <p className="text-white/50 text-sm">{label}</p>
                <h2 className={`text-4xl font-black mt-2 ${color}`}>{value}</h2>
              </div>
            ))}
          </div>

          {/* SEARCH */}
          <div className="bg-[#0b1f38] border border-white/10 rounded-2xl p-4">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Cari user berdasarkan nama atau email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-sm bg-[#08182d] border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* TABLE — desktop */}
          <div className="hidden md:block bg-[#0b1f38] border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-[#08182d] text-white/60 text-sm uppercase tracking-wide">
                  <tr>
                    {["ID", "Nama", "Email", "Role", "Status", "Aksi"].map((h) => (
                      <th key={h} className={`px-5 py-4 text-left ${h === "Aksi" ? "text-center" : ""}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-white/40">
                        Tidak ada user ditemukan.
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user) => (
                      <tr key={user.id_user} className="border-t border-white/5 hover:bg-white/5 transition">
                        <td className="px-5 py-4 text-white/70 text-sm">#{user.id_user}</td>
                        <td className="px-5 py-4 font-medium">{user.nama_user}</td>
                        <td className="px-5 py-4 text-white/70 text-sm">{user.email}</td>
                        <td className="px-5 py-4 capitalize">{user.role}</td>
                        <td className="px-5 py-4">
                          {user.status === "active" ? (
                            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">Aktif</span>
                          ) : (
                            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium">Nonaktif</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded-lg transition" title="Detail">
                              <Eye size={16} />
                            </button>
                            <button onClick={() => updateStatus(user.id_user, "active")} className="bg-green-600 hover:bg-green-700 p-2 rounded-lg transition" title="Aktifkan">
                              <UserCheck size={16} />
                            </button>
                            <button onClick={() => updateStatus(user.id_user, "inactive")} className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition" title="Nonaktifkan">
                              <UserX size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Desktop */}
            {filteredUsers.length > 0 && (
              <div className="flex justify-between items-center bg-[#08182d] border-t border-white/10 p-4">
                <div className="text-sm text-white/50">
                  Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredUsers.length)} dari {filteredUsers.length} user
                </div>

                <div className="flex gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={`px-4 py-2 rounded-lg text-sm transition ${
                      currentPage === 1 ? "bg-gray-700 cursor-not-allowed text-white/40" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-2 rounded-lg text-sm transition ${
                        currentPage === index + 1 ? "bg-blue-600 font-bold" : "bg-[#0b1f38] hover:bg-white/10"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={`px-4 py-2 rounded-lg text-sm transition ${
                      currentPage === totalPages || totalPages === 0 ? "bg-gray-700 cursor-not-allowed text-white/40" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CARD LIST — mobile */}
          <div className="md:hidden space-y-3">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12 text-white/40 bg-[#0b1f38] rounded-2xl border border-white/10">
                Tidak ada user ditemukan.
              </div>
            ) : (
              currentUsers.map((user) => (
                <div key={user.id_user} className="bg-[#0b1f38] border border-white/10 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40 font-mono">#{user.id_user}</span>
                    {user.status === "active" ? (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">Aktif</span>
                    ) : (
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium">Nonaktif</span>
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-base">{user.nama_user}</p>
                    <p className="text-sm text-white/50 mt-0.5">{user.email}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/10">
                    <span className="text-sm capitalize text-white/60 bg-white/10 px-3 py-1 rounded-full">
                      {user.role}
                    </span>
                    <div className="flex gap-2">
                      <button className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded-lg transition" title="Detail">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => updateStatus(user.id_user, "active")} className="bg-green-600 hover:bg-green-700 p-2 rounded-lg transition" title="Aktifkan">
                        <UserCheck size={16} />
                      </button>
                      <button onClick={() => updateStatus(user.id_user, "inactive")} className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition" title="Nonaktifkan">
                        <UserX size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Mobile */}
          {filteredUsers.length > 0 && (
            <div className="md:hidden flex justify-center items-center gap-2 mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  currentPage === 1 ? "bg-gray-700 cursor-not-allowed text-white/40" : "bg-blue-600"
                }`}
              >
                Prev
              </button>

              <span className="text-sm font-medium">
                {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  currentPage === totalPages || totalPages === 0 ? "bg-gray-700 cursor-not-allowed text-white/40" : "bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default DataUser;