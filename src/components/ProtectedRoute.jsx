import React from "react"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children, role }) {

  const userData = localStorage.getItem("user")

  const user =
    userData && userData !== "undefined"
      ? JSON.parse(userData)
      : null

  // kalau tidak ada user → login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // kalau role tidak cocok → arahkan sesuai role / aman
  if (role && user.role !== role) {
    // kalau user biasa tapi masuk admin → ke dashboard user
    if (user.role === "user") {
      return <Navigate to="/dashboard" replace />
    }

    // fallback aman
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute