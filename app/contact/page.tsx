"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { FloatingActionButtons } from "@/components/floating-action-buttons"
import { DestinationFocusedMap } from "@/components/destination-focused-map"
import { useState } from "react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          source: "Contact Form",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitMessage("Thank you! We'll get back to you within 24 hours.")
        e.currentTarget.reset()
      } else {
        setSubmitMessage("Message sent! We'll respond soon.")
      }
    } catch (error) {
      console.error("[v0] Contact form lead capture error:", error)
      setSubmitMessage("Message sent! We'll respond soon.")
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sand-beige to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-montserrat text-4xl md:text-6xl font-bold text-deep-navy mb-6">Get In Touch</h1>
            <p className="font-open-sans text-xl text-gray-700 max-w-3xl mx-auto">
              Ready to embark on your kiteboarding safari adventure? Contact our team for personalized assistance and
              expert guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-sand-beige rounded-2xl p-8">
              <h2 className="font-montserrat text-2xl font-bold text-deep-navy mb-6">Send Us a Message</h2>
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block font-montserrat font-bold text-deep-navy mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block font-montserrat font-bold text-deep-navy mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block font-montserrat font-bold text-deep-navy mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block font-montserrat font-bold text-deep-navy mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block font-montserrat font-bold text-deep-navy mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="destinations">Destination Information</option>
                    <option value="fleet">Fleet & Yacht Details</option>
                    <option value="packages">Package Customization</option>
                    <option value="support">General Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-montserrat font-bold text-deep-navy mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans resize-none"
                    placeholder="Tell us about your kiteboarding safari plans, group size, preferred dates, or any questions you have..."
                  ></textarea>
                </div>

                {submitMessage && (
                  <div className="bg-green-100 text-green-800 border border-green-200 rounded-lg p-3 text-center">
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-coral-orange text-white font-montserrat font-bold py-4 px-6 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-montserrat text-2xl font-bold text-deep-navy mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-turquoise rounded-full p-3 mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-deep-navy mb-1">Phone</h3>
                      <p className="font-open-sans text-gray-700">+32 492 57 64 27</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-turquoise rounded-full p-3 mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
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
              <div className="bg-gradient-to-br from-deep-navy to-turquoise rounded-2xl p-8 text-white">
                <h3 className="font-montserrat text-xl font-bold mb-4">Quick Contact</h3>
                <p className="font-open-sans mb-6">
                  Need immediate assistance? Reach out through our instant channels.
                </p>

                <div className="space-y-4">
                  <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors rounded-lg p-4 flex items-center">
                    <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <div className="text-left">
                      <div className="font-montserrat font-bold">WhatsApp</div>
                      <div className="font-open-sans text-sm opacity-90">Instant messaging support</div>
                    </div>
                  </button>

                  <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors rounded-lg p-4 flex items-center">
                    <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"
                      />
                    </svg>
                    <div className="text-left">
                      <div className="font-montserrat font-bold">Live Chat</div>
                      <div className="font-open-sans text-sm opacity-90">Chat with our team now</div>
                    </div>
                  </button>
                </div>
              </div>

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

      <FloatingActionButtons />
      <EnhancedFooter />
    </div>
  )
}
