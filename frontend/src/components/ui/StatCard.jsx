import Card from "./Card"

const StatCard = ({ title, value, icon, trend, trendValue, color = "primary" }) => {
  return (
    <Card className="hover:shadow-card-hover transition-all duration-300 transform hover:scale-[1.02]">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-secondary">{value}</h3>

          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend === "up" ? "text-success" : "text-error"}`}>
              <span className="mr-1">{trend === "up" ? "↑" : "↓"}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        <div className={`p-3 rounded-full bg-${color}-light/20 text-${color} shadow-md`}>{icon}</div>
      </div>
    </Card>
  )
}

export default StatCard
