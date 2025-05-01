"use client"

import { useState } from "react"

const SalesChart = () => {
  const [chartType, setChartType] = useState("weekly")

  // Weekly data
  const weeklyData = [
    { day: "Mon", sales: 1200, orders: 12 },
    { day: "Tue", sales: 1900, orders: 18 },
    { day: "Wed", sales: 1500, orders: 15 },
    { day: "Thu", sales: 2100, orders: 21 },
    { day: "Fri", sales: 2400, orders: 24 },
    { day: "Sat", sales: 1800, orders: 18 },
    { day: "Sun", sales: 1300, orders: 13 },
  ]

  // Monthly data
  const monthlyData = [
    { day: "Jan", sales: 12000, orders: 120 },
    { day: "Feb", sales: 15000, orders: 150 },
    { day: "Mar", sales: 18000, orders: 180 },
    { day: "Apr", sales: 16000, orders: 160 },
    { day: "May", sales: 21000, orders: 210 },
    { day: "Jun", sales: 19000, orders: 190 },
    { day: "Jul", sales: 22000, orders: 220 },
    { day: "Aug", sales: 25000, orders: 250 },
    { day: "Sep", sales: 23000, orders: 230 },
    { day: "Oct", sales: 27000, orders: 270 },
    { day: "Nov", sales: 26000, orders: 260 },
    { day: "Dec", sales: 32000, orders: 320 },
  ]

  const data = chartType === "weekly" ? weeklyData : monthlyData
  const maxSales = Math.max(...data.map((item) => item.sales))

  return (
    <div className="h-64">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-500">Sales Overview</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType("weekly")}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              chartType === "weekly" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setChartType("monthly")}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              chartType === "monthly" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="flex h-full items-end">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center group">
            <div className="relative w-full max-w-[40px] mx-auto">
              {/* Sales bar */}
              <div
                className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t-md transition-all duration-500 ease-out group-hover:shadow-lg relative"
                style={{ height: `${(item.sales / maxSales) * 100}%` }}
              >
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-secondary text-white text-xs py-1 px-2 rounded transition-opacity duration-200 whitespace-nowrap">
                  ${item.sales} / {item.orders} orders
                </div>
              </div>

              {/* Orders dot */}
              <div
                className="absolute w-2 h-2 bg-secondary rounded-full transform -translate-x-1/2 left-1/2"
                style={{ bottom: `${(item.orders / Math.max(...data.map((d) => d.orders))) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs mt-2 text-gray-500">{item.day}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gradient-to-t from-primary to-primary-light rounded mr-1"></div>
          <span className="text-xs text-gray-500">Sales</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-secondary rounded-full mr-1"></div>
          <span className="text-xs text-gray-500">Orders</span>
        </div>
      </div>
    </div>
  )
}

export default SalesChart
