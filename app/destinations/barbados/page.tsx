import Navigation from "@/components/navigation"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Barbados Kiteboarding Season | Best Kitesurfing Spots Guide | KiteSafaris",
  description: "Discover Barbados kiteboarding season with KiteSafaris. Complete guide to best kitesurfing spots, wind conditions, and luxury catamaran adventures in Barbados.",
  keywords: "barbados kiteboarding season, barbados kitesurfing, barbados kite spots, barbados kiteboarding, barbados wind conditions, caribbean kitesurfing",
  alternates: {
    canonical: "https://kitesafaris.com/destinations/barbados",
  },
  openGraph: {
    title: "Barbados Kiteboarding Season | Best Kitesurfing Spots Guide",
    description: "Discover Barbados kiteboarding season with KiteSafaris. Complete guide to best kitesurfing spots, wind conditions, and luxury catamaran adventures in Barbados.",
    url: "https://kitesafaris.com/destinations/barbados",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/images/barbados-kitesurfing.jpg",
        width: 1200,
        height: 630,
        alt: "Barbados kiteboarding season and kitesurfing spots",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Barbados Kiteboarding Season | Best Kitesurfing Spots Guide",
    description: "Discover Barbados kiteboarding season with KiteSafaris. Complete guide to best kitesurfing spots, wind conditions, and luxury catamaran adventures in Barbados.",
    images: ["https://kitesafaris.com/images/barbados-kitesurfing.jpg"],
  },
}

