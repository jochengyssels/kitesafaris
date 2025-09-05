"use client"

import { useState } from "react"
import Image from "next/image"
import type { CartItem } from "@/hooks/use-cart"

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  totalPrice: number
}

export function ShoppingCart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  totalPrice,
}: ShoppingCartProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Helper function to get currency symbol
  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'EUR': return '€'
      case 'USD': return '$'
      default: return currency
    }
  }

  // Get currency from first item (assuming all items have same currency)
  const currency = items.length > 0 ? items[0].currency : 'EUR'

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Redirect to checkout page
    window.location.href = "/shop/checkout"
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="font-montserrat text-lg sm:text-xl font-bold text-gray-900">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
                    />
                  </svg>
                </div>
                <h3 className="font-montserrat text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="font-open-sans text-gray-600 mb-6">Add some KiteSafaris gear to get started!</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-coral-orange text-white font-medium rounded-lg hover:bg-orange-500 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    {/* Product Image */}
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=64&width=64&query=product"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-xs sm:text-sm line-clamp-2 mb-1">{item.name}</h4>

                      {/* Options */}
                      {item.options.length > 0 && (
                        <div className="text-xs text-gray-600 mb-2">
                          {item.options.map((option, index) => (
                            <span key={option.id}>
                              {option.value}
                              {index < item.options.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="font-bold text-coral-orange text-sm sm:text-base">{getCurrencySymbol(item.currency)}{item.price.toFixed(2)}</span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors text-red-500"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Subtotal:</span>
                <span className="text-coral-orange">{getCurrencySymbol(currency)}{totalPrice.toFixed(2)}</span>
              </div>

              {/* Shipping Notice */}
              <p className="text-sm text-gray-600 text-center">
                {totalPrice >= 75
                  ? "🎉 Free shipping included!"
                  : `Add ${getCurrencySymbol(currency)}${(75 - totalPrice).toFixed(2)} for free shipping`}
              </p>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-coral-orange hover:bg-orange-500 text-white font-montserrat font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              </button>

              {/* Continue Shopping */}
              <button
                onClick={onClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
