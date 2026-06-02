import React, { useEffect, useState } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import {
  Search,
  Eye,
  UserCheck,
  UserX,
  LayoutDashboard,
  CalendarDays,
  Users
} from "lucide-react";

function DataUser() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/homepage");
  };

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3000/admin/users"
      );

      setUsers(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:3000/admin/users/status/${id}`,
        { status }
      );

      getUsers();

    } catch (error) {

      console.log(error);

    }

  };

  const filteredUsers = users.filter(
    (user) =>
      user.nama_user
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#071426] text-white flex">

      <aside className="w-72 shrink-0 bg-[#08182d] border-r border-white/10 min-h-screen flex flex-col">

        <div className="p-6 border-b border-white/10">

          <h1 className="text-2xl font-black italic">
            SPORT CENTER
          </h1>

          <p className="text-white/50 text-sm mt-1">
            Admin Panel
          </p>

        </div>

        <nav className="p-4 space-y-2 flex-1">

          <Link
            to="/dashboardadmin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/admin/booking"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10"
          >
            <CalendarDays size={18} />
            Data Booking
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600"
          >
            <Users size={18} />
            Data User
          </Link>

        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-white/10 mt-auto">

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      <main className="flex-1 p-8">

        {/* STATISTIK */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-[#0b1f38] rounded-2xl p-6 border border-white/10">
            <p className="text-white/50 text-sm">
              Total User
            </p>

            <h2 className="text-4xl font-black mt-3">
              {users.length}
            </h2>
          </div>

          <div className="bg-[#0b1f38] rounded-2xl p-6 border border-white/10">
            <p className="text-white/50 text-sm">
              User Aktif
            </p>

            <h2 className="text-4xl font-black">
              {
                users.filter(
                  (user) => user.status === "active"
                ).length
              }
            </h2>
          </div>

          <div className="bg-[#0b1f38] rounded-2xl p-6 border border-white/10">
            <p className="text-white/50 text-sm">
              User Nonaktif
            </p>

            <h2 className="text-4xl font-black text-red-400 mt-3">
              {
                users.filter(
                  (user) => user.status === "inactive"
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
              placeholder="Cari user..."
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
                  ID
                </th>

                <th className="text-left px-6 py-4">
                  Nama
                </th>

                <th className="text-left px-6 py-4">
                  Email
                </th>

                <th className="text-left px-6 py-4">
                  Role
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

              {filteredUsers.map((user) => (

                <tr
                  key={user.id_user}
                  className="border-t border-white/5 hover:bg-white/5"
                >

                  <td className="px-6 py-5">
                    {user.id_user}
                  </td>

                  <td className="px-6 py-5">
                    {user.nama_user}
                  </td>

                  <td className="px-6 py-5">
                    {user.email}
                  </td>

                  <td className="px-6 py-5 capitalize">
                    {user.role}
                  </td>

                  <td className="px-6 py-5">

                    {user.status === "active" ? (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                        Aktif
                      </span>
                    ) : (
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs">
                        Nonaktif
                      </span>
                    )}

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex items-center justify-center gap-2">

                      <button
                        className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded-lg"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(user.id_user, "active")
                        }
                        className="bg-green-600 hover:bg-green-700 p-2 rounded-lg"
                      >
                        <UserCheck size={18} />
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(user.id_user, "inactive")
                        }
                        className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                      >
                        <UserX size={18} />
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

export default DataUser;