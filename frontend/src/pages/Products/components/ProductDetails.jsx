"use client"

import { useState } from "react"
import Button from "../../../components/ui/Button"
import { EditIcon, TrashIcon } from "../../../components/Icons/Icons"

const ProductDetails = ({ product, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState("details")
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Default image if no images are available
  const defaultImage = "/placeholder.svg"

  // Use product images or default
  const images = product.images && product.images.length > 0 ? product.images : [defaultImage]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="border dark:border-gray-300 rounded-lg overflow-hidden bg-white dark:bg-gray-400 shadow-sm">
          <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <img
              src={images[activeImageIndex] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-contain"
            />

            {/* Image navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-70 hover:opacity-100 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-70 hover:opacity-100 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {images.length > 1 && (
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`border dark:text-orange-600 rounded-md overflow-hidden flex-shrink-0 transition-all ${
                  index === activeImageIndex
                    ? "ring-2 ring-primary transform scale-105"
                    : "hover:opacity-80 hover:scale-105"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-16 h-16 object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-black-800 dark:text-black">{product.name}</h2>
            <p className="text-sm text-black">{product.sku || "SKU: N/A"}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" icon={<EditIcon />} onClick={onEdit}>
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<TrashIcon />}
              onClick={onDelete}
              className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-primary">{product.price}</div>
          <div
            className={`badge ${
              product.status === "Active"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-black"
                : product.status === "Out of Stock"
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {product.status}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-black">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "details"
                  ? "border-primary text-primary dark:text-primary"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "inventory"
                  ? "border-primary text-primary dark:text-primary"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Inventory
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === "details" && (
            <>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-orange-600">Description</h3>
                <p className="mt-1 text-gray-700 dark:text-black">
                  {product.description || "No description available."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-orange-600">Category</h3>
                  <p className="mt-1 text-gray-700 dark:text-black">{product.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-orange-600">Brand</h3>
                  <p className="mt-1 text-gray-700 dark:text-black">{product.brand || "N/A"}</p>
                </div>
              </div>

              {product.tags && product.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tags</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "inventory" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Stock</h3>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{product.stock} units</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">SKU</h3>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{product.sku || "N/A"}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
                <p className="mt-1 text-gray-700 dark:text-gray-300">{product.status}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</h3>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Stock History</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 text-sm">
                  <div className="flex justify-between items-center mb-2 text-gray-700 dark:text-gray-300">
                    <span>Initial Stock</span>
                    <span>50 units</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 text-green-600 dark:text-green-400">
                    <span>Restock - June 15, 2023</span>
                    <span>+20 units</span>
                  </div>
                  <div className="flex justify-between items-center text-red-600 dark:text-red-400">
                    <span>Sales - July 2, 2023</span>
                    <span>-25 units</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
