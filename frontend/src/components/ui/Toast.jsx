"use client"

import { useState, useEffect } from "react"
import { CheckIcon, XIcon } from "../Icons/Icons"

const Toast = ({ message, type = "success", onClose }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const duration = 5000
    const interval = 10
    const decrement = (100 * interval) / duration

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - decrement
      })
    }, interval)

    const timeout = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => {
      clearInterval(timer)
      clearTimeout(timeout)
    }
  }, [onClose])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  if (!isVisible) return null

  const typeStyles = {
    success: "bg-green-50 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300",
    error: "bg-red-50 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300",
    warning: "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-500 text-yellow-700 dark:text-yellow-300",
    info: "bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300",
  }

  const progressColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  }

  const icons = {
    success: <CheckIcon className="w-5 h-5" />,
    error: <XIcon className="w-5 h-5" />,
    warning: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  }

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 z-50 max-w-sm w-full animate-slide-up">
      <div className={`border-l-4 p-4 rounded shadow-md ${typeStyles[type]}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">{icons[type]}</div>
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

        {/* Progress bar */}
        <div className="h-1 mt-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${progressColors[type]} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Toast
