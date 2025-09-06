import Navigation from "@/components/navigation"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Catamaran Kitesurfing Launch Guide | Safe Launching Techniques | KiteSafaris",
  description: "Complete guide to kitesurfing from catamarans. Learn safe launching techniques, equipment setup, and best practices for catamaran kiteboarding.",
  keywords: "catamaran kitesurfing, kite launching, catamaran launching, kiteboarding from boat, safe kite launching, catamaran kite setup",
  alternates: {
    canonical: "https://kitesafaris.com/guides/catamaran-launching",
  },
  openGraph: {
    title: "Catamaran Kitesurfing Launch Guide | Safe Launching Techniques",
    description: "Complete guide to kitesurfing from catamarans. Learn safe launching techniques, equipment setup, and best practices for catamaran kiteboarding.",
    url: "https://kitesafaris.com/guides/catamaran-launching",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/images/catamaran-launching-guide.jpg",
        width: 1200,
        height: 630,
        alt: "Catamaran kitesurfing launch guide and techniques",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catamaran Kitesurfing Launch Guide | Safe Launching Techniques",
    description: "Complete guide to kitesurfing from catamarans. Learn safe launching techniques, equipment setup, and best practices for catamaran kiteboarding.",
    images: ["https://kitesafaris.com/images/catamaran-launching-guide.jpg"],
  },
}

export default function CatamaranLaunchingGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Catamaran Kitesurfing Launch Guide | Safe Launching Techniques",
    "description": "Complete guide to kitesurfing from catamarans. Learn safe launching techniques, equipment setup, and best practices for catamaran kiteboarding.",
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
      "@id": "https://kitesafaris.com/guides/catamaran-launching"
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
                Catamaran Kitesurfing Launch Guide
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Master the art of kitesurfing from a catamaran. Learn safe launching techniques, 
                equipment setup, and best practices for the ultimate kiteboarding experience.
              </p>
            </div>
          </div>
        </section>

        {/* Pre-Launch Preparation */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Pre-Launch Preparation
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🛠️ Equipment Setup
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Inspect all equipment for damage or wear</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Check kite lines for tangles or knots</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Ensure safety systems are working</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Test quick release mechanisms</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Verify harness fit and comfort</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌊 Conditions Assessment
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Check wind speed and direction</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Assess wave conditions and current</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Identify safe launch and landing areas</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Check for obstacles or hazards</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Confirm emergency procedures</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Launching Techniques */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Launching Techniques
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Self-Launch */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🚀 Self-Launch
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">1.</span>
                    <span>Position kite at edge of wind window</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">2.</span>
                    <span>Secure board and harness</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">3.</span>
                    <span>Pull on back lines to launch</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">4.</span>
                    <span>Steer kite to 12 o'clock position</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">5.</span>
                    <span>Enter water and start riding</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  <strong>Best for:</strong> Experienced riders in moderate conditions
                </p>
              </div>

              {/* Assisted Launch */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🤝 Assisted Launch
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">1.</span>
                    <span>Have crew member hold kite</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">2.</span>
                    <span>Position yourself in harness</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">3.</span>
                    <span>Give launch signal to crew</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">4.</span>
                    <span>Control kite as it rises</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">5.</span>
                    <span>Enter water when ready</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  <strong>Best for:</strong> Beginners and strong wind conditions
                </p>
              </div>

              {/* Water Launch */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌊 Water Launch
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">1.</span>
                    <span>Enter water with kite deflated</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">2.</span>
                    <span>Inflate kite in water</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">3.</span>
                    <span>Position kite for launch</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">4.</span>
                    <span>Pull on back lines to launch</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">5.</span>
                    <span>Start riding immediately</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  <strong>Best for:</strong> Advanced riders in deep water
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Procedures */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Safety Procedures
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  ⚠️ Emergency Procedures
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Always have a safety boat nearby</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Know how to use quick release systems</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Practice self-rescue techniques</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Carry emergency whistle and signaling device</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Stay within designated riding areas</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🛡️ Safety Equipment
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Helmet (mandatory for all riders)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Impact vest for protection</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Safety leash attached to harness</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Quick release system on control bar</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Emergency contact information</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Catamaran-Specific Tips */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Catamaran-Specific Tips
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">⚓</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Anchoring
                </h3>
                <p className="text-gray-600 text-sm">
                  Position catamaran upwind of launch area for optimal wind conditions.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🌊</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Wave Protection
                </h3>
                <p className="text-gray-600 text-sm">
                  Use catamaran's hulls to create sheltered launch areas in choppy conditions.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">👥</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Crew Coordination
                </h3>
                <p className="text-gray-600 text-sm">
                  Establish clear communication signals between riders and crew members.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🔄</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Rotation System
                </h3>
                <p className="text-gray-600 text-sm">
                  Implement a fair rotation system for multiple riders sharing equipment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes to Avoid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Common Mistakes to Avoid
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  ❌ Launching Mistakes
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Launching in offshore winds without safety boat</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Not checking lines for tangles before launch</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Launching too close to other riders or obstacles</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Ignoring wind conditions and using wrong kite size</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Not having proper safety equipment</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  ✅ Best Practices
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Always have a safety boat and crew support</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Double-check all equipment before launching</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Maintain safe distance from other riders</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Choose appropriate kite size for conditions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Wear all required safety equipment</span>
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
              Experience Catamaran Kitesurfing with KiteSafaris
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our expert crew provides professional instruction and support for safe catamaran kitesurfing. 
              Learn from the best in the Caribbean's most beautiful locations.
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
