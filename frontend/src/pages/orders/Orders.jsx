"use client"

import { useState, useEffect } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Table from "../../components/ui/Table"
import Modal from "../../components/ui/Modal"
import Pagination from "../../components/ui/Pagination"
import Alert from "../../components/ui/Alert"
import { SearchIcon, FilterIcon, EyeIcon } from "../../components/Icons/Icons"

// Demo orders data
const demoOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john.doe@example.com",
    date: "2023-04-15",
    amount: "$120.50",
    payment: "Paid",
    status: "Delivered",
    items: [{ id: 1, name: "Wireless Headphones", price: "$129.99", quantity: 1 }],
    address: "123 Main St, New York, NY 10001",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    date: "2023-04-14",
    amount: "$85.25",
    payment: "Paid",
    status: "Processing",
    items: [
      { id: 5, name: "USB-C Cable", price: "$14.99", quantity: 1 },
      { id: 8, name: "Coffee Mug", price: "$12.99", quantity: 2 },
    ],
    address: "456 Oak Ave, San Francisco, CA 94102",
    phone: "+1 (555) 987-6543",
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    email: "robert.johnson@example.com",
    date: "2023-04-14",
    amount: "$220.00",
    payment: "Paid",
    status: "Shipped",
    items: [
      { id: 2, name: "Smart Watch", price: "$199.99", quantity: 1 },
      { id: 5, name: "USB-C Cable", price: "$14.99", quantity: 1 },
    ],
    address: "789 Pine St, Chicago, IL 60601",
    phone: "+1 (555) 456-7890",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    email: "emily.davis@example.com",
    date: "2023-04-13",
    amount: "$65.99",
    payment: "Paid",
    status: "Delivered",
    items: [
      { id: 8, name: "Coffee Mug", price: "$12.99", quantity: 1 },
      { id: 7, name: "Desk Lamp", price: "$39.99", quantity: 1 },
    ],
    address: "321 Maple Rd, Boston, MA 02108",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "ORD-005",
    customer: "Michael Brown",
    email: "michael.brown@example.com",
    date: "2023-04-12",
    amount: "$145.75",
    payment: "Failed",
    status: "Cancelled",
    items: [
      { id: 3, name: "Bluetooth Speaker", price: "$79.99", quantity: 1 },
      { id: 4, name: "Laptop Sleeve", price: "$29.99", quantity: 1 },
      { id: 5, name: "USB-C Cable", price: "$14.99", quantity: 1 },
    ],
    address: "654 Cedar Ln, Seattle, WA 98101",
    phone: "+1 (555) 876-5432",
  },
  {
    id: "ORD-006",
    customer: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    date: "2023-04-11",
    amount: "$95.50",
    payment: "Paid",
    status: "Delivered",
    items: [
      { id: 4, name: "Laptop Sleeve", price: "$29.99", quantity: 1 },
      { id: 12, name: "Phone Case", price: "$19.99", quantity: 1 },
      { id: 15, name: "Water Bottle", price: "$15.99", quantity: 1 },
    ],
    address: "987 Birch Dr, Austin, TX 78701",
    phone: "+1 (555) 345-6789",
  },
  {
    id: "ORD-007",
    customer: "David Taylor",
    email: "david.taylor@example.com",
    date: "2023-04-10",
    amount: "$180.25",
    payment: "Pending",
    status: "Processing",
    items: [
      { id: 6, name: "Wireless Mouse", price: "$49.99", quantity: 1 },
      { id: 11, name: "Backpack", price: "$59.99", quantity: 1 },
      { id: 14, name: "Yoga Mat", price: "$24.99", quantity: 1 },
    ],
    address: "246 Elm St, Denver, CO 80202",
    phone: "+1 (555) 654-3210",
  },
  {
    id: "ORD-008",
    customer: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    date: "2023-04-09",
    amount: "$55.99",
    payment: "Paid",
    status: "Shipped",
    items: [{ id: 13, name: "Portable Charger", price: "$49.99", quantity: 1 }],
    address: "135 Spruce Ave, Miami, FL 33101",
    phone: "+1 (555) 789-0123",
  },
  {
    id: "ORD-009",
    customer: "James Wilson",
    email: "james.wilson@example.com",
    date: "2023-04-08",
    amount: "$89.97",
    payment: "Paid",
    status: "Delivered",
    items: [
      { id: 8, name: "Coffee Mug", price: "$12.99", quantity: 3 },
      { id: 15, name: "Water Bottle", price: "$15.99", quantity: 1 },
    ],
    address: "753 Oak St, Portland, OR 97201",
    phone: "+1 (555) 321-6547",
  },
  {
    id: "ORD-010",
    customer: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    date: "2023-04-07",
    amount: "$249.98",
    payment: "Paid",
    status: "Delivered",
    items: [
      { id: 2, name: "Smart Watch", price: "$199.99", quantity: 1 },
      { id: 15, name: "Water Bottle", price: "$15.99", quantity: 1 },
      { id: 12, name: "Phone Case", price: "$19.99", quantity: 1 },
    ],
    address: "951 Pine Ave, Atlanta, GA 30301",
    phone: "+1 (555) 159-7532",
  },
  {
    id: "ORD-011",
    customer: "Thomas Martin",
    email: "thomas.martin@example.com",
    date: "2023-04-06",
    amount: "$159.98",
    payment: "Paid",
    status: "Shipped",
    items: [{ id: 3, name: "Bluetooth Speaker", price: "$79.99", quantity: 2 }],
    address: "357 Maple Dr, Philadelphia, PA 19101",
    phone: "+1 (555) 753-9512",
  },
  {
    id: "ORD-012",
    customer: "Jessica Brown",
    email: "jessica.brown@example.com",
    date: "2023-04-05",
    amount: "$109.97",
    payment: "Paid",
    status: "Delivered",
    items: [
      { id: 7, name: "Desk Lamp", price: "$39.99", quantity: 1 },
      { id: 14, name: "Yoga Mat", price: "$24.99", quantity: 1 },
      { id: 15, name: "Water Bottle", price: "$15.99", quantity: 1 },
    ],
    address: "159 Cedar St, Las Vegas, NV 89101",
    phone: "+1 (555) 852-7413",
  },
]

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [paymentFilter, setPaymentFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  const [showFilters, setShowFilters] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  // Load demo orders on component mount
  useEffect(() => {
    setOrders(demoOrders)
    setFilteredOrders(demoOrders)
  }, [])

  // Apply filters and search
  useEffect(() => {
    let result = [...orders]

    // Apply search
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(search) ||
          order.customer.toLowerCase().includes(search) ||
          order.email.toLowerCase().includes(search),
      )
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((order) => order.status === statusFilter)
    }

    // Apply payment filter
    if (paymentFilter) {
      result = result.filter((order) => order.payment === paymentFilter)
    }

    // Apply date filter
    if (dateFilter) {
      result = result.filter((order) => {
        const orderDate = new Date(order.date)
        const today = new Date()

        if (dateFilter === "today") {
          return orderDate.toDateString() === today.toDateString()
        } else if (dateFilter === "yesterday") {
          const yesterday = new Date(today)
          yesterday.setDate(yesterday.getDate() - 1)
          return orderDate.toDateString() === yesterday.toDateString()
        } else if (dateFilter === "thisWeek") {
          const startOfWeek = new Date(today)
          startOfWeek.setDate(today.getDate() - today.getDay())
          return orderDate >= startOfWeek
        } else if (dateFilter === "thisMonth") {
          return orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear()
        }
        return true
      })
    }

    setFilteredOrders(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, statusFilter, paymentFilter, dateFilter, orders])

  // Get current orders for pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  const showAlert = (message) => {
    setAlertMessage(message)

    // Clear alert after 5 seconds
    setTimeout(() => {
      setAlertMessage("")
    }, 5000)
  }

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))

    setOrders(updatedOrders)

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }

    showAlert(`Order ${orderId} status updated to ${newStatus}`)
  }

  const openDetailsModal = (order) => {
    setSelectedOrder(order)
    setIsDetailsModalOpen(true)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter("")
    setPaymentFilter("")
    setDateFilter("")
    setShowFilters(false)
  }

  const columns = [
    { key: "id", header: "Order ID" },
    {
      key: "customer",
      header: "Customer",
      render: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3 shadow-sm">
            {row.customer.charAt(0)}
          </div>
          <div>
            <div>{row.customer}</div>
            <div className="text-xs text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    { key: "date", header: "Date" },
    { key: "amount", header: "Amount" },
    {
      key: "payment",
      header: "Payment",
      render: (row) => {
        const paymentColors = {
          Paid: "bg-green-100 text-green-800",
          Pending: "bg-yellow-100 text-yellow-800",
          Failed: "bg-red-100 text-red-800",
        }

        return <span className={`badge ${paymentColors[row.payment]}`}>{row.payment}</span>
      },
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const statusColors = {
          Delivered: "bg-green-100 text-green-800",
          Processing: "bg-yellow-100 text-yellow-800",
          Shipped: "bg-blue-100 text-blue-800",
          Cancelled: "bg-red-100 text-red-800",
        }

        return <span className={`badge ${statusColors[row.status]}`}>{row.status}</span>
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/10"
          icon={<EyeIcon />}
          onClick={(e) => {
            e.stopPropagation()
            openDetailsModal(row)
          }}
        >
          View
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {alertMessage && <Alert type="success" message={alertMessage} />}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-secondary">Orders</h1>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              className="input pl-10 shadow-sm"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            icon={<FilterIcon />}
            className={showFilters ? "bg-gray-100" : ""}
          >
            Filters
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="p-4 animate-slide-down">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input shadow-sm"
              >
                <option value="">All Statuses</option>
                <option value="Delivered">Delivered</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label htmlFor="paymentFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Payment
              </label>
              <select
                id="paymentFilter"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="input shadow-sm"
              >
                <option value="">All Payments</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            <div>
              <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <select
                id="dateFilter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="input shadow-sm"
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
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
          <Table columns={columns} data={currentOrders} onRowClick={openDetailsModal} />

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders found. Try adjusting your filters.</p>
            </div>
          )}

          {filteredOrders.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
      </Card>

      {/* Order Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title={`Order Details - ${selectedOrder?.id}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <div className="mt-1">
                  <span
                    className={`badge ${
                      selectedOrder.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : selectedOrder.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedOrder.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 sm:mt-0">
                <label htmlFor="changeStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Change Status
                </label>
                <div className="flex">
                  <select
                    id="changeStatus"
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    className="input shadow-sm"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Customer</h3>
                <p className="mt-1">{selectedOrder.customer}</p>
                <p className="text-sm text-gray-500">{selectedOrder.email}</p>
                <p className="text-sm text-gray-500">{selectedOrder.phone}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Shipping Address</h3>
                <p className="mt-1">{selectedOrder.address}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Info</h3>
                <p className="mt-1">Date: {selectedOrder.date}</p>
                <p className="text-sm">
                  Payment:{" "}
                  <span
                    className={`badge ${
                      selectedOrder.payment === "Paid"
                        ? "bg-green-100 text-green-800"
                        : selectedOrder.payment === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedOrder.payment}
                  </span>
                </p>
                <p className="text-sm">Total: {selectedOrder.amount}</p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Order Items</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{item.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{item.quantity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${(Number.parseFloat(item.price.replace(/[^\d.]/g, "")) * item.quantity).toFixed(2)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                        Total:
                      </td>
                      <td className="px-6 py-3 text-sm font-medium text-gray-900">{selectedOrder.amount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => window.print()}>
                Print Invoice
              </Button>
              <Button>Send Email</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Orders
