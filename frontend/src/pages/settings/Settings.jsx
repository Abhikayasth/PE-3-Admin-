"use client"

import { useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"

const Settings = () => {
  const [successMessage, setSuccessMessage] = useState("")

  const [profileForm, setProfileForm] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    bio: "Senior administrator with 5+ years of experience managing e-commerce platforms.",
  })

  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    newProducts: false,
    marketingEmails: false,
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm({
      ...profileForm,
      [name]: value,
    })
  }

  const handleSecurityChange = (e) => {
    const { name, value } = e.target
    setSecurityForm({
      ...securityForm,
      [name]: value,
    })
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    })
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would save the profile data to the server
    setSuccessMessage("Profile updated successfully!")

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const handleSecuritySubmit = (e) => {
    e.preventDefault()

    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    // In a real app, you would update the password on the server
    setSuccessMessage("Password updated successfully!")
    setSecurityForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const handleNotificationSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would save the notification settings to the server
    setSuccessMessage("Notification settings updated!")

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-secondary">Settings</h1>

      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md animate-slide-down">
          <p>{successMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card hover>
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className="input shadow-sm focus:shadow-md transition-shadow"
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
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="input shadow-sm focus:shadow-md transition-shadow"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={profileForm.role}
                  onChange={handleProfileChange}
                  className="input shadow-sm bg-gray-50"
                  disabled
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileForm.bio}
                  onChange={handleProfileChange}
                  rows="4"
                  className="input shadow-sm focus:shadow-md transition-shadow"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Card>

          {/* Security Settings */}
          <Card hover>
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <form onSubmit={handleSecuritySubmit} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={securityForm.currentPassword}
                  onChange={handleSecurityChange}
                  className="input shadow-sm focus:shadow-md transition-shadow"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={securityForm.newPassword}
                    onChange={handleSecurityChange}
                    className="input shadow-sm focus:shadow-md transition-shadow"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={securityForm.confirmPassword}
                    onChange={handleSecurityChange}
                    className="input shadow-sm focus:shadow-md transition-shadow"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">Update Password</Button>
              </div>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          {/* User Card */}
          <Card hover>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-semibold mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
                JD
              </div>

              <h3 className="text-lg font-medium">{profileForm.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{profileForm.email}</p>

              <div className="mb-4">
                <span className="badge bg-purple-100 text-purple-800">{profileForm.role}</span>
              </div>

              <Button variant="outline" fullWidth className="hover:shadow-md transition-shadow duration-200">
                View Public Profile
              </Button>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card hover>
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            <form onSubmit={handleNotificationSubmit} className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    name="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded transition-colors duration-200"
                  />
                  <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                    Email Notifications
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="orderUpdates"
                    name="orderUpdates"
                    checked={notificationSettings.orderUpdates}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded transition-colors duration-200"
                  />
                  <label htmlFor="orderUpdates" className="ml-2 block text-sm text-gray-700">
                    Order Updates
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newProducts"
                    name="newProducts"
                    checked={notificationSettings.newProducts}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded transition-colors duration-200"
                  />
                  <label htmlFor="newProducts" className="ml-2 block text-sm text-gray-700">
                    New Products
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="marketingEmails"
                    name="marketingEmails"
                    checked={notificationSettings.marketingEmails}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded transition-colors duration-200"
                  />
                  <label htmlFor="marketingEmails" className="ml-2 block text-sm text-gray-700">
                    Marketing Emails
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="outline" className="hover:shadow-md transition-shadow duration-200">
                  Save Preferences
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Settings
