import Navigation from "@/components/navigation"
import { JsonLd, generateTouristTripSchema } from "@/components/seo/JsonLd"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kitesurfing Greece | Greek Islands Kiteboarding Guide | KiteSafaris",
  description: "Discover kitesurfing in Greece with KiteSafaris. Complete guide to Greek Islands kiteboarding, wind conditions, best spots, and luxury catamaran adventures.",
  keywords: "kitesurfing greece, greek islands kitesurfing, kiteboarding greece, kite cruise italy, kite and sail italy, mediterranean kitesurfing, greece kite spots",
  alternates: {
    canonical: "https://kitesafaris.com/destinations/greece",
  },
  openGraph: {
    title: "Kitesurfing Greece | Greek Islands Kiteboarding Guide",
    description: "Discover kitesurfing in Greece with KiteSafaris. Complete guide to Greek Islands kiteboarding, wind conditions, best spots, and luxury catamaran adventures.",
    url: "https://kitesafaris.com/destinations/greece",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/images/greece-kitesurfing-guide.jpg",
        width: 1200,
        height: 630,
        alt: "Kitesurfing in Greece and Greek Islands",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitesurfing Greece | Greek Islands Kiteboarding Guide",
    description: "Discover kitesurfing in Greece with KiteSafaris. Complete guide to Greek Islands kiteboarding, wind conditions, best spots, and luxury catamaran adventures.",
    images: ["https://kitesafaris.com/images/greece-kitesurfing-guide.jpg"],
  },
}

