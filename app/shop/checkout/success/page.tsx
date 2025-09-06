import { Navigation } from "@/components/navigation"
import { CheckCircle, Package, Mail, Truck } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Order Confirmation | KiteSafaris Shop",
  description: "Your order has been confirmed. Thank you for shopping with KiteSafaris!",
  robots: "noindex, nofollow",
}

export default function CheckoutSuccess() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-turquoise-blue via-sand-beige to-coral-orange">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="font-montserrat text-3xl font-bold text-gray-900 mb-4">
                Order Confirmed!
              </h1>
              <p className="font-open-sans text-lg text-gray-600 mb-6">
                Thank you for your purchase! Your order has been successfully placed and payment confirmed.
              </p>
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">
                  You'll receive a confirmation email with your order details and tracking information shortly.
                </p>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="font-montserrat text-xl font-bold text-gray-900 mb-6">What's Next?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email Confirmation</h3>
                    <p className="text-gray-600">
                      Check your email for order confirmation and receipt. If you don't see it, check your spam folder.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Order Processing</h3>
                    <p className="text-gray-600">
                      Your order is being processed and will be prepared for shipping within 1-2 business days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Shipping & Tracking</h3>
                    <p className="text-gray-600">
                      You'll receive tracking information via email once your order ships. Delivery typically takes 3-7 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/shop"
                className="flex-1 bg-coral-orange hover:bg-orange-500 text-white font-montserrat font-bold py-3 px-6 rounded-lg transition-colors text-center"
              >
                Continue Shopping
              </a>
              <a
                href="/"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors text-center"
              >
                Back to Home
              </a>
            </div>

            {/* Support Info */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-2">
                Need help with your order?
              </p>
              <a
                href="/contact"
                className="text-coral-orange hover:text-orange-500 font-medium"
              >
                Contact our support team
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
