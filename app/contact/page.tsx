import type React from "react"
import { Phone, Mail } from "lucide-react"
import type { Metadata } from "next"

import { Navigation } from "@/components/navigation"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { FloatingActionButtons } from "@/components/floating-action-buttons"
import { DestinationFocusedMap } from "@/components/destination-focused-map"
import { ContactForm } from "@/components/contact-form"
import { QuickContactActions } from "@/components/quick-contact-actions"

export const metadata: Metadata = {
  title: "Contact Kite Safari | Book Kitesurfing Vacation | KiteSafaris.com",
  description: "Contact our kite safari experts to book your kitesurfing vacation! Get personalized assistance for luxury catamaran adventures across Caribbean & Mediterranean.",
}

export default function ContactPage() {

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-deep-navy via-turquoise to-sand-beige py-20 overflow-hidden">
        {/* Ocean Wave Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        {/* Floating Kite Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-16 h-16 opacity-20 animate-pulse">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute top-20 right-20 w-12 h-12 opacity-15 animate-pulse" style={{animationDelay: '1s'}}>
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 opacity-10 animate-pulse" style={{animationDelay: '2s'}}>
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="font-montserrat text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Get In Touch
            </h1>
            <p className="font-open-sans text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Ready to embark on your kiteboarding safari adventure? Contact our team for personalized assistance and expert guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Quick Contact Form */}
            <ContactForm />

            {/* Contact Information & Quick Actions */}
            <div className="space-y-8">
              <div>
                <h2 className="font-montserrat text-2xl font-bold text-deep-navy mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-turquoise rounded-full p-3 mr-4">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-deep-navy mb-1">Phone</h3>
                      <p className="font-open-sans text-gray-700">+32 492 57 64 27</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-turquoise rounded-full p-3 mr-4">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-deep-navy mb-1">Email</h3>
                      <p className="font-open-sans text-gray-700">info@kitesafaris.com</p>
                      <p className="font-open-sans text-gray-700">bookings@kitesafaris.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-turquoise rounded-full p-3 mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-deep-navy mb-1">Home Base</h3>
                      <p className="font-open-sans text-gray-700">Punta Trettu</p>
                      <p className="font-open-sans text-gray-700">Sardinia, Italy</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Options */}
              <QuickContactActions />

              {/* Business Hours */}
              <div>
                <h3 className="font-montserrat text-xl font-bold text-deep-navy mb-4">Business Hours</h3>
                <div className="space-y-2 font-open-sans text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 8:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>10:00 AM - 4:00 PM EST</span>
                  </div>
                </div>
                <p className="font-open-sans text-sm text-gray-600 mt-4">
                  * Emergency support available 24/7 during active trips
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embarkation Points Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-4">Embarkation Points</h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Our kitesafaris depart from premium marinas in each destination
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DestinationFocusedMap
              destination={{
                id: "antigua",
                name: "Jolly Harbor Marina",
                coordinates: { lat: 17.0475, lng: -61.8658 },
                zoom: 12,
              }}
            />
            <DestinationFocusedMap
              destination={{
                id: "greece",
                name: "Athens Marina",
                coordinates: { lat: 37.9755, lng: 23.7348 },
                zoom: 12,
              }}
            />
            <DestinationFocusedMap
              destination={{
                id: "sardinia",
                name: "Punta Trettu Base",
                coordinates: { lat: 39.0458, lng: 8.8394 },
                zoom: 12,
              }}
            />
          </div>
        </div>
      </section>

      <EnhancedFooter />
      <FloatingActionButtons />
    </>
  )
}
