"use client"

import { useState } from "react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  thumbnail: string
  price: string
  currency: string
  category: string
  variants: Array<{
    id: number
    name: string
    price: string
    image: string
    options: Array<{ id: string; value: string }>
    available: boolean
  }>
  available: boolean
}

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product, variantId?: number) => void
}

export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!isOpen) return null

  const images = [
    product.thumbnail,
    ...product.variants.map((v) => v.image).filter((img, index, arr) => arr.indexOf(img) === index),
  ].filter(Boolean)

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant?.id)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-2 sm:p-4 py-4 sm:py-8">
          <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] min-h-[80vh] flex flex-col overflow-hidden">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-8 overflow-y-auto flex-1" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#d1d5db #f3f4f6',
              scrollBehavior: 'smooth'
            }}>
              {/* Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={images[selectedImage] || "/placeholder.svg?height=400&width=400&query=product"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Image Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                          selectedImage === index ? "border-coral-orange" : "border-transparent"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${product.name} view ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-turquoise-blue/20 text-turquoise-900 text-sm font-medium rounded-full capitalize">
                      {product.category.replace("-", " ")}
                    </span>
                  </div>
                  <h1 className="font-montserrat text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-montserrat text-3xl font-bold text-coral-orange">
                      {product.currency === 'EUR' ? '€' : product.currency === 'USD' ? '$' : product.currency}{selectedVariant?.price || product.price}
                    </span>
                    <span className="text-gray-500">{product.currency}</span>
                  </div>
                </div>

                {/* Variant Selection */}
                {product.variants.length > 1 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Options</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          disabled={!variant.available}
                          className={`p-3 text-left border rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                            selectedVariant?.id === variant.id
                              ? "border-coral-orange bg-coral-orange/10"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <div className="font-medium text-sm">{variant.name}</div>
                          <div className="text-xs text-gray-600">
                            {product.currency === 'EUR' ? '€' : product.currency === 'USD' ? '$' : product.currency}{variant.price}
                          </div>
                          {variant.options.length > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              {variant.options.map((option) => option.value).join(", ")}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.available || !selectedVariant?.available}
                  className="w-full bg-coral-orange hover:bg-orange-500 text-white font-montserrat font-bold py-4 px-6 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {!product.available || !selectedVariant?.available ? "Out of Stock" : "Add to Cart"}
                </button>

                {/* Product Info */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Product Details</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Premium quality materials</li>
                      <li>• KiteSafaris branded merchandise</li>
                      <li>• Perfect for ocean lovers and kiteboarding enthusiasts</li>
                      <li>• Printed and shipped by Printful</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Shipping & Returns</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Free shipping on orders over €75</li>
                      <li>• 5-7 business days processing</li>
                      <li>• 30-day return policy</li>
                      <li>• Worldwide shipping available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
