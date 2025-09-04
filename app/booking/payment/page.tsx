"use client"

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { EnhancedFooter } from '@/components/enhanced-footer'
import { PaymentStep } from '@/components/payment-step'
import { PaymentConfirmation } from '@/components/payment-confirmation'
import { FloatingActionButtons } from '@/components/floating-action-buttons'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<'payment' | 'confirmation'>('payment')
  const [paymentData, setPaymentData] = useState<any>(null)
  const [bookingData, setBookingData] = useState<any>(null)

  useEffect(() => {
    // Check if we have a session_id from Stripe (payment success)
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      // Handle Stripe success redirect
      handleStripeSuccess(sessionId)
    }

    // Load booking data from localStorage or URL params
    loadBookingData()
  }, [searchParams])

  const loadBookingData = () => {
    try {
      // Try to get booking data from localStorage
      const stored = localStorage.getItem('kitesafaris_booking')
      if (stored) {
        const data = JSON.parse(stored)
        setBookingData(data)
        return
      }

      // Fallback: try to get from URL params
      const tripId = searchParams.get('tripId')
      const destination = searchParams.get('destination')
      const groupSize = searchParams.get('groupSize')
      const total = searchParams.get('total')

      if (tripId && destination && groupSize && total) {
        const data = {
          tripId,
          destination,
          groupSize: parseInt(groupSize),
          total: parseFloat(total),
          currency: 'EUR',
          bookingId: generateBookingId(),
          email: searchParams.get('email') || '',
          firstName: searchParams.get('firstName') || '',
          lastName: searchParams.get('lastName') || '',
        }
        setBookingData(data)
        // Store in localStorage for persistence
        localStorage.setItem('kitesafaris_booking', JSON.stringify(data))
      } else {
        // No booking data found, redirect to booking form
        router.push('/booking')
      }
    } catch (error) {
      console.error('Error loading booking data:', error)
      router.push('/booking')
    }
  }

  const generateBookingId = () => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `BK-${timestamp}-${random}`
  }

  const handleStripeSuccess = async (sessionId: string) => {
    try {
      // Verify the payment with our backend
      const response = await fetch('/api/payments/verify-stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      })

      if (response.ok) {
        const data = await response.json()
        setPaymentData(data.paymentData)
        setCurrentStep('confirmation')
      } else {
        console.error('Failed to verify Stripe payment')
        // Stay on payment step to retry
      }
    } catch (error) {
      console.error('Error verifying Stripe payment:', error)
    }
  }

  const handlePaymentSuccess = (data: any) => {
    setPaymentData(data)
    setCurrentStep('confirmation')
    
    // Clear booking data from localStorage
    localStorage.removeItem('kitesafaris_booking')
  }

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error)
    // Error is already handled in the PaymentStep component
  }

  const handleBack = () => {
    router.push('/booking')
  }

  const handleDownloadInvoice = () => {
    // TODO: Implement invoice download
    console.log('Downloading invoice for:', paymentData?.bookingId)
  }

  const handleSendEmail = () => {
    // TODO: Implement email resend
    console.log('Resending email for:', paymentData?.bookingId)
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
        {currentStep === 'payment' && (
          <PaymentStep
            bookingData={bookingData}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
            onBack={handleBack}
          />
        )}

        {currentStep === 'confirmation' && paymentData && (
          <PaymentConfirmation
            paymentData={paymentData}
            onDownloadInvoice={handleDownloadInvoice}
            onSendEmail={handleSendEmail}
          />
        )}
      </main>

      <EnhancedFooter />
      <FloatingActionButtons />
    </>
  )
}