export default function BarbadosDestination() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Barbados",
    "description": "Kitesurfing destination in Barbados",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "13.1939",
      "longitude": "-59.5432"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Barbados"
    },
    "url": "https://kitesafaris.com/destinations/barbados"
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
                Barbados Kiteboarding Season
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the best Barbados kiteboarding season with KiteSafaris. From November to May, 
                experience world-class kitesurfing conditions with consistent trade winds and beautiful Caribbean waters.
              </p>
            </div>
          </div>
        </section>

        {/* Barbados Kiteboarding Season Overview */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Barbados Kiteboarding Season Overview
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌬️ Peak Season (November - May)
                </h3>
                <p className="text-gray-600 mb-4">
                  The Barbados kiteboarding season runs from November to May, with the best conditions 
                  during the winter months. This is when the trade winds are strongest and most consistent, 
                  providing excellent kitesurfing conditions.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Strongest winds: December to March</li>
                  <li>• Average wind speed: 18-25 knots</li>
                  <li>• Consistent trade winds</li>
                  <li>• Warm water temperatures (26-28°C)</li>
                  <li>• Minimal rainfall and storms</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌊 Off-Season (June - October)
                </h3>
                <p className="text-gray-600 mb-4">
                  While the main kiteboarding season ends in May, Barbados still offers kitesurfing opportunities 
                  during the summer months, though with lighter and less consistent winds.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Lighter winds: 10-18 knots</li>
                  <li>• Less consistent conditions</li>
                  <li>• Warmer water temperatures (28-29°C)</li>
                  <li>• Hurricane season considerations</li>
                  <li>• Good for light wind kites</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Kitesurfing Spots */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Best Kitesurfing Spots in Barbados
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Silver Sands */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Silver Sands</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Silver Sands Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Silver Sands is Barbados' premier kitesurfing destination with consistent winds and 
                    excellent conditions. Perfect for all skill levels with shallow waters and flat conditions.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Nov - May</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>15-25 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>All levels</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crane Beach */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Crane Beach</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Crane Beach Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Crane Beach offers beautiful kitesurfing conditions with stunning pink sand beaches. 
                    Great for intermediate to advanced riders with more challenging conditions.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Nov - May</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>18-28 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>Intermediate to Advanced</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bathsheba */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Bathsheba</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Bathsheba Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Bathsheba offers more challenging kitesurfing conditions with waves and stronger winds. 
                    Perfect for advanced riders seeking adrenaline-pumping sessions.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Nov - May</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>20-30 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>Advanced</span>
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
              Wind Conditions in Barbados
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌬️ Trade Winds
                </h3>
                <p className="text-gray-600 mb-4">
                  Barbados benefits from consistent trade winds that blow from the northeast. 
                  These winds provide reliable kitesurfing conditions during the kiteboarding season, 
                  with peak strength during the winter months.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Consistent winds from November to May</li>
                  <li>• Average wind speed: 18-25 knots</li>
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
                  Barbados offers diverse water conditions from flat water spots to wave locations. 
                  The island's position in the Atlantic provides both protected bays and exposed coastlines.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Flat water conditions in protected bays</li>
                  <li>• Wave spots on the east coast</li>
                  <li>• Warm water temperatures (26-28°C)</li>
                  <li>• Crystal clear visibility</li>
                  <li>• Coral reefs and marine life</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Breakdown */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Monthly Kiteboarding Conditions
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-navy-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Month</th>
                    <th className="px-6 py-4 text-left">Wind Speed</th>
                    <th className="px-6 py-4 text-left">Water Temp</th>
                    <th className="px-6 py-4 text-left">Air Temp</th>
                    <th className="px-6 py-4 text-left">Conditions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium">November</td>
                    <td className="px-6 py-4">15-22 knots</td>
                    <td className="px-6 py-4">27°C</td>
                    <td className="px-6 py-4">28-30°C</td>
                    <td className="px-6 py-4">Building winds</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">December</td>
                    <td className="px-6 py-4">18-25 knots</td>
                    <td className="px-6 py-4">26°C</td>
                    <td className="px-6 py-4">26-28°C</td>
                    <td className="px-6 py-4">Excellent</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">January</td>
                    <td className="px-6 py-4">20-28 knots</td>
                    <td className="px-6 py-4">26°C</td>
                    <td className="px-6 py-4">25-27°C</td>
                    <td className="px-6 py-4">Peak season</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">February</td>
                    <td className="px-6 py-4">20-28 knots</td>
                    <td className="px-6 py-4">26°C</td>
                    <td className="px-6 py-4">25-27°C</td>
                    <td className="px-6 py-4">Peak season</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">March</td>
                    <td className="px-6 py-4">18-25 knots</td>
                    <td className="px-6 py-4">27°C</td>
                    <td className="px-6 py-4">26-28°C</td>
                    <td className="px-6 py-4">Excellent</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">April</td>
                    <td className="px-6 py-4">15-22 knots</td>
                    <td className="px-6 py-4">27°C</td>
                    <td className="px-6 py-4">27-29°C</td>
                    <td className="px-6 py-4">Good</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">May</td>
                    <td className="px-6 py-4">12-18 knots</td>
                    <td className="px-6 py-4">28°C</td>
                    <td className="px-6 py-4">28-30°C</td>
                    <td className="px-6 py-4">Light winds</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* KiteSafaris Barbados Experience */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              KiteSafaris Barbados Experience
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🛥️ Luxury Catamaran Adventures
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience Barbados' best kitesurfing spots from the comfort of our luxury catamarans. 
                  We'll take you to Silver Sands, Crane Beach, and other hidden gems along the coast.
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
                  Our all-inclusive Barbados kitesurfing packages provide everything you need for 
                  the perfect Caribbean adventure.
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
                <div className="text-3xl mb-4">🏛️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Historic Bridgetown
                </h3>
                <p className="text-gray-600 text-sm">
                  Explore Bridgetown's historic center, a UNESCO World Heritage site, with colonial 
                  architecture and rich cultural heritage.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🍽️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Bajan Cuisine
                </h3>
                <p className="text-gray-600 text-sm">
                  Savor authentic Bajan dishes like flying fish, cou-cou, and rum punch while 
                  experiencing the island's vibrant food culture.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🎵</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Music & Culture
                </h3>
                <p className="text-gray-600 text-sm">
                  Experience the rhythm of calypso and soca music, and learn about Barbados' 
                  rich cultural traditions and festivals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">
              Ready for Your Barbados Kiteboarding Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join KiteSafaris for the ultimate Barbados kiteboarding experience. From Silver Sands to Crane Beach, 
              discover the best kite spots during the peak season with luxury catamaran accommodations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packages"
                className="bg-turquoise-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-turquoise-700 transition-colors"
              >
                View Barbados Packages
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
