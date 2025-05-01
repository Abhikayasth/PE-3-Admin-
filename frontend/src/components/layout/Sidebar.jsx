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
  BoxIcon,
} from "../Icons/Icons"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: "Dashboard", path: "/", icon: <HomeIcon /> },
    { name: "Products", path: "/products", icon: <PackageIcon /> },
    { name: "Orders", path: "/orders", icon: <ShoppingCartIcon /> },
    { name: "Inventory", path: "/inventory", icon: <BoxIcon /> },
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
          <div className="flex items-center group cursor-pointer">
            <span className="text-primary font-bold text-2xl">PRISHA</span>
            <span className="text-white font-bold text-2xl">FASHION</span>
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        ) : (
          <div className="mx-auto">
            <span className="text-primary font-bold text-2xl">P</span>
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
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  nav-link relative overflow-hidden ${isActive ? "nav-link-active" : "nav-link-inactive"}
                  ${!isOpen && "justify-center"}
                  group
                `}
              >
                <span className="text-xl relative z-10">{item.icon}</span>
                {isOpen && <span className="ml-3 font-medium relative z-10">{item.name}</span>}
                <div className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0 opacity-0 group-hover:opacity-10"></div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User info */}
      {isOpen && (
        <div className="p-4 border-t border-secondary-light">
          <NavLink
            to="/profile"
            className={({ isActive }) => `
              flex items-center p-2 rounded-md transition-colors duration-200 group
              ${isActive ? "bg-primary text-white" : "text-gray-300 hover:bg-secondary-light hover:text-white"}
            `}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center text-white font-semibold shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
              JD
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </NavLink>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
