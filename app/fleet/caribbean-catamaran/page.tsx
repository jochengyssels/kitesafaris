import { Navigation } from "@/components/navigation"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { FloatingActionButtons } from "@/components/floating-action-buttons"
import Image from "next/image"
import Link from "next/link"

export default function CaribbeanCatamaranPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sand-beige to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-coral-orange text-white px-4 py-2 rounded-full font-montserrat font-bold text-sm mb-4">
                Caribbean Fleet
              </div>
              <h1 className="font-montserrat text-4xl md:text-6xl font-bold text-deep-navy mb-6">
                Caribbean Catamaran
              </h1>
              <p className="font-open-sans text-xl text-gray-700 mb-8">
                Our flagship Caribbean catamaran designed for luxury kiteboarding safaris in Antigua waters. 
                Experience the perfect blend of comfort, performance, and adventure.
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
                src="/antigua-jolly-harbor-kiting.png"
                alt="Caribbean Catamaran - Luxury catamaran for Caribbean kiteboarding safaris"
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
              Professional-grade catamaran designed for kiteboarding excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-sand-beige rounded-xl p-6 text-center">
              <div className="bg-coral-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Capacity</h3>
              <p className="font-open-sans text-2xl font-bold text-coral-orange">6 Guests</p>
              <p className="font-open-sans text-sm text-gray-600">Maximum passengers</p>
            </div>

            <div className="bg-sand-beige rounded-xl p-6 text-center">
              <div className="bg-coral-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Cabins</h3>
              <p className="font-open-sans text-2xl font-bold text-coral-orange">3 Cabins</p>
              <p className="font-open-sans text-sm text-gray-600">Private accommodations</p>
            </div>

            <div className="bg-sand-beige rounded-xl p-6 text-center">
              <div className="bg-coral-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Crew</h3>
              <p className="font-open-sans text-2xl font-bold text-coral-orange">Professional</p>
              <p className="font-open-sans text-sm text-gray-600">Certified captain & crew</p>
            </div>

            <div className="bg-sand-beige rounded-xl p-6 text-center">
              <div className="bg-coral-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Location</h3>
              <p className="font-open-sans text-2xl font-bold text-coral-orange">Antigua</p>
              <p className="font-open-sans text-sm text-gray-600">Caribbean waters</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Specifications */}
      <section className="py-16 bg-gradient-to-br from-sand-beige to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-6">Vessel Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Length Overall</span>
                  <span className="font-open-sans text-gray-900">50 feet (15.24m)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Beam</span>
                  <span className="font-open-sans text-gray-900">25 feet (7.62m)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Draft</span>
                  <span className="font-open-sans text-gray-900">4.5 feet (1.37m)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Displacement</span>
                  <span className="font-open-sans text-gray-900">18 tons</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Fuel Capacity</span>
                  <span className="font-open-sans text-gray-900">200 gallons (757L)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Water Capacity</span>
                  <span className="font-open-sans text-gray-900">150 gallons (568L)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Engine</span>
                  <span className="font-open-sans text-gray-900">2x 50HP Diesel</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-open-sans font-semibold text-gray-700">Cruising Speed</span>
                  <span className="font-open-sans text-gray-900">8-10 knots</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-6">Kiteboarding Features</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-turquoise rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-deep-navy">Dedicated Kite Storage</h4>
                    <p className="font-open-sans text-gray-600 text-sm">Secure storage for kites, boards, and equipment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-turquoise rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-deep-navy">Rescue Boat</h4>
                    <p className="font-open-sans text-gray-600 text-sm">Professional rescue boat for safety and support</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-turquoise rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-deep-navy">Equipment Drying Area</h4>
                    <p className="font-open-sans text-gray-600 text-sm">Designated space for drying wet gear</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-turquoise rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-deep-navy">Professional Crew</h4>
                    <p className="font-open-sans text-gray-600 text-sm">Experienced crew with kiteboarding knowledge</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-4">Why Choose Our Caribbean Catamaran?</h2>
            <p className="font-open-sans text-lg text-gray-700">
              Experience the advantages that set us apart from the competition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-sand-beige to-white rounded-xl p-6 shadow-lg">
              <div className="bg-coral-orange rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Safety First</h3>
              <p className="font-open-sans text-gray-600">
                Professional rescue boat, certified crew, and comprehensive safety equipment ensure your kiteboarding adventure is secure.
              </p>
            </div>

            <div className="bg-gradient-to-br from-sand-beige to-white rounded-xl p-6 shadow-lg">
              <div className="bg-coral-orange rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Expert Knowledge</h3>
              <p className="font-open-sans text-gray-600">
                Our crew knows the best kiteboarding spots in Antigua, optimal wind conditions, and local weather patterns.
              </p>
            </div>

            <div className="bg-gradient-to-br from-sand-beige to-white rounded-xl p-6 shadow-lg">
              <div className="bg-coral-orange rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Luxury Comfort</h3>
              <p className="font-open-sans text-gray-600">
                Spacious cabins, professional galley, and premium amenities provide the perfect balance of adventure and comfort.
              </p>
            </div>

            <div className="bg-gradient-to-br from-sand-beige to-white rounded-xl p-6 shadow-lg">
              <div className="bg-coral-orange rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Prime Locations</h3>
              <p className="font-open-sans text-gray-600">
                Access to the best kiteboarding spots in Antigua, including Jolly Harbor, Falmouth Harbor, and English Harbor.
              </p>
            </div>

            <div className="bg-gradient-to-br from-sand-beige to-white rounded-xl p-6 shadow-lg">
              <div className="bg-coral-orange rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Flexible Scheduling</h3>
              <p className="font-open-sans text-gray-600">
                Customizable itineraries and flexible departure times to maximize your kiteboarding experience.
              </p>
            </div>

            <div className="bg-gradient-to-br from-sand-beige to-white rounded-xl p-6 shadow-lg">
              <div className="bg-coral-orange rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-3">Group Experience</h3>
              <p className="font-open-sans text-gray-600">
                Perfect for groups of up to 6 people, creating unforgettable memories together on the water.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-deep-navy to-turquoise">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-6">
            Ready for Your Caribbean Kiteboarding Adventure?
          </h2>
          <p className="font-open-sans text-xl text-white/90 mb-8">
            Book your spot on our Caribbean Catamaran and experience the ultimate kiteboarding safari in Antigua waters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-coral-orange text-white font-montserrat font-bold py-4 px-8 rounded-lg hover:bg-opacity-90 transition-colors text-center">
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
