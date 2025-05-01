"use client"

import { useState, useEffect } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Table from "../../components/ui/Table"
import Modal from "../../components/ui/Modal"
import Alert from "../../components/ui/Alert"
import Pagination from "../../components/ui/Pagination"
import { SearchIcon, FilterIcon, AlertIcon } from "../../components/Icons/Icons"

// Demo inventory data based on products
const generateInventoryData = (products) => {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku || `SKU-${product.id}`,
    stock: product.stock,
    category: product.category,
    lowStockAlert: product.stock < 10,
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    location: ["Warehouse A", "Warehouse B", "Warehouse C"][Math.floor(Math.random() * 3)],
    status: product.stock > 0 ? "In Stock" : "Out of Stock",
  }))
}

// Demo products data
const demoProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$129.99",
    stock: 45,
    status: "Active",
    sku: "WH-BT100",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: "$199.99",
    stock: 28,
    status: "Active",
    sku: "SW-200",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: "$79.99",
    stock: 0,
    status: "Out of Stock",
    sku: "BS-300",
  },
  {
    id: 4,
    name: "Laptop Sleeve",
    category: "Accessories",
    price: "$29.99",
    stock: 120,
    status: "Active",
    sku: "LS-400",
  },
  {
    id: 5,
    name: "USB-C Cable",
    category: "Accessories",
    price: "$14.99",
    stock: 85,
    status: "Active",
    sku: "UC-500",
  },
  {
    id: 6,
    name: "Wireless Mouse",
    category: "Electronics",
    price: "$49.99",
    stock: 0,
    status: "Out of Stock",
    sku: "WM-600",
  },
  {
    id: 7,
    name: "Desk Lamp",
    category: "Home",
    price: "$39.99",
    stock: 5,
    status: "Active",
    sku: "DL-700",
  },
  {
    id: 8,
    name: "Coffee Mug",
    category: "Home",
    price: "$12.99",
    stock: 65,
    status: "Active",
    sku: "CM-800",
  },
  {
    id: 9,
    name: "Fitness Tracker",
    category: "Electronics",
    price: "$89.99",
    stock: 8,
    status: "Active",
    sku: "FT-900",
  },
  {
    id: 10,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: "$69.99",
    stock: 38,
    status: "Active",
    sku: "WE-1000",
  },
  {
    id: 11,
    name: "Backpack",
    category: "Accessories",
    price: "$59.99",
    stock: 25,
    status: "Active",
    sku: "BP-1100",
  },
  {
    id: 12,
    name: "Phone Case",
    category: "Accessories",
    price: "$19.99",
    stock: 3,
    status: "Active",
    sku: "PC-1200",
  },
]

