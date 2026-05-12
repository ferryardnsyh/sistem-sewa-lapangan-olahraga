import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Homepage from "./features/pelanggan/pages/Homepage"
import Dashboard from "./features/pelanggan/pages/Dashboard"
import Booking from "./features/pelanggan/pages/Booking"
import Halamanpesan from "./features/pelanggan/pages/Halamanpesan"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Halamanpesan" element={<Halamanpesan />} />
        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App