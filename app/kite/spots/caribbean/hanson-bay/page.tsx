import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"

export const metadata: Metadata = {
  title: "Kitesurfing at Hansons Bay, Antigua | Complete Guide to Caribbean Kite Spot",
  description: "Discover Hansons Bay, Antigua's hidden kitesurfing gem. Complete guide to wind conditions, access, facilities, and why this northwest coast spot is perfect for all skill levels.",
  keywords: "hansons bay antigua, antigua kitesurfing, caribbean kite spot, antigua kiteboarding, northwest coast antigua, trade winds antigua",
  openGraph: {
    title: "Kitesurfing at Hansons Bay, Antigua | Hidden Caribbean Kite Gem",
    description: "Discover Antigua's best-kept kitesurfing secret. Consistent trade winds, uncrowded conditions, and perfect for all skill levels.",
    images: [
      {
        url: "/gallery/antigua/antigua:img-catamaran-islands2.jpg",
        width: 1200,
        height: 630,
        alt: "Kitesurfing at Hansons Bay, Antigua - Caribbean kite spot",
      },
    ],
  },
}

export default function HansonBayPage() {
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
              { label: "Hansons Bay" }
            ]} 
          />
        </div>

        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <Image
            src="/gallery/antigua/antigua:img-catamaran-islands2.jpg"
            alt="Kitesurfing at Hansons Bay, Antigua - Caribbean kite spot with trade winds"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-4">
                Kitesurfing at Hansons Bay, Antigua
              </h1>
              <p className="text-xl md:text-2xl font-open-sans mb-6">
                Your Complete Guide to This Hidden Caribbean Gem
              </p>
              <p className="text-lg font-open-sans opacity-90">
                Discover the northwest coast secret that's becoming the insider's choice for serious Caribbean kitesurfing
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-turquoise-50 to-sand-beige-50">
          <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
              🏝️ Discover Antigua's Best-Kept Kiting Secret
            </h2>
            <p className="text-lg text-gray-700 font-open-sans leading-relaxed mb-4">
              While most kiters head to the famous Jabberwock Beach, savvy riders are discovering <strong>Hansons Bay</strong>—Antigua's northwest coast secret that delivers world-class conditions with a fraction of the crowds.
            </p>
            <p className="text-lg text-gray-700 font-open-sans leading-relaxed">
              This sheltered bay combines consistent Caribbean trade winds with pristine conditions, making it an ideal playground for both progressive riders and those seeking that perfect Caribbean kite session away from the masses.
            </p>
          </div>
        </section>

        {/* Location & Access */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
              📍 Location & Access
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🎯</span>
                    <div>
                      <strong>Position:</strong> Northwest coast of Antigua, perfectly positioned to catch the reliable northeast trade winds
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🚗</span>
                    <div>
                      <strong>From Airport:</strong> 45-minute scenic drive via Sir George Walter Highway
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🏙️</span>
                    <div>
                      <strong>From St. John's:</strong> 25-30 minute drive north along the coast
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🏖️</span>
                    <div>
                      <strong>Setting:</strong> Between Dickenson Bay and Runaway Bay, facing the open Caribbean Sea
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-turquoise-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-deep-navy mb-4">Quick Access Info</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 30 minutes from St. John's</li>
                  <li>• 45 minutes from V.C. Bird Airport</li>
                  <li>• Beach access parking available</li>
                  <li>• No boat transfer required</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Wind Conditions */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
              💨 Wind Conditions - The Foundation of Great Kiting
            </h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-deep-navy mb-4">The Trade Wind Advantage</h3>
              <p className="text-lg text-gray-700 font-open-sans leading-relaxed mb-4">
                Hansons Bay benefits from Antigua's legendary <strong>northeast trade winds</strong>, which blow with remarkable consistency from <strong>December through August</strong>. These winds form due to the Coriolis Effect and high-pressure systems, creating the reliable conditions that have made the Caribbean a kitesurfing mecca.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-coral-orange/10 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-deep-navy mb-3">Wind Statistics</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>🌬️ Prime Season:</strong> December through August</li>
                    <li><strong>🧭 Wind Direction:</strong> NE Trade winds (side-on to side-onshore)</li>
                    <li><strong>⚡ Wind Strength:</strong> 15-25 knots during prime season</li>
                    <li><strong>📊 Reliability:</strong> 85% windable days during peak months</li>
                  </ul>
                </div>
                <div className="bg-turquoise-50 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-deep-navy mb-3">What Makes Hansons Bay Special</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>✨ <strong>Steady, non-gusty conditions</strong> due to open water fetch</li>
                    <li>✨ <strong>Thermal enhancement</strong> during afternoon sessions</li>
                    <li>✨ <strong>Protected from northern swells</strong> by natural bay formation</li>
                    <li>✨ <strong>Side-on wind direction</strong> - safest for all skill levels</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Water Conditions */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
              🌊 Water Conditions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">💧</span>
                  <div>
                    <strong>Water Type:</strong> Flat to slightly choppy inside the bay - ideal for progression
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
                    <strong>Depth:</strong> Waist-deep launch area, gradually deepening offshore
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🔍</span>
                  <div>
                    <strong>Clarity:</strong> Crystal clear Caribbean blue water with excellent visibility
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🏖️</span>
                  <div>
                    <strong>Bottom:</strong> Sandy bottom with occasional coral patches further offshore
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
                    Photography sessions
                  </li>
                  <li className="flex items-center">
                    <span className="text-coral-orange mr-2">✓</span>
                    Mixed skill level groups
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Skill Level Guide */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
              🏄 Riding Conditions by Skill Level
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                  🎯 Beginner (Excellent)
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Protected waters within the bay</li>
                  <li>• Consistent wind eliminates guessing</li>
                  <li>• Sandy bottom for comfortable starts</li>
                  <li>• Side-on wind prevents offshore drift</li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                  🎯 Intermediate (Perfect for Progression)
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Predictable conditions for technique focus</li>
                  <li>• Space to practice without crowding</li>
                  <li>• Varied conditions for skill building</li>
                  <li>• Ideal for advancing maneuvers</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                  🎯 Advanced (Great for Freestyle)
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Smooth water for unhooked tricks</li>
                  <li>• Some wave action for jumping</li>
                  <li>• Uncrowded conditions for progression</li>
                  <li>• Perfect for photography sessions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Guide */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
              📅 Seasonal Conditions Guide
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-coral-orange/10 rounded-lg p-6">
                <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                  🗓️ Peak Season (January - April)
                </h3>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li><strong>Conditions:</strong> Most consistent winds, driest weather</li>
                  <li><strong>Wind Range:</strong> 18-25 knots average</li>
                  <li><strong>Crowds:</strong> Moderate</li>
                  <li><strong>Kite Size:</strong> 9-12m ideal</li>
                </ul>
                <p className="text-sm text-coral-orange font-semibold">Best weather window with minimal rainfall</p>
              </div>
              <div className="bg-turquoise-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                  🗓️ Good Season (December, May - August)
                </h3>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li><strong>Conditions:</strong> Good wind reliability, warmer temps</li>
                  <li><strong>Wind Range:</strong> 15-22 knots average</li>
                  <li><strong>Crowds:</strong> Low to moderate</li>
                  <li><strong>Kite Size:</strong> 10-14m range</li>
                </ul>
                <p className="text-sm text-turquoise-600 font-semibold">Extended kiting season with great value</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                  🗓️ Off Season (September - November)
                </h3>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li><strong>Conditions:</strong> Hurricane season, inconsistent</li>
                  <li><strong>Wind Range:</strong> 10-18 knots (variable)</li>
                  <li><strong>Crowds:</strong> Very low</li>
                  <li><strong>Kite Size:</strong> 12-16m+ needed</li>
                </ul>
                <p className="text-sm text-gray-600 font-semibold">Best deals, but requires flexibility</p>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
              🏖️ Facilities & Amenities
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🚗</span>
                    <div>
                      <strong>Parking:</strong> Beach access parking available
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🏪</span>
                    <div>
                      <strong>Equipment Rental:</strong> Limited on-site, better to arrange through established kite schools
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🚑</span>
                    <div>
                      <strong>Safety:</strong> Boat rescue available through local operators
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🏨</span>
                    <div>
                      <strong>Accommodation:</strong> Several beachfront properties and luxury villas nearby
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-turquoise-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-deep-navy mb-4">Available Amenities</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-coral-orange mr-2">✅</span>
                    Beach bar and restaurant nearby
                  </li>
                  <li className="flex items-center">
                    <span className="text-coral-orange mr-2">✅</span>
                    Restroom facilities
                  </li>
                  <li className="flex items-center">
                    <span className="text-coral-orange mr-2">✅</span>
                    Fresh water rinse stations
                  </li>
                  <li className="flex items-center">
                    <span className="text-coral-orange mr-2">✅</span>
                    Equipment storage options
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Hansons Bay */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
              ⭐ Why Choose Hansons Bay Over Other Spots?
            </h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-deep-navy mb-4">🆚 Advantages vs Jabberwock Beach</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-coral-orange mr-2">✅</span>
                    <span><strong>Less crowded conditions</strong> - more space, less stress</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-coral-orange mr-2">✅</span>
                    <span><strong>More sheltered from larger swells</strong> - cleaner water conditions</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-coral-orange mr-2">✅</span>
                    <span><strong>Easier parking and beach access</strong> - no fighting for spots</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-coral-orange mr-2">✅</span>
                    <span><strong>Similar wind quality with better wave state</strong> - same power, smoother water</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-deep-navy mb-4">🆚 Advantages vs Green Island</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-coral-orange mr-2">✅</span>
                    <span><strong>Accessible by car</strong> - no boat transfer required</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-coral-orange mr-2">✅</span>
                    <span><strong>Better facilities and services</strong> nearby</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-coral-orange mr-2">✅</span>
                    <span><strong>More consistent wind</strong> due to open bay exposure</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-turquoise-50 to-coral-orange/10 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-deep-navy mb-4">🌟 Unique Selling Points</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">⭐</div>
                  <p className="font-semibold text-deep-navy">Perfect balance of accessibility and exclusivity</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📸</div>
                  <p className="font-semibold text-deep-navy">Ideal for kite photography with stunning backdrop</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <p className="font-semibold text-deep-navy">Great for mixed groups (kiters and non-kiters)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
              💡 Pro Tips for the Best Session
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                  ⏰ Timing
                </h3>
                <p className="text-gray-700 mb-4">
                  <strong>Best Time of Day:</strong> 10am-4pm for optimal trade wind strength
                </p>
                
                <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                  🎒 Equipment Recommendations
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>9-12m kites most useful</strong> for typical 15-25 knot conditions</li>
                  <li>• <strong>Twin tip boards</strong> for choppy conditions and versatility</li>
                  <li>• <strong>Impact vest recommended</strong> for coral area protection</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                  🛡️ Safety First
                </h3>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li>• <strong>Always kite with a buddy</strong> or inform someone of your session plans</li>
                  <li>• <strong>Carry whistle</strong> for emergency signaling</li>
                  <li>• <strong>Know your limits</strong> - currents can be strong outside the bay</li>
                  <li>• <strong>Respect marine protected areas</strong> and local regulations</li>
                </ul>
                
                <h3 className="text-xl font-bold text-deep-navy mb-4 flex items-center">
                  🏝️ Local Knowledge
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Check with local fishermen</strong> for daily condition updates</li>
                  <li>• <strong>Support local businesses</strong> to maintain community access</li>
                  <li>• <strong>Book lessons with established schools</strong> for equipment and safety backup</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Getting There */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
              🚗 Getting to Hansons Bay
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">✈️</span>
                    <div>
                      <strong>From V.C. Bird Airport:</strong> 45-minute drive via Sir George Walter Highway
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🏙️</span>
                    <div>
                      <strong>From St. John's:</strong> 25-30 minute drive north along the coastal road
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🗺️</span>
                    <div>
                      <strong>Navigation:</strong> Follow signs toward Dickenson Bay, then continue west to Hansons Bay
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-turquoise-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-deep-navy mb-4">🚙 Transportation Options</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-coral-orange mr-2">•</span>
                    <div>
                      <strong>Rental car</strong> (recommended for equipment transport and flexibility)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-coral-orange mr-2">•</span>
                    <div>
                      <strong>Taxi service</strong> (arrange return pickup time in advance)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-coral-orange mr-2">•</span>
                    <div>
                      <strong>Tour operator transfers</strong> (available through established kite schools)
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Line */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-deep-navy to-turquoise-600 text-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold font-montserrat mb-6 flex items-center">
              🎯 The Bottom Line
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Hansons Bay represents the perfect blend of <strong>accessibility and authenticity</strong> that every kiter dreams of. While Jabberwock Beach handles the crowds, this northwest gem delivers the same world-class Caribbean trade winds with a more relaxed, spacious atmosphere.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Whether you're progressing your riding, looking for that perfect photo session backdrop, or simply want to experience Antigua's kitesurfing culture without the chaos, Hansons Bay offers an <strong>unmatched combination of consistent conditions, stunning scenery, and that exclusive feel</strong> that makes every session memorable.
            </p>
            <p className="text-lg leading-relaxed">
              Pack your 9-12m quiver, grab some reef-safe sunscreen, and discover why Hansons Bay is becoming the <strong>insider's choice for serious Caribbean kitesurfing</strong>.
            </p>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-deep-navy font-montserrat mb-6 flex items-center">
              📊 Quick Reference Card
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-turquoise-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-deep-navy">Category</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-deep-navy">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Best Months</td>
                    <td className="border border-gray-300 px-4 py-3">January - April (peak), December & May-August (good)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Wind Direction</td>
                    <td className="border border-gray-300 px-4 py-3">NE Trade winds (side-on to side-onshore)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Wind Strength</td>
                    <td className="border border-gray-300 px-4 py-3">15-25 knots during prime season</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Water Temp</td>
                    <td className="border border-gray-300 px-4 py-3">79-84°F (26-29°C) year-round</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Skill Level</td>
                    <td className="border border-gray-300 px-4 py-3">All levels - particularly great for intermediate progression</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Crowds</td>
                    <td className="border border-gray-300 px-4 py-3">Low to moderate (much less than main spots)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Access</td>
                    <td className="border border-gray-300 px-4 py-3">30 min from St. John's, 45 min from airport</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Equipment</td>
                    <td className="border border-gray-300 px-4 py-3">9-12m kites, twin tip boards, reef protection</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-coral-orange to-orange-500 text-white rounded-2xl p-8 shadow-lg text-center">
            <h2 className="text-3xl font-bold font-montserrat mb-4">
              🔗 Ready to Experience Hansons Bay?
            </h2>
            <p className="text-xl mb-6">
              This hidden gem is waiting to become your new favorite Caribbean kite spot. Book your Antigua adventure and discover why the northwest coast is where the real magic happens.
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

        {/* Footer Quote */}
        <div className="text-center text-gray-600 italic text-lg">
          <p>
            Experience the difference that space, consistency, and authentic Caribbean vibes can make in your kitesurfing journey.
          </p>
        </div>
          </div>
        </div>
      </main>
    </div>
  )
}
