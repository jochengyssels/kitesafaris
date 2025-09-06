import Navigation from "@/components/navigation"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kitesurf Tobago | Best Kitesurfing Spots Guide | KiteSafaris",
  description: "Discover kitesurfing in Tobago with KiteSafaris. Complete guide to best kite spots, wind conditions, and luxury catamaran adventures in Tobago, Caribbean.",
  keywords: "kitesurf tobago, tobago kitesurfing, tobago kite spots, tobago kiteboarding, caribbean kitesurfing, tobago wind conditions",
  alternates: {
    canonical: "https://kitesafaris.com/destinations/tobago",
  },
  openGraph: {
    title: "Kitesurf Tobago | Best Kitesurfing Spots Guide",
    description: "Discover kitesurfing in Tobago with KiteSafaris. Complete guide to best kite spots, wind conditions, and luxury catamaran adventures in Tobago, Caribbean.",
    url: "https://kitesafaris.com/destinations/tobago",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/images/tobago-kitesurfing.jpg",
        width: 1200,
        height: 630,
        alt: "Kitesurfing in Tobago - Caribbean kite spots",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitesurf Tobago | Best Kitesurfing Spots Guide",
    description: "Discover kitesurfing in Tobago with KiteSafaris. Complete guide to best kite spots, wind conditions, and luxury catamaran adventures in Tobago, Caribbean.",
    images: ["https://kitesafaris.com/images/tobago-kitesurfing.jpg"],
  },
}

