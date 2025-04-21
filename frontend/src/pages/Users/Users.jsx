"use client"

import { useState } from "react"
import Button from "../../components/ui/Button"
import { SearchIcon } from "../../components/Icons/Icons"
import UserCard from "./components/UserCard"

const Users = () => {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "Active",
      lastLogin: "1 day ago",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "1 week ago",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Editor",
      status: "Active",
      lastLogin: "3 hours ago",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "User",
      status: "Blocked",
      lastLogin: "2 months ago",
    },
    {
      id: 6,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      role: "User",
      status: "Active",
      lastLogin: "5 days ago",
    },
    {
      id: 7,
      name: "David Taylor",
      email: "david.taylor@example.com",
      role: "Editor",
      status: "Active",
      lastLogin: "12 hours ago",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2 days ago",
    },
  ])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-secondary">Users</h1>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <SearchIcon />
            </div>
            <input type="text" className="input pl-10 shadow-sm" placeholder="Search users..." />
          </div>

          <select className="input shadow-sm">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="user">User</option>
          </select>

          <Button icon={<SearchIcon />}>Add User</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default Users
