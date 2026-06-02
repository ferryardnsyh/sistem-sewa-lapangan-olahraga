import { BrowserRouter, Routes, Route } from "react-router-dom"

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
import LaporanAdmin from "./features/admin/pages/LaporanAdmin"

import ProtectedRoute from "./components/ProtectedRoute"


function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* ================= AUTH ================= */}

        <Route
          path="/homepage"
          element={<Homepage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />



        {/* ================= USER ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/booking"
          element={<Booking />}
        />


        <Route
          path="/halamanpesan"
          element={<Halamanpesan />}
        />


        <Route
          path="/pembayaran"
          element={<Pembayaran />}
        />


        <Route
          path="/pembayaran/:id"
          element={<Pembayaran />}
        />



        {/* ================= ADMIN ================= */}

        <Route
          path="/dashboardadmin"
          element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/booking"
          element={
            <ProtectedRoute>
              <DataBooking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <DataUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/laporan"
          element={
            <ProtectedRoute>
              <LaporanAdmin />
            </ProtectedRoute>
          }
        />

      </Routes>


    </BrowserRouter>

  )

}
export default App