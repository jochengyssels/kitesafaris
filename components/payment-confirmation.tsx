"use client"

import { CheckCircle, Download, Mail, Calendar, MapPin, Users, CreditCard } from 'lucide-react'

interface PaymentConfirmationProps {
  paymentData: {
    orderID?: string
    payerID?: string
    paymentIntentId?: string
    status: string
    amount: number
    currency: string
    paymentMethod: string
    timestamp: string
    bookingId: string
    tripId: string
    destination: string
    groupSize: number
    email: string
    firstName: string
    lastName: string
  }
  onDownloadInvoice: () => void
  onSendEmail: () => void
}

export function PaymentConfirmation({ paymentData, onDownloadInvoice, onSendEmail }: PaymentConfirmationProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'paypal':
        return '🔵'
      case 'card':
        return '💳'
      default:
        return '💳'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="font-montserrat text-4xl font-bold text-deep-navy mb-3">
          Payment Successful!
        </h1>
        <p className="font-open-sans text-xl text-gray-600">
          Your KiteSafaris adventure is confirmed
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Confirmation Details */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Oceanic Gradient Header */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-turquoise to-deep-navy rounded-t-3xl" />
            
            <div className="relative z-10">
              <h2 className="font-montserrat text-2xl font-bold text-deep-navy mb-6">
                Booking Confirmation
              </h2>

              {/* Payment Details */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{getPaymentMethodIcon(paymentData.paymentMethod)}</span>
                  <div>
                    <h3 className="font-montserrat font-semibold text-green-800">
                      Payment Method: {paymentData.paymentMethod === 'paypal' ? 'PayPal' : 'Credit/Debit Card'}
                    </h3>
                    <p className="font-open-sans text-sm text-green-600">
                      Transaction completed at {formatDate(paymentData.timestamp)}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-green-700">Transaction ID:</span>
                    <p className="text-green-600 font-mono">
                      {paymentData.orderID || paymentData.paymentIntentId || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">Amount Paid:</span>
                    <p className="text-green-600 font-bold">
                      {paymentData.currency} {paymentData.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-turquoise" />
                  <div>
                    <span className="font-medium text-gray-700">Destination:</span>
                    <p className="font-semibold text-deep-navy">{paymentData.destination}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-turquoise" />
                  <div>
                    <span className="font-medium text-gray-700">Group Size:</span>
                    <p className="font-semibold text-deep-navy">
                      {paymentData.groupSize} {paymentData.groupSize === 1 ? 'person' : 'people'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-turquoise" />
                  <div>
                    <span className="font-medium text-gray-700">Booking ID:</span>
                    <p className="font-semibold text-deep-navy font-mono">{paymentData.bookingId}</p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-montserrat font-semibold text-blue-800 mb-3">
                  What Happens Next?
                </h3>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>✅ You'll receive a confirmation email within 24 hours</p>
                  <p>✅ Our team will contact you to finalize trip details</p>
                  <p>✅ You'll receive pre-trip information and packing lists</p>
                  <p>✅ 24/7 support available for any questions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-deep-navy to-turquoise rounded-2xl p-6 text-white sticky top-6">
            <h3 className="font-montserrat text-xl font-bold mb-4">
              Quick Actions
            </h3>
            
            <div className="space-y-4">
              <button
                onClick={onDownloadInvoice}
                className="w-full bg-white/20 hover:bg-white/30 transition-colors rounded-lg p-4 flex items-center group"
              >
                <Download className="h-5 w-5 mr-3 text-white group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-montserrat font-bold">Download Invoice</div>
                  <div className="font-open-sans text-sm opacity-90">Get your receipt</div>
                </div>
              </button>

              <button
                onClick={onSendEmail}
                className="w-full bg-white/20 hover:bg-white/30 transition-colors rounded-lg p-4 flex items-center group"
              >
                <Mail className="h-5 w-5 mr-3 text-white group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-montserrat font-bold">Resend Email</div>
                  <div className="font-open-sans text-sm opacity-90">Get confirmation again</div>
                </div>
              </button>
            </div>

            {/* Contact Information */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <h4 className="font-montserrat font-semibold mb-3">Need Help?</h4>
              <div className="space-y-2 text-sm">
                <p>📧 info@kitesafaris.com</p>
                <p>📱 +32 492 57 64 27</p>
                <p>💬 WhatsApp available 24/7</p>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="w-4 h-4 text-green-300" />
                <span className="font-montserrat font-semibold text-sm">Secure Transaction</span>
              </div>
              <p className="text-white/80 text-xs">
                Your payment is secured with bank-level encryption. All transaction data is protected.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-green-50 to-turquoise-50 border border-green-200 rounded-2xl p-6">
          <h3 className="font-montserrat text-xl font-bold text-green-800 mb-2">
            Welcome to the KiteSafaris Family! 🏄‍♂️
          </h3>
          <p className="font-open-sans text-green-700">
            Thank you for choosing us for your kiteboarding adventure. We're excited to create an unforgettable experience for you!
          </p>
        </div>
      </div>
    </div>
  )
}
