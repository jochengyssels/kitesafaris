"use client"

import { useState } from "react"
import Image from "next/image"
import { ProductModal } from "./product-modal"

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

interface ProductGridProps {
  products: Product[]
  onAddToCart: (product: Product, variantId?: number) => void
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
            />
          </svg>
        </div>
        <h3 className="font-montserrat text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="font-open-sans text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <Image
                src={product.thumbnail || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={product.thumbnail?.startsWith('http')}
              />
              {!product.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4 sm:p-6">
              <div className="mb-2 sm:mb-3">
                <span className="inline-block px-2 sm:px-3 py-1 bg-turquoise-blue/20 text-turquoise-900 text-xs font-medium rounded-full capitalize">
                  {product.category.replace("-", " ")}
                </span>
              </div>

              <h3 className="font-montserrat font-bold text-sm sm:text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="font-montserrat text-lg sm:text-2xl font-bold text-coral-orange">
                  {product.currency === 'EUR' ? '€' : product.currency === 'USD' ? '$' : product.currency}{product.price}
                </span>
                <span className="text-xs sm:text-sm text-gray-500">{product.currency}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 px-3 sm:px-4 py-2 bg-deep-navy text-white font-medium rounded-lg hover:bg-deep-navy/90 transition-colors focus:outline-none focus:ring-2 focus:ring-deep-navy focus:ring-opacity-50 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">View Details</span>
                  <span className="sm:hidden">Details</span>
                </button>
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={!product.available}
                  className="px-3 sm:px-4 py-2 bg-coral-orange text-white font-medium rounded-lg hover:bg-orange-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-coral-orange focus:ring-opacity-50"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  )
}
