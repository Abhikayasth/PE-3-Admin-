"use client"

import { useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Table from "../../components/ui/Table"
import Modal from "../../components/ui/Modal"
import { PlusIcon, SearchIcon } from "../../components/Icons/Icons"
import ProductForm from "./components/ProductForm"

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: "$129.99", stock: 45, status: "Active" },
    { id: 2, name: "Smart Watch", category: "Electronics", price: "$199.99", stock: 28, status: "Active" },
    { id: 3, name: "Bluetooth Speaker", category: "Electronics", price: "$79.99", stock: 0, status: "Out of Stock" },
    { id: 4, name: "Laptop Sleeve", category: "Accessories", price: "$29.99", stock: 120, status: "Active" },
    { id: 5, name: "USB-C Cable", category: "Accessories", price: "$14.99", stock: 85, status: "Active" },
    { id: 6, name: "Wireless Mouse", category: "Electronics", price: "$49.99", stock: 0, status: "Out of Stock" },
    { id: 7, name: "Desk Lamp", category: "Home", price: "$39.99", stock: 32, status: "Active" },
    { id: 8, name: "Coffee Mug", category: "Home", price: "$12.99", stock: 65, status: "Active" },
  ])

  const columns = [
    {
      key: "name",
      header: "Product Name",
      render: (row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 mr-3 shadow-sm">
            P
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-xs text-gray-500">{row.category}</div>
          </div>
        </div>
      ),
    },
    { key: "price", header: "Price" },
    { key: "stock", header: "Stock" },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const statusColors = {
          Active: "bg-green-100 text-green-800",
          "Out of Stock": "bg-red-100 text-red-800",
          Discontinued: "bg-gray-100 text-gray-800",
        }

        return <span className={`badge ${statusColors[row.status]}`}>{row.status}</span>
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Edit</button>
          <button className="text-red-600 hover:text-red-800 transition-colors duration-200">Delete</button>
        </div>
      ),
    },
  ]

  const handleAddProduct = (product) => {
    const newProduct = {
      id: products.length + 1,
      ...product,
      status: product.stock > 0 ? "Active" : "Out of Stock",
    }

    setProducts([...products, newProduct])
    setIsModalOpen(false)
    setSuccessMessage("Product added successfully!")

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md animate-slide-down">
          <p>{successMessage}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-secondary">Products</h1>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <SearchIcon />
            </div>
            <input type="text" className="input pl-10 shadow-sm" placeholder="Search products..." />
          </div>

          <Button onClick={() => setIsModalOpen(true)} icon={<PlusIcon />}>
            Add Product
          </Button>
        </div>
      </div>

      <Card hover>
        <Table columns={columns} data={products} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Product"
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="product-form">
              Add Product
            </Button>
          </>
        }
      >
        <ProductForm onSubmit={handleAddProduct} />
      </Modal>
    </div>
  )
}

export default Products
