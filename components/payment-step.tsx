"use client"

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { 
  CreditCard, 
  Shield, 
  Lock, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  ChevronRight,
  Star
} from 'lucide-react'
import { paymentConfig, createPaymentIntentConfig, createPayPalOrderConfig } from '@/lib/payment-config'

// Load Stripe
const stripePromise = loadStripe(paymentConfig.stripe.publishableKey)

interface PaymentStepProps {
  bookingData: {
    tripId: string
    destination: string
    groupSize: number
    total: number
    currency: string
    bookingId: string
    email: string
    firstName: string
    lastName: string
  }
  onPaymentSuccess: (paymentData: any) => void
  onPaymentError: (error: string) => void
  onBack: () => void
}

export function PaymentStep({ bookingData, onPaymentSuccess, onPaymentError, onBack }: PaymentStepProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('stripe')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Handle Stripe payment
  const handleStripePayment = async () => {
    try {
      setIsProcessing(true)
      setPaymentStatus('processing')
      setErrorMessage('')

      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      // Create payment intent
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: bookingData.total,
          metadata: {
            bookingId: bookingData.bookingId,
            tripId: bookingData.tripId,
            destination: bookingData.destination,
            groupSize: bookingData.groupSize,
            email: bookingData.email,
            firstName: bookingData.firstName,
            lastName: bookingData.lastName,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment intent')
      }

      const { clientSecret } = await response.json()

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        mode: 'payment',
        clientSecret,
        success_url: `${window.location.origin}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/booking/payment`,
      })

      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      console.error('Stripe payment error:', error)
      setPaymentStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Payment failed')
      onPaymentError(error instanceof Error ? error.message : 'Payment failed')
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle PayPal payment success
  const handlePayPalSuccess = async (details: any) => {
    try {
      setPaymentStatus('processing')
      
      // Verify payment with backend
      const response = await fetch('/api/payments/verify-paypal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: details.orderID,
          payerID: details.payerID,
          bookingData,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to verify PayPal payment')
      }

      const paymentData = await response.json()
      setPaymentStatus('success')
      onPaymentSuccess(paymentData)
    } catch (error) {
      console.error('PayPal verification error:', error)
      setPaymentStatus('error')
      setErrorMessage('Payment verification failed')
      onPaymentError('Payment verification failed')
    }
  }

  // Handle PayPal payment error
  const handlePayPalError = (err: any) => {
    console.error('PayPal error:', err)
    setPaymentStatus('error')
    setErrorMessage('PayPal payment failed')
    onPaymentError('PayPal payment failed')
  }

  // Handle PayPal payment cancel
  const handlePayPalCancel = () => {
    setPaymentStatus('idle')
    setErrorMessage('')
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-3">
          Complete Your Payment
        </h2>
        <p className="font-open-sans text-gray-600">
          Secure payment powered by Stripe and PayPal
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods Selection */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Oceanic Gradient Header */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-turquoise via-deep-navy to-coral-orange rounded-t-3xl" />
            
            <div className="relative z-10">
              <h3 className="font-montserrat text-xl font-bold text-deep-navy mb-6">
                Choose Payment Method
              </h3>

              {/* Payment Method Options */}
              <div className="space-y-4 mb-8">
                {paymentConfig.paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedMethod === method.id
                        ? 'border-turquoise bg-turquoise/5'
                        : 'border-gray-200 hover:border-turquoise/50'
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{method.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-montserrat font-semibold text-deep-navy">
                            {method.name}
                          </h4>
                          {method.popular && (
                            <span className="bg-coral-orange text-white text-xs px-2 py-1 rounded-full font-medium">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="font-open-sans text-sm text-gray-600 mt-1">
                          {method.description}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedMethod === method.id
                          ? 'border-turquoise bg-turquoise'
                          : 'border-gray-300'
                      }`}>
                        {selectedMethod === method.id && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Action */}
              {selectedMethod === 'stripe' && (
                <button
                  onClick={handleStripePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-coral-orange to-turquoise hover:from-coral-orange/90 hover:to-turquoise/90 text-white font-montserrat font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-turquoise/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Pay with Card</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </button>
              )}

              {selectedMethod === 'paypal' && (
                <div className="w-full">
                  <PayPalScriptProvider options={{
                    clientId: paymentConfig.paypal.clientId,
                    currency: paymentConfig.paypal.currency,
                    intent: paymentConfig.paypal.intent,
                  }}>
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create(
                          createPayPalOrderConfig(bookingData.total, {
                            bookingId: bookingData.bookingId,
                            tripId: bookingData.tripId,
                            destination: bookingData.destination,
                            groupSize: bookingData.groupSize,
                            email: bookingData.email,
                            firstName: bookingData.firstName,
                            lastName: bookingData.lastName,
                          })
                        )
                      }}
                      onApprove={handlePayPalSuccess}
                      onError={handlePayPalError}
                      onCancel={handlePayPalCancel}
                      style={{
                        layout: 'horizontal',
                        color: 'blue',
                        shape: 'rect',
                        label: 'pay',
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <p className="text-red-800 font-medium">{errorMessage}</p>
                </div>
              )}

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                  {paymentConfig.trustBadges.map((badge) => (
                    <div key={badge.name} className="flex items-center space-x-1">
                      <span>{badge.icon}</span>
                      <span>{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-deep-navy to-turquoise rounded-2xl p-6 text-white sticky top-6">
            <h3 className="font-montserrat text-xl font-bold mb-4">
              Order Summary
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="font-open-sans">Destination:</span>
                <span className="font-montserrat font-semibold">{bookingData.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-open-sans">Group Size:</span>
                <span className="font-montserrat font-semibold">{bookingData.groupSize} {bookingData.groupSize === 1 ? 'person' : 'people'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-open-sans">Booking ID:</span>
                <span className="font-montserrat font-semibold text-sm">{bookingData.bookingId}</span>
              </div>
            </div>

            <div className="border-t border-white/20 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-open-sans text-lg">Total Amount:</span>
                <span className="font-montserrat font-bold text-2xl">
                  €{bookingData.total.toLocaleString()}
                </span>
              </div>
              <p className="text-white/70 text-sm mt-1">All taxes and fees included</p>
            </div>

            {/* Security Notice */}
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-green-300" />
                <span className="font-montserrat font-semibold text-sm">Secure Payment</span>
              </div>
              <p className="text-white/80 text-xs">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-deep-navy hover:text-turquoise transition-colors font-medium"
        >
          <span>←</span>
          <span>Back to Booking Details</span>
        </button>
      </div>
    </div>
  )
}
