import Navigation from "@/components/navigation"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kitesurf Croatia | Best Kitesurfing Spots Guide | KiteSafaris",
  description: "Discover kitesurfing in Croatia with KiteSafaris. Complete guide to best kite spots, wind conditions, and luxury catamaran adventures in Croatia, Mediterranean.",
  keywords: "kitesurf croatia, croatia kitesurfing, croatia kite spots, croatia kiteboarding, mediterranean kitesurfing, croatia wind conditions",
  alternates: {
    canonical: "https://kitesafaris.com/destinations/croatia",
  },
  openGraph: {
    title: "Kitesurf Croatia | Best Kitesurfing Spots Guide",
    description: "Discover kitesurfing in Croatia with KiteSafaris. Complete guide to best kite spots, wind conditions, and luxury catamaran adventures in Croatia, Mediterranean.",
    url: "https://kitesafaris.com/destinations/croatia",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/images/croatia-kitesurfing.jpg",
        width: 1200,
        height: 630,
        alt: "Kitesurfing in Croatia - Mediterranean kite spots",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitesurf Croatia | Best Kitesurfing Spots Guide",
    description: "Discover kitesurfing in Croatia with KiteSafaris. Complete guide to best kite spots, wind conditions, and luxury catamaran adventures in Croatia, Mediterranean.",
    images: ["https://kitesafaris.com/images/croatia-kitesurfing.jpg"],
  },
}

export default function CroatiaDestination() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Croatia",
    "description": "Kitesurfing destination in Croatia",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.1000",
      "longitude": "15.2000"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Croatia"
    },
    "url": "https://kitesafaris.com/destinations/croatia"
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
                Kitesurf Croatia
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the hidden gem of kitesurfing in Croatia. From the Adriatic coast to the Dalmatian islands, 
                experience world-class kitesurfing conditions in one of Europe's most beautiful destinations.
              </p>
            </div>
          </div>
        </section>

        {/* Why Croatia for Kitesurfing */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Why Choose Croatia for Kitesurfing?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🏝️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Stunning Islands
                </h3>
                <p className="text-gray-600 text-sm">
                  Croatia's 1,200+ islands provide endless kitesurfing opportunities with pristine beaches 
                  and crystal-clear Adriatic waters.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🌊</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Mediterranean Winds
                </h3>
                <p className="text-gray-600 text-sm">
                  Experience the famous Bora and Mistral winds that provide excellent kitesurfing conditions 
                  from spring to autumn.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🏛️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Rich History
                </h3>
                <p className="text-gray-600 text-sm">
                  Combine kitesurfing with cultural exploration of ancient Roman ruins, medieval towns, 
                  and UNESCO World Heritage sites.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🍽️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Local Cuisine
                </h3>
                <p className="text-gray-600 text-sm">
                  Savor fresh Mediterranean cuisine, local wines, and traditional Croatian dishes 
                  between kitesurfing sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Kitesurfing Spots */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Best Kitesurfing Spots in Croatia
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Bol, Brač */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Bol, Brač</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Bol Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Bol on the island of Brač is Croatia's most famous kitesurfing destination. 
                    The famous Zlatni Rat beach provides excellent conditions with consistent winds 
                    and beautiful scenery.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Apr - Oct</span>
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

              {/* Viganj, Pelješac */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Viganj, Pelješac</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Viganj Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Viganj on the Pelješac peninsula is known for its consistent winds and excellent 
                    kitesurfing conditions. The shallow waters make it perfect for beginners and 
                    freestyle riders.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Apr - Oct</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>18-28 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>All levels</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premantura, Istria */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Premantura, Istria</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Premantura Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Premantura in Istria offers excellent kitesurfing conditions with the famous Bora winds. 
                    The area is known for its strong, consistent winds and beautiful natural surroundings.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Apr - Oct</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>20-35 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>Intermediate to Advanced</span>
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
              Wind Conditions in Croatia
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌬️ Bora Winds
                </h3>
                <p className="text-gray-600 mb-4">
                  The Bora is a strong, cold wind that blows from the northeast across the Adriatic. 
                  It's most common in winter and spring, providing excellent kitesurfing conditions 
                  with consistent strength and direction.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Strong, consistent winds</li>
                  <li>• Most common in winter and spring</li>
                  <li>• Wind speeds: 20-40 knots</li>
                  <li>• Cold, dry air</li>
                  <li>• Can last for several days</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌊 Mistral Winds
                </h3>
                <p className="text-gray-600 mb-4">
                  The Mistral is a warm, dry wind that blows from the northwest. It's most common 
                  in summer and provides excellent kitesurfing conditions with warm temperatures 
                  and consistent winds.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Warm, dry winds</li>
                  <li>• Most common in summer</li>
                  <li>• Wind speeds: 15-25 knots</li>
                  <li>• Warm temperatures</li>
                  <li>• Perfect for summer kitesurfing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Best Time to Visit Croatia for Kitesurfing
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
                    <td className="px-6 py-4 font-medium">Spring (Apr - May)</td>
                    <td className="px-6 py-4">15-25 knots</td>
                    <td className="px-6 py-4">16-20°C</td>
                    <td className="px-6 py-4">18-25°C</td>
                    <td className="px-6 py-4">All levels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Summer (Jun - Aug)</td>
                    <td className="px-6 py-4">12-20 knots</td>
                    <td className="px-6 py-4">22-25°C</td>
                    <td className="px-6 py-4">25-30°C</td>
                    <td className="px-6 py-4">Beginner to Intermediate</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Fall (Sep - Oct)</td>
                    <td className="px-6 py-4">15-25 knots</td>
                    <td className="px-6 py-4">20-22°C</td>
                    <td className="px-6 py-4">20-25°C</td>
                    <td className="px-6 py-4">All levels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Winter (Nov - Mar)</td>
                    <td className="px-6 py-4">20-35 knots</td>
                    <td className="px-6 py-4">12-16°C</td>
                    <td className="px-6 py-4">10-15°C</td>
                    <td className="px-6 py-4">Advanced riders</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* KiteSafaris Croatia Experience */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              KiteSafaris Croatia Experience
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🛥️ Luxury Catamaran Adventures
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience Croatia's best kitesurfing spots from the comfort of our luxury catamarans. 
                  We'll take you to Bol, Viganj, and other hidden gems along the Adriatic coast, 
                  providing access to the most beautiful kitesurfing locations.
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
                  Our all-inclusive Croatia kitesurfing packages provide everything you need for 
                  the perfect Mediterranean adventure.
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
                  Historic Cities
                </h3>
                <p className="text-gray-600 text-sm">
                  Explore Dubrovnik, Split, and other UNESCO World Heritage sites with ancient Roman ruins, 
                  medieval architecture, and rich cultural heritage.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🏝️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Island Hopping
                </h3>
                <p className="text-gray-600 text-sm">
                  Discover Croatia's 1,200+ islands with unique landscapes, pristine beaches, 
                  and charming coastal towns.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🍽️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Local Cuisine
                </h3>
                <p className="text-gray-600 text-sm">
                  Savor fresh Mediterranean cuisine, local wines, and traditional Croatian dishes 
                  while experiencing the warm hospitality of the Adriatic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">
              Ready for Your Croatia Kitesurfing Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join KiteSafaris for the ultimate Croatia kitesurfing experience. From Bol to Viganj, 
              discover the best kite spots in the Mediterranean with luxury catamaran accommodations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packages"
                className="bg-turquoise-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-turquoise-700 transition-colors"
              >
                View Croatia Packages
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
