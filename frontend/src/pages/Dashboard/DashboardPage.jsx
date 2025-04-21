"use client"

import { useState } from "react"
import Card from "../../components/ui/Card"
import StatCard from "../../components/ui/StatCard"
import { ShoppingCartIcon, PackageIcon, UsersIcon, CreditCardIcon } from "../../components/Icons/Icons"
import SalesChart from "./components/SalesChart"
import RecentOrders from "./components/RecentOrders"
import TopProducts from "./components/TopProducts"

const Dashboard = () => {
  const [period, setPeriod] = useState("weekly")

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-secondary">Welcome Back, Admin 👋</h1>

        <div className="mt-4 md:mt-0">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="input shadow-sm">
            <option value="daily">Today</option>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Sales" value="$24,780" icon={<CreditCardIcon />} trend="up" trendValue="12.5%" />
        <StatCard title="Total Orders" value="1,482" icon={<ShoppingCartIcon />} trend="up" trendValue="8.2%" />
        <StatCard title="Total Products" value="384" icon={<PackageIcon />} trend="down" trendValue="3.1%" />
        <StatCard title="Total Users" value="5,678" icon={<UsersIcon />} trend="up" trendValue="24.3%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 animate-slide-up" hover>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Sales Overview</h2>
            <select className="input py-1 px-2 text-sm shadow-sm">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <SalesChart />
        </Card>

        <Card className="animate-slide-up" hover>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Top Products</h2>
            <select className="input py-1 px-2 text-sm shadow-sm">
              <option>By Revenue</option>
              <option>By Quantity</option>
            </select>
          </div>
          <TopProducts />
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="animate-slide-up" hover>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Recent Orders</h2>
          <button className="text-primary hover:underline text-sm transition-colors duration-200">View All</button>
        </div>
        <RecentOrders />
      </Card>
    </div>
  )
}

export default Dashboard
