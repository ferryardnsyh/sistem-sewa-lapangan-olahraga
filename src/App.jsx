import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"

import Homepage from "./features/pelanggan/pages/Homepage"
import Dashboard from "./features/pelanggan/pages/Dashboard"
import Booking from "./features/pelanggan/pages/Booking"
import Halamanpesan from "./features/pelanggan/pages/Halamanpesan"
import Pembayaran from "./features/pelanggan/pages/Pembayaran"

import DashboardAdmin from "./features/admin/pages/DashboardAdmin"
import DataBooking from "./features/admin/pages/DataBooking"
import DataUser from "./features/admin/pages/DataUser"

import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* ================= AUTH ================= */}
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />



        {/* ================= USER ================= */}
        {/* TAMBAH role="user"
            PENJELASAN:
            - sebelumnya ProtectedRoute tidak tahu ini halaman user atau admin
            - sekarang dibatasi hanya user yang boleh akses dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/booking" element={<Booking />} />
        <Route path="/halamanpesan" element={<Halamanpesan />} />
        <Route path="/pembayaran" element={<Pembayaran />} />
        <Route path="/pembayaran/:id" element={<Pembayaran />} />



        {/* ================= ADMIN ================= */}
        {/* TAMBAH role="admin"
            PENJELASAN:
            - hanya user dengan role admin yang boleh masuk dashboard admin */}
        <Route
          path="/dashboardadmin"
          element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ONLY ROUTE */}
        <Route
          path="/admin/booking"
          element={
            <ProtectedRoute role="admin">
              <DataBooking />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ONLY ROUTE */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <DataUser />
            </ProtectedRoute>
          }
        />



        {/* ================= FIX: ROUTE TIDAK KETEMU ================= */}
        {/* FIX PENTING:
            PENJELASAN:
            - kalau user masuk URL yang tidak ada
            - otomatis diarahkan ke login
            - mencegah blank page */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>

    </BrowserRouter>
  )

}

export default App