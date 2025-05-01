"use client"

import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import BottomNav from "./BottomNavigation"
import Toast from "../ui/Toast"

const Layout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [toast, setToast] = useState({ show: false, message: "", type: "success" })

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setSidebarOpen(!mobile)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleShowToast = (e) => {
      setToast({
        show: true,
        message: e.detail.message,
        type: e.detail.type || "success",
      })

      // Auto hide toast after 5 seconds
      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }))
      }, 5000)
    }

    window.addEventListener("showToast", handleShowToast)

    return () => {
      window.removeEventListener("showToast", handleShowToast)
    }
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop */}
      {!isMobile && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 animate-fade-in">
          <Outlet />
        </main>

        {/* Bottom navigation for mobile */}
        {isMobile && <BottomNav />}
      </div>

      {/* Toast notifications */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        />
      )}
    </div>
  )
}

export default Layout