export default function TobagoDestination() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Tobago",
    "description": "Kitesurfing destination in Tobago",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "11.1800",
      "longitude": "-60.7400"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Trinidad and Tobago"
    },
    "url": "https://kitesafaris.com/destinations/tobago"
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
                Kitesurf Tobago
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the unspoiled beauty of kitesurfing in Tobago. From Pigeon Point to Store Bay, 
                experience world-class kitesurfing conditions in one of the Caribbean's most pristine destinations.
              </p>
            </div>
          </div>
        </section>

        {/* Why Tobago for Kitesurfing */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Why Choose Tobago for Kitesurfing?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🏝️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Unspoiled Beauty
                </h3>
                <p className="text-gray-600 text-sm">
                  Tobago remains one of the Caribbean's most pristine destinations with untouched beaches 
                  and crystal-clear waters perfect for kitesurfing.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🌊</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Consistent Winds
                </h3>
                <p className="text-gray-600 text-sm">
                  Reliable trade winds from December to April provide excellent kitesurfing conditions 
                  with minimal crowds and perfect learning environments.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🐠</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Marine Paradise
                </h3>
                <p className="text-gray-600 text-sm">
                  Kitesurf over vibrant coral reefs and encounter diverse marine life, making every 
                  session a unique underwater adventure.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🌴</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Natural Environment
                </h3>
                <p className="text-gray-600 text-sm">
                  Experience kitesurfing in a natural, uncommercialized environment with lush tropical 
                  landscapes and authentic Caribbean culture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Kitesurfing Spots */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Best Kitesurfing Spots in Tobago
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pigeon Point */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-turquoise-400 to-turquoise-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Pigeon Point</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Pigeon Point Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Pigeon Point is Tobago's most famous beach and offers excellent kitesurfing conditions. 
                    The shallow waters and consistent winds make it perfect for beginners and intermediate riders, 
                    while the stunning scenery provides an unforgettable backdrop.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Dec - Apr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>15-25 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>Beginner to Intermediate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Best Conditions:</span>
                      <span>Shallow water, side-shore</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store Bay */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Store Bay</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Store Bay Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Store Bay offers excellent kitesurfing conditions with beautiful beaches and consistent winds. 
                    This spot is particularly popular for its accessibility and excellent learning conditions, 
                    making it ideal for beginners and those looking to improve their skills.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Dec - Apr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>15-22 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>All levels</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Best Conditions:</span>
                      <span>Flat water, side-shore</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wind Conditions */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Wind Conditions in Tobago
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌬️ Trade Winds
                </h3>
                <p className="text-gray-600 mb-4">
                  Tobago benefits from consistent trade winds that blow from the northeast during the kitesurfing season. 
                  These winds provide reliable conditions from December to April, with peak strength during the winter months.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Consistent winds from December to April</li>
                  <li>• Average wind speed: 15-25 knots</li>
                  <li>• Side-shore to side-on-shore direction</li>
                  <li>• Minimal gustiness and turbulence</li>
                  <li>• Best conditions in the afternoon</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌊 Water Conditions
                </h3>
                <p className="text-gray-600 mb-4">
                  Tobago offers excellent water conditions for kitesurfing with shallow waters and beautiful beaches. 
                  The island's position in the southern Caribbean provides warm waters and diverse marine life.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Shallow waters perfect for beginners</li>
                  <li>• Flat water conditions in protected bays</li>
                  <li>• Warm water temperatures (26-28°C)</li>
                  <li>• Crystal clear visibility</li>
                  <li>• Rich marine life and coral reefs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Best Time to Visit Tobago for Kitesurfing
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-navy-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Season</th>
                    <th className="px-6 py-4 text-left">Wind Speed</th>
                    <th className="px-6 py-4 text-left">Water Temp</th>
                    <th className="px-6 py-4 text-left">Air Temp</th>
                    <th className="px-6 py-4 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium">Winter (Dec - Feb)</td>
                    <td className="px-6 py-4">18-25 knots</td>
                    <td className="px-6 py-4">26-27°C</td>
                    <td className="px-6 py-4">26-28°C</td>
                    <td className="px-6 py-4">All levels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Spring (Mar - Apr)</td>
                    <td className="px-6 py-4">15-22 knots</td>
                    <td className="px-6 py-4">27-28°C</td>
                    <td className="px-6 py-4">28-30°C</td>
                    <td className="px-6 py-4">Beginner to Advanced</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Summer (May - Aug)</td>
                    <td className="px-6 py-4">10-15 knots</td>
                    <td className="px-6 py-4">28-29°C</td>
                    <td className="px-6 py-4">30-32°C</td>
                    <td className="px-6 py-4">Light wind kites</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Fall (Sep - Nov)</td>
                    <td className="px-6 py-4">12-18 knots</td>
                    <td className="px-6 py-4">28-29°C</td>
                    <td className="px-6 py-4">28-30°C</td>
                    <td className="px-6 py-4">Beginner to Intermediate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* KiteSafaris Tobago Experience */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              KiteSafaris Tobago Experience
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🛥️ Luxury Catamaran Adventures
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience Tobago's best kitesurfing spots from the comfort of our luxury catamarans. 
                  We'll take you to Pigeon Point, Store Bay, and other hidden gems along the coast, 
                  providing access to the most pristine kitesurfing locations.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• 7-day island-hopping adventures</li>
                  <li>• Professional kitesurfing instruction</li>
                  <li>• All equipment included</li>
                  <li>• Gourmet meals and local cuisine</li>
                  <li>• Cultural excursions and sightseeing</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🏄 What's Included
                </h3>
                <p className="text-gray-600 mb-4">
                  Our all-inclusive Tobago kitesurfing packages provide everything you need for 
                  the perfect Caribbean adventure in an unspoiled paradise.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Luxury catamaran accommodation</li>
                  <li>• Professional kitesurfing coaching</li>
                  <li>• All kitesurfing equipment</li>
                  <li>• Safety equipment and insurance</li>
                  <li>• Island transfers and excursions</li>
                  <li>• All meals and beverages</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cultural Experiences */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Beyond Kitesurfing: Cultural Experiences
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🌴</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Tropical Rainforest
                </h3>
                <p className="text-gray-600 text-sm">
                  Explore Tobago's Main Ridge Forest Reserve, the oldest protected rainforest in the Western Hemisphere, 
                  with incredible biodiversity and hiking trails.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🐠</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Snorkeling & Diving
                </h3>
                <p className="text-gray-600 text-sm">
                  Discover vibrant coral reefs and diverse marine life with world-class snorkeling and diving 
                  opportunities around the island.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🍽️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Local Cuisine
                </h3>
                <p className="text-gray-600 text-sm">
                  Savor authentic Tobagonian dishes like crab and dumplings, callaloo, and fresh seafood while 
                  experiencing the island's warm hospitality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">
              Ready for Your Tobago Kitesurfing Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join KiteSafaris for the ultimate Tobago kitesurfing experience. From Pigeon Point to Store Bay, 
              discover the best kite spots in an unspoiled Caribbean paradise with luxury catamaran accommodations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packages"
                className="bg-turquoise-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-turquoise-700 transition-colors"
              >
                View Tobago Packages
              </Link>
              <Link
                href="/booking"
                className="bg-coral-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors"
              >
                Book Your Trip
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
