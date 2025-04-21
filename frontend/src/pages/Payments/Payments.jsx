"use client"

import { useState } from "react"
import Card from "../../components/ui/Card"
import Table from "../../components/ui/Table"
import { SearchIcon } from "../../components/Icons/Icons"

const Payments = () => {
  const [payments] = useState([
    {
      id: "TRX-001",
      customer: "John Doe",
      date: "2023-04-15",
      amount: "$120.50",
      method: "Credit Card",
      status: "Successful",
    },
    {
      id: "TRX-002",
      customer: "Jane Smith",
      date: "2023-04-14",
      amount: "$85.25",
      method: "PayPal",
      status: "Successful",
    },
    {
      id: "TRX-003",
      customer: "Robert Johnson",
      date: "2023-04-14",
      amount: "$220.00",
      method: "Credit Card",
      status: "Successful",
    },
    {
      id: "TRX-004",
      customer: "Emily Davis",
      date: "2023-04-13",
      amount: "$65.99",
      method: "Bank Transfer",
      status: "Pending",
    },
    {
      id: "TRX-005",
      customer: "Michael Brown",
      date: "2023-04-12",
      amount: "$145.75",
      method: "Credit Card",
      status: "Failed",
    },
    {
      id: "TRX-006",
      customer: "Sarah Wilson",
      date: "2023-04-11",
      amount: "$95.50",
      method: "PayPal",
      status: "Successful",
    },
    {
      id: "TRX-007",
      customer: "David Taylor",
      date: "2023-04-10",
      amount: "$180.25",
      method: "Credit Card",
      status: "Successful",
    },
    {
      id: "TRX-008",
      customer: "Lisa Anderson",
      date: "2023-04-09",
      amount: "$55.99",
      method: "Bank Transfer",
      status: "Pending",
    },
  ])

  const columns = [
    { key: "id", header: "Transaction ID" },
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
      key: "method",
      header: "Payment Method",
      render: (row) => {
        const methodIcons = {
          "Credit Card": "💳",
          PayPal: "Ⓟ",
          "Bank Transfer": "🏦",
        }

        return (
          <div className="flex items-center">
            <span className="mr-2">{methodIcons[row.method]}</span>
            <span>{row.method}</span>
          </div>
        )
      },
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const statusColors = {
          Successful: "bg-green-100 text-green-800",
          Pending: "bg-yellow-100 text-yellow-800",
          Failed: "bg-red-100 text-red-800",
        }

        return <span className={`badge ${statusColors[row.status]}`}>{row.status}</span>
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <button className="text-primary hover:text-primary-dark transition-colors duration-200 text-sm">View</button>
          {row.status === "Successful" && (
            <button className="text-secondary hover:text-secondary-light transition-colors duration-200 text-sm">
              Refund
            </button>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-secondary">Payments</h1>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <SearchIcon />
            </div>
            <input type="text" className="input pl-10 shadow-sm" placeholder="Search transactions..." />
          </div>

          <select className="input shadow-sm">
            <option value="">All Statuses</option>
            <option value="successful">Successful</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <Card hover>
        <Table columns={columns} data={payments} />
      </Card>
    </div>
  )
}

export default Payments
