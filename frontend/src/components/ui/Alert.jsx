"use client"

import { useState, useEffect } from "react"
import { CheckIcon, XIcon } from "../Icons/Icons"

const Alert = ({ type = "success", message, onClose, autoClose = true, duration = 5000, showIcon = true }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onClose) onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [autoClose, duration, isVisible, onClose])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  if (!isVisible) return null

  const alertStyles = {
    success: "bg-green-50 border-green-500 text-green-700",
    error: "bg-red-50 border-red-500 text-red-700",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-700",
    info: "bg-blue-50 border-blue-500 text-blue-700",
  }

  const iconStyles = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  }

  const getIcon = () => {
    if (type === "success") return <CheckIcon className={`w-5 h-5 ${iconStyles[type]}`} />
    if (type === "error") return <XIcon className={`w-5 h-5 ${iconStyles[type]}`} />
    // Add more icons for other types if needed
    return null
  }

  return (
    <div className={`border-l-4 p-4 rounded shadow-md animate-slide-down ${alertStyles[type]}`}>
      <div className="flex items-start">
        {showIcon && <div className="flex-shrink-0 mr-3">{getIcon()}</div>}
        <div className="flex-1">
          <p>{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="ml-auto -mt-1 -mr-1 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default Alert
