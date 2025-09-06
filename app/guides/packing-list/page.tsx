import Navigation from "@/components/navigation"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kitesurfing Packing List | Essential Gear for Caribbean & Mediterranean | KiteSafaris",
  description: "Complete kitesurfing packing list for Caribbean and Mediterranean trips. Essential gear, clothing, and accessories for your kiteboarding adventure.",
  keywords: "kitesurfing packing list, kiteboarding gear, kitesurf equipment, caribbean kitesurfing, mediterranean kitesurfing, kite trip essentials",
  alternates: {
    canonical: "https://kitesafaris.com/guides/packing-list",
  },
  openGraph: {
    title: "Kitesurfing Packing List | Essential Gear for Caribbean & Mediterranean",
    description: "Complete kitesurfing packing list for Caribbean and Mediterranean trips. Essential gear, clothing, and accessories for your kiteboarding adventure.",
    url: "https://kitesafaris.com/guides/packing-list",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/images/kitesurfing-packing-list.jpg",
        width: 1200,
        height: 630,
        alt: "Kitesurfing packing list and essential gear",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitesurfing Packing List | Essential Gear for Caribbean & Mediterranean",
    description: "Complete kitesurfing packing list for Caribbean and Mediterranean trips. Essential gear, clothing, and accessories for your kiteboarding adventure.",
    images: ["https://kitesafaris.com/images/kitesurfing-packing-list.jpg"],
  },
}

