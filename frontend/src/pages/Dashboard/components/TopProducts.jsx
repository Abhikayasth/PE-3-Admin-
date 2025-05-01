"use client"

const TopProducts = () => {
  const products = [
    { name: "Wireless Headphones", sales: 245, percentage: 28 },
    { name: "Smart Watch", sales: 190, percentage: 21 },
    { name: "Bluetooth Speaker", sales: 120, percentage: 15 },
    { name: "Laptop Sleeve", sales: 85, percentage: 10 },
    { name: "USB-C Cable", sales: 65, percentage: 8 },
  ]

  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div key={index} className="space-y-2 group">
          <div className="flex justify-between text-sm">
            <span className="group-hover:text-primary transition-colors duration-200">{product.name}</span>
            <span className="font-medium">{product.sales} sales</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full transition-all duration-500 ease-out group-hover:shadow-md"
              style={{ width: `${product.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TopProducts
