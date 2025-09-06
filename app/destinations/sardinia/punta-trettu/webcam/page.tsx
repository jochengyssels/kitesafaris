import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import PuntaTrettuWebcam from "@/components/webcam/PuntaTrettuWebcam"
import WindOverlay from "@/components/webcam/WindOverlay"
import WindForecastCard from "@/components/weather/WindForecastCard"
import Link from "next/link"
import { ArrowLeft, Camera, Wind, Clock, MapPin, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Punta Trettu Webcam | Live Kitesurf Conditions (Sardinia)",
  description: "Live Punta Trettu kitesurf webcam: real-time view and wind notes for Sardinia's flat-water spot.",
  keywords: [
    "Punta Trettu webcam",
    "webcam Punta Trettu", 
    "kitesurf sardinia webcam",
    "kitesurf punta trettu",
    "sardinia kitesurf",
    "live webcam sardinia",
    "punta trettu live stream",
    "sardinia kitesurfing webcam",
    "italy kitesurf webcam",
    "mediterranean kitesurf live"
  ],
  openGraph: {
    title: "Punta Trettu Webcam | Live Kitesurf Conditions (Sardinia)",
    description: "Live Punta Trettu kitesurf webcam: real-time view and wind notes for Sardinia's flat-water spot.",
    url: "https://www.kitesafaris.com/destinations/sardinia/punta-trettu/webcam",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
        width: 1200,
        height: 630,
        alt: "Punta Trettu webcam view showing kitesurfing conditions in Sardinia",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Punta Trettu Webcam | Live Kitesurf Conditions (Sardinia)",
    description: "Live Punta Trettu kitesurf webcam: real-time view and wind notes for Sardinia's flat-water spot.",
    images: ["https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"],
  },
  alternates: {
    canonical: "https://www.kitesafaris.com/destinations/sardinia/punta-trettu/webcam",
  },
}

// JSON-LD for VideoObject
const webcamJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Punta Trettu Live Webcam",
  "description": "Live webcam stream showing real-time kitesurfing conditions at Punta Trettu, Sardinia's premier kitesurfing destination",
  "isLiveBroadcast": true,
  "contentUrl": "https://cdn-007.whatsupcams.com/hls/it_sangiovannisuergiu01.m3u8",
  "embedUrl": "https://www.kitesafaris.com/destinations/sardinia/punta-trettu/webcam",
  "thumbnailUrl": "https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
  "uploadDate": "2024-01-01T00:00:00Z",
  "duration": "PT24H",
  "publisher": {
    "@type": "Organization",
    "name": "KiteSafaris",
    "url": "https://kitesafaris.com"
  },
  "locationCreated": {
    "@type": "Place",
    "name": "Punta Trettu, Sardinia",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Giovanni Suergiu",
      "addressRegion": "Sardinia",
      "addressCountry": "Italy"
    }
  },
  "about": {
    "@type": "Thing",
    "name": "Kitesurfing",
    "description": "Live kitesurfing conditions and weather at Punta Trettu"
  }
}

const webcamPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Punta Trettu Webcam | Live Kitesurf Conditions (Sardinia)",
  "description": "Live Punta Trettu kitesurf webcam: real-time view and wind notes for Sardinia's flat-water spot.",
  "url": "https://www.kitesafaris.com/destinations/sardinia/punta-trettu/webcam",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://kitesafaris.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Destinations",
        "item": "https://kitesafaris.com/destinations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Sardinia",
        "item": "https://kitesafaris.com/destinations/sardinia"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Punta Trettu",
        "item": "https://kitesafaris.com/destinations/sardinia/punta-trettu"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Webcam",
        "item": "https://kitesafaris.com/destinations/sardinia/punta-trettu/webcam"
      }
    ]
  }
}

