"use client"

const CategoryDistribution = () => {
  const categories = [
    { name: "Electronics", percentage: 35, color: "primary" },
    { name: "Clothing", percentage: 25, color: "blue" },
    { name: "Accessories", percentage: 20, color: "purple" },
    { name: "Home", percentage: 15, color: "green" },
    { name: "Sports", percentage: 5, color: "yellow" },
  ]

  const colorClasses = {
    primary: "bg-primary",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-500">Category Distribution</h3>

      {/* Stacked bar */}
      <div className="h-6 flex rounded-full overflow-hidden">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${colorClasses[category.color]} relative group`}
            style={{ width: `${category.percentage}%` }}
          >
            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-secondary text-white text-xs py-1 px-2 rounded transition-opacity duration-200 whitespace-nowrap">
              {category.name}: {category.percentage}%
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-3 h-3 ${colorClasses[category.color]} rounded-full mr-1`}></div>
            <span className="text-xs text-gray-600">
              {category.name} ({category.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryDistribution
