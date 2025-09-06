import Navigation from "@/components/navigation"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kitesurfing Safety Guide | Essential Safety Tips & Equipment | KiteSafaris",
  description: "Complete kitesurfing safety guide with essential tips, equipment, and procedures. Learn how to stay safe while kitesurfing in the Caribbean and Mediterranean.",
  keywords: "kitesurfing safety, kiteboarding safety, kitesurf safety tips, kite safety equipment, water sports safety, kitesurfing accidents prevention",
  alternates: {
    canonical: "https://kitesafaris.com/guides/safety",
  },
  openGraph: {
    title: "Kitesurfing Safety Guide | Essential Safety Tips & Equipment",
    description: "Complete kitesurfing safety guide with essential tips, equipment, and procedures. Learn how to stay safe while kitesurfing in the Caribbean and Mediterranean.",
    url: "https://kitesafaris.com/guides/safety",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/images/kitesurfing-safety-guide.jpg",
        width: 1200,
        height: 630,
        alt: "Kitesurfing safety guide and essential tips",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitesurfing Safety Guide | Essential Safety Tips & Equipment",
    description: "Complete kitesurfing safety guide with essential tips, equipment, and procedures. Learn how to stay safe while kitesurfing in the Caribbean and Mediterranean.",
    images: ["https://kitesafaris.com/images/kitesurfing-safety-guide.jpg"],
  },
}

export default function SafetyGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Kitesurfing Safety Guide | Essential Safety Tips & Equipment",
    "description": "Complete kitesurfing safety guide with essential tips, equipment, and procedures. Learn how to stay safe while kitesurfing in the Caribbean and Mediterranean.",
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
      "@id": "https://kitesafaris.com/guides/safety"
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
                Kitesurfing Safety Guide
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your comprehensive guide to kitesurfing safety. Learn essential safety tips, 
                equipment requirements, and procedures to ensure a safe and enjoyable kitesurfing experience.
              </p>
            </div>
          </div>
        </section>

        {/* Essential Safety Equipment */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Essential Safety Equipment
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Helmet */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🪖 Helmet
                </h3>
                <p className="text-gray-600 mb-4">
                  A properly fitted helmet is mandatory for all kitesurfing activities. 
                  It protects your head from impacts and collisions.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Must fit snugly and securely</li>
                  <li>• Should be designed for water sports</li>
                  <li>• Replace if damaged or after impact</li>
                  <li>• Check straps and buckles regularly</li>
                </ul>
              </div>

              {/* Impact Vest */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🦺 Impact Vest
                </h3>
                <p className="text-gray-600 mb-4">
                  Provides buoyancy and protection for your torso. Essential for all skill levels, 
                  especially in strong winds and choppy conditions.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Provides flotation assistance</li>
                  <li>• Protects ribs and internal organs</li>
                  <li>• Should fit comfortably over wetsuit</li>
                  <li>• Check for proper buoyancy</li>
                </ul>
              </div>

              {/* Safety Leash */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🔗 Safety Leash
                </h3>
                <p className="text-gray-600 mb-4">
                  Connects you to your kite and provides a safety connection. 
                  Essential for self-rescue and emergency situations.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Must be in good condition</li>
                  <li>• Check for wear and tear</li>
                  <li>• Should be appropriate length</li>
                  <li>• Test quick release mechanism</li>
                </ul>
              </div>

              {/* Quick Release */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  ⚡ Quick Release
                </h3>
                <p className="text-gray-600 mb-4">
                  Allows you to instantly disconnect from your kite in emergency situations. 
                  Practice using it regularly.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Must be easily accessible</li>
                  <li>• Practice activation regularly</li>
                  <li>• Check for smooth operation</li>
                  <li>• Replace if worn or damaged</li>
                </ul>
              </div>

              {/* Whistle */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  📢 Emergency Whistle
                </h3>
                <p className="text-gray-600 mb-4">
                  Essential for signaling for help in emergency situations. 
                  Should be attached to your harness or impact vest.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Must be waterproof</li>
                  <li>• Should be easily accessible</li>
                  <li>• Test regularly for functionality</li>
                  <li>• Learn proper signaling techniques</li>
                </ul>
              </div>

              {/* First Aid Kit */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🩹 First Aid Kit
                </h3>
                <p className="text-gray-600 mb-4">
                  Basic first aid supplies for minor injuries. 
                  Should be easily accessible on the boat or beach.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Bandages and antiseptic</li>
                  <li>• Pain relief medication</li>
                  <li>• Emergency contact information</li>
                  <li>• Check expiration dates regularly</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pre-Session Safety Checklist */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Pre-Session Safety Checklist
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  ✅ Equipment Check
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Inspect kite for tears, holes, or damage</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Check all lines for wear, knots, or tangles</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Test quick release system</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Verify harness fit and security</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Check board for damage or loose fins</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Ensure all safety equipment is present</span>
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
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Ensure safety boat is available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Rules and Guidelines */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Safety Rules and Guidelines
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* General Safety */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🛡️ General Safety
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Never kitesurf alone</li>
                  <li>• Always have a safety boat nearby</li>
                  <li>• Know your limits and skill level</li>
                  <li>• Stay within designated areas</li>
                  <li>• Respect other water users</li>
                  <li>• Follow local regulations</li>
                </ul>
              </div>

              {/* Wind Safety */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  💨 Wind Safety
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Check wind forecast before going out</li>
                  <li>• Use appropriate kite size for conditions</li>
                  <li>• Avoid offshore winds without safety boat</li>
                  <li>• Be aware of wind direction changes</li>
                  <li>• Don't launch in gusty conditions</li>
                  <li>• Know how to self-rescue</li>
                </ul>
              </div>

              {/* Emergency Procedures */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🚨 Emergency Procedures
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Know how to use quick release</li>
                  <li>• Practice self-rescue techniques</li>
                  <li>• Carry emergency contact information</li>
                  <li>• Use whistle to signal for help</li>
                  <li>• Stay with your equipment if possible</li>
                  <li>• Know local emergency numbers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Common Accidents and Prevention */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Common Accidents and Prevention
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  ⚠️ Common Accidents
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Collisions with other riders or obstacles</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Equipment failure or line breaks</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Being dragged by kite in strong winds</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Drowning due to equipment entanglement</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Injuries from hard landings or crashes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  ✅ Prevention Measures
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Maintain safe distance from others</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Regular equipment inspection and maintenance</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Use appropriate kite size for conditions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Practice emergency procedures regularly</span>
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

        {/* Self-Rescue Techniques */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Self-Rescue Techniques
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🆘 Basic Self-Rescue
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">1.</span>
                    <span>Stay calm and assess the situation</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">2.</span>
                    <span>Use quick release if necessary</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">3.</span>
                    <span>Gather kite lines to prevent tangling</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">4.</span>
                    <span>Use kite as a sail to reach shore</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">5.</span>
                    <span>Signal for help if needed</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🚤 Advanced Rescue
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">1.</span>
                    <span>Deploy kite as a sea anchor</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">2.</span>
                    <span>Use board as a paddle</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">3.</span>
                    <span>Conserve energy and stay warm</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">4.</span>
                    <span>Use whistle to signal for help</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 font-bold">5.</span>
                    <span>Stay with your equipment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">
              Learn Kitesurfing Safety with KiteSafaris
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our certified instructors prioritize safety above all else. Learn proper techniques, 
              safety procedures, and emergency protocols in a controlled, professional environment.
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
