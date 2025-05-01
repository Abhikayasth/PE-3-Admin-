"use client"

import { useState } from "react"
import {
  ShoppingCartIcon,
  PackageIcon,
  UsersIcon,
  CreditCardIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from "../../../components/Icons/Icons"

const AnalyticsCards = () => {
  const [period] = useState("weekly")

  const stats = {
    weekly: [
      {
        title: "Total Sales",
        value: "$24,780",
        icon: <CreditCardIcon />,
        trend: "up",
        trendValue: "12.5%",
        color: "primary",
      },
      {
        title: "Total Orders",
        value: "1,482",
        icon: <ShoppingCartIcon />,
        trend: "up",
        trendValue: "8.2%",
        color: "blue",
      },
      {
        title: "Total Products",
        value: "384",
        icon: <PackageIcon />,
        trend: "down",
        trendValue: "3.1%",
        color: "purple",
      },
      {
        title: "Total Users",
        value: "5,678",
        icon: <UsersIcon />,
        trend: "up",
        trendValue: "24.3%",
        color: "green",
      },
    ],
    monthly: [
      {
        title: "Total Sales",
        value: "$124,580",
        icon: <CreditCardIcon />,
        trend: "up",
        trendValue: "18.7%",
        color: "primary",
      },
      {
        title: "Total Orders",
        value: "6,842",
        icon: <ShoppingCartIcon />,
        trend: "up",
        trendValue: "12.4%",
        color: "blue",
      },
      {
        title: "Total Products",
        value: "412",
        icon: <PackageIcon />,
        trend: "up",
        trendValue: "7.3%",
        color: "purple",
      },
      {
        title: "Total Users",
        value: "8,954",
        icon: <UsersIcon />,
        trend: "up",
        trendValue: "32.1%",
        color: "green",
      },
    ],
  }

  const currentStats = stats[period]

  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    blue: "bg-blue-500/10 text-blue-500",
    purple: "bg-purple-500/10 text-purple-500",
    green: "bg-green-500/10 text-green-500",
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {currentStats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border border-gray-100"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1 text-secondary">{stat.value}</h3>

              <div
                className={`flex items-center mt-2 text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
              >
                {stat.trend === "up" ? (
                  <TrendingUpIcon className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDownIcon className="w-4 h-4 mr-1" />
                )}
                <span>{stat.trendValue}</span>
                <span className="text-gray-500 ml-1 text-xs">vs last period</span>
              </div>
            </div>

            <div className={`p-3 rounded-full shadow-md ${colorClasses[stat.color]}`}>{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnalyticsCards
