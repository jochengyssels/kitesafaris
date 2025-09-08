import Navigation from "@/components/navigation"
import { EnhancedFooter } from "@/components/enhanced-footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book Your Advanced Kite Clinic - Next Level Kitesurfing Mastery | KiteSafaris",
  description: "Secure your spot in our elite 7-day advanced kitesurfing coaching program in Punta Trettu, Sardinia. June 30 - July 6, 2025. Limited to 8 participants.",
  keywords: "advanced kitesurfing clinic booking, Sardinia kite clinic, Punta Trettu advanced lessons, elite kitesurfing coaching, advanced kite clinic 2025",
  alternates: {
    canonical: "https://www.kitesafaris.com/contact/advanced-clinic",
  },
  openGraph: {
    title: "Book Your Advanced Kite Clinic - Next Level Kitesurfing Mastery",
    description: "Secure your spot in our elite 7-day advanced kitesurfing coaching program in Punta Trettu, Sardinia. June 30 - July 6, 2025. Limited to 8 participants.",
    url: "https://www.kitesafaris.com/contact/advanced-clinic",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://www.kitesafaris.com/images/advanced-clinic-booking.jpg",
        width: 1200,
        height: 630,
        alt: "Advanced kitesurfing clinic booking in Sardinia",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function AdvancedClinicContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-deep-navy via-turquoise-600 to-coral-orange text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6 leading-tight">
              Book Your Transformation
            </h1>
            <p className="text-xl md:text-2xl font-open-sans mb-8 leading-relaxed">
              Next Level Kite Clinic - Advanced Kitesurfing Mastery
            </p>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              June 30 - July 6, 2025 • <Link href="/destinations/sardinia/punta-trettu" className="text-white hover:text-turquoise-300 underline">Punta Trettu</Link>, <Link href="/destinations/sardinia" className="text-white hover:text-turquoise-300 underline">Sardinia</Link> • Limited to 8 Participants
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-deep-navy mb-6">Secure Your Spot</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below to reserve your place in our elite advanced kitesurfing clinic. 
                  Our team will contact you within 24 hours to discuss your goals and complete your booking.
                </p>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-deep-navy mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-deep-navy mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-deep-navy mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-deep-navy mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-semibold text-deep-navy mb-2">
                      Country of Residence *
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                    >
                      <option value="">Select your country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="IT">Italy</option>
                      <option value="ES">Spain</option>
                      <option value="NL">Netherlands</option>
                      <option value="BE">Belgium</option>
                      <option value="CH">Switzerland</option>
                      <option value="AT">Austria</option>
                      <option value="AU">Australia</option>
                      <option value="NZ">New Zealand</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="skillLevel" className="block text-sm font-semibold text-deep-navy mb-2">
                      Current Kitesurfing Skill Level *
                    </label>
                    <select
                      id="skillLevel"
                      name="skillLevel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                    >
                      <option value="">Select your skill level</option>
                      <option value="intermediate">Intermediate - Can ride upwind consistently</option>
                      <option value="advanced-beginner">Advanced Beginner - Basic upwind riding</option>
                      <option value="advanced">Advanced - Comfortable with jumps and tricks</option>
                      <option value="expert">Expert - Competition level rider</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="primaryGoals" className="block text-sm font-semibold text-deep-navy mb-2">
                      Primary Goals for the Clinic *
                    </label>
                    <select
                      id="primaryGoals"
                      name="primaryGoals"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                    >
                      <option value="">Select your primary goal</option>
                      <option value="big-air">Big Air & Megaloops</option>
                      <option value="freestyle">Freestyle & Unhooked Tricks</option>
                      <option value="strapless">Strapless & Wave Riding</option>
                      <option value="foil">Foil Kiting</option>
                      <option value="winging">Wing Foiling</option>
                      <option value="general-advancement">General Advanced Techniques</option>
                      <option value="competition-prep">Competition Preparation</option>
                      <option value="instructor-path">Instructor Pathway</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="secondaryGoals" className="block text-sm font-semibold text-deep-navy mb-2">
                      Secondary Interests
                    </label>
                    <select
                      id="secondaryGoals"
                      name="secondaryGoals"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                    >
                      <option value="">Select secondary interest (optional)</option>
                      <option value="big-air">Big Air & Megaloops</option>
                      <option value="freestyle">Freestyle & Unhooked Tricks</option>
                      <option value="strapless">Strapless & Wave Riding</option>
                      <option value="foil">Foil Kiting</option>
                      <option value="winging">Wing Foiling</option>
                      <option value="safety-advanced">Advanced Safety Protocols</option>
                      <option value="equipment-optimization">Equipment Optimization</option>
                      <option value="weather-assessment">Weather Assessment Skills</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="previousExperience" className="block text-sm font-semibold text-deep-navy mb-2">
                      Previous Advanced Training Experience
                    </label>
                    <select
                      id="previousExperience"
                      name="previousExperience"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                    >
                      <option value="">Select your experience level</option>
                      <option value="none">No formal advanced training</option>
                      <option value="some-lessons">Some advanced lessons taken</option>
                      <option value="multiple-clinics">Multiple advanced clinics attended</option>
                      <option value="instructor-training">Instructor training completed</option>
                      <option value="competition-experience">Competition experience</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="accommodation" className="block text-sm font-semibold text-deep-navy mb-2">
                      Accommodation Preference
                    </label>
                    <select
                      id="accommodation"
                      name="accommodation"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                    >
                      <option value="">Select accommodation preference</option>
                      <option value="included">Use included accommodation</option>
                      <option value="upgrade">Upgrade to premium accommodation</option>
                      <option value="own-arrangement">Arrange my own accommodation</option>
                      <option value="discuss">Discuss options with team</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-deep-navy mb-2">
                      Additional Information
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                      placeholder="Tell us about your kitesurfing journey, specific techniques you want to master, any injuries or limitations we should know about, or any other relevant information..."
                    ></textarea>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      required
                      className="mt-1 w-4 h-4 text-coral-orange border-gray-300 rounded focus:ring-coral-orange"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the <Link href="/policies/terms" className="text-coral-orange hover:underline">Terms of Service</Link> and 
                      <Link href="/policies/privacy" className="text-coral-orange hover:underline"> Privacy Policy</Link>. 
                      I understand this is a premium advanced clinic with specific requirements and safety protocols.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-coral-orange hover:bg-orange-500 text-white py-4 px-8 rounded-lg font-semibold transition-colors"
                  >
                    Reserve My Spot in the Advanced Clinic
                  </button>
                </form>
              </div>

              {/* Program Details */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-deep-navy mb-6">Program Highlights</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-turquoise-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-navy">20 Hours Advanced Coaching</h4>
                        <p className="text-sm text-gray-600">Intensive skill development with certified professionals</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-turquoise-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-navy">Maximum 8 Participants</h4>
                        <p className="text-sm text-gray-600">Ensuring personalized attention and rapid progression</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-turquoise-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-navy">Professional Video Analysis</h4>
                        <p className="text-sm text-gray-600">Drone footage and frame-by-frame technique breakdown</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-turquoise-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-navy">All-Inclusive Package</h4>
                        <p className="text-sm text-gray-600">Accommodation, meals, coaching, and activities included</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-turquoise-50 to-sand-beige-50 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-deep-navy mb-6">What Happens Next?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-coral-orange rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-navy">Form Submission</h4>
                        <p className="text-sm text-gray-600">We receive your application and review your goals</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-coral-orange rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-navy">Personal Consultation</h4>
                        <p className="text-sm text-gray-600">24-hour response with personalized program discussion</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-coral-orange rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-navy">Booking Confirmation</h4>
                        <p className="text-sm text-gray-600">Secure your spot with payment and receive preparation guide</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-coral-orange rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-navy">Pre-Clinic Preparation</h4>
                        <p className="text-sm text-gray-600">Equipment consultation and goal refinement</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-deep-navy mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-turquoise-100 rounded-full flex items-center justify-center">
                        <span className="text-turquoise-600">📞</span>
                      </div>
                      <div>
                        <p className="font-semibold text-deep-navy">Phone</p>
                        <a href="tel:+32492576427" className="text-gray-600 hover:text-coral-orange">
                          +32 492 57 64 27
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-turquoise-100 rounded-full flex items-center justify-center">
                        <span className="text-turquoise-600">✉️</span>
                      </div>
                      <div>
                        <p className="font-semibold text-deep-navy">Email</p>
                        <a href="mailto:info@kitesafaris.com" className="text-gray-600 hover:text-coral-orange">
                          info@kitesafaris.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-turquoise-100 rounded-full flex items-center justify-center">
                        <span className="text-turquoise-600">📍</span>
                      </div>
                      <div>
                        <p className="font-semibold text-deep-navy">Location</p>
                        <p className="text-gray-600">Punta Trettu, Sardinia, Italy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </main>
  )
}
