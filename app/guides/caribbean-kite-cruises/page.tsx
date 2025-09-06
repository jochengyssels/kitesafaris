import { Navigation } from "@/components/navigation"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Caribbean Kite Cruises | Luxury Catamaran Kitesurfing Adventures | KiteSafaris",
  description: "Discover the ultimate Caribbean kite cruises on luxury catamarans. Expert kitesurfing coaching, small groups, guaranteed wind. Book your catamaran kite cruise today!",
  keywords: "caribbean kite cruises, catamaran cruises caribbean, caribbean catamaran cruise, caribbean catamaran, kitesurf caribbean, kitesurfing caribbean, kiteboarding caribbean, kitesurfing dominican republic, kitesurf turks and caicos, barbados kiteboarding season, caribbean racing catamaran excursion, caribbean kite cruise, kiteboard grace bay, kiteboard grace bay turks and caicos, kitesurf tobago",
  alternates: {
    canonical: "https://kitesafaris.com/guides/caribbean-kite-cruises",
  },
  openGraph: {
    title: "Caribbean Kite Cruises | Luxury Catamaran Kitesurfing Adventures",
    description: "Discover the ultimate Caribbean kite cruises on luxury catamarans. Expert kitesurfing coaching, small groups, guaranteed wind. Book your catamaran kite cruise today!",
    url: "https://kitesafaris.com/guides/caribbean-kite-cruises",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/images/caribbean-kite-cruises-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Caribbean kite cruises on luxury catamarans",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caribbean Kite Cruises | Luxury Catamaran Kitesurfing Adventures",
    description: "Discover the ultimate Caribbean kite cruises on luxury catamarans. Expert kitesurfing coaching, small groups, guaranteed wind. Book your catamaran kite cruise today!",
    images: ["https://kitesafaris.com/images/caribbean-kite-cruises-hero.jpg"],
  },
}

export default function CaribbeanKiteCruisesGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Caribbean Kite Cruises | Luxury Catamaran Kitesurfing Adventures",
    "description": "Discover the ultimate Caribbean kite cruises on luxury catamarans. Expert kitesurfing coaching, small groups, guaranteed wind. Book your catamaran kite cruise today!",
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
      "@id": "https://kitesafaris.com/guides/caribbean-kite-cruises"
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
                Caribbean Kite Cruises
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the ultimate Caribbean kite cruises on luxury catamarans. From the Dominican Republic to Turks and Caicos, 
                discover world-class kitesurfing destinations with expert coaching and guaranteed wind conditions.
              </p>
            </div>
          </div>
        </section>

        {/* What Are Caribbean Kite Cruises */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              What Are Caribbean Kite Cruises?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🛥️ Luxury Catamaran Adventures
                </h3>
                <p className="text-gray-600 mb-4">
                  Caribbean kite cruises combine the thrill of kitesurfing with the luxury of catamaran sailing. 
                  Our spacious catamarans serve as your floating base camp, taking you to the best kitesurfing spots 
                  across the Caribbean while providing comfortable accommodations and gourmet meals.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Spacious catamaran accommodations</li>
                  <li>• Professional kitesurfing instruction</li>
                  <li>• Access to remote, pristine kite spots</li>
                  <li>• All equipment and safety gear included</li>
                  <li>• Gourmet meals and premium beverages</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌊 Why Choose Catamaran Kite Cruises?
                </h3>
                <p className="text-gray-600 mb-4">
                  Unlike land-based kitesurfing trips, catamaran kite cruises offer unparalleled access to the Caribbean's 
                  most beautiful and wind-consistent locations. You'll kite in crystal-clear waters, explore hidden coves, 
                  and experience the true spirit of Caribbean adventure.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Access to exclusive, uncrowded spots</li>
                  <li>• Consistent trade winds and perfect conditions</li>
                  <li>• Island-hopping adventures</li>
                  <li>• Small group sizes (max 8 guests)</li>
                  <li>• Professional crew and safety support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Top Caribbean Kite Cruise Destinations */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Top Caribbean Kite Cruise Destinations
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Dominican Republic */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Dominican Republic</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Kitesurfing Dominican Republic
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The Dominican Republic offers world-class kitesurfing conditions with consistent trade winds 
                    and warm Caribbean waters. Perfect for all skill levels from beginners to advanced riders.
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
                      <span className="font-medium">Best Spots:</span>
                      <span>Cabarete, Punta Cana</span>
                    </div>
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
                    Kitesurf Turks and Caicos
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Grace Bay offers pristine kitesurfing conditions with shallow waters and consistent winds. 
                    Perfect for beginners and freestyle riders seeking flat water conditions.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Nov - May</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>12-22 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Best Spots:</span>
                      <span>Grace Bay, Long Bay</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Barbados */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-coral-orange-400 to-coral-orange-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Barbados</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Barbados Kiteboarding Season
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Barbados offers excellent kitesurfing conditions with consistent trade winds and beautiful beaches. 
                    The kiteboarding season runs from November to May with peak conditions.
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
                      <span className="font-medium">Best Spots:</span>
                      <span>Silver Sands, Crane Beach</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Antigua */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Antigua</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    <Link href="/destinations/antigua" className="hover:text-turquoise-600">
                      Kiteboarding Antigua
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Antigua offers some of the most consistent kitesurfing conditions in the Caribbean. 
                    Perfect for all skill levels with reliable trade winds and beautiful scenery.
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
                      <span className="font-medium">Best Spots:</span>
                      <span>Jabberwock Beach, Deep Bay</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tobago */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Tobago</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Kitesurf Tobago
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Tobago's unspoiled beauty and consistent trade winds make it an ideal destination 
                    for kitesurfing adventures in the southern Caribbean.
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
                      <span className="font-medium">Best Spots:</span>
                      <span>Pigeon Point, Store Bay</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grace Bay */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Grace Bay</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Kiteboard Grace Bay Turks and Caicos
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Grace Bay is world-renowned for its pristine conditions and shallow waters. 
                    Perfect for kiteboarding with consistent winds and stunning coral reefs.
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
                      <span className="font-medium">Best Spots:</span>
                      <span>Grace Bay Beach, Long Bay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Caribbean Racing Catamaran Excursions */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Caribbean Racing Catamaran Excursions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🏁 Racing Catamaran Adventures
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience the thrill of racing catamarans combined with world-class kitesurfing. 
                  Our racing catamaran excursions offer the perfect blend of high-speed sailing and 
                  adrenaline-pumping kitesurfing adventures.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• High-performance racing catamarans</li>
                  <li>• Professional racing crew</li>
                  <li>• Kitesurfing in remote locations</li>
                  <li>• Island-hopping adventures</li>
                  <li>• Exclusive access to racing events</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  ⚡ What Makes Racing Catamarans Special?
                </h3>
                <p className="text-gray-600 mb-4">
                  Racing catamarans offer superior performance and stability, making them ideal for 
                  kitesurfing adventures. Their lightweight construction and advanced sail systems 
                  provide faster speeds and better maneuverability.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Faster speeds and better performance</li>
                  <li>• Superior stability for kitesurfing</li>
                  <li>• Advanced navigation systems</li>
                  <li>• Professional racing equipment</li>
                  <li>• Experienced racing crew</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Time for Caribbean Kite Cruises */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Best Time for Caribbean Kite Cruises
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-navy-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Destination</th>
                    <th className="px-6 py-4 text-left">Peak Season</th>
                    <th className="px-6 py-4 text-left">Wind Speed</th>
                    <th className="px-6 py-4 text-left">Water Temp</th>
                    <th className="px-6 py-4 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium">Dominican Republic</td>
                    <td className="px-6 py-4">Year-round</td>
                    <td className="px-6 py-4">18-30 knots</td>
                    <td className="px-6 py-4">26-29°C</td>
                    <td className="px-6 py-4">All levels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Turks & Caicos</td>
                    <td className="px-6 py-4">Nov - May</td>
                    <td className="px-6 py-4">12-22 knots</td>
                    <td className="px-6 py-4">25-27°C</td>
                    <td className="px-6 py-4">Beginner to Advanced</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Barbados</td>
                    <td className="px-6 py-4">Nov - May</td>
                    <td className="px-6 py-4">15-25 knots</td>
                    <td className="px-6 py-4">26-28°C</td>
                    <td className="px-6 py-4">All levels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Antigua</td>
                    <td className="px-6 py-4">Dec - Apr</td>
                    <td className="px-6 py-4">15-25 knots</td>
                    <td className="px-6 py-4">26-28°C</td>
                    <td className="px-6 py-4">All levels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Tobago</td>
                    <td className="px-6 py-4">Dec - Apr</td>
                    <td className="px-6 py-4">15-25 knots</td>
                    <td className="px-6 py-4">26-28°C</td>
                    <td className="px-6 py-4">Intermediate to Advanced</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What's Included in Caribbean Kite Cruises */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              What's Included in Caribbean Kite Cruises
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🛥️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Luxury Catamaran
                </h3>
                <p className="text-gray-600 text-sm">
                  Spacious catamaran with comfortable cabins, modern amenities, and professional crew.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🏄</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Kitesurfing Equipment
                </h3>
                <p className="text-gray-600 text-sm">
                  All kitesurfing equipment including kites, boards, harnesses, and safety gear.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">👨‍🏫</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Professional Instruction
                </h3>
                <p className="text-gray-600 text-sm">
                  Expert kitesurfing coaching and instruction for all skill levels.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🍽️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Gourmet Meals
                </h3>
                <p className="text-gray-600 text-sm">
                  Delicious meals prepared by our onboard chef using fresh local ingredients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">
              Ready for Your Caribbean Kite Cruise Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join KiteSafaris for the ultimate Caribbean kite cruise experience. From the Dominican Republic 
              to Turks and Caicos, discover the best kitesurfing destinations on luxury catamarans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packages"
                className="bg-turquoise-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-turquoise-700 transition-colors"
              >
                View Caribbean Packages
              </Link>
              <Link
                href="/booking"
                className="bg-coral-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors"
              >
                Book Your Cruise
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