export default function GreeceDestination() {
  // TouristTrip schema for Greece kitesurfing safari
  const greeceTripSchema = generateTouristTripSchema({
    name: "Greece Kite Safari",
    description: "7-day luxury catamaran kitesurfing adventure through the Greek Islands with consistent Meltemi winds and pristine Mediterranean waters",
    destination: "Greek Islands",
    price: "1900",
    priceCurrency: "EUR",
    duration: "P7D",
    provider: "KiteSafaris",
    url: "https://kitesafaris.com/destinations/greece",
    image: "https://kitesafaris.com/images/greece-kitesurfing-guide.jpg",
    touristType: "Kitesurfing enthusiasts",
    includes: [
      "Luxury catamaran accommodation",
      "Professional IKO certified instructor",
      "All meals and beverages",
      "Kitesurfing equipment",
      "Island transfers and excursions",
      "Safety equipment and insurance"
    ],
    departureDate: "2025-06-01",
    returnDate: "2025-09-30"
  })

  return (
    <main>
      <JsonLd data={greeceTripSchema} />
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-b from-sand-beige-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
                Kitesurfing Greece
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the magic of kitesurfing in the Greek Islands. From the Cyclades to the Dodecanese, 
                experience world-class kiteboarding in one of the Mediterranean's most beautiful destinations.
              </p>
            </div>
          </div>
        </section>

        {/* Why Greece for Kitesurfing */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Why Choose Greece for Kitesurfing?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🌊</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Perfect Conditions
                </h3>
                <p className="text-gray-600 text-sm">
                  Consistent thermal winds and warm Mediterranean waters create ideal kitesurfing conditions from May to October.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🏝️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Island Diversity
                </h3>
                <p className="text-gray-600 text-sm">
                  Over 6,000 islands offer diverse kitesurfing experiences from flat water lagoons to challenging wave spots.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🏛️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Rich Culture
                </h3>
                <p className="text-gray-600 text-sm">
                  Combine kitesurfing with exploring ancient history, delicious cuisine, and vibrant local culture.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">☀️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Perfect Climate
                </h3>
                <p className="text-gray-600 text-sm">
                  Enjoy 300+ days of sunshine annually with warm temperatures and minimal rainfall during kitesurfing season.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Kitesurfing Spots */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Best Kitesurfing Spots in Greece
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Mykonos */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Mykonos</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Mykonos Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Famous for its strong Meltemi winds and vibrant nightlife. Perfect for intermediate to advanced riders 
                    seeking challenging conditions and exciting après-kite activities.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>May - Sep</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>15-30 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>Intermediate to Advanced</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Best Spots:</span>
                      <span>Korfos Bay, Ftelia</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paros */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Paros</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Paros Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The kitesurfing capital of Greece with world-class conditions and excellent infrastructure. 
                    Home to the Paros Kite Pro competition and perfect for all skill levels.
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
                    <div className="flex justify-between">
                      <span className="font-medium">Best Spots:</span>
                      <span>Golden Beach, Pounda</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rhodes */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Rhodes</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Rhodes Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Excellent conditions with consistent winds and beautiful beaches. Great for beginners with 
                    shallow waters and professional kite schools.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>Apr - Oct</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>12-22 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>Beginner to Advanced</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Best Spots:</span>
                      <span>Prasonisi, Ialyssos</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Naxos */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Naxos</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Naxos Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Long sandy beaches and consistent winds make Naxos perfect for kitesurfing. 
                    Less crowded than Mykonos with excellent conditions for progression.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>May - Sep</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>15-25 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>All levels</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Best Spots:</span>
                      <span>Mikri Vigla, Plaka</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lefkada */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Lefkada</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Lefkada Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Ionian Sea conditions with beautiful lagoons and flat water spots. 
                    Perfect for freestyle and beginners with shallow, protected waters.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>May - Sep</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>12-20 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>Beginner to Intermediate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Best Spots:</span>
                      <span>Vasiliki, Agios Ioannis</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Karpathos */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Karpathos</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Karpathos Kitesurfing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Remote and unspoiled with strong winds and challenging conditions. 
                    Perfect for advanced riders seeking adventure and untouched beauty.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Season:</span>
                      <span>May - Oct</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wind Speed:</span>
                      <span>18-30 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Skill Level:</span>
                      <span>Advanced</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Best Spots:</span>
                      <span>Afoti, Diakoftis</span>
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
              Wind Conditions in Greece
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌬️ Meltemi Winds
                </h3>
                <p className="text-gray-600 mb-4">
                  The famous Meltemi winds are the backbone of Greek kitesurfing. These strong, 
                  dry northerly winds blow from May to September, providing consistent conditions.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Strongest in July and August (20-30 knots)</li>
                  <li>• Most consistent in the Cyclades islands</li>
                  <li>• Usually strongest in the afternoon</li>
                  <li>• Can last for several days</li>
                  <li>• Creates excellent wave conditions</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🌊 Thermal Winds
                </h3>
                <p className="text-gray-600 mb-4">
                  Local thermal winds complement the Meltemi, providing additional kitesurfing 
                  opportunities throughout the season.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Build during the day (10 AM - 6 PM)</li>
                  <li>• Stronger in the Dodecanese islands</li>
                  <li>• Perfect for flat water kitesurfing</li>
                  <li>• Great for beginners and freestyle</li>
                  <li>• More predictable than Meltemi</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Best Time to Visit Greece for Kitesurfing
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-navy-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Month</th>
                    <th className="px-6 py-4 text-left">Wind Conditions</th>
                    <th className="px-6 py-4 text-left">Water Temp</th>
                    <th className="px-6 py-4 text-left">Air Temp</th>
                    <th className="px-6 py-4 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium">May</td>
                    <td className="px-6 py-4">Building winds (15-20 knots)</td>
                    <td className="px-6 py-4">20-22°C</td>
                    <td className="px-6 py-4">22-26°C</td>
                    <td className="px-6 py-4">Beginner to Intermediate</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">June</td>
                    <td className="px-6 py-4">Good conditions (18-25 knots)</td>
                    <td className="px-6 py-4">22-24°C</td>
                    <td className="px-6 py-4">26-30°C</td>
                    <td className="px-6 py-4">All levels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">July</td>
                    <td className="px-6 py-4">Peak Meltemi (20-30 knots)</td>
                    <td className="px-6 py-4">24-26°C</td>
                    <td className="px-6 py-4">28-32°C</td>
                    <td className="px-6 py-4">Intermediate to Advanced</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">August</td>
                    <td className="px-6 py-4">Strong Meltemi (20-30 knots)</td>
                    <td className="px-6 py-4">25-27°C</td>
                    <td className="px-6 py-4">30-34°C</td>
                    <td className="px-6 py-4">Advanced riders</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">September</td>
                    <td className="px-6 py-4">Good conditions (18-25 knots)</td>
                    <td className="px-6 py-4">24-26°C</td>
                    <td className="px-6 py-4">26-30°C</td>
                    <td className="px-6 py-4">All levels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">October</td>
                    <td className="px-6 py-4">Lightening winds (15-20 knots)</td>
                    <td className="px-6 py-4">22-24°C</td>
                    <td className="px-6 py-4">22-26°C</td>
                    <td className="px-6 py-4">Beginner to Intermediate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* KiteSafaris Greece Experience */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              KiteSafaris Greece Experience
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🛥️ Luxury Catamaran Adventures
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience Greece's best kitesurfing spots from the comfort of our luxury catamarans. 
                  We'll take you to the most beautiful and wind-consistent locations.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• 7-day island-hopping adventures</li>
                  <li>• Professional kiteboarding instruction</li>
                  <li>• All equipment included</li>
                  <li>• Gourmet meals and local cuisine</li>
                  <li>• Cultural excursions and sightseeing</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  🏄 What's Included
                </h3>
                <p className="text-gray-600 mb-4">
                  Our all-inclusive Greece kitesurfing packages provide everything you need for 
                  the perfect Mediterranean adventure.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Luxury catamaran accommodation</li>
                  <li>• Professional kiteboarding coaching</li>
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
                <div className="text-3xl mb-4">🏛️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Ancient History
                </h3>
                <p className="text-gray-600 text-sm">
                  Explore ancient ruins, archaeological sites, and UNESCO World Heritage locations 
                  between kitesurfing sessions.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🍽️</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Greek Cuisine
                </h3>
                <p className="text-gray-600 text-sm">
                  Savor authentic Greek dishes, fresh seafood, and local wines while experiencing 
                  traditional island hospitality.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">🌅</div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  Island Life
                </h3>
                <p className="text-gray-600 text-sm">
                  Immerse yourself in traditional Greek island culture, from white-washed villages 
                  to vibrant local festivals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">
              Ready for Your Greek Kitesurfing Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join KiteSafaris for the ultimate Greek Islands kitesurfing experience. 
              Discover the best spots, enjoy luxury accommodations, and immerse yourself in Greek culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packages"
                className="bg-turquoise-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-turquoise-700 transition-colors"
              >
                View Greece Packages
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
