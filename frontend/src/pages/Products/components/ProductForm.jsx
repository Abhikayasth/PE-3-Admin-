"use client"

import { useState, useEffect } from "react"
import Button from "../../../components/ui/Button"
import { UploadIcon, ImageIcon, XIcon } from "../../../components/Icons/Icons"

const ProductForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: 0,
    description: "",
    images: [],
    sku: "",
    brand: "",
    tags: "",
    status: "Active",
  })

  const [errors, setErrors] = useState({})
  const [previewImages, setPreviewImages] = useState([])
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "",
        price: initialData.price ? initialData.price.replace(/[^\d.]/g, "") : "",
        stock: initialData.stock || 0,
        description: initialData.description || "",
        images: initialData.images || [],
        sku: initialData.sku || "",
        brand: initialData.brand || "",
        tags: initialData.tags ? initialData.tags.join(", ") : "",
        status: initialData.status || "Active",
      })

      // Set preview images if available
      if (initialData.images && initialData.images.length > 0) {
        setPreviewImages(
          initialData.images.map((img) => ({
            url: img,
            isUploaded: true,
          })),
        )
      }
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    if (files.length === 0) return

    // Create preview URLs
    const newPreviewImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
      isUploaded: false,
    }))

    setPreviewImages([...previewImages, ...newPreviewImages])
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const removeImage = (index) => {
    const newPreviewImages = [...previewImages]

    // Revoke object URL to prevent memory leaks
    if (!newPreviewImages[index].isUploaded) {
      URL.revokeObjectURL(newPreviewImages[index].url)
    }

    newPreviewImages.splice(index, 1)
    setPreviewImages(newPreviewImages)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.price.trim()) newErrors.price = "Price is required"
    else if (isNaN(Number.parseFloat(formData.price))) newErrors.price = "Price must be a number"

    if (formData.stock === "") newErrors.stock = "Stock is required"
    else if (isNaN(Number.parseInt(formData.stock))) newErrors.stock = "Stock must be a number"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    // Process form data
    const processedData = {
      ...formData,
      price: `$${Number.parseFloat(formData.price).toFixed(2)}`,
      stock: Number.parseInt(formData.stock),
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      images: previewImages.map((img) => img.url),
    }

    onSubmit(processedData)
  }

  return (
    <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Product Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input shadow-sm focus:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.name ? "border-red-500 dark:border-red-500" : ""}`}
            required
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category*
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`input shadow-sm focus:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.category ? "border-red-500 dark:border-red-500" : ""}`}
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Home">Home</option>
            <option value="Beauty">Beauty</option>
            <option value="Sports">Sports</option>
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Price*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400">$</span>
            </div>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`input pl-7 shadow-sm focus:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.price ? "border-red-500 dark:border-red-500" : ""}`}
              placeholder="0.00"
              required
            />
          </div>
          {errors.price && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Stock*
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className={`input shadow-sm focus:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.stock ? "border-red-500 dark:border-red-500" : ""}`}
            min="0"
            required
          />
          {errors.stock && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.stock}</p>}
        </div>

        <div>
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            SKU
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="input shadow-sm focus:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="input shadow-sm focus:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="input shadow-sm focus:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="e.g. summer, discount, new arrival"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input shadow-sm focus:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="Active">Active</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Discontinued">Discontinued</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="input shadow-sm focus:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        ></textarea>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Product Images</h3>

        {/* Image previews */}
        {previewImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {previewImages.map((image, index) => (
              <div key={index} className="relative group">
                <div className="h-24 w-24 rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={`Preview ${index}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div
          className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center transition-colors duration-200 ${
            dragActive
              ? "border-primary bg-primary/5 dark:bg-primary/10"
              : "border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary"
          } group`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <ImageIcon className="h-12 w-12 text-gray-400 group-hover:text-primary transition-colors duration-200" />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
            Drag and drop image files here, or click to select files
          </p>
          <div className="mt-3 flex">
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="group-hover:bg-primary/10 dark:group-hover:bg-primary/20"
                icon={<UploadIcon />}
              >
                Select Files
              </Button>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProductForm
