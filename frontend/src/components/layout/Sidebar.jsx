"use client"

import { NavLink } from "react-router-dom"
import {
  HomeIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
  CreditCardIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../Icons/Icons"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: "Dashboard", path: "/", icon: <HomeIcon /> },
    { name: "Products", path: "/products", icon: <PackageIcon /> },
    { name: "Orders", path: "/orders", icon: <ShoppingCartIcon /> },
    { name: "Users", path: "/users", icon: <UsersIcon /> },
    { name: "Payments", path: "/payments", icon: <CreditCardIcon /> },
    { name: "Settings", path: "/settings", icon: <SettingsIcon /> },
  ]

  return (
    <aside
      className={`bg-secondary text-white transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col shadow-xl z-20`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-secondary-light">
        {isOpen ? (
          <div className="flex items-center">
            <span className="text-primary font-bold text-2xl">ADMIN</span>
            <span className="text-white font-bold text-2xl">PANEL</span>
          </div>
        ) : (
          <div className="mx-auto">
            <span className="text-primary font-bold text-2xl">A</span>
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-white focus:outline-none transition-colors duration-200"
        >
          {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}
                  ${!isOpen && "justify-center"}
                `}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span className="ml-3 font-medium">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User info */}
      {isOpen && (
        <div className="p-4 border-t border-secondary-light">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold shadow-md">
              JD
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
