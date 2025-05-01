import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Dashboard from "./pages/Dashboard/DashboardPage"
import Products from "./pages/Products/ProductsPage"
import Orders from "./pages/orders/Orders"
import Users from "./pages/Users/Users"
import Payments from "./pages/Payments/Payments"
import Settings from "./pages/settings/Settings"
import Profile from "./pages/Profile/ProfilePage"
import NotFound from "./pages/NotFound"
import Inventory from "./pages/Inventory/InventoryPage"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="payments" element={<Payments />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
