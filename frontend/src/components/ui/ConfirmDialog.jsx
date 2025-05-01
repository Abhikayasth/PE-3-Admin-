"use client"

import { XIcon } from "../Icons/Icons"
import Button from "./Button"

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "primary",
  icon = null,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
          >
            <XIcon />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700">{message}</p>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
