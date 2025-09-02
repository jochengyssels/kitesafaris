import { Navigation } from "@/components/navigation"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { FloatingActionButtons } from "@/components/floating-action-buttons"
import Image from "next/image"
import Link from "next/link"

export default function PremiumCatamaranPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sand-beige to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-turquoise text-white px-4 py-2 rounded-full font-montserrat font-bold text-sm mb-4">
                Premium Fleet
              </div>
              <h1 className="font-montserrat text-4xl md:text-6xl font-bold text-deep-navy mb-6">
                Premium Catamaran
              </h1>
              <p className="font-open-sans text-xl text-gray-700 mb-8">
                Our flagship premium catamaran offering the ultimate luxury experience with professional chef service, 
                high-speed Wi-Fi, and personalized kiting instruction for discerning guests seeking excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking" className="bg-deep-navy text-white font-montserrat font-bold py-4 px-8 rounded-lg hover:bg-opacity-90 transition-colors text-center">
                  Book This Yacht
                </Link>
                <Link href="/fleet" className="border-2 border-deep-navy text-deep-navy font-montserrat font-bold py-4 px-8 rounded-lg hover:bg-deep-navy hover:text-white transition-colors text-center">
                  View All Fleet
                </Link>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/modern-catamaran-sailing-yacht-with-kite-equipment.png"
                alt="Premium Catamaran - Luxury catamaran for premium kiteboarding safaris"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Specifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-4">Technical Specifications</h2>
            <p className="font-open-sans text-lg text-gray-700">
              Premium-grade catamaran designed for luxury kiteboarding safaris worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-sand-beige rounded-xl p-6 text-center">
              <div className="bg-turquoise rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Capacity</h3>
              <p className="font-open-sans text-2xl font-bold text-turquoise">6 Guests</p>
              <p className="font-open-sans text-sm text-gray-600">Maximum passengers</p>
            </div>

            <div className="bg-sand-beige rounded-xl p-6 text-center">
              <div className="bg-turquoise rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Cabins</h3>
              <p className="font-open-sans text-2xl font-bold text-turquoise">3 Cabins</p>
              <p className="font-open-sans text-sm text-gray-600">Luxury accommodations</p>
            </div>

            <div className="bg-sand-beige rounded-xl p-6 text-center">
              <div className="bg-turquoise rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Destinations</h3>
              <p className="font-open-sans text-2xl font-bold text-turquoise">Global</p>
              <p className="font-open-sans text-sm text-gray-600">Worldwide locations</p>
            </div>

            <div className="bg-sand-beige rounded-xl p-6 text-center">
              <div className="bg-turquoise rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Service</h3>
              <p className="font-open-sans text-2xl font-bold text-turquoise">All-Inclusive</p>
              <p className="font-open-sans text-sm text-gray-600">Premium amenities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-16 bg-gradient-to-br from-sand-beige to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-4">Premium Features</h2>
            <p className="font-open-sans text-lg text-gray-700">
              Exclusive amenities and services that define luxury kiteboarding experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="bg-turquoise rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Professional Chef</h3>
              <p className="font-open-sans text-gray-600">Gourmet meals prepared with fresh, local ingredients</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="bg-turquoise rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">High-Speed Wi-Fi</h3>
              <p className="font-open-sans text-gray-600">Stay connected with reliable internet throughout your journey</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="bg-turquoise rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Personal Instructor</h3>
              <p className="font-open-sans text-gray-600">One-on-one kiting instruction tailored to your skill level</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="bg-turquoise rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Luxury Amenities</h3>
              <p className="font-open-sans text-gray-600">Premium bedding, spa-quality bathrooms, and entertainment systems</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="bg-turquoise rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Flexible Scheduling</h3>
              <p className="font-open-sans text-gray-600">Customizable itineraries and departure times</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="bg-turquoise rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Safety & Security</h3>
              <p className="font-open-sans text-gray-600">Advanced safety systems and professional crew</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Specifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-6">Vessel Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Length Overall</span>
                  <span className="font-open-sans text-gray-900">55 feet (16.76m)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Beam</span>
                  <span className="font-open-sans text-gray-900">28 feet (8.53m)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Draft</span>
                  <span className="font-open-sans text-gray-900">5 feet (1.52m)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Displacement</span>
                  <span className="font-open-sans text-gray-900">22 tons</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Fuel Capacity</span>
                  <span className="font-open-sans text-gray-900">300 gallons (1,136L)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Water Capacity</span>
                  <span className="font-open-sans text-gray-900">200 gallons (757L)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Engine</span>
                  <span className="font-open-sans text-gray-900">2x 75HP Diesel</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Cruising Speed</span>
                  <span className="font-open-sans text-gray-900">10-12 knots</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-6">Premium Kiteboarding Features</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-turquoise rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-deep-navy">Personal Kiting Instructor</h4>
                    <p className="font-open-sans text-gray-600 text-sm">One-on-one instruction tailored to your skill level</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-turquoise rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-deep-navy">Premium Equipment Storage</h4>
                    <p className="font-open-sans text-gray-600 text-sm">Climate-controlled storage with security systems</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-turquoise rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-deep-navy">Advanced Safety Systems</h4>
                    <p className="font-open-sans text-gray-600 text-sm">Professional rescue boat and emergency equipment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-turquoise rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-deep-navy">Global Destinations</h4>
                    <p className="font-open-sans text-gray-600 text-sm">Access to world-class kiteboarding locations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-16 bg-gradient-to-br from-sand-beige to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-4">Why Choose Our Premium Catamaran?</h2>
            <p className="font-open-sans text-lg text-gray-700">
              Experience the pinnacle of luxury kiteboarding with unmatched service and amenities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-turquoise rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Luxury Experience</h3>
              <p className="font-open-sans text-gray-600">
                Premium amenities, gourmet dining, and personalized service create an unparalleled luxury experience.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-turquoise rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Personal Instruction</h3>
              <p className="font-open-sans text-gray-600">
                One-on-one kiting instruction from certified professionals, customized to your skill level and goals.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-turquoise rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Global Destinations</h3>
              <p className="font-open-sans text-gray-600">
                Access to the world's most exclusive kiteboarding locations with expert local knowledge and guidance.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-turquoise rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Stay Connected</h3>
              <p className="font-open-sans text-gray-600">
                High-speed Wi-Fi and modern communication systems keep you connected even in remote locations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-turquoise rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Gourmet Dining</h3>
              <p className="font-open-sans text-gray-600">
                Professional chef service with fresh, local ingredients and customized meal plans for your preferences.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-turquoise rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Ultimate Safety</h3>
              <p className="font-open-sans text-gray-600">
                Advanced safety systems, professional crew, and comprehensive emergency protocols ensure your security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-deep-navy to-turquoise">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-6">
            Ready for Your Premium Kiteboarding Experience?
          </h2>
          <p className="font-open-sans text-xl text-white/90 mb-8">
            Book your spot on our Premium Catamaran and experience the ultimate luxury kiteboarding safari with world-class service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-turquoise text-deep-navy font-montserrat font-bold py-4 px-8 rounded-lg hover:bg-opacity-90 transition-colors text-center">
              Book Now
            </Link>
            <Link href="/contact" className="border-2 border-white text-white font-montserrat font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-deep-navy transition-colors text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <FloatingActionButtons />
      <EnhancedFooter />
    </div>
  )
}