const Inventory = () => {
  const [inventory, setInventory] = useState([])
  const [filteredInventory, setFilteredInventory] = useState([])
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [adjustmentQuantity, setAdjustmentQuantity] = useState(0)
  const [adjustmentReason, setAdjustmentReason] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  const [showFilters, setShowFilters] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertType, setAlertType] = useState("success")
  const [showLowStockOnly, setShowLowStockOnly] = useState(false)

  // Load demo inventory on component mount
  useEffect(() => {
    const inventoryData = generateInventoryData(demoProducts)
    setInventory(inventoryData)
    setFilteredInventory(inventoryData)
  }, [])

  // Apply filters and search
  useEffect(() => {
    let result = [...inventory]

    // Apply search
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.sku.toLowerCase().includes(search) ||
          item.category.toLowerCase().includes(search),
      )
    }

    // Apply category filter
    if (categoryFilter) {
      result = result.filter((item) => item.category === categoryFilter)
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((item) => item.status === statusFilter)
    }

    // Apply low stock filter
    if (showLowStockOnly) {
      result = result.filter((item) => item.lowStockAlert)
    }

    setFilteredInventory(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, categoryFilter, statusFilter, showLowStockOnly, inventory])

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage)

  const showAlert = (message, type = "success") => {
    setAlertMessage(message)
    setAlertType(type)

    // Clear alert after 5 seconds
    setTimeout(() => {
      setAlertMessage("")
    }, 5000)
  }

  const openAdjustModal = (item) => {
    setSelectedItem(item)
    setAdjustmentQuantity(0)
    setAdjustmentReason("")
    setIsAdjustModalOpen(true)
  }

  const handleAdjustStock = () => {
    if (!adjustmentReason) {
      showAlert("Please provide a reason for the adjustment", "error")
      return
    }

    const updatedInventory = inventory.map((item) => {
      if (item.id === selectedItem.id) {
        const newStock = item.stock + Number.parseInt(adjustmentQuantity)
        return {
          ...item,
          stock: newStock >= 0 ? newStock : 0,
          lowStockAlert: newStock < 10,
          status: newStock > 0 ? "In Stock" : "Out of Stock",
          lastUpdated: new Date().toISOString().split("T")[0],
        }
      }
      return item
    })

    setInventory(updatedInventory)
    setIsAdjustModalOpen(false)
    showAlert(`Stock for ${selectedItem.name} has been adjusted successfully`)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setCategoryFilter("")
    setStatusFilter("")
    setShowLowStockOnly(false)
    setShowFilters(false)
  }

  // Get unique categories for filter dropdown
  const categories = [...new Set(inventory.map((item) => item.category))]

  // Count low stock items
  const lowStockCount = inventory.filter((item) => item.lowStockAlert).length

  const columns = [
    {
      key: "name",
      header: "Product",
      render: (row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400 mr-3 shadow-sm">
            {row.name.charAt(0)}
          </div>
          <div>
            <div className="font-medium dark:text-white">{row.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{row.sku}</div>
          </div>
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (row) => (
        <div className="flex items-center">
          <span className={`font-medium ${row.lowStockAlert ? "text-red-500 dark:text-red-400" : "dark:text-white"}`}>
            {row.stock}
          </span>
          {row.lowStockAlert && (
            <span className="ml-2 text-red-500 dark:text-red-400">
              <AlertIcon className="w-4 h-4" />
            </span>
          )}
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (row) => <span className="dark:text-gray-300">{row.category}</span>,
    },
    {
      key: "location",
      header: "Location",
      render: (row) => <span className="dark:text-gray-300">{row.location}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const statusColors = {
          "In Stock": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
          "Out of Stock": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
          "Low Stock": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        }

        const displayStatus = row.lowStockAlert && row.stock > 0 ? "Low Stock" : row.status

        return <span className={`badge ${statusColors[displayStatus]}`}>{displayStatus}</span>
      },
    },
    {
      key: "lastUpdated",
      header: "Last Updated",
      render: (row) => <span className="dark:text-gray-300">{row.lastUpdated}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            openAdjustModal(row)
          }}
        >
          Adjust Stock
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {alertMessage && <Alert type={alertType} message={alertMessage} />}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Inventory Management</h1>
          {lowStockCount > 0 && (
            <p className="text-red-500 dark:text-red-400 mt-1 flex items-center">
              <AlertIcon className="w-4 h-4 mr-1" /> {lowStockCount} items are low on stock
            </p>
          )}
        </div>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              className="input pl-10 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Search inventory..."
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

          <Button
            onClick={() => setShowLowStockOnly(!showLowStockOnly)}
            variant={showLowStockOnly ? "primary" : "outline"}
            icon={<AlertIcon />}
          >
            Low Stock
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
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
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

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 12V8H6a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h14v4"></path>
                <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Items</p>
              <p className="text-xl font-bold dark:text-white">{inventory.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">In Stock</p>
              <p className="text-xl font-bold dark:text-white">{inventory.filter((item) => item.stock > 0).length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Low Stock</p>
              <p className="text-xl font-bold dark:text-white">{lowStockCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Out of Stock</p>
              <p className="text-xl font-bold dark:text-white">{inventory.filter((item) => item.stock === 0).length}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card hover>
        <div className="overflow-hidden">
          <Table columns={columns} data={currentItems} onRowClick={openAdjustModal} />

          {filteredInventory.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No inventory items found. Try adjusting your filters.</p>
            </div>
          )}

          {filteredInventory.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
      </Card>

      {/* Stock Adjustment Modal */}
      <Modal
        isOpen={isAdjustModalOpen}
        onClose={() => setIsAdjustModalOpen(false)}
        title="Adjust Stock"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAdjustModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdjustStock}>Save Changes</Button>
          </>
        }
      >
        {selectedItem && (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400 mr-4 shadow-sm">
                {selectedItem.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white">{selectedItem.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Current Stock: <span className="font-medium">{selectedItem.stock}</span>
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="adjustmentQuantity"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Adjustment Quantity
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setAdjustmentQuantity((prev) => Number.parseInt(prev) - 1)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-l-md border border-gray-300 dark:border-gray-600"
                >
                  -
                </button>
                <input
                  type="number"
                  id="adjustmentQuantity"
                  value={adjustmentQuantity}
                  onChange={(e) => setAdjustmentQuantity(e.target.value)}
                  className="input rounded-none border-l-0 border-r-0 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setAdjustmentQuantity((prev) => Number.parseInt(prev) + 1)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-r-md border border-gray-300 dark:border-gray-600"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                New Stock:{" "}
                <span className="font-medium">
                  {Math.max(0, selectedItem.stock + Number.parseInt(adjustmentQuantity || 0))}
                </span>
              </p>
            </div>

            <div>
              <label
                htmlFor="adjustmentReason"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Reason for Adjustment*
              </label>
              <select
                id="adjustmentReason"
                value={adjustmentReason}
                onChange={(e) => setAdjustmentReason(e.target.value)}
                className="input shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Select a reason</option>
                <option value="New Stock">New Stock</option>
                <option value="Damaged">Damaged</option>
                <option value="Lost">Lost</option>
                <option value="Returned">Returned</option>
                <option value="Correction">Inventory Correction</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                rows="3"
                className="input shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Add any additional notes here..."
              ></textarea>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Inventory
