"use client"

import Table from "../../../components/ui/Table"

const RecentOrders = () => {
  const orders = [
    { id: "ORD-001", customer: "John Doe", date: "2023-04-15", amount: "$120.50", status: "Delivered" },
    { id: "ORD-002", customer: "Jane Smith", date: "2023-04-14", amount: "$85.25", status: "Processing" },
    { id: "ORD-003", customer: "Robert Johnson", date: "2023-04-14", amount: "$220.00", status: "Shipped" },
    { id: "ORD-004", customer: "Emily Davis", date: "2023-04-13", amount: "$65.99", status: "Delivered" },
    { id: "ORD-005", customer: "Michael Brown", date: "2023-04-12", amount: "$145.75", status: "Processing" },
  ]

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
    {
      key: "date",
      header: "Date",
      render: (row) => <span>{row.date}</span>,
    },
    {
      key: "amount",
      header: "Amount",
      render: (row) => <span className="font-medium text-primary">{row.amount}</span>,
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
        <button className="text-primary hover:text-primary-dark transition-colors duration-200 text-sm">View</button>
      ),
    },
  ]

  return <Table columns={columns} data={orders} onRowClick={(row) => console.log("Clicked row:", row)} />
}

export default RecentOrders
