import { NavLink } from "react-router-dom"
import { HomeIcon, PackageIcon, ShoppingCartIcon, UsersIcon, SettingsIcon, PlusIcon } from "../Icons/Icons"

const BottomNav = () => {
  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "Products", path: "/products", icon: <PackageIcon /> },
    { name: "Orders", path: "/orders", icon: <ShoppingCartIcon /> },
    { name: "Users", path: "/users", icon: <UsersIcon /> },
    { name: "Settings", path: "/settings", icon: <SettingsIcon /> },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 shadow-lg">
      <div className="flex justify-around items-center h-16 px-4 relative">
        {navItems.map((item, index) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center text-xs
              ${isActive ? "text-primary" : "text-gray-500 hover:text-primary"}
              ${index === 2 ? "invisible" : ""}
              transition-colors duration-200
            `}
          >
            <span className="text-lg mb-1">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}

        {/* FAB Button */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <button className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-dark transition-all duration-200 hover:scale-110 active:scale-95">
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BottomNav
