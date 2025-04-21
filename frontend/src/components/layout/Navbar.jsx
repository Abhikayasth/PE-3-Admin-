"use client"

import { useState } from "react"
import { MenuIcon, BellIcon, SearchIcon, LogOutIcon } from "../Icons/Icons"

const Navbar = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, message: "New order received", time: "5 minutes ago" },
    { id: 2, message: "Product stock low", time: "1 hour ago" },
    { id: 3, message: "New user registered", time: "3 hours ago" },
  ]

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6 shadow-nav sticky top-0 z-10">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-secondary hover:text-primary focus:outline-none transition-colors duration-200"
      >
        <MenuIcon />
      </button>

      {/* Search bar */}
      <div className="hidden md:flex items-center ml-4 flex-1 max-w-xs">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <SearchIcon />
          </div>
          <input type="text" className="input pl-10" placeholder="Search..." />
        </div>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-secondary hover:text-primary focus:outline-none transition-colors duration-200 relative"
          >
            <BellIcon />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 animate-slide-down">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="text-sm font-semibold">Notifications</h3>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100"
                  >
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
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
        <div className="relative">
          <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold shadow-md hover:shadow-lg transition-shadow duration-200">
              JD
            </div>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 animate-slide-down">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              >
                Settings
              </a>
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
