import React, { useState } from "react";
import {
  Search,
  Eye,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";

function DataUser() {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: 1,
      nama: "Asep Tatang",
      email: "asep@gmail.com",
      role: "customer",
      status: "active",
    },
    {
      id: 2,
      nama: "Budi Santoso",
      email: "budi@gmail.com",
      role: "customer",
      status: "inactive",
    },
    {
      id: 3,
      nama: "Admin Utama",
      email: "admin@sportcenter.com",
      role: "admin",
      status: "active",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.nama.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#071426] text-white p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Kelola User
        </h1>

        <p className="text-white/50 mt-2">
          Kelola seluruh pengguna sistem.
        </p>
      </div>

      {/* STATISTIK */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-[#0b1f38] rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">
            Total User
          </p>

          <h2 className="text-4xl font-black mt-3">
            320
          </h2>
        </div>

        <div className="bg-[#0b1f38] rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">
            User Aktif
          </p>

          <h2 className="text-4xl font-black text-green-400 mt-3">
            280
          </h2>
        </div>

        <div className="bg-[#0b1f38] rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">
            User Nonaktif
          </p>

          <h2 className="text-4xl font-black text-red-400 mt-3">
            40
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
                key={user.id}
                className="border-t border-white/5 hover:bg-white/5"
              >

                <td className="px-6 py-5">
                  {user.id}
                </td>

                <td className="px-6 py-5">
                  {user.nama}
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

                  <div className="flex justify-center gap-2">

                    <button
                      className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded-lg"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      className="bg-green-600 hover:bg-green-700 p-2 rounded-lg"
                    >
                      <UserCheck size={18} />
                    </button>

                    <button
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

    </div>
  );
}

export default DataUser;