export default function PackingListGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Kitesurfing Packing List | Essential Gear for Caribbean & Mediterranean",
    "description": "Complete kitesurfing packing list for Caribbean and Mediterranean trips. Essential gear, clothing, and accessories for your kiteboarding adventure.",
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
      "@id": "https://kitesafaris.com/guides/packing-list"
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
                Kitesurfing Packing List
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to pack for your kitesurfing adventure. From essential gear 
                to comfort items, make sure you're prepared for the perfect kiteboarding trip.
              </p>
            </div>
          </div>
        </section>

        {/* Essential Kitesurfing Gear */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Essential Kitesurfing Gear
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Kites */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🪁 Kites
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 2-3 kites (different sizes)</li>
                  <li>• 9m kite (most versatile)</li>
                  <li>• 12m kite (light wind)</li>
                  <li>• 7m kite (strong wind)</li>
                  <li>• Kite pump</li>
                  <li>• Kite repair kit</li>
                </ul>
                <p className="text-sm text-gray-500 mt-4">
                  <strong>Note:</strong> KiteSafaris provides all kites and equipment, but you can bring your own if preferred.
                </p>
              </div>

              {/* Board */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🏄 Board
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Twin-tip board (all-around)</li>
                  <li>• Directional board (waves)</li>
                  <li>• Board bag (protection)</li>
                  <li>• Board repair kit</li>
                  <li>• Fins (spare set)</li>
                </ul>
                <p className="text-sm text-gray-500 mt-4">
                  <strong>Tip:</strong> Choose board size based on your weight and skill level.
                </p>
              </div>

              {/* Harness & Bar */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🎯 Harness & Bar
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Waist harness (comfortable)</li>
                  <li>• Control bar (your size)</li>
                  <li>• Safety leash</li>
                  <li>• Quick release system</li>
                  <li>• Spare lines</li>
                </ul>
                <p className="text-sm text-gray-500 mt-4">
                  <strong>Important:</strong> Test your harness before the trip for comfort.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Clothing & Accessories */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Clothing & Accessories
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Water Wear */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌊 Water Wear
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Wetsuit (3mm for Caribbean, 5mm for Mediterranean)</li>
                  <li>• Rash guard (UV protection)</li>
                  <li>• Board shorts / bikini</li>
                  <li>• Neoprene boots (optional)</li>
                  <li>• Gloves (cold conditions)</li>
                  <li>• Hood (winter months)</li>
                </ul>
              </div>

              {/* Casual Wear */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  👕 Casual Wear
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Lightweight t-shirts (5-7 pieces)</li>
                  <li>• Shorts (3-4 pairs)</li>
                  <li>• Long pants (1-2 pairs)</li>
                  <li>• Light jacket / hoodie</li>
                  <li>• Underwear & socks</li>
                  <li>• Comfortable shoes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Safety & Protection */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Safety & Protection
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Safety Equipment */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🛡️ Safety Equipment
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Helmet (mandatory)</li>
                  <li>• Impact vest</li>
                  <li>• Whistle</li>
                  <li>• First aid kit</li>
                  <li>• Emergency contact info</li>
                </ul>
              </div>

              {/* Sun Protection */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  ☀️ Sun Protection
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Sunscreen (SPF 50+)</li>
                  <li>• Sunglasses (polarized)</li>
                  <li>• Hat / cap</li>
                  <li>• Lip balm (SPF)</li>
                  <li>• Sun shirt</li>
                </ul>
              </div>

              {/* Electronics */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  📱 Electronics
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Waterproof phone case</li>
                  <li>• GoPro / action camera</li>
                  <li>• Power bank</li>
                  <li>• Chargers & cables</li>
                  <li>• Waterproof bag</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Destination-Specific Packing */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Destination-Specific Packing
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Caribbean */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🏝️ Caribbean Destinations
                </h3>
                <p className="text-gray-600 mb-4">
                  Warm waters and consistent trade winds make the Caribbean perfect for kitesurfing year-round.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Light wetsuit (2-3mm) or rash guard</li>
                  <li>• Extra sunscreen (strong UV)</li>
                  <li>• Lightweight, breathable clothing</li>
                  <li>• Sandals / flip-flops</li>
                  <li>• Insect repellent</li>
                  <li>• Light rain jacket (hurricane season)</li>
                </ul>
              </div>

              {/* Mediterranean */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌊 Mediterranean Destinations
                </h3>
                <p className="text-gray-600 mb-4">
                  Variable conditions and cooler waters require more versatile packing.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Thicker wetsuit (3-5mm)</li>
                  <li>• Neoprene boots</li>
                  <li>• Layered clothing</li>
                  <li>• Comfortable walking shoes</li>
                  <li>• Light jacket for evenings</li>
                  <li>• Travel adapter (EU plugs)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Packing Tips */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Pro Packing Tips
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">📦</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Use Soft Bags
                </h3>
                <p className="text-gray-600 text-sm">
                  Soft bags are easier to store on catamarans and protect your gear better.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🏷️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Label Everything
                </h3>
                <p className="text-gray-600 text-sm">
                  Label all your gear with your name to avoid mix-ups with other guests.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">💧</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Waterproof Storage
                </h3>
                <p className="text-gray-600 text-sm">
                  Use waterproof bags for electronics and important documents.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">⚖️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Check Weight Limits
                </h3>
                <p className="text-gray-600 text-sm">
                  Airlines have strict weight limits for sports equipment. Check before you fly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What KiteSafaris Provides */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              What KiteSafaris Provides
            </h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-4">
                    ✅ Included in Your Trip
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• All kitesurfing equipment (kites, boards, harnesses)</li>
                    <li>• Professional instruction and coaching</li>
                    <li>• Safety equipment (helmets, impact vests)</li>
                    <li>• Wetsuits and rash guards</li>
                    <li>• Kite repair and maintenance</li>
                    <li>• All meals and accommodations</li>
                    <li>• Transportation to kite spots</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-4">
                    🎒 What to Bring
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Personal clothing and toiletries</li>
                    <li>• Sunscreen and sun protection</li>
                    <li>• Camera and electronics</li>
                    <li>• Personal medications</li>
                    <li>• Travel documents</li>
                    <li>• Your own gear (if preferred)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">
              Ready for Your Kitesurfing Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Book your luxury catamaran kiteboarding trip with KiteSafaris and let us handle all the equipment details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packages"
                className="bg-turquoise-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-turquoise-700 transition-colors"
              >
                View Packages
              </Link>
              <Link
                href="/booking"
                className="bg-coral-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
