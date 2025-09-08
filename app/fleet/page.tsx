import { Navigation } from "@/components/navigation"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { FloatingActionButtons } from "@/components/floating-action-buttons"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Luxury Catamaran Fleet | Kite Safari Boats | KiteSafaris.com",
  description: "Discover our luxury catamaran fleet and kite safari boats! Premium vessels with professional crew, safety equipment & kite storage for unforgettable adventures.",
}

export default function FleetPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sand-beige to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-montserrat text-4xl md:text-6xl font-bold text-deep-navy mb-6">Our Premium Fleet</h1>
            <p className="font-open-sans text-xl text-gray-700 max-w-3xl mx-auto">
              Discover our collection of luxury catamarans, each designed for the ultimate kiteboarding safari
              experience with professional crew and top-tier amenities.
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Fleet Type 1 - Caribbean Catamaran */}
            <div className="bg-sand-beige rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src="https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-catamaran-islands-view.jpg"
                  alt="Luxury catamaran kitesurfing Caribbean Antigua kite safari boats professional crew"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
                <div className="absolute top-4 left-4 bg-coral-orange text-white px-3 py-1 rounded-full font-montserrat font-bold text-sm">
                  Caribbean
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-xl font-bold text-deep-navy mb-4">Caribbean Catamaran</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-turquoise mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="font-open-sans text-sm text-gray-700">6 Guests</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-turquoise mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span className="font-open-sans text-sm text-gray-700">3 Cabins</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-turquoise mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                      />
                    </svg>
                    <span className="font-open-sans text-sm text-gray-700">Antigua Waters</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-turquoise mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="font-open-sans text-sm text-gray-700">Professional Crew</span>
                  </div>
                </div>
                <p className="font-open-sans text-gray-600 text-sm mb-4">
                  Our flagship Caribbean catamaran featuring 3 cabins, professional galley, and dedicated kite storage.
                  Perfect for groups seeking luxury and adventure in Antigua waters.
                </p>
                <Link href="/fleet/caribbean-catamaran" className="block w-full bg-deep-navy text-white font-montserrat font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors text-center">
                  View Details
                </Link>
              </div>
            </div>

            {/* Fleet Type 2 - Mediterranean Catamaran */}
            <div className="bg-sand-beige rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src="https://daggzx92agk0rfom.public.blob.vercel-storage.com/catamaran:img-sailing-nature.jpg"
                  alt="Luxury catamaran kitesurfing Greece Mediterranean kite safari boats Meltemi winds"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-gold text-deep-navy px-3 py-1 rounded-full font-montserrat font-bold text-sm">
                  Mediterranean
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-xl font-bold text-deep-navy mb-4">Mediterranean Catamaran</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-turquoise mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="font-open-sans text-sm text-gray-700">6 Guests</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-turquoise mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span className="font-open-sans text-sm text-gray-700">3 Cabins</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-turquoise mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                      />
                    </svg>
                    <span className="font-open-sans text-sm text-gray-700">Greek Islands</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-turquoise mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="font-open-sans text-sm text-gray-700">Expert Captain</span>
                  </div>
                </div>
                <p className="font-open-sans text-gray-600 text-sm mb-4">
                  High-performance catamaran designed for Mediterranean adventures. Explore Paros, Antiparos, Naxos, 
                  and Koufonisia with our certified kiting instructor captain.
                </p>
                <Link href="/fleet/mediterranean-catamaran" className="block w-full bg-deep-navy text-white font-montserrat font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors text-center">
                  View Details
                </Link>
              </div>
            </div>

            {/* Fleet Type 3 - Premium Catamaran */}
            <div className="bg-sand-beige rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src="https://daggzx92agk0rfom.public.blob.vercel-storage.com/catamaran:img-mountain-shore.jpg"
                  alt="Luxury catamaran fleet kite safari boats premium catamaran kitesurfing accommodation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-turquoise text-white px-3 py-1 rounded-full font-montserrat font-bold text-sm">
                  Premium
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-xl font-bold text-deep-navy mb-4">Premium Catamaran</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-turquoise mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="font-open-sans text-sm text-gray-700">6 Guests</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-turquoise mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span className="font-open-sans text-sm text-gray-700">3 Cabins</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-turquoise mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                      />
                    </svg>
                    <span className="font-open-sans text-sm text-gray-700">Global Destinations</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-turquoise mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="font-open-sans text-sm text-gray-700">All-Inclusive</span>
                  </div>
                </div>
                <p className="font-open-sans text-gray-600 text-sm mb-4">
                  Our premium catamaran offering the ultimate luxury experience with professional chef service, 
                  high-speed Wi-Fi, and personalized kiting instruction for discerning guests.
                </p>
                <Link href="/fleet/premium-catamaran" className="block w-full bg-deep-navy text-white font-montserrat font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors text-center">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Features */}
      <section className="py-16 bg-gradient-to-br from-sand-beige to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-4">Every Yacht Includes</h2>
            <p className="font-open-sans text-lg text-gray-700 max-w-2xl mx-auto">
              Professional equipment and amenities designed for the ultimate kiteboarding safari experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="h-8 w-8 text-coral-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Safety Equipment</h3>
              <p className="font-open-sans text-gray-600 text-sm">
                Professional rescue boat, safety gear, and certified crew
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="h-8 w-8 text-coral-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Kite Storage</h3>
              <p className="font-open-sans text-gray-600 text-sm">
                Dedicated storage and drying areas for all equipment
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="h-8 w-8 text-coral-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Navigation</h3>
              <p className="font-open-sans text-gray-600 text-sm">GPS, radar, and local knowledge for optimal spots</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="h-8 w-8 text-coral-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-9a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Comfort</h3>
              <p className="font-open-sans text-gray-600 text-sm">Air conditioning, hot water, and luxury amenities</p>
            </div>
          </div>
        </div>
      </section>

      <FloatingActionButtons />
      <EnhancedFooter />
    </div>
  )
}
