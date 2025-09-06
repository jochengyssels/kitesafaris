import Navigation from "@/components/navigation"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Upcoming Kitesurfing Destinations | New Caribbean & Mediterranean Spots | KiteSafaris",
  description: "Discover upcoming kitesurfing destinations in the Caribbean and Mediterranean. New kite spots, emerging destinations, and future KiteSafaris locations.",
  keywords: "upcoming kitesurfing destinations, new kite spots, emerging kitesurf destinations, future kiteboarding locations, caribbean kitesurfing, mediterranean kitesurfing",
  alternates: {
    canonical: "https://kitesafaris.com/guides/upcoming-destinations",
  },
  openGraph: {
    title: "Upcoming Kitesurfing Destinations | New Caribbean & Mediterranean Spots",
    description: "Discover upcoming kitesurfing destinations in the Caribbean and Mediterranean. New kite spots, emerging destinations, and future KiteSafaris locations.",
    url: "https://kitesafaris.com/guides/upcoming-destinations",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/images/upcoming-destinations-guide.jpg",
        width: 1200,
        height: 630,
        alt: "Upcoming kitesurfing destinations and new kite spots",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upcoming Kitesurfing Destinations | New Caribbean & Mediterranean Spots",
    description: "Discover upcoming kitesurfing destinations in the Caribbean and Mediterranean. New kite spots, emerging destinations, and future KiteSafaris locations.",
    images: ["https://kitesafaris.com/images/upcoming-destinations-guide.jpg"],
  },
}

