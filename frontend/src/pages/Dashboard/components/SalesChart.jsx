const SalesChart = () => {
  // In a real application, you would use a charting library like Chart.js or Recharts
  // For this example, we'll create a simple visual representation

  const data = [
    { day: "Mon", sales: 1200 },
    { day: "Tue", sales: 1900 },
    { day: "Wed", sales: 1500 },
    { day: "Thu", sales: 2100 },
    { day: "Fri", sales: 2400 },
    { day: "Sat", sales: 1800 },
    { day: "Sun", sales: 1300 },
  ]

  const maxSales = Math.max(...data.map((item) => item.sales))

  return (
    <div className="h-64">
      <div className="flex h-full items-end">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center group">
            <div
              className="w-full max-w-[40px] bg-primary rounded-t-md mx-auto transition-all duration-500 ease-out group-hover:bg-primary-dark group-hover:shadow-lg"
              style={{ height: `${(item.sales / maxSales) * 100}%` }}
            >
              <div className="opacity-0 group-hover:opacity-100 bg-secondary text-white text-xs p-1 rounded absolute -mt-8 transition-opacity duration-200">
                ${item.sales}
              </div>
            </div>
            <div className="text-xs mt-2 text-gray-500">{item.day}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SalesChart
