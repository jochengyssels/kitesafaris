import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"

export const metadata: Metadata = {
  title: "Kitesurfing at Nonsuch Bay & Green Island, Antigua | Flat Water Paradise Guide",
  description: "Discover Nonsuch Bay and Green Island, Antigua's premier kitesurfing destinations. Complete guide to flat water conditions, exclusive access, and world-class Caribbean kite spots.",
  keywords: "nonsuch bay antigua, green island antigua, antigua kitesurfing, flat water kitesurfing, caribbean kite spots, antigua kiteboarding",
  openGraph: {
    title: "Kitesurfing at Nonsuch Bay & Green Island, Antigua | Flat Water Paradise",
    description: "Discover the Caribbean's flat water holy grail where consistent trade winds meet mirror-smooth conditions in Antigua's premier kitesurfing destinations.",
    images: [
      {
        url: "/gallery/antigua/antigua:img-catamaran-islands2.jpg",
        width: 1200,
        height: 630,
        alt: "Kitesurfing at Nonsuch Bay and Green Island, Antigua - Caribbean flat water paradise",
      },
    ],
  },
}

export default function NonsuchBayPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 py-4">
          <BreadcrumbNavigation 
            items={[
              { label: "Kite", href: "/kitesurfing-lessons" },
              { label: "Spots", href: "#" },
              { label: "Caribbean", href: "/destinations/caribbean" },
              { label: "Nonsuch Bay & Green Island" }
            ]} 
          />
        </div>

        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <Image
            src="/gallery/antigua/antigua:img-catamaran-islands2.jpg"
            alt="Kitesurfing at Nonsuch Bay and Green Island, Antigua - Caribbean flat water paradise"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-4">
                Nonsuch Bay & Green Island, Antigua
              </h1>
              <p className="text-xl md:text-2xl font-open-sans mb-6">
                The Ultimate Flat Water Paradise
              </p>
              <p className="text-lg font-open-sans opacity-90">
                Discover the Caribbean's flat water holy grail where consistent trade winds meet mirror-smooth conditions
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-turquoise-50 to-sand-beige-50">
          <div className="container mx-auto px-4 py-16">
            
            {/* Nonsuch Bay Introduction */}
            <section className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
                  🏝️ The Caribbean's Flat Water Holy Grail
                </h2>
                <p className="text-lg text-gray-700 font-open-sans leading-relaxed mb-4">
                  Imagine a massive lagoon where the Caribbean's strongest trade winds meet butter-flat water—that's <strong>Nonsuch Bay</strong>, Antigua's premier kitesurfing sanctuary.
                </p>
                <p className="text-lg text-gray-700 font-open-sans leading-relaxed">
                  This expansive bay on Antigua's eastern coast combines consistent 15-25 knot winds with protected flat water conditions, creating what many consider the <strong>perfect kitesurfing environment in the Caribbean</strong>.
                </p>
              </div>
            </section>

            {/* Location & Setting */}
            <section className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
                  📍 Location & Setting
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">🎯</span>
                        <div>
                          <strong>Position:</strong> Eastern coast of Antigua, Saint Philip Parish
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">🚗</span>
                        <div>
                          <strong>From Airport:</strong> 45 minutes via Fig Tree Drive through scenic rainforest
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">🏖️</span>
                        <div>
                          <strong>Context:</strong> Adjacent to Nonsuch Bay Resort, near historic English Harbor
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">🌊</span>
                        <div>
                          <strong>Size:</strong> Over 5 square kilometers of protected riding area
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-turquoise-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-deep-navy mb-4">Quick Access Info</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 45 minutes from V.C. Bird Airport</li>
                      <li>• Multiple access points around the bay</li>
                      <li>• Adjacent to luxury resort facilities</li>
                      <li>• Near historic English Harbor</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* What Makes Nonsuch Bay Legendary */}
            <section className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
                  🌟 What Makes Nonsuch Bay Legendary
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-coral-orange/10 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-deep-navy mb-3">Natural Protection</h3>
                      <p className="text-gray-700">
                        A <strong>massive coral barrier reef completely protects the bay</strong> from Atlantic swells, creating the Caribbean's most reliable flat water conditions regardless of outside weather.
                      </p>
                    </div>
                    <div className="bg-turquoise-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-deep-navy mb-3">Wind Funnel Effect</h3>
                      <p className="text-gray-700">
                        The geographic setup between the mainland and Green Island <strong>channels and accelerates trade winds</strong>, providing consistent power while maintaining the protected environment.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-yellow-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-deep-navy mb-3">Mirror-Flat Water</h3>
                      <p className="text-gray-700">
                        Unlike anywhere else in the Caribbean, Nonsuch Bay delivers <strong>butter-flat conditions even in 25+ knot winds</strong>—a phenomenon that attracts professional riders and instructors worldwide.
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-deep-navy mb-3">Massive Riding Area</h3>
                      <p className="text-gray-700">
                        With <strong>over 5 square kilometers of rideable space</strong>, you'll never feel crowded, even during peak season.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Wind Conditions */}
            <section className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
                  💨 Wind Conditions - Consistency Perfected
                </h2>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-coral-orange/10 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-deep-navy mb-4">Wind Statistics</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>🌬️ Prime Season:</strong> December through July - peak trade wind season</li>
                      <li><strong>🧭 Wind Direction:</strong> East to southeast - perfect side-on conditions</li>
                      <li><strong>⚡ Wind Strength:</strong> Consistent 15-25 knots during prime season</li>
                      <li><strong>📊 Reliability:</strong> 90% windable days during peak months - highest in Antigua</li>
                    </ul>
                  </div>
                  <div className="bg-turquoise-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-deep-navy mb-4">What Makes It Special</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>✨ <strong>Thermal enhancement</strong> in afternoon creates 3-5 knot boost</li>
                      <li>✨ <strong>Geographic wind acceleration</strong> between mainland and Green Island</li>
                      <li>✨ <strong>Remarkably steady conditions</strong> - minimal gusting due to open water fetch</li>
                      <li>✨ <strong>Year-round consistency</strong> with trade winds averaging 15+ knots annually</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Water Conditions */}
            <section className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
                  🌊 Water Conditions - Flat Water Perfection
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">💧</span>
                      <div>
                        <strong>Water Type:</strong> Flat to mirror-flat protected lagoon
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">🌡️</span>
                      <div>
                        <strong>Water Temperature:</strong> 79-84°F (26-29°C) year-round - no wetsuit needed
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">📏</span>
                      <div>
                        <strong>Depth:</strong> Varies from 6-20+ feet across the bay
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">🔍</span>
                      <div>
                        <strong>Clarity:</strong> Crystal clear with 30+ foot visibility
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">🏖️</span>
                      <div>
                        <strong>Bottom:</strong> Sandy with coral formations providing excellent snorkeling
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-turquoise-100 to-coral-orange/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-deep-navy mb-4">Perfect Conditions For:</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <span className="text-coral-orange mr-2">✓</span>
                        Learning and progression
                      </li>
                      <li className="flex items-center">
                        <span className="text-coral-orange mr-2">✓</span>
                        Freestyle and unhooked tricks
                      </li>
                      <li className="flex items-center">
                        <span className="text-coral-orange mr-2">✓</span>
                        Big air and technical maneuvers
                      </li>
                      <li className="flex items-center">
                        <span className="text-coral-orange mr-2">✓</span>
                        Photography and filming
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* The Riding Experience */}
            <section className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
                  🏄 The Riding Experience
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                    <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                      🎯 Beginners - World-Class Learning Environment
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Protected flat water eliminates wave navigation challenges</li>
                      <li>• Side-on winds prevent being blown offshore</li>
                      <li>• Massive space for safe learning without pressure</li>
                      <li>• Consistent conditions accelerate skill development</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                    <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                      🎯 Intermediate - Perfect Progression Platform
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Predictable conditions allow focus on technique refinement</li>
                      <li>• Flat water ideal for learning unhooked tricks and transitions</li>
                      <li>• Safe environment for pushing personal boundaries</li>
                      <li>• Professional instruction available through multiple schools</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                      🎯 Advanced - Freestyle and Big Air Paradise
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Smooth takeoffs from flat water for maximum height</li>
                      <li>• Consistent power for technical maneuvers and handle passes</li>
                      <li>• Photography opportunities with stunning mountain backdrop</li>
                      <li>• Training environment used by professional riders</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 bg-gradient-to-r from-turquoise-50 to-coral-orange/10 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-deep-navy mb-4">⭐ Unique Aspects</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p>• <strong>Butter-flat water</strong> allows complete focus on technique over wave navigation</p>
                      <p>• <strong>Massive space</strong> means never feeling crowded or restricted</p>
                    </div>
                    <div className="space-y-2">
                      <p>• <strong>Consistent conditions</strong> enable rapid skill progression</p>
                      <p>• <strong>Safe environment</strong> perfect for pushing boundaries and learning new skills</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Green Island Section */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-deep-navy to-turquoise-600 text-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold font-montserrat mb-6 flex items-center">
                  🏝️ Green Island: The Exclusive Island Paradise
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Green Island isn't just a kite spot—it's a <strong>private island sanctuary</strong> where world-class kitesurfing meets untouched Caribbean beauty.
                </p>
                <p className="text-lg leading-relaxed">
                  This pristine 1-kilometer island at the mouth of Nonsuch Bay offers the <strong>ultimate exclusive kitesurfing experience</strong>, accessible only by boat and featuring some of the most consistent conditions in the Caribbean.
                </p>
              </div>
            </section>

            {/* Green Island Location & Access */}
            <section className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
                  📍 Island Location & Access
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">🎯</span>
                        <div>
                          <strong>Position:</strong> Private island at the entrance to Nonsuch Bay
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">⛵</span>
                        <div>
                          <strong>Access:</strong> Boat transfer only - 10 minutes from multiple pickup points
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">🌟</span>
                        <div>
                          <strong>Status:</strong> Unspoiled private island with controlled access
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">🏖️</span>
                        <div>
                          <strong>Size:</strong> Just under 1 kilometer in length with multiple pristine beaches
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-turquoise-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-deep-navy mb-4">Exclusive Features</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Boat-only access ensures exclusivity</li>
                      <li>• Untouched Caribbean island beauty</li>
                      <li>• Professional support and safety</li>
                      <li>• World-class snorkeling included</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Green Island Advantages */}
            <section className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
                  🌟 Exclusive Features
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-coral-orange/10 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-deep-navy mb-3">Private Access</h3>
                      <p className="text-gray-700">
                        <strong>Boat-only access ensures exclusivity</strong> and crowd control. The spot remains uncrowded as operators limit numbers, maintaining safety and the exclusive atmosphere.
                      </p>
                    </div>
                    <div className="bg-turquoise-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-deep-navy mb-3">Pristine Environment</h3>
                      <p className="text-gray-700">
                        <strong>Untouched Caribbean island</strong> with crystal beaches, natural vegetation, and no development. The island offers multiple launch areas around its perimeter based on wind direction.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-yellow-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-deep-navy mb-3">Professional Support</h3>
                      <p className="text-gray-700">
                        <strong>Beach services and equipment support</strong> available through established operators. Rescue boat always on standby for safety.
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-deep-navy mb-3">Multi-Activity Paradise</h3>
                      <p className="text-gray-700">
                        Beyond kitesurfing, the island offers <strong>world-class snorkeling</strong> right off the beach, making it perfect for mixed groups with kiters and non-kiters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Comparison Table */}
            <section className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
                  🏆 Nonsuch Bay vs Green Island - Which to Choose?
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-turquoise-50">
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold text-deep-navy">Category</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold text-deep-navy">Nonsuch Bay</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold text-deep-navy">Green Island</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Space & Freedom</td>
                        <td className="border border-gray-300 px-4 py-3">Massive 5+ km² riding area - ultimate space</td>
                        <td className="border border-gray-300 px-4 py-3">Controlled exclusivity with managed numbers</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Access & Convenience</td>
                        <td className="border border-gray-300 px-4 py-3">Multiple access points, easier logistics</td>
                        <td className="border border-gray-300 px-4 py-3">Boat-only access adds exclusivity but requires planning</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Water Conditions</td>
                        <td className="border border-gray-300 px-4 py-3">Guaranteed flat water regardless of conditions</td>
                        <td className="border border-gray-300 px-4 py-3">Flat to light chop with pristine clarity</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Wind Consistency</td>
                        <td className="border border-gray-300 px-4 py-3">90% windable days - highest reliability</td>
                        <td className="border border-gray-300 px-4 py-3">85-90% windable with multi-directional advantage</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Experience Level</td>
                        <td className="border border-gray-300 px-4 py-3">Perfect for all levels, especially progression</td>
                        <td className="border border-gray-300 px-4 py-3">All levels with guided support and safety</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Photography</td>
                        <td className="border border-gray-300 px-4 py-3">Expansive bay shots with mountain backdrop</td>
                        <td className="border border-gray-300 px-4 py-3">Intimate island paradise aesthetic</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Expert Recommendations */}
            <section className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
                  💡 Expert Recommendations
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                      <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                        🎯 Choose Nonsuch Bay If
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• You want <strong>maximum space and freedom</strong> to ride</li>
                        <li>• You're focusing on <strong>progression and skill development</strong></li>
                        <li>• You prefer <strong>easier access and flexible timing</strong></li>
                        <li>• You want to ride with <strong>larger groups or families</strong></li>
                        <li>• You're doing <strong>multi-day training or kite camps</strong></li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                      <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                        🎯 Choose Green Island If
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• You want the <strong>ultimate exclusive experience</strong></li>
                        <li>• You enjoy the <strong>adventure of boat access</strong></li>
                        <li>• You prefer <strong>smaller groups and personalized attention</strong></li>
                        <li>• You want <strong>pristine conditions for photography/filming</strong></li>
                        <li>• You're celebrating <strong>special occasions or romantic trips</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-8 bg-gradient-to-r from-coral-orange/10 to-turquoise-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                    🎯 Do Both If
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p>• You're staying for <strong>a week or more</strong></p>
                      <p>• You want to experience <strong>Antigua's full kiting potential</strong></p>
                    </div>
                    <div className="space-y-2">
                      <p>• You're a <strong>serious kiter exploring different conditions</strong></p>
                      <p>• You want <strong>variety in your Caribbean kiting adventure</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Seasonal Guide */}
            <section className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
                  📅 Seasonal Guide for Both Spots
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-coral-orange/10 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                      🗓️ Peak Season (January-April)
                    </h3>
                    <ul className="space-y-2 text-gray-700 mb-4">
                      <li><strong>Conditions:</strong> Most consistent 18-25 knots, minimal rainfall</li>
                      <li><strong>Nonsuch Bay:</strong> Perfect flat water, all areas accessible</li>
                      <li><strong>Green Island:</strong> Multiple launch options, best photography light</li>
                      <li><strong>Booking:</strong> Reserve boat transfers in advance for Green Island</li>
                    </ul>
                    <p className="text-sm text-coral-orange font-semibold">Best weather window with minimal rainfall</p>
                  </div>
                  <div className="bg-turquoise-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                      🗓️ Good Season (December, May-July)
                    </h3>
                    <ul className="space-y-2 text-gray-700 mb-4">
                      <li><strong>Conditions:</strong> Reliable 15-22 knots, warm temperatures</li>
                      <li><strong>Nonsuch Bay:</strong> Excellent progression conditions, less crowded</li>
                      <li><strong>Green Island:</strong> Great for learning, peaceful atmosphere</li>
                      <li><strong>Booking:</strong> Better availability and pricing</li>
                    </ul>
                    <p className="text-sm text-turquoise-600 font-semibold">Extended kiting season with great value</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                      🗓️ Off Season (August-November)
                    </h3>
                    <ul className="space-y-2 text-gray-700 mb-4">
                      <li><strong>Conditions:</strong> Variable winds, hurricane season</li>
                      <li><strong>Nonsuch Bay:</strong> Still rideable on windy days, very spacious</li>
                      <li><strong>Green Island:</strong> Limited operations, check availability</li>
                      <li><strong>Booking:</strong> Flexible cancellation policies essential</li>
                    </ul>
                    <p className="text-sm text-gray-600 font-semibold">Best deals, but requires flexibility</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Decision Matrix */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-turquoise-600 to-coral-orange text-white rounded-2xl p-8 shadow-lg text-center">
                <h2 className="text-3xl font-bold font-montserrat mb-6">
                  🎯 Quick Decision Matrix
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 rounded-lg p-6">
                    <div className="text-4xl mb-4">🏔️</div>
                    <h3 className="text-xl font-bold mb-2">Choose NONSUCH BAY</h3>
                    <p className="text-sm opacity-90">for maximum space, progression focus, and ultimate flat water</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-6">
                    <div className="text-4xl mb-4">🏝️</div>
                    <h3 className="text-xl font-bold mb-2">Choose GREEN ISLAND</h3>
                    <p className="text-sm opacity-90">for exclusivity, pristine beauty, and guided experiences</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-6">
                    <div className="text-4xl mb-4">⭐</div>
                    <h3 className="text-xl font-bold mb-2">Do BOTH</h3>
                    <p className="text-sm opacity-90">for the complete Antigua kitesurfing experience</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom Line */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-deep-navy to-turquoise-600 text-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold font-montserrat mb-6 flex items-center">
                  🌟 The Bottom Line
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Whether you choose the expansive playground of Nonsuch Bay or the exclusive paradise of Green Island, you're accessing some of the <strong>world's finest kitesurfing conditions</strong>. Both spots showcase why Antigua has become a premier Caribbean kiting destination.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  <strong>Nonsuch Bay</strong> delivers unmatched flat water space perfect for progression and big groups, while <strong>Green Island</strong> offers an intimate, exclusive experience in pristine surroundings.
                </p>
                <p className="text-lg leading-relaxed">
                  The beauty is you don't have to choose—experience both and discover why serious kiters consider this corner of Antigua the <strong>ultimate Caribbean kitesurfing destination</strong>.
                </p>
              </div>
            </section>

            {/* Quick Reference Comparison */}
            <section className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
                  📊 Quick Reference Comparison
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-turquoise-50">
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold text-deep-navy">Aspect</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold text-deep-navy">Nonsuch Bay</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold text-deep-navy">Green Island</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Best For</td>
                        <td className="border border-gray-300 px-4 py-3">Progression, groups, unlimited space</td>
                        <td className="border border-gray-300 px-4 py-3">Exclusivity, photography, romance</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Access</td>
                        <td className="border border-gray-300 px-4 py-3">Car accessible, multiple entry points</td>
                        <td className="border border-gray-300 px-4 py-3">Boat only, controlled access</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Space</td>
                        <td className="border border-gray-300 px-4 py-3">5+ km² - never crowded</td>
                        <td className="border border-gray-300 px-4 py-3">Managed numbers, intimate</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Wind Days</td>
                        <td className="border border-gray-300 px-4 py-3">90% during peak season</td>
                        <td className="border border-gray-300 px-4 py-3">85-90% with multi-direction</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Water</td>
                        <td className="border border-gray-300 px-4 py-3">Guaranteed flat regardless of wind</td>
                        <td className="border border-gray-300 px-4 py-3">Flat to light chop</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-semibold">Booking</td>
                        <td className="border border-gray-300 px-4 py-3">Flexible, easy logistics</td>
                        <td className="border border-gray-300 px-4 py-3">Advance planning required</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-lg text-gray-700 font-semibold">
                    Both represent the pinnacle of Caribbean kitesurfing—choose based on your preferred experience, or better yet, experience both! 🌊
                  </p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-coral-orange to-orange-500 text-white rounded-2xl p-8 shadow-lg text-center">
                <h2 className="text-3xl font-bold font-montserrat mb-4">
                  🏄‍♂️ Ready to Experience Antigua's Flat Water Paradise?
                </h2>
                <p className="text-xl mb-6">
                  Pack your quiver, bring your camera, and prepare for conditions that will redefine your Caribbean kitesurfing expectations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/booking"
                    className="bg-white text-coral-orange font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Book Your Antigua Adventure
                  </Link>
                  <Link
                    href="/destinations/antigua"
                    className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-coral-orange transition-colors"
                  >
                    Explore More Antigua Spots
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  )
}