export default function UpcomingDestinationsGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Upcoming Kitesurfing Destinations | New Caribbean & Mediterranean Spots",
    "description": "Discover upcoming kitesurfing destinations in the Caribbean and Mediterranean. New kite spots, emerging destinations, and future KiteSafaris locations.",
    "author": {
      "@type": "Organization",
      "name": "KiteSafaris"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KiteSafaris",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kitesafaris.com/logo.png"
      }
    },
    "datePublished": "2025-01-09",
    "dateModified": "2025-01-09",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kitesafaris.com/guides/upcoming-destinations"
    }
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-b from-sand-beige-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
                Upcoming Kitesurfing Destinations
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the next generation of kitesurfing destinations. From emerging Caribbean spots 
                to new Mediterranean locations, explore where kitesurfing is heading next.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon - Caribbean */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Coming Soon - Caribbean
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Dominican Republic */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Dominican Republic</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Cabarete & Punta Cana
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The Dominican Republic is emerging as a premier kitesurfing destination with 
                    world-class conditions in Cabarete and pristine beaches in Punta Cana.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Launch Date:</span>
                      <span>Q2 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Year-round</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>All levels</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>

              {/* Turks and Caicos */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-turquoise-400 to-turquoise-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Turks & Caicos</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Grace Bay & Long Bay
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Turks and Caicos offers pristine kitesurfing conditions with shallow waters, 
                    consistent winds, and stunning coral reefs.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Launch Date:</span>
                      <span>Q3 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Nov - May</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>Beginner to Advanced</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      In Development
                    </span>
                  </div>
                </div>
              </div>

              {/* Tobago */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Tobago</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Pigeon Point & Store Bay
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Tobago's unspoiled beauty and consistent trade winds make it an ideal 
                    destination for kitesurfing adventures in the southern Caribbean.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Launch Date:</span>
                      <span>Q4 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Dec - Apr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>Intermediate to Advanced</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                      Planning Phase
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon - Mediterranean */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Coming Soon - Mediterranean
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Italy */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Italy</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Sicily & Sardinia
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Italy's Mediterranean coast offers diverse kitesurfing conditions from 
                    flat water lagoons to wave spots with rich cultural experiences.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Launch Date:</span>
                      <span>Q2 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>May - Oct</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>All levels</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>

              {/* Spain */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Spain</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Costa Brava & Balearic Islands
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Spain's Mediterranean coast offers excellent kitesurfing with warm waters, 
                    reliable winds, and vibrant local culture.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Launch Date:</span>
                      <span>Q3 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Apr - Sep</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>All levels</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      In Development
                    </span>
                  </div>
                </div>
              </div>

              {/* Croatia */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Croatia</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Dalmatian Coast
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Croatia's stunning coastline with its islands and crystal-clear waters 
                    provides unique kitesurfing opportunities in the Adriatic Sea.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Launch Date:</span>
                      <span>Q4 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>May - Sep</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>Intermediate to Advanced</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Planning Phase
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Destinations */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Specialized Destinations
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Women's Kitesurfing */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  👩 Women's Kitesurfing Retreats
                </h3>
                <p className="text-gray-600 mb-4">
                  Dedicated women's kitesurfing retreats in exclusive locations, designed to 
                  create a supportive and empowering environment for female riders.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Female instructors and coaches</li>
                  <li>• Small group sizes (max 8 participants)</li>
                  <li>• Focus on technique and confidence building</li>
                  <li>• Wellness activities and yoga sessions</li>
                  <li>• Luxury accommodations and spa treatments</li>
                </ul>
                <div className="mt-4">
                  <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
                    Launching 2025
                  </span>
                </div>
              </div>

              {/* Wing Foiling */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🏄 Wing Foiling Adventures
                </h3>
                <p className="text-gray-600 mb-4">
                  The latest water sport sensation! Wing foiling combines the best of kitesurfing 
                  and windsurfing with the freedom of foiling.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Professional wing foiling instruction</li>
                  <li>• Latest equipment and safety gear</li>
                  <li>• Perfect conditions for learning</li>
                  <li>• Small group lessons</li>
                  <li>• Progression from beginner to advanced</li>
                </ul>
                <div className="mt-4">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    New for 2025
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Development Timeline */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Development Timeline
            </h2>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-turquoise-200"></div>
              
              <div className="space-y-8">
                {/* Q1 2025 */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-turquoise-600 rounded-full"></div>
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-lg font-semibold text-navy-900">Q1 2025</h3>
                    <p className="text-gray-600">Planning and preparation phase</p>
                  </div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-sm text-gray-600">Site surveys, local partnerships, and infrastructure development</p>
                    </div>
                  </div>
                </div>

                {/* Q2 2025 */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-turquoise-600 rounded-full"></div>
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-sm text-gray-600">Dominican Republic and Italy launches</p>
                    </div>
                  </div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-lg font-semibold text-navy-900">Q2 2025</h3>
                    <p className="text-gray-600">First new destinations launch</p>
                  </div>
                </div>

                {/* Q3 2025 */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-turquoise-600 rounded-full"></div>
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-lg font-semibold text-navy-900">Q3 2025</h3>
                    <p className="text-gray-600">Expansion continues</p>
                  </div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-sm text-gray-600">Turks & Caicos and Spain launches</p>
                    </div>
                  </div>
                </div>

                {/* Q4 2025 */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-turquoise-600 rounded-full"></div>
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-sm text-gray-600">Tobago and Croatia launches</p>
                    </div>
                  </div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-lg font-semibold text-navy-900">Q4 2025</h3>
                    <p className="text-gray-600">Full expansion complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Stay Updated */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              How to Stay Updated
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Newsletter
                </h3>
                <p className="text-gray-600 text-sm">
                  Subscribe to our newsletter for exclusive updates on new destinations, 
                  early bird offers, and launch announcements.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">📱</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Social Media
                </h3>
                <p className="text-gray-600 text-sm">
                  Follow us on Instagram and Facebook for behind-the-scenes content, 
                  destination previews, and community updates.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🔔</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Notifications
                </h3>
                <p className="text-gray-600 text-sm">
                  Enable notifications on our website to be the first to know about 
                  new destination launches and special offers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">
              Be the First to Experience New Destinations
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our priority list to be the first to book trips to our new destinations. 
              Get exclusive early access and special launch pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-turquoise-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-turquoise-700 transition-colors"
              >
                Join Priority List
              </Link>
              <Link
                href="/destinations"
                className="bg-coral-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors"
              >
                Current Destinations
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
