"use client"

import { useState, useEffect } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Table from "../../components/ui/Table"
import Modal from "../../components/ui/Modal"
import Alert from "../../components/ui/Alert"
import Pagination from "../../components/ui/Pagination"
import ConfirmDialog from "../../components/ui/ConfirmDialog"
import { PlusIcon, SearchIcon, FilterIcon, TrashIcon } from "../../components/Icons/Icons"
import ProductForm from "./components/ProductForm"
import ProductDetails from "./components/ProductDetails"

// Demo product data
const demoProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$129.99",
    stock: 45,
    status: "Active",
    sku: "WH-BT100",
    brand: "SoundWave",
    description: "Premium wireless headphones with noise cancellation and 20-hour battery life.",
    tags: ["electronics", "audio", "wireless"],
    images: ["/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: "$199.99",
    stock: 28,
    status: "Active",
    sku: "SW-200",
    brand: "TechFit",
    description: "Smart watch with heart rate monitor, GPS, and water resistance.",
    tags: ["electronics", "wearable", "fitness"],
    images: ["/placeholder.svg"],
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: "$79.99",
    stock: 0,
    status: "Out of Stock",
    sku: "BS-300",
    brand: "SoundWave",
    description: "Portable Bluetooth speaker with 360-degree sound and 12-hour battery life.",
    tags: ["electronics", "audio", "portable"],
    images: ["/placeholder.svg"],
  },
  {
    id: 4,
    name: "Laptop Sleeve",
    category: "Accessories",
    price: "$29.99",
    stock: 120,
    status: "Active",
    sku: "LS-400",
    brand: "TechProtect",
    description: "Protective sleeve for laptops up to 15 inches.",
    tags: ["accessories", "laptop", "protection"],
    images: ["/placeholder.svg"],
  },
  {
    id: 5,
    name: "USB-C Cable",
    category: "Accessories",
    price: "$14.99",
    stock: 85,
    status: "Active",
    sku: "UC-500",
    brand: "PowerConnect",
    description: "Durable USB-C cable with fast charging capability.",
    tags: ["accessories", "cable", "charging"],
    images: ["/placeholder.svg"],
  },
  {
    id: 6,
    name: "Wireless Mouse",
    category: "Electronics",
    price: "$49.99",
    stock: 0,
    status: "Out of Stock",
    sku: "WM-600",
    brand: "TechPoint",
    description: "Ergonomic wireless mouse with adjustable DPI.",
    tags: ["electronics", "computer", "wireless"],
    images: ["/placeholder.svg"],
  },
  {
    id: 7,
    name: "Desk Lamp",
    category: "Home",
    price: "$39.99",
    stock: 32,
    status: "Active",
    sku: "DL-700",
    brand: "LightHome",
    description: "LED desk lamp with adjustable brightness and color temperature.",
    tags: ["home", "lighting", "desk"],
    images: ["/placeholder.svg"],
  },
  {
    id: 8,
    name: "Coffee Mug",
    category: "Home",
    price: "$12.99",
    stock: 65,
    status: "Active",
    sku: "CM-800",
    brand: "HomeEssentials",
    description: "Ceramic coffee mug with 12oz capacity.",
    tags: ["home", "kitchen", "drinkware"],
    images: ["/placeholder.svg"],
  },
  {
    id: 9,
    name: "Fitness Tracker",
    category: "Electronics",
    price: "$89.99",
    stock: 42,
    status: "Active",
    sku: "FT-900",
    brand: "TechFit",
    description: "Waterproof fitness tracker with heart rate monitor and sleep tracking.",
    tags: ["electronics", "fitness", "wearable"],
    images: ["/placeholder.svg"],
  },
  {
    id: 10,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: "$69.99",
    stock: 38,
    status: "Active",
    sku: "WE-1000",
    brand: "SoundWave",
    description: "True wireless earbuds with touch controls and charging case.",
    tags: ["electronics", "audio", "wireless"],
    images: ["/placeholder.svg"],
  },
  {
    id: 11,
    name: "Backpack",
    category: "Accessories",
    price: "$59.99",
    stock: 25,
    status: "Active",
    sku: "BP-1100",
    brand: "TravelPro",
    description: "Water-resistant backpack with laptop compartment and multiple pockets.",
    tags: ["accessories", "bag", "travel"],
    images: ["/placeholder.svg"],
  },
  {
    id: 12,
    name: "Phone Case",
    category: "Accessories",
    price: "$19.99",
    stock: 150,
    status: "Active",
    sku: "PC-1200",
    brand: "TechProtect",
    description: "Protective phone case with shock absorption technology.",
    tags: ["accessories", "phone", "protection"],
    images: ["/placeholder.svg"],
  },
  {
    id: 13,
    name: "Portable Charger",
    category: "Electronics",
    price: "$49.99",
    stock: 60,
    status: "Active",
    sku: "PC-1300",
    brand: "PowerBank",
    description: "10000mAh portable charger with dual USB ports.",
    tags: ["electronics", "charging", "portable"],
    images: ["/placeholder.svg"],
  },
  {
    id: 14,
    name: "Yoga Mat",
    category: "Sports",
    price: "$24.99",
    stock: 40,
    status: "Active",
    sku: "YM-1400",
    brand: "FitLife",
    description: "Non-slip yoga mat with carrying strap.",
    tags: ["sports", "fitness", "yoga"],
    images: ["/placeholder.svg"],
  },
  {
    id: 15,
    name: "Water Bottle",
    category: "Sports",
    price: "$15.99",
    stock: 75,
    status: "Active",
    sku: "WB-1500",
    brand: "HydroLife",
    description: "BPA-free water bottle with 32oz capacity.",
    tags: ["sports", "hydration", "bottle"],
    images: ["/placeholder.svg"],
  },
]

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertType, setAlertType] = useState("success")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  const [showFilters, setShowFilters] = useState(false)

  // Load demo products on component mount
  useEffect(() => {
    setProducts(demoProducts)
    setFilteredProducts(demoProducts)
  }, [])

  // Apply filters and search
  useEffect(() => {
    let result = [...products]

    // Apply search
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(search) ||
          product.sku?.toLowerCase().includes(search) ||
          product.brand?.toLowerCase().includes(search) ||
          product.description?.toLowerCase().includes(search),
      )
    }

    // Apply category filter
    if (categoryFilter) {
      result = result.filter((product) => product.category === categoryFilter)
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((product) => product.status === statusFilter)
    }

    setFilteredProducts(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, categoryFilter, statusFilter, products])

  // Get current products for pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const showAlert = (message, type = "success") => {
    setAlertMessage(message)
    setAlertType(type)

    // Clear alert after 5 seconds
    setTimeout(() => {
      setAlertMessage("")
    }, 5000)
  }

  const handleAddProduct = (product) => {
    const newProduct = {
      id: products.length + 1,
      ...product,
    }

    setProducts([...products, newProduct])
    setIsModalOpen(false)
    showAlert("Product added successfully!")
  }

  const handleEditProduct = (product) => {
    const updatedProducts = products.map((p) => (p.id === selectedProduct.id ? { ...p, ...product } : p))

    setProducts(updatedProducts)
    setIsModalOpen(false)
    showAlert("Product updated successfully!")
  }

  const handleDeleteProduct = () => {
    const updatedProducts = products.filter((p) => p.id !== selectedProduct.id)
    setProducts(updatedProducts)
    setIsDeleteModalOpen(false)
    setIsDetailsModalOpen(false)
    showAlert("Product deleted successfully!")
  }

  const openAddModal = () => {
    setSelectedProduct(null)
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  const openEditModal = (product) => {
    setSelectedProduct(product)
    setIsEditMode(true)
    setIsModalOpen(true)
    setIsDetailsModalOpen(false)
  }

  const openDeleteModal = (product) => {
    setSelectedProduct(product)
    setIsDeleteModalOpen(true)
  }

  const openDetailsModal = (product) => {
    setSelectedProduct(product)
    setIsDetailsModalOpen(true)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setCategoryFilter("")
    setStatusFilter("")
    setShowFilters(false)
  }

  // Get unique categories for filter dropdown
  const categories = [...new Set(products.map((product) => product.category))]

  const columns = [
    {
      key: "name",
      header: "Product Name",
      render: (row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-black dark:text-black mr-3 shadow-sm overflow-hidden">
            {row.images && row.images.length > 0 ? (
              <img src={row.images[0] || "/placeholder.svg"} alt={row.name} className="w-full h-full object-cover" />
            ) : (
              <span>P</span>
            )}
          </div>
          <div>
            <div className="font-medium dark:text-black">{row.name}</div>
            <div className="text-xs text-gray-500 dark:text-orange-400">{row.category}</div>
          </div>
        </div>
      ),
    },
    {
      key: "sku",
      header: "SKU",
      render: (row) => <span className="dark:text-black">{row.sku || "N/A"}</span>,
    },
    {
      key: "price",
      header: "Price",
      render: (row) => <span className="font-medium text-primary dark:text-primary-light">{row.price}</span>,
    },
    {
      key: "stock",
      header: "Stock",
      render: (row) => (
        <span className={`dark:text-black ${row.stock === 0 ? "text-red-500 dark:text-red-400" : ""}`}>
          {row.stock}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const statusColors = {
          Active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-black",
          "Out of Stock": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-black",
          Discontinued: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-black",
        }

        return <span className={`badge ${statusColors[row.status]}`}>{row.status}</span>
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              openEditModal(row)
            }}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              openDeleteModal(row)
            }}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {alertMessage && <Alert type={alertType} message={alertMessage} />}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-secondary dark:text-black">Products</h1>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              className="input pl-10 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            icon={<FilterIcon />}
            className={showFilters ? "bg-gray-100 dark:bg-gray-700" : ""}
          >
            Filters
          </Button>

          <Button onClick={openAddModal} icon={<PlusIcon />}>
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="p-4 animate-slide-down">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="categoryFilter"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Category
              </label>
              <select
                id="categoryFilter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Discontinued">Discontinued</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={resetFilters} className="w-full">
                Reset Filters
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card hover>
        <div className="overflow-hidden">
          <Table columns={columns} data={currentProducts} onRowClick={openDetailsModal} />

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No products found. Try adjusting your filters.</p>
            </div>
          )}

          {filteredProducts.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
      </Card>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? "Edit Product" : "Add New Product"}
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="product-form">
              {isEditMode ? "Save Changes" : "Add Product"}
            </Button>
          </>
        }
      >
        <ProductForm
          onSubmit={isEditMode ? handleEditProduct : handleAddProduct}
          initialData={selectedProduct}
          isEdit={isEditMode}
        />
      </Modal>

      {/* Product Details Modal */}
      <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title="Product Details" size="xl">
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onEdit={() => openEditModal(selectedProduct)}
            onDelete={() => openDeleteModal(selectedProduct)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteProduct}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        icon={<TrashIcon className="w-5 h-5 text-red-500" />}
      />
    </div>
  )
}

export default Products
