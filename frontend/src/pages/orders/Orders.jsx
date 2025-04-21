"use client"

import { useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Table from "../../components/ui/Table"
import { SearchIcon } from "../../components/Icons/Icons"

const Orders = () => {
  const [orders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2023-04-15",
      amount: "$120.50",
      payment: "Paid",
      status: "Delivered",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2023-04-14",
      amount: "$85.25",
      payment: "Paid",
      status: "Processing",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      date: "2023-04-14",
      amount: "$220.00",
      payment: "Paid",
      status: "Shipped",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "2023-04-13",
      amount: "$65.99",
      payment: "Paid",
      status: "Delivered",
    },
    {
      id: "ORD-005",
      customer: "Michael Brown",
      date: "2023-04-12",
      amount: "$145.75",
      payment: "Failed",
      status: "Cancelled",
    },
    {
      id: "ORD-006",
      customer: "Sarah Wilson",
      date: "2023-04-11",
      amount: "$95.50",
      payment: "Paid",
      status: "Delivered",
    },
    {
      id: "ORD-007",
      customer: "David Taylor",
      date: "2023-04-10",
      amount: "$180.25",
      payment: "Pending",
      status: "Processing",
    },
    {
      id: "ORD-008",
      customer: "Lisa Anderson",
      date: "2023-04-09",
      amount: "$55.99",
      payment: "Paid",
      status: "Shipped",
    },
  ])

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
          <div>{row.customer}</div>
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
      render: () => (
        <Button variant="ghost" size="sm" className="hover:bg-primary/10">
          View Details
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-secondary">Orders</h1>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <SearchIcon />
            </div>
            <input type="text" className="input pl-10 shadow-sm" placeholder="Search orders..." />
          </div>

          <select className="input shadow-sm">
            <option value="">All Statuses</option>
            <option value="delivered">Delivered</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <Card hover>
        <Table columns={columns} data={orders} />
      </Card>
    </div>
  )
}

export default Orders
