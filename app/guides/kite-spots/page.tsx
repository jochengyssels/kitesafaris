import Navigation from "@/components/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Best Kitesurfing Spots | Caribbean & Mediterranean Guide | KiteSafaris",
  description: "Discover the world's best kitesurfing spots in the Caribbean and Mediterranean. Expert guide to top kiteboarding locations, wind conditions, and when to visit.",
  keywords: "kitesurfing spots, kiteboarding locations, caribbean kitesurfing, mediterranean kitesurfing, best kite spots, kitesurf destinations",
  alternates: {
    canonical: "https://kitesafaris.com/guides/kite-spots",
  },
  openGraph: {
    title: "Best Kitesurfing Spots | Caribbean & Mediterranean Guide",
    description: "Discover the world's best kitesurfing spots in the Caribbean and Mediterranean. Expert guide to top kiteboarding locations, wind conditions, and when to visit.",
    url: "https://kitesafaris.com/guides/kite-spots",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/images/kite-spots-guide.jpg",
        width: 1200,
        height: 630,
        alt: "Best kitesurfing spots in Caribbean and Mediterranean",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Kitesurfing Spots | Caribbean & Mediterranean Guide",
    description: "Discover the world's best kitesurfing spots in the Caribbean and Mediterranean. Expert guide to top kiteboarding locations, wind conditions, and when to visit.",
    images: ["https://kitesafaris.com/images/kite-spots-guide.jpg"],
  },
}

export default function KiteSpotsGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Best Kitesurfing Spots | Caribbean & Mediterranean Guide",
    "description": "Discover the world's best kitesurfing spots in the Caribbean and Mediterranean. Expert guide to top kiteboarding locations, wind conditions, and when to visit.",
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
      "@id": "https://kitesafaris.com/guides/kite-spots"
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
                Best Kitesurfing Spots
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the world's premier kitesurfing destinations in the Caribbean and Mediterranean. 
                From consistent trade winds to crystal-clear waters, find your perfect kiteboarding paradise.
              </p>
            </div>
          </div>
        </section>

        {/* Caribbean Spots */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Caribbean Kitesurfing Spots
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Antigua */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-turquoise-400 to-turquoise-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Antigua</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    <Link href="/destinations/antigua" className="hover:text-turquoise-600">
                      Antigua Kitesurfing
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Consistent trade winds and flat water conditions make Antigua perfect for all skill levels. 
                    Best from December to April.
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
                      <span>All levels</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Turks and Caicos */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-coral-orange-400 to-coral-orange-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Turks & Caicos</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Grace Bay Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Grace Bay offers pristine conditions with shallow waters and consistent winds. 
                    Perfect for beginners and freestyle riders.
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
                      <span className="font-medium">Skill Level:</span>
                      <span>Beginner to Advanced</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dominican Republic */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Dominican Republic</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Cabarete Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Cabarete is the kitesurfing capital of the Caribbean with world-class conditions 
                    and a vibrant kiteboarding community.
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
                      <span>Intermediate to Pro</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mediterranean Spots */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Mediterranean Kitesurfing Spots
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Greece */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Greece</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    <Link href="/destinations/greece" className="hover:text-turquoise-600">
                      Greek Islands Kitesurfing
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The Greek Islands offer diverse kitesurfing conditions from flat water lagoons 
                    to wave spots. Best from May to October.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>May - Oct</span>
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

              {/* Sardinia */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Sardinia</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    <Link href="/destinations/sardinia" className="hover:text-turquoise-600">
                      Sardinia Kitesurfing
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Sardinia's west coast offers excellent kitesurfing with consistent winds 
                    and beautiful scenery. Perfect for intermediate riders.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Apr - Oct</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>12-20 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>Beginner to Advanced</span>
                    </div>
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
                    Spanish Coast Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Spain's Mediterranean coast offers excellent kitesurfing conditions 
                    with warm waters and reliable winds.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Apr - Sep</span>
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
            </div>
          </div>
        </section>

        {/* Wind Conditions Guide */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Understanding Wind Conditions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  Trade Winds
                </h3>
                <p className="text-gray-600 mb-4">
                  The Caribbean's consistent trade winds are created by the high-pressure system 
                  over the Atlantic. These winds blow from the northeast at 15-25 knots, 
                  providing perfect kitesurfing conditions.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Most consistent from December to April</li>
                  <li>• Strongest in the morning and evening</li>
                  <li>• Generally side-shore to side-on-shore</li>
                  <li>• Perfect for all skill levels</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  Thermal Winds
                </h3>
                <p className="text-gray-600 mb-4">
                  Mediterranean thermal winds are created by temperature differences between 
                  land and sea. These winds typically build during the day and peak in the afternoon.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Strongest from May to October</li>
                  <li>• Builds from 10 AM to 6 PM</li>
                  <li>• Can reach 20-30 knots</li>
                  <li>• Great for advanced riders</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Best Time to Visit Each Destination
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-navy-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Destination</th>
                    <th className="px-6 py-4 text-left">Best Season</th>
                    <th className="px-6 py-4 text-left">Wind Speed</th>
                    <th className="px-6 py-4 text-left">Water Temp</th>
                    <th className="px-6 py-4 text-left">Skill Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium">Antigua</td>
                    <td className="px-6 py-4">Dec - Apr</td>
                    <td className="px-6 py-4">15-25 knots</td>
                    <td className="px-6 py-4">26-28°C</td>
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
                    <td className="px-6 py-4 font-medium">Dominican Republic</td>
                    <td className="px-6 py-4">Year-round</td>
                    <td className="px-6 py-4">18-30 knots</td>
                    <td className="px-6 py-4">26-29°C</td>
                    <td className="px-6 py-4">Intermediate to Pro</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Greece</td>
                    <td className="px-6 py-4">May - Oct</td>
                    <td className="px-6 py-4">15-25 knots</td>
                    <td className="px-6 py-4">22-26°C</td>
                    <td className="px-6 py-4">All levels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Sardinia</td>
                    <td className="px-6 py-4">Apr - Oct</td>
                    <td className="px-6 py-4">12-20 knots</td>
                    <td className="px-6 py-4">20-24°C</td>
                    <td className="px-6 py-4">Beginner to Advanced</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">
              Ready to Experience These Amazing Kitesurfing Spots?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join KiteSafaris for luxury catamaran kiteboarding adventures to the world's best kitesurfing destinations.
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