export default function PuntaTrettuWebcamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webcamPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webcamJsonLd) }}
      />
      
      <Navigation />
      
      {/* Hero Webcam Section - Full Screen Width */}
      <section className="relative w-screen -mx-4 sm:-mx-6 lg:-mx-8">
        {/* Live Webcam Hero */}
        <div className="relative w-full h-[70vh] min-h-[500px] bg-black">
          <PuntaTrettuWebcam
            className="w-full h-full bg-black object-cover"
            ariaLabel="Live webcam stream: Punta Trettu, Sardinia - Current kitesurfing conditions"
          />
          
          {/* Title Overlay - Top */}
          <div className="absolute top-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-montserrat font-bold text-white text-balance drop-shadow-lg">
                Punta Trettu Webcam – Live View
              </h1>
            </div>
          </div>

          {/* Wind Conditions Overlay */}
          <WindOverlay />

          {/* Live Indicator - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">LIVE</span>
                </div>
                <span className="text-white/70 text-sm">Punta Trettu, Sardinia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Webcam Caption */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              <strong>Punta Trettu Lagoon:</strong> This live webcam shows the flat water conditions perfect for beginner kitesurfing. 
              Watch for wind patterns and water levels that make this spot ideal for learning. The shallow lagoon creates 
              safe conditions while the consistent winds provide excellent kitesurfing opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Wind Forecast Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <WindForecastCard hours={6} showCurrent={true} />
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-turquoise/10 to-deep-navy/10 rounded-xl p-6">
                <h3 className="text-xl font-montserrat font-bold text-deep-navy mb-4">
                  Perfect Kitesurfing Conditions
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <Wind className="w-5 h-5 text-turquoise mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Consistent Winds:</strong> Punta Trettu experiences reliable thermal winds from April to October, 
                      typically 15-25 knots during peak season.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-turquoise mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Flat Water Lagoon:</strong> The shallow, protected lagoon provides ideal learning conditions 
                      with minimal waves and obstacles.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-turquoise mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Beginner Friendly:</strong> Perfect for all skill levels, from first-time kitesurfers 
                      to advanced riders looking for flat water sessions.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-deep-navy mb-3">Best Times to Kitesurf</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Morning Session:</span>
                    <span className="font-medium">9:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Afternoon Session:</span>
                    <span className="font-medium">2:00 PM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Peak Season:</span>
                    <span className="font-medium">April - October</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full">

            {/* SEO Content Block */}
            <section className="mb-8">
              <h2 className="text-2xl font-montserrat font-bold text-deep-navy mb-6">
                What You See on the Punta Trettu Webcam
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Punta Trettu webcam provides a live view of Sardinia's most popular kitesurfing lagoon. 
                  You can observe the flat water conditions, wind strength, and kitesurfing activity in real-time. 
                  The shallow lagoon creates perfect conditions for beginners, while the consistent winds from April to October 
                  make it ideal for all skill levels.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Best times to watch the Punta Trettu webcam are during the windy season (April to October) when you'll see 
                  the most kitesurfing activity. Morning sessions typically show lighter winds, while afternoon sessions 
                  often display stronger conditions perfect for experienced riders.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  KiteSafaris partners with local schools at Punta Trettu to provide professional instruction. 
                  <Link href="/destinations/sardinia/punta-trettu" className="text-turquoise hover:text-deep-navy transition-colors font-medium">
                    Check our complete Punta Trettu guide
                  </Link> for detailed information about kitesurfing lessons and packages.
                </p>
              </div>
            </section>

            {/* How to Read Conditions */}
            <section className="mb-8">
              <h2 className="text-2xl font-montserrat font-bold text-deep-navy mb-6">
                How to Read Conditions
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Reading the Punta Trettu webcam conditions helps you plan your kitesurfing session effectively. 
                  Look for these key indicators when watching the live stream:
                </p>
                <ul className="text-gray-700 leading-relaxed space-y-2 mb-4">
                  <li><strong>Wind Strength:</strong> Watch for kite movement and water ripples to gauge wind speed</li>
                  <li><strong>Water Clarity:</strong> Clear water indicates good visibility and safe conditions</li>
                  <li><strong>Activity Level:</strong> Moderate activity suggests good conditions without overcrowding</li>
                  <li><strong>Water Level:</strong> Consistent water levels indicate stable lagoon conditions</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  The webcam also shows the lagoon's water level, which affects riding conditions. 
                  <Link href="/destinations/sardinia/punta-trettu/kitesurf-lessons" className="text-turquoise hover:text-deep-navy transition-colors font-medium">
                    Learn more about kitesurf lessons
                  </Link> at Punta Trettu with our partner schools.
                </p>
              </div>
            </section>

            {/* Internal Links */}
            <section className="bg-gradient-to-br from-turquoise/10 to-deep-navy/10 rounded-xl p-8">
              <h2 className="text-2xl font-montserrat font-bold text-deep-navy mb-6">
                Explore More About Sardinia Kitesurfing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                  href="/destinations/sardinia/punta-trettu" 
                  className="block bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-6 h-6 text-turquoise group-hover:text-deep-navy transition-colors" />
                    <h3 className="font-semibold text-deep-navy group-hover:text-turquoise transition-colors">
                      Complete Punta Trettu Guide
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Comprehensive guide to kitesurfing at Punta Trettu, including conditions, 
                    schools, and travel information.
                  </p>
                </Link>
                
                <Link 
                  href="/destinations/sardinia/punta-trettu/kitesurf-lessons" 
                  className="block bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-turquoise group-hover:text-deep-navy transition-colors" />
                    <h3 className="font-semibold text-deep-navy group-hover:text-turquoise transition-colors">
                      Kitesurf Lessons & Schools
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Professional kitesurfing lessons and partner schools at Punta Trettu 
                    with exclusive KiteSafaris discounts.
                  </p>
                </Link>
              </div>
            </section>

            {/* Quick Info Section - Full Width */}
            <section className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <Clock className="w-8 h-8 text-turquoise mx-auto mb-3" />
                  <h3 className="font-semibold text-deep-navy mb-2">Live Stream</h3>
                  <p className="text-sm text-gray-600">Real-time feed</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <MapPin className="w-8 h-8 text-turquoise mx-auto mb-3" />
                  <h3 className="font-semibold text-deep-navy mb-2">Location</h3>
                  <p className="text-sm text-gray-600">Punta Trettu, Sardinia</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <Wind className="w-8 h-8 text-turquoise mx-auto mb-3" />
                  <h3 className="font-semibold text-deep-navy mb-2">Wind</h3>
                  <p className="text-sm text-gray-600">15-25 knots</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <Users className="w-8 h-8 text-turquoise mx-auto mb-3" />
                  <h3 className="font-semibold text-deep-navy mb-2">Level</h3>
                  <p className="text-sm text-gray-600">Beginner Friendly</p>
                </div>
              </div>
            </section>

            {/* Back to Punta Trettu - Full Width */}
            <section className="mb-8">
              <div className="bg-gradient-to-br from-deep-navy to-turquoise rounded-xl p-8 text-white text-center">
                <Link 
                  href="/destinations/sardinia/punta-trettu" 
                  className="inline-flex items-center gap-2 text-white hover:text-turquoise transition-colors group text-lg font-medium"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Punta Trettu Kitesurf Guide</span>
                </Link>
                <p className="text-sm opacity-80 mt-3 max-w-2xl mx-auto">
                  Explore our complete Punta Trettu kitesurfing guide with detailed information about conditions, 
                  schools, and booking options.
                </p>
              </div>
            </section>
        </div>
      </div>
    </>
  )
}
