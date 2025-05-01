"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { MenuIcon, BellIcon, SearchIcon, LogOutIcon, UserIcon, SettingsIcon, PlusIcon } from "../Icons/Icons"

const Navbar = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const notifications = [
    { id: 1, message: "New order #ORD-001 received", time: "5 minutes ago", isRead: false },
    { id: 2, message: "Product 'Wireless Headphones' stock low", time: "1 hour ago", isRead: false },
    { id: 3, message: "New user 'Sarah Wilson' registered", time: "3 hours ago", isRead: true },
    { id: 4, message: "Payment for order #ORD-005 failed", time: "5 hours ago", isRead: true },
    { id: 5, message: "System update scheduled for tonight", time: "1 day ago", isRead: true },
  ]

  const unreadCount = notifications.filter((n) => !n.isRead).length

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeDropdowns = () => {
    setShowDropdown(false)
    setShowNotifications(false)
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown-container")) {
        closeDropdowns()
      }
    })

    return () => {
      document.removeEventListener("click", closeDropdowns)
    }
  }, [])

  return (
    <header
      className={`bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6 sticky top-0 z-10 transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-secondary hover:text-primary focus:outline-none transition-colors duration-200"
        aria-label="Toggle menu"
      >
        <MenuIcon />
      </button>

      {/* Brand name for mobile */}
      <div className="md:hidden ml-2 flex items-center">
        <div className="relative overflow-hidden">
          <span className="text-primary font-bold text-lg">PRISHA</span>
          <span className="text-secondary font-bold text-lg">FASHION</span>
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary-light transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></div>
        </div>
      </div>

      {/* Search bar */}
      <div className={`${showSearch ? "flex" : "hidden"} md:flex items-center ml-4 flex-1 max-w-xs`}>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <SearchIcon />
          </div>
          <input type="text" className="input pl-10" placeholder="Search..." />
        </div>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        {/* Mobile search toggle */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="md:hidden text-secondary hover:text-primary focus:outline-none transition-colors duration-200"
          aria-label="Toggle search"
        >
          <SearchIcon />
        </button>

        {/* Quick add button (mobile) */}
        <div className="md:hidden dropdown-container">
          <button
            onClick={(e) => {
              e.stopPropagation()
              const event = new CustomEvent("openQuickAddModal")
              window.dispatchEvent(event)
            }}
            className="text-secondary hover:text-primary focus:outline-none transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
            aria-label="Quick add"
          >
            <PlusIcon />
          </button>
        </div>

        {/* Notifications */}
        <div className="relative dropdown-container">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowNotifications(!showNotifications)
              setShowDropdown(false)
            }}
            className="text-secondary hover:text-primary focus:outline-none transition-colors duration-200 relative p-1 rounded-full hover:bg-gray-100"
            aria-label="Notifications"
          >
            <BellIcon />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-200 animate-slide-down">
              <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-sm font-semibold">Notifications</h3>
                <button className="text-xs text-primary hover:underline">Mark all as read</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 ${
                      !notification.isRead ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 ${!notification.isRead ? "bg-primary" : "bg-gray-300"}`}
                      ></div>
                      <div>
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 text-center border-t border-gray-100">
                <button className="text-primary text-sm hover:underline">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User dropdown */}
        <div className="relative dropdown-container">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowDropdown(!showDropdown)
              setShowNotifications(false)
            }}
            className="flex items-center focus:outline-none"
            aria-label="User menu"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center text-white font-semibold shadow-md hover:shadow-lg transition-shadow duration-200">
              JD
            </div>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-200 animate-slide-down">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center"
                onClick={() => setShowDropdown(false)}
              >
                <UserIcon className="w-4 h-4 mr-2" /> Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center"
                onClick={() => setShowDropdown(false)}
              >
                <SettingsIcon className="w-4 h-4 mr-2" /> Settings
              </Link>
              <div className="border-t border-gray-100"></div>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center"
              >
                <LogOutIcon className="w-4 h-4 mr-2" /> Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
