"use client"

import { useEffect, useRef } from "react"
import { XIcon } from "../Icons/Icons"

const Modal = ({ isOpen, onClose, title, children, footer = null, size = "md" }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    full: "max-w-full mx-4 sm:mx-8",
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        ref={modalRef}
        className={`bg-white dark:bg-black-300 rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col animate-slide-up`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-black-700">
          <h3 className="text-lg font-medium dark:text-black">{title}</h3>
          <button
            onClick={onClose}
            className="text-black-800 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none transition-colors duration-200"
          >
            <XIcon />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto dark:text-gray-200">{children}</div>

        {footer && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">{footer}</div>
        )}
      </div>
    </div>
  )
}

export default Modal
