"use client"

import { useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import SalesChart from "./components/SalesChart"
import RecentOrders from "./components/RecentOrders"
import TopProducts from "./components/TopProducts"
import CategoryDistribution from "./components/CategoryDistribution"
import {
  ShoppingCartIcon,
  PackageIcon,
  UsersIcon,
  CreditCardIcon,
  UploadIcon,

} from "../../components/Icons/Icons"

const Dashboard = () => {
  const [period, setPeriod] = useState("weekly")

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary dark:text-black">Welcome Back, Admin 👋</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Here's what's happening with your store today.</p>
        </div>

        <div className="mt-4 md:mt-0">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="input shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="daily">Today</option>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-card-hover transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Sales</p>
              <h3 className="text-2xl font-bold mt-1 text-secondary dark:text-white">$24,780</h3>

              <div className="flex items-center mt-2 text-sm text-green-500">
                <UploadIcon className="w-4 h-4 mr-1" />
                <span>12.5%</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1 text-xs">vs last week</span>
              </div>
            </div>

            <div className="p-3 rounded-full bg-primary/10 text-primary dark:bg-primary/20 shadow-md">
              <CreditCardIcon />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-card-hover transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Orders</p>
              <h3 className="text-2xl font-bold mt-1 text-secondary dark:text-white">1,482</h3>

              <div className="flex items-center mt-2 text-sm text-green-500">
                <UploadIcon className="w-4 h-4 mr-1" />
                <span>8.2%</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1 text-xs">vs last week</span>
              </div>
            </div>

            <div className="p-3 rounded-full bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 shadow-md">
              <ShoppingCartIcon />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-card-hover transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Products</p>
              <h3 className="text-2xl font-bold mt-1 text-secondary dark:text-white">384</h3>

              <div className="flex items-center mt-2 text-sm text-red-500">
                <UploadIcon className="w-4 h-4 mr-1" />
                <span>3.1%</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1 text-xs">vs last week</span>
              </div>
            </div>

            <div className="p-3 rounded-full bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 shadow-md">
              <PackageIcon />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-card-hover transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Users</p>
              <h3 className="text-2xl font-bold mt-1 text-secondary dark:text-white">5,678</h3>

              <div className="flex items-center mt-2 text-sm text-green-500">
                <UploadIcon className="w-4 h-4 mr-1" />
                <span>24.3%</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1 text-xs">vs last week</span>
              </div>
            </div>

            <div className="p-3 rounded-full bg-green-500/10 text-green-500 dark:bg-green-500/20 shadow-md">
              <UsersIcon />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 animate-slide-up border border-gray-100 dark:border-gray-700" hover>
          <SalesChart />
        </Card>

        <Card className="animate-slide-up border border-gray-100 dark:border-gray-700" hover>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium dark:text-white">Top Products</h2>
            <select className="input py-1 px-2 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>By Revenue</option>
              <option>By Quantity</option>
            </select>
          </div>
          <TopProducts />
        </Card>
      </div>

      {/* Category Distribution */}
      <Card className="animate-slide-up border border-gray-100 dark:border-gray-700" hover>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium dark:text-white">Category Distribution</h2>
        </div>
        <CategoryDistribution />
      </Card>

      {/* Recent Orders */}
      <Card className="animate-slide-up border border-gray-100 dark:border-gray-700" hover>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium dark:text-white">Recent Orders</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:underline text-sm transition-colors duration-200"
          >
            View All
          </Button>
        </div>
        <RecentOrders />
      </Card>
    </div>
  )
}

export default Dashboard
