import Navigation from "@/components/navigation"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kitesurf Turks and Caicos | Grace Bay Kiteboarding Guide | KiteSafaris",
  description: "Discover kitesurfing in Turks and Caicos with KiteSafaris. Complete guide to Grace Bay kiteboarding, best kite spots, and luxury catamaran adventures in the Caribbean.",
  keywords: "kitesurf turks and caicos, kiteboard grace bay turks and caicos, kiteboard grace bay, turks and caicos catamaran, grace bay kitesurfing, turks and caicos kite spots",
  alternates: {
    canonical: "https://kitesafaris.com/destinations/turks-and-caicos",
  },
  openGraph: {
    title: "Kitesurf Turks and Caicos | Grace Bay Kiteboarding Guide",
    description: "Discover kitesurfing in Turks and Caicos with KiteSafaris. Complete guide to Grace Bay kiteboarding, best kite spots, and luxury catamaran adventures in the Caribbean.",
    url: "https://kitesafaris.com/destinations/turks-and-caicos",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/images/turks-caicos-kitesurfing.jpg",
        width: 1200,
        height: 630,
        alt: "Kitesurfing in Turks and Caicos - Grace Bay",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitesurf Turks and Caicos | Grace Bay Kiteboarding Guide",
    description: "Discover kitesurfing in Turks and Caicos with KiteSafaris. Complete guide to Grace Bay kiteboarding, best kite spots, and luxury catamaran adventures in the Caribbean.",
    images: ["https://kitesafaris.com/images/turks-caicos-kitesurfing.jpg"],
  },
}

export default function TurksAndCaicosDestination() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Turks and Caicos",
    "description": "Kitesurfing destination in Turks and Caicos",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.6940",
      "longitude": "-71.7979"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Turks and Caicos"
    },
    "url": "https://kitesafaris.com/destinations/turks-and-caicos"
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
                Kitesurf Turks and Caicos
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience world-class kitesurfing in Turks and Caicos. From the pristine waters of Grace Bay 
                to the consistent trade winds, discover why this Caribbean paradise is a kitesurfer's dream destination.
              </p>
            </div>
          </div>
        </section>

        {/* Why Turks and Caicos for Kitesurfing */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Why Choose Turks and Caicos for Kitesurfing?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🏖️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Pristine Beaches
                </h3>
                <p className="text-gray-600 text-sm">
                  Grace Bay Beach is consistently ranked among the world's best beaches with crystal-clear waters and perfect kitesurfing conditions.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🌊</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Shallow Waters
                </h3>
                <p className="text-gray-600 text-sm">
                  The shallow, flat waters of Grace Bay and Long Bay provide ideal conditions for beginners and freestyle kitesurfing.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">💨</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Consistent Winds
                </h3>
                <p className="text-gray-600 text-sm">
                  Reliable trade winds from November to May provide consistent kitesurfing conditions with minimal gustiness.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🐠</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Marine Life
                </h3>
                <p className="text-gray-600 text-sm">
                  Kitesurf over vibrant coral reefs and encounter tropical fish, making every session a unique underwater adventure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Kitesurfing Spots */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Best Kitesurfing Spots in Turks and Caicos
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Grace Bay */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-turquoise-400 to-turquoise-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Grace Bay</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Kiteboard Grace Bay Turks and Caicos
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Grace Bay is the crown jewel of Turks and Caicos kitesurfing. This world-renowned beach offers 
                    pristine conditions with shallow waters, consistent winds, and stunning coral reefs. Perfect for 
                    all skill levels with excellent learning conditions.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Nov - May</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>12-20 knots</span>
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

              {/* Long Bay */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Long Bay</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Long Bay Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Long Bay offers excellent kitesurfing conditions with shallow waters and consistent winds. 
                    This spot is particularly popular for freestyle kitesurfing and beginners due to its flat water conditions.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Nov - May</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>15-22 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>Beginner to Advanced</span>
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
              Wind Conditions in Turks and Caicos
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌬️ Trade Winds
                </h3>
                <p className="text-gray-600 mb-4">
                  Turks and Caicos benefits from consistent trade winds that blow from the northeast. 
                  These winds provide reliable kitesurfing conditions from November to May, with peak 
                  strength during the winter months.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Consistent winds from November to May</li>
                  <li>• Average wind speed: 15-20 knots</li>
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
                  The shallow waters of Turks and Caicos create perfect flat water conditions for kitesurfing. 
                  The coral reefs provide natural protection from waves, creating ideal learning environments.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Shallow waters (1-3 meters deep)</li>
                  <li>• Flat water conditions</li>
                  <li>• Warm water temperatures (25-27°C)</li>
                  <li>• Crystal clear visibility</li>
                  <li>• Protected by coral reefs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Best Time to Visit Turks and Caicos for Kitesurfing
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
                    <td className="px-6 py-4">25-26°C</td>
                    <td className="px-6 py-4">24-27°C</td>
                    <td className="px-6 py-4">All levels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Spring (Mar - May)</td>
                    <td className="px-6 py-4">15-22 knots</td>
                    <td className="px-6 py-4">26-27°C</td>
                    <td className="px-6 py-4">26-29°C</td>
                    <td className="px-6 py-4">Beginner to Advanced</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Summer (Jun - Aug)</td>
                    <td className="px-6 py-4">10-15 knots</td>
                    <td className="px-6 py-4">28-29°C</td>
                    <td className="px-6 py-4">28-32°C</td>
                    <td className="px-6 py-4">Light wind kites</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Fall (Sep - Nov)</td>
                    <td className="px-6 py-4">12-18 knots</td>
                    <td className="px-6 py-4">27-28°C</td>
                    <td className="px-6 py-4">26-30°C</td>
                    <td className="px-6 py-4">Beginner to Intermediate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Catamaran Adventures */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Turks and Caicos Catamaran Adventures
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🛥️ Luxury Catamaran Experience
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience Turks and Caicos kitesurfing from the comfort of our luxury catamarans. 
                  We'll take you to the best spots including Grace Bay, Long Bay, and hidden gems 
                  accessible only by boat.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Spacious catamaran accommodations</li>
                  <li>• Access to exclusive kite spots</li>
                  <li>• Professional kitesurfing instruction</li>
                  <li>• All equipment included</li>
                  <li>• Gourmet meals and premium beverages</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🏄 What's Included
                </h3>
                <p className="text-gray-600 mb-4">
                  Our all-inclusive Turks and Caicos kitesurfing packages provide everything you need for 
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
                <div className="text-3xl mb-4">🐠</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Snorkeling & Diving
                </h3>
                <p className="text-gray-600 text-sm">
                  Explore the world's third-largest barrier reef with incredible snorkeling and diving 
                  opportunities right from Grace Bay.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🏝️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Island Hopping
                </h3>
                <p className="text-gray-600 text-sm">
                  Discover the beauty of Providenciales, Grand Turk, and other islands with 
                  unique landscapes and pristine beaches.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🍽️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Local Cuisine
                </h3>
                <p className="text-gray-600 text-sm">
                  Savor fresh seafood, conch fritters, and Caribbean specialties while 
                  experiencing the warm hospitality of the islands.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">
              Ready for Your Turks and Caicos Kitesurfing Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join KiteSafaris for the ultimate Turks and Caicos kitesurfing experience. From Grace Bay to Long Bay, 
              discover the best kite spots with luxury catamaran accommodations and expert coaching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packages"
                className="bg-turquoise-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-turquoise-700 transition-colors"
              >
                View Turks and Caicos Packages
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
