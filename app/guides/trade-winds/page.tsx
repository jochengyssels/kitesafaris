import Navigation from "@/components/navigation"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Trade Winds Guide | Caribbean Kitesurfing Wind Conditions | KiteSafaris",
  description: "Complete guide to Caribbean trade winds for kitesurfing. Learn about wind patterns, seasons, and best conditions for kiteboarding in the Caribbean.",
  keywords: "trade winds, caribbean winds, kitesurfing wind conditions, kiteboarding wind, caribbean weather, wind patterns",
  alternates: {
    canonical: "https://kitesafaris.com/guides/trade-winds",
  },
  openGraph: {
    title: "Trade Winds Guide | Caribbean Kitesurfing Wind Conditions",
    description: "Complete guide to Caribbean trade winds for kitesurfing. Learn about wind patterns, seasons, and best conditions for kiteboarding in the Caribbean.",
    url: "https://kitesafaris.com/guides/trade-winds",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/images/trade-winds-guide.jpg",
        width: 1200,
        height: 630,
        alt: "Caribbean trade winds guide for kitesurfing",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trade Winds Guide | Caribbean Kitesurfing Wind Conditions",
    description: "Complete guide to Caribbean trade winds for kitesurfing. Learn about wind patterns, seasons, and best conditions for kiteboarding in the Caribbean.",
    images: ["https://kitesafaris.com/images/trade-winds-guide.jpg"],
  },
}

export default function TradeWindsGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Trade Winds Guide | Caribbean Kitesurfing Wind Conditions",
    "description": "Complete guide to Caribbean trade winds for kitesurfing. Learn about wind patterns, seasons, and best conditions for kiteboarding in the Caribbean.",
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
      "@id": "https://kitesafaris.com/guides/trade-winds"
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
                Trade Winds Guide
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Master the Caribbean's legendary trade winds for the ultimate kitesurfing experience. 
                Learn about wind patterns, seasons, and how to read conditions like a pro.
              </p>
            </div>
          </div>
        </section>

        {/* What Are Trade Winds */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              What Are Trade Winds?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌬️ The Science Behind Trade Winds
                </h3>
                <p className="text-gray-600 mb-4">
                  Trade winds are steady, predictable winds that blow from the northeast across the Caribbean. 
                  They're created by the Earth's rotation and the temperature differences between the equator and the poles.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Blow from northeast to southwest</li>
                  <li>• Consistent direction and strength</li>
                  <li>• Created by high-pressure systems</li>
                  <li>• Most reliable from December to April</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🏄 Why They're Perfect for Kitesurfing
                </h3>
                <p className="text-gray-600 mb-4">
                  Trade winds provide the ideal conditions for kitesurfing with their consistency, 
                  predictable patterns, and perfect strength for all skill levels.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Consistent 15-25 knot winds</li>
                  <li>• Side-shore to side-on-shore direction</li>
                  <li>• Minimal gustiness</li>
                  <li>• Perfect for learning and progression</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Wind Patterns */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Seasonal Wind Patterns
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Winter */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-navy-900 mb-3">
                  ❄️ Winter (Dec - Feb)
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Wind Speed:</span>
                    <span>18-25 knots</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Consistency:</span>
                    <span>Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Direction:</span>
                    <span>NE</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-3">
                  Peak season with strongest and most consistent winds. Perfect for all skill levels.
                </p>
              </div>

              {/* Spring */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-navy-900 mb-3">
                  🌸 Spring (Mar - May)
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Wind Speed:</span>
                    <span>15-22 knots</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Consistency:</span>
                    <span>Very Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Direction:</span>
                    <span>NE-E</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-3">
                  Great conditions with slightly lighter winds. Ideal for beginners and intermediate riders.
                </p>
              </div>

              {/* Summer */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-navy-900 mb-3">
                  ☀️ Summer (Jun - Aug)
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Wind Speed:</span>
                    <span>10-18 knots</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Consistency:</span>
                    <span>Moderate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Direction:</span>
                    <span>E-SE</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-3">
                  Lighter winds and occasional calm days. Good for beginners and light wind kites.
                </p>
              </div>

              {/* Fall */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-navy-900 mb-3">
                  🍂 Fall (Sep - Nov)
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Wind Speed:</span>
                    <span>12-20 knots</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Consistency:</span>
                    <span>Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Direction:</span>
                    <span>E-NE</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-3">
                  Transition period with improving conditions. Watch for hurricane season.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reading Wind Conditions */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Reading Wind Conditions
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Wind Direction */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🧭 Wind Direction
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">Side-shore (NE)</p>
                      <p className="text-xs text-gray-600">Perfect for kitesurfing</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">Side-on-shore (E)</p>
                      <p className="text-xs text-gray-600">Good conditions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">On-shore (SE)</p>
                      <p className="text-xs text-gray-600">Caution required</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wind Strength */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  💨 Wind Strength
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">10-15 knots</p>
                      <p className="text-xs text-gray-600">Light wind kites</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">15-20 knots</p>
                      <p className="text-xs text-gray-600">Perfect conditions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">20-25 knots</p>
                      <p className="text-xs text-gray-600">Strong winds</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Signs */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  ☁️ Weather Signs
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">Clear skies</p>
                      <p className="text-xs text-gray-600">Stable conditions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">Cumulus clouds</p>
                      <p className="text-xs text-gray-600">Thermal activity</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">Dark clouds</p>
                      <p className="text-xs text-gray-600">Storm approaching</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Destinations for Trade Winds */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Best Destinations for Trade Winds
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Antigua */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  <Link href="/destinations/antigua" className="hover:text-turquoise-600">
                    Antigua
                  </Link>
                </h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Wind Season:</span>
                    <span>Dec - Apr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Average Wind:</span>
                    <span>18-22 knots</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Consistency:</span>
                    <span>95%</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Antigua offers the most consistent trade winds in the Caribbean, 
                  making it perfect for kitesurfing year-round.
                </p>
              </div>

              {/* Barbados */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  Barbados
                </h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Wind Season:</span>
                    <span>Nov - May</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Average Wind:</span>
                    <span>16-20 knots</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Consistency:</span>
                    <span>90%</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Barbados benefits from consistent trade winds and offers 
                  excellent flat water conditions for kitesurfing.
                </p>
              </div>

              {/* Dominican Republic */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  Dominican Republic
                </h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Wind Season:</span>
                    <span>Year-round</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Average Wind:</span>
                    <span>20-25 knots</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Consistency:</span>
                    <span>85%</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Cabarete is famous for its strong, consistent trade winds 
                  and world-class kitesurfing conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Wind Safety Tips */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Wind Safety Tips
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  ⚠️ Safety Guidelines
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Never kitesurf alone - always have a buddy</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Check weather forecasts before heading out</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Start with smaller kites in strong winds</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Know your limits and don't push too hard</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Always wear a helmet and impact vest</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  📱 Wind Apps & Resources
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Windy.com - Detailed wind forecasts</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Windfinder - Local wind conditions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>NOAA Weather - Official forecasts</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Local kite schools - Real-time conditions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>KiteSafaris crew - Expert local knowledge</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">
              Experience Perfect Trade Winds with KiteSafaris
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our expert crew knows the Caribbean's trade winds like no one else. 
              Join us for the ultimate kitesurfing adventure in perfect conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/destinations"
                className="bg-turquoise-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-turquoise-700 transition-colors"
              >
                Explore Destinations
              </Link>
              <Link
                href="/packages"
                className="bg-coral-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors"
              >
                View Packages
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
