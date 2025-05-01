"use client"

import { useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Alert from "../../components/ui/Alert"
import { UserIcon, EditIcon, UploadIcon } from "../../components/Icons/Icons"

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Senior administrator with 5+ years of experience managing e-commerce platforms.",
    joinDate: "January 15, 2022",
    avatar: null,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ ...profileData })
  const [alertMessage, setAlertMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setProfileData({ ...formData })
    setIsEditing(false)
    setAlertMessage("Profile updated successfully!")

    // Clear alert after 5 seconds
    setTimeout(() => {
      setAlertMessage("")
    }, 5000)
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setFormData({
        ...formData,
        avatar: event.target.result,
      })
    }
    reader.readAsDataURL(file)
  }

  const stats = [
    { label: "Products Added", value: 124 },
    { label: "Orders Processed", value: 1482 },
    { label: "Total Sales", value: "$24,780" },
    { label: "Active Users", value: 5678 },
  ]

  const recentActivities = [
    { action: "Added new product", item: "Wireless Headphones", time: "2 hours ago" },
    { action: "Updated product", item: "Smart Watch", time: "5 hours ago" },
    { action: "Processed order", item: "#ORD-001", time: "1 day ago" },
    { action: "Approved user", item: "Sarah Wilson", time: "2 days ago" },
    { action: "Updated settings", item: "Payment Gateway", time: "3 days ago" },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-secondary">My Profile</h1>

      {alertMessage && <Alert type="success" message={alertMessage} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1" hover>
          <div className="flex flex-col items-center text-center">
            <div className="relative group mb-4">
              <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-semibold shadow-lg overflow-hidden">
                {profileData.avatar ? (
                  <img
                    src={profileData.avatar || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                )}
              </div>

              {isEditing && (
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="text-white flex flex-col items-center">
                    <UploadIcon className="w-8 h-8" />
                    <span className="text-xs mt-1">Upload Photo</span>
                  </div>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="sr-only"
                  />
                </label>
              )}
            </div>

            <h2 className="text-xl font-bold">{profileData.name}</h2>
            <p className="text-gray-500 mb-2">{profileData.email}</p>
            <div className="mb-4">
              <span className="badge bg-purple-100 text-purple-800">{profileData.role}</span>
            </div>

            <div className="w-full border-t border-gray-200 pt-4 mt-2">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-gray-500 text-sm">Member Since</p>
                  <p className="font-medium">{profileData.joinDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Location</p>
                  <p className="font-medium">{profileData.location}</p>
                </div>
              </div>
            </div>

            {!isEditing && (
              <Button variant="outline" icon={<EditIcon />} onClick={() => setIsEditing(true)} className="mt-6 w-full">
                Edit Profile
              </Button>
            )}
          </div>
        </Card>

        {/* Profile Details / Edit Form */}
        <Card className="lg:col-span-2" hover>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input shadow-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleChange}
                    className="input shadow-sm"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="ghost" type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Profile Details</h2>
                <Button variant="ghost" size="sm" icon={<EditIcon />} onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="mt-1">{profileData.name}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                  <p className="mt-1">{profileData.email}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                  <p className="mt-1">{profileData.phone}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="mt-1">{profileData.location}</p>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                  <p className="mt-1">{profileData.bio}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium mb-4">Activity Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-xl font-bold text-primary">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary mr-3 flex-shrink-0">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.action}</span>{" "}
                          <span className="text-primary">{activity.item}</span>
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Profile
