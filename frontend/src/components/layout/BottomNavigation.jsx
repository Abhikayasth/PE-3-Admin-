"use client"

import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { HomeIcon, PackageIcon, ShoppingCartIcon, SettingsIcon, PlusIcon, BoxIcon } from "../Icons/Icons"
import Modal from "../ui/Modal"
import ProductForm from "../../pages/Products/components/ProductForm"

const BottomNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "Products", path: "/products", icon: <PackageIcon /> },
    { name: "Orders", path: "/orders", icon: <ShoppingCartIcon /> },
    { name: "Inventory", path: "/inventory", icon: <BoxIcon /> },
    { name: "Settings", path: "/settings", icon: <SettingsIcon /> },
  ]

  // Listen for the custom event to open the modal
  useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true)
    }

    window.addEventListener("openQuickAddModal", handleOpenModal)

    return () => {
      window.removeEventListener("openQuickAddModal", handleOpenModal)
    }
  }, [])

  const handleAddProduct = (product) => {
    // In a real app, you would add the product to your state or database
    console.log("New product:", product)
    setIsModalOpen(false)

    // Show a toast notification
    const event = new CustomEvent("showToast", {
      detail: {
        message: "Product added successfully!",
        type: "success",
      },
    })
    window.dispatchEvent(event)
  }

  return (
    <>
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
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Add new product"
            >
              <PlusIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Add Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Product"
        size="lg"
        footer={
          <>
            <button
              className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="product-form"
              className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Add Product
            </button>
          </>
        }
      >
        <ProductForm onSubmit={handleAddProduct} />
      </Modal>
    </>
  )
}

export default BottomNav
