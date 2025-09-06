import Navigation from "@/components/navigation"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kitesurfing Dominican Republic | Cabarete & Punta Cana Guide | KiteSafaris",
  description: "Discover kitesurfing in the Dominican Republic with KiteSafaris. Complete guide to Cabarete, Punta Cana, and best kite spots. Expert coaching and luxury catamaran adventures.",
  keywords: "kitesurfing dominican republic, kitesurf dominican republic, dominican republic kitesurfing, cabarete kitesurfing, punta cana kitesurfing, dominican republic kite spots",
  alternates: {
    canonical: "https://kitesafaris.com/destinations/dominican-republic",
  },
  openGraph: {
    title: "Kitesurfing Dominican Republic | Cabarete & Punta Cana Guide",
    description: "Discover kitesurfing in the Dominican Republic with KiteSafaris. Complete guide to Cabarete, Punta Cana, and best kite spots. Expert coaching and luxury catamaran adventures.",
    url: "https://kitesafaris.com/destinations/dominican-republic",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/images/dominican-republic-kitesurfing.jpg",
        width: 1200,
        height: 630,
        alt: "Kitesurfing in Dominican Republic - Cabarete and Punta Cana",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitesurfing Dominican Republic | Cabarete & Punta Cana Guide",
    description: "Discover kitesurfing in the Dominican Republic with KiteSafaris. Complete guide to Cabarete, Punta Cana, and best kite spots. Expert coaching and luxury catamaran adventures.",
    images: ["https://kitesafaris.com/images/dominican-republic-kitesurfing.jpg"],
  },
}

export default function DominicanRepublicDestination() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Dominican Republic",
    "description": "Kitesurfing destination in the Dominican Republic",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.7357",
      "longitude": "-70.1627"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Dominican Republic"
    },
    "url": "https://kitesafaris.com/destinations/dominican-republic"
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
                Kitesurfing Dominican Republic
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the ultimate kitesurfing destination in the Caribbean. From the legendary winds of Cabarete 
                to the pristine beaches of Punta Cana, the Dominican Republic offers world-class kitesurfing conditions year-round.
              </p>
            </div>
          </div>
        </section>

        {/* Why Dominican Republic for Kitesurfing */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Why Choose Dominican Republic for Kitesurfing?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🌊</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Year-Round Conditions
                </h3>
                <p className="text-gray-600 text-sm">
                  The Dominican Republic offers consistent kitesurfing conditions throughout the year with reliable trade winds and warm waters.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🏄</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  World-Class Spots
                </h3>
                <p className="text-gray-600 text-sm">
                  From Cabarete's legendary conditions to Punta Cana's pristine beaches, the DR offers diverse kitesurfing experiences.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">👨‍🏫</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Expert Instruction
                </h3>
                <p className="text-gray-600 text-sm">
                  Professional kitesurfing schools and instructors provide world-class coaching for all skill levels.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🏝️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Rich Culture
                </h3>
                <p className="text-gray-600 text-sm">
                  Experience vibrant Dominican culture, delicious cuisine, and warm hospitality between kitesurfing sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Kitesurfing Spots */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Best Kitesurfing Spots in Dominican Republic
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Cabarete */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Cabarete</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Cabarete Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Cabarete is the kitesurfing capital of the Dominican Republic and one of the world's premier kitesurfing destinations. 
                    Known for its consistent trade winds, flat water conditions, and vibrant kitesurfing community.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Year-round</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>18-30 knots</span>
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

              {/* Punta Cana */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Punta Cana</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Punta Cana Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Punta Cana offers pristine kitesurfing conditions with beautiful beaches and consistent winds. 
                    Perfect for beginners and intermediate riders with shallow waters and excellent learning conditions.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Year-round</span>
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
            </div>
          </div>
        </section>

        {/* Wind Conditions */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Wind Conditions in Dominican Republic
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌬️ Trade Winds
                </h3>
                <p className="text-gray-600 mb-4">
                  The Dominican Republic benefits from consistent trade winds that blow from the northeast. 
                  These winds provide reliable kitesurfing conditions throughout the year, with peak strength 
                  during the winter months.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Consistent year-round winds</li>
                  <li>• Strongest from December to March</li>
                  <li>• Average wind speed: 18-25 knots</li>
                  <li>• Side-shore to side-on-shore direction</li>
                  <li>• Minimal gustiness</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌊 Water Conditions
                </h3>
                <p className="text-gray-600 mb-4">
                  The Dominican Republic offers diverse water conditions from flat water lagoons to wave spots. 
                  Water temperatures remain warm year-round, making it perfect for kitesurfing in board shorts or light wetsuits.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Warm water temperatures (26-29°C)</li>
                  <li>• Flat water conditions in lagoons</li>
                  <li>• Wave spots for advanced riders</li>
                  <li>• Shallow water areas for beginners</li>
                  <li>• Crystal clear Caribbean waters</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Best Time to Visit Dominican Republic for Kitesurfing
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
                    <td className="px-6 py-4">20-30 knots</td>
                    <td className="px-6 py-4">26-27°C</td>
                    <td className="px-6 py-4">24-28°C</td>
                    <td className="px-6 py-4">Advanced riders</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Spring (Mar - May)</td>
                    <td className="px-6 py-4">18-25 knots</td>
                    <td className="px-6 py-4">27-28°C</td>
                    <td className="px-6 py-4">26-30°C</td>
                    <td className="px-6 py-4">All levels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Summer (Jun - Aug)</td>
                    <td className="px-6 py-4">15-22 knots</td>
                    <td className="px-6 py-4">28-29°C</td>
                    <td className="px-6 py-4">28-32°C</td>
                    <td className="px-6 py-4">Beginner to Intermediate</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Fall (Sep - Nov)</td>
                    <td className="px-6 py-4">18-25 knots</td>
                    <td className="px-6 py-4">28-29°C</td>
                    <td className="px-6 py-4">26-30°C</td>
                    <td className="px-6 py-4">All levels</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* KiteSafaris Dominican Republic Experience */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              KiteSafaris Dominican Republic Experience
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🛥️ Luxury Catamaran Adventures
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience the Dominican Republic's best kitesurfing spots from the comfort of our luxury catamarans. 
                  We'll take you to Cabarete, Punta Cana, and other hidden gems along the coast.
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
                  Our all-inclusive Dominican Republic kitesurfing packages provide everything you need for 
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
                  Colonial History
                </h3>
                <p className="text-gray-600 text-sm">
                  Explore Santo Domingo's colonial zone, the first European settlement in the Americas, 
                  with its historic architecture and museums.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🍽️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Dominican Cuisine
                </h3>
                <p className="text-gray-600 text-sm">
                  Savor authentic Dominican dishes like mofongo, sancocho, and fresh seafood while 
                  experiencing the vibrant local food culture.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🎵</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Music & Dance
                </h3>
                <p className="text-gray-600 text-sm">
                  Experience the rhythm of merengue and bachata, the Dominican Republic's national music, 
                  in local bars and cultural venues.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">
              Ready for Your Dominican Republic Kitesurfing Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join KiteSafaris for the ultimate Dominican Republic kitesurfing experience. From Cabarete to Punta Cana, 
              discover the best kite spots with luxury catamaran accommodations and expert coaching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packages"
                className="bg-turquoise-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-turquoise-700 transition-colors"
              >
                View Dominican Republic Packages
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
