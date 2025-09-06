import { Suspense } from 'react'
import { CheckCircle, Mail, CreditCard, Calendar, Users, MapPin, ArrowLeft, Phone, MessageCircle } from 'lucide-react'
import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { EnhancedFooter } from '@/components/enhanced-footer'

export const metadata: Metadata = {
  title: 'Booking Confirmation - KiteSafaris',
  description: 'Your booking has been confirmed. Thank you for choosing KiteSafaris!',
  robots: 'noindex, nofollow',
}

function SuccessContent() {
  return (
    <div className="min-h-screen bg-sand-beige-50">
      {/* Google Analytics Conversion Tracking */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            gtag('event', 'conversion', {
                'send_to': 'AW-17339640596/ieJkCL3Zye4aEJTWl8xA',
                'value': 0.0,
                'currency': 'EUR',
                'transaction_id': ''
            });
          `,
        }}
      />
      <Navigation />
      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-coral-orange/10 rounded-full mb-6 border-4 border-coral-orange/20">
              <CheckCircle className="w-12 h-12 text-coral-orange" />
            </div>
            <h1 className="text-4xl font-bold text-deep-navy mb-4 font-montserrat">
              Thank You!
            </h1>
            <p className="text-xl text-gray-600 font-open-sans">
              Your booking request has been received successfully.
            </p>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-deep-navy mb-2 font-montserrat">
                What Happens Next?
              </h2>
              <p className="text-gray-600 font-open-sans">
                We'll be in touch within 24 hours to confirm your booking details.
              </p>
            </div>

            {/* Next Steps */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-coral-orange/10 rounded-full flex items-center justify-center border-2 border-coral-orange/20">
                    <Mail className="w-6 h-6 text-coral-orange" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-deep-navy mb-1 font-montserrat">
                    Confirmation Email
                  </h3>
                  <p className="text-gray-600 text-sm font-open-sans">
                    You'll receive a detailed confirmation email with all your trip information.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-green-50/50 rounded-lg border border-green-100">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-200">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-deep-navy mb-1 font-montserrat">
                    Availability Confirmation
                  </h3>
                  <p className="text-gray-600 text-sm font-open-sans">
                    We'll confirm cabin availability and send you payment instructions if needed.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-purple-50/50 rounded-lg border border-purple-100">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center border-2 border-purple-200">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-deep-navy mb-1 font-montserrat">
                    Trip Preparation
                  </h3>
                  <p className="text-gray-600 text-sm font-open-sans">
                    We'll send you detailed trip information, packing lists, and arrival instructions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-deep-navy text-white rounded-2xl p-8 text-center border border-deep-navy/20">
            <h3 className="text-xl font-semibold mb-4 font-montserrat">
              Questions? We're Here to Help!
            </h3>
            <div className="space-y-3 text-gray-300 font-open-sans">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@kitesafaris.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+32 492 57 64 27</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +32 492 57 64 27</span>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-coral-orange text-white rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors font-montserrat"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <a
              href="/"
              className="inline-flex items-center text-deep-navy hover:text-coral-orange transition-colors font-semibold font-montserrat"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </a>
          </div>
        </div>
      </div>
      <EnhancedFooter />
    </div>
  )
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-sand-beige-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-orange"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
