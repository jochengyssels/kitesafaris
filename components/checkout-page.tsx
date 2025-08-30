"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useCart } from "@/hooks/use-cart"
import Image from "next/image"

interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
}

export function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const subtotal = getTotalPrice()
  const shipping = subtotal >= 75 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax estimate
  const total = subtotal + shipping + tax

  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      window.location.href = "/shop"
    }
  }, [items, orderComplete])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Create order with Printful
      const orderData = {
        external_id: `KS-${Date.now()}`,
        shipping: "STANDARD",
        recipient: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          address1: shippingInfo.address1,
          address2: shippingInfo.address2,
          city: shippingInfo.city,
          state_code: shippingInfo.state,
          country_code: shippingInfo.country,
          zip: shippingInfo.zip,
          phone: shippingInfo.phone,
          email: shippingInfo.email,
        },
        items: items.map((item) => ({
          sync_variant_id: item.variantId,
          quantity: item.quantity,
          retail_price: item.price.toFixed(2),
        })),
        retail_costs: {
          currency: "USD",
          subtotal: subtotal.toFixed(2),
          shipping: shipping.toFixed(2),
          tax: tax.toFixed(2),
          total: total.toFixed(2),
        },
      }

      const response = await fetch("/api/shop/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        clearCart()
        setOrderComplete(true)
      } else {
        throw new Error("Order failed")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("There was an error processing your order. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-turquoise-blue via-sand-beige to-coral-orange flex items-center justify-center px-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-montserrat text-2xl font-bold text-gray-900 mb-4">Order Complete!</h1>
          <p className="font-open-sans text-gray-600 mb-6">
            Thank you for your order! You'll receive a confirmation email shortly with tracking information.
          </p>
          <button
            onClick={() => (window.location.href = "/shop")}
            className="w-full bg-coral-orange hover:bg-orange-500 text-white font-montserrat font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise-blue via-sand-beige to-coral-orange py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h1 className="font-montserrat text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h2 className="font-montserrat text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="font-montserrat text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    value={shippingInfo.address1}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address1: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Address Line 2 (Optional)"
                    value={shippingInfo.address2}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address2: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                      required
                    />
                  </div>
                  <select
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                    required
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="ES">Spain</option>
                    <option value="IT">Italy</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-coral-orange hover:bg-orange-500 text-white font-montserrat font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing Order..." : `Complete Order - $${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="font-montserrat text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg?height=64&width=64&query=product"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                      <span className="font-medium text-coral-orange">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                <span>Total:</span>
                <span className="text-coral-orange">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="text-sm font-medium">Secure Checkout</span>
              </div>
              <p className="text-sm text-green-700 mt-1">Your payment information is encrypted and secure.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
