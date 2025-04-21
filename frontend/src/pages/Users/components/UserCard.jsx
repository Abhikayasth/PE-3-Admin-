import Card from "../../../components/ui/Card"
import Button from "../../../components/ui/Button"

const UserCard = ({ user }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-yellow-100 text-yellow-800"
      case "Blocked":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800"
      case "Editor":
        return "bg-blue-100 text-blue-800"
      case "User":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-card-hover transition-all duration-300 transform hover:scale-[1.02]">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-semibold mb-3 shadow-md hover:shadow-lg transition-shadow duration-200">
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <h3 className="text-lg font-medium">{user.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{user.email}</p>

        <div className="flex gap-2 mb-4">
          <span className={`badge ${getRoleColor(user.role)}`}>{user.role}</span>
          <span className={`badge ${getStatusColor(user.status)}`}>{user.status}</span>
        </div>

        <p className="text-xs text-gray-500 mb-4">Last login: {user.lastLogin}</p>

        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" fullWidth className="hover:shadow-md transition-shadow duration-200">
            View
          </Button>
          <Button
            variant={user.status === "Blocked" ? "primary" : "secondary"}
            size="sm"
            fullWidth
            className="hover:shadow-md transition-shadow duration-200"
          >
            {user.status === "Blocked" ? "Unblock" : "Block"}
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default UserCard
