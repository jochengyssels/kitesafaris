import { Navigation } from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, User, ArrowLeft, Plane, Calendar, MapPin, ExternalLink, AlertTriangle, Info } from "lucide-react"
import { SardinianAwakeningCTA } from "@/components/sardinian-awakening-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Flights from Europe to Antigua for Kite Safaris (December–April) | KiteSafaris",
  description:
    "Discover the top 10 flight routes from Europe to Antigua for your kite safari adventure. Direct and one-stop options with airlines, schedules, and pricing for December-April high season.",
  keywords:
    "flights Europe to Antigua, kite safari flights, British Airways Antigua, Virgin Atlantic, Condor Frankfurt, Caribbean flights December April, kiteboarding travel guide",
  alternates: {
    canonical: "https://kitesafaris.com/blog/best-flights-europe-antigua-kite-safaris",
  },
  openGraph: {
    title: "Best Flights from Europe to Antigua for Kite Safaris (December–April)",
    description: "Complete guide to the top 10 flight routes from Europe to Antigua during kite safari high season.",
    url: "https://kitesafaris.com/blog/best-flights-europe-antigua-kite-safaris",
    type: "article",
    images: [
      {
        url: "/antigua-flights-kite-safari.jpg",
        width: 1200,
        height: 630,
        alt: "Best flights from Europe to Antigua for kite safaris December to April",
      },
    ],
  },
}

const flightRoutes = [
  {
    rank: 1,
    country: "United Kingdom",
    flag: "🇬🇧",
    airport: "London Gatwick (LGW)",
    airline: "British Airways",
    duration: "~9h direct",
    frequency: "Daily, year-round",
    price: "€600–€1,300 return",
    type: "direct",
    description:
      "The most frequent and reliable option. A perfect non-stop route for UK travelers and those connecting via London.",
  },
  {
    rank: 2,
    country: "United Kingdom",
    flag: "🇬🇧",
    airport: "London Heathrow (LHR)",
    airline: "Virgin Atlantic",
    duration: "~9h (with short stop in Barbados, no plane change)",
    frequency: "3–4× weekly in winter (Dec–March)",
    price: "€550–€1,000",
    type: "direct",
    description: "Great option for London travelers—premium Virgin service with good SkyTeam connections.",
  },
  {
    rank: 3,
    country: "Germany",
    flag: "🇩🇪",
    airport: "Frankfurt (FRA)",
    airline: "Condor",
    duration: "~9h 45m direct",
    frequency: "1× weekly (seasonal Nov–Apr, usually Tuesdays)",
    price: "€600–€1,000",
    type: "direct",
    description:
      "The only direct flight from mainland Europe—a huge plus for German, Swiss, and Central European travelers.",
  },
  {
    rank: 4,
    country: "France",
    flag: "🇫🇷",
    airport: "Paris (CDG)",
    airline: "Air France + Delta (SkyTeam)",
    duration: "~13h total",
    price: "€700–€1,200",
    type: "one-stop",
    via: "Atlanta (ATL)",
    description: "Smooth SkyTeam itinerary. Bags checked through, easy transfer in Atlanta.",
  },
  {
    rank: 5,
    country: "Netherlands",
    flag: "🇳🇱",
    airport: "Amsterdam (AMS)",
    airline: "KLM + Delta (SkyTeam)",
    duration: "~13h total",
    price: "€700–€1,200",
    type: "one-stop",
    via: "Atlanta (ATL)",
    description:
      "Reliable one-stop option for Dutch travelers. Works well also for Belgium & Luxembourg connections via AMS.",
  },
  {
    rank: 6,
    country: "Spain",
    flag: "🇪🇸",
    airport: "Madrid (MAD)",
    airline: "Iberia + American Airlines (oneworld)",
    duration: "~12–13h total",
    price: "€700–€1,100",
    type: "one-stop",
    via: "Miami (MIA)",
    description: "Frequent flights and strong oneworld coordination. Great for Spain and Latin America connections.",
  },
  {
    rank: 7,
    country: "Italy",
    flag: "🇮🇹",
    airport: "Rome (FCO)",
    airline: "ITA Airways + Virgin Atlantic (SkyTeam)",
    duration: "~12h total",
    price: "€700–€1,100",
    type: "one-stop",
    via: "London Heathrow",
    description: "One-stop solution for Italy, leveraging Virgin's winter schedule.",
  },
  {
    rank: 8,
    country: "Switzerland",
    flag: "🇨🇭",
    airport: "Zurich (ZRH)",
    airline: "SWISS + United (Star Alliance)",
    duration: "~13h total",
    price: "€650–€1,100",
    type: "one-stop",
    via: "Newark (EWR)",
    description:
      "Swiss precision with Star Alliance benefits. United's Newark–Antigua flight runs in winter (typically weekends).",
  },
  {
    rank: 9,
    country: "Sweden",
    flag: "🇸🇪",
    airport: "Stockholm (ARN)",
    airline: "SAS + United (Star Alliance)",
    duration: "~12–13h total",
    price: "€700–€1,300",
    type: "one-stop",
    via: "Newark (EWR)",
    description: "Fastest route from Scandinavia—just one U.S. stop.",
  },
  {
    rank: 10,
    country: "Ireland",
    flag: "🇮🇪",
    airport: "Dublin (DUB)",
    airline: "Aer Lingus + JetBlue",
    duration: "~12h total",
    price: "€700–€1,100",
    type: "one-stop",
    via: "New York JFK",
    description: "Super convenient for Irish travelers. Bonus: U.S. pre-clearance in Dublin means smooth JFK transfer.",
  },
]

export default function BestFlightsEuropeAntiguaBlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: "Best Flights from Europe to Antigua for Kite Safaris (December–April)",
            description:
              "Complete guide to the top 10 flight routes from Europe to Antigua during kite safari high season.",
            author: {
              "@type": "Organization",
              name: "KiteSafaris.com",
            },
            publisher: {
              "@type": "Organization",
              name: "KiteSafaris.com",
              logo: {
                "@type": "ImageObject",
                url: "https://kitesafaris.com/logo.png",
              },
            },
            datePublished: "2024-12-01",
            dateModified: "2024-12-01",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://kitesafaris.com/blog/best-flights-europe-antigua-kite-safaris",
            },
            image: "https://kitesafaris.com/antigua-flights-kite-safari.jpg",
          }),
        }}
      />

      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src="https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-heli-kiters.jpg"
            alt="Best flights from Europe to Antigua for kite safaris December to April"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-coral-orange text-white px-3 py-1 rounded text-sm font-medium">Travel Guide</span>
                <span className="bg-turquoise text-white px-3 py-1 rounded text-sm font-medium">Flight Planning</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat text-balance">
                ✈️ Best Flights from Europe to Antigua for Kite Safaris (December–April)
              </h1>
              <div className="flex items-center text-white/80 space-x-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>8 min read</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>KiteSafaris Team</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>December 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-deep-navy/80 font-open-sans leading-relaxed mb-8">
                    If you're planning to escape the European winter and chase the trade winds in the Caribbean, Antigua
                    is your gateway to a dream kite safari adventure. Between December and April, steady winds, warm
                    turquoise waters, and white-sand beaches make Antigua a top choice for riders. But what's the best
                    way to get there from Europe?
                  </p>

                  <p className="font-open-sans text-deep-navy/90 leading-relaxed mb-8">
                    We've done the research for you and pulled together the{" "}
                    <strong>Top 10 flight routes from Europe to Antigua (ANU)</strong>, including non-stop and efficient
                    one-stop options. Whether you're traveling from the UK, Germany, France, Spain, Italy, Switzerland,
                    Scandinavia, or Ireland—there's a clear path to paradise.
                  </p>

                  {/* Direct Flights Section */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-coral-orange rounded-full">
                        <Plane className="w-6 h-6 text-white" />
                      </div>
                      🌍 Non-Stop Flights from Europe to Antigua
                    </h2>

                    <div className="space-y-8">
                      {flightRoutes
                        .filter((route) => route.type === "direct")
                        .map((route) => (
                          <div
                            key={route.rank}
                            className="bg-gradient-to-r from-turquoise-50 to-sand-beige-50 rounded-2xl p-8 border border-turquoise-200/50"
                          >
                            <div className="flex items-start gap-6">
                              <div className="flex items-center justify-center w-12 h-12 bg-coral-orange rounded-full font-montserrat font-bold text-white text-xl shrink-0">
                                {route.rank}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4">
                                  <span className="text-3xl" role="img" aria-label={`${route.country} flag`}>
                                    {route.flag}
                                  </span>
                                  <h3 className="font-montserrat font-bold text-2xl text-deep-navy">
                                    {route.airport} → Antigua (ANU)
                                  </h3>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mb-4">
                                  <div>
                                    <p className="font-open-sans text-sm text-gray-600 mb-1">Airline</p>
                                    <p className="font-montserrat font-semibold text-deep-navy">{route.airline}</p>
                                  </div>
                                  <div>
                                    <p className="font-open-sans text-sm text-gray-600 mb-1">Duration</p>
                                    <p className="font-montserrat font-semibold text-deep-navy">{route.duration}</p>
                                  </div>
                                  <div>
                                    <p className="font-open-sans text-sm text-gray-600 mb-1">Frequency</p>
                                    <p className="font-montserrat font-semibold text-deep-navy">{route.frequency}</p>
                                  </div>
                                  <div>
                                    <p className="font-open-sans text-sm text-gray-600 mb-1">Price Range</p>
                                    <p className="font-montserrat font-bold text-xl text-coral-orange">{route.price}</p>
                                  </div>
                                </div>

                                <p className="font-open-sans text-deep-navy/80 leading-relaxed">
                                  👉 {route.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* One-Stop Connections Section */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-turquoise rounded-full">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      🚏 Best One-Stop Connections
                    </h2>

                    <div className="space-y-6">
                      {flightRoutes
                        .filter((route) => route.type === "one-stop")
                        .map((route) => (
                          <div
                            key={route.rank}
                            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-turquoise-300 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex items-center justify-center w-10 h-10 bg-turquoise rounded-full font-montserrat font-bold text-white shrink-0">
                                {route.rank}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <span className="text-2xl" role="img" aria-label={`${route.country} flag`}>
                                    {route.flag}
                                  </span>
                                  <h3 className="font-montserrat font-bold text-xl text-deep-navy">
                                    {route.airport} → {route.via} → Antigua
                                  </h3>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                  <div>
                                    <p className="font-open-sans text-xs text-gray-500 mb-1">Airlines</p>
                                    <p className="font-open-sans font-semibold text-sm text-deep-navy">
                                      {route.airline}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-open-sans text-xs text-gray-500 mb-1">Duration</p>
                                    <p className="font-open-sans font-semibold text-sm text-deep-navy">
                                      {route.duration}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-open-sans text-xs text-gray-500 mb-1">Price Range</p>
                                    <p className="font-montserrat font-bold text-lg text-coral-orange">{route.price}</p>
                                  </div>
                                  <div>
                                    <p className="font-open-sans text-xs text-gray-500 mb-1">Via</p>
                                    <p className="font-open-sans font-semibold text-sm text-turquoise">{route.via}</p>
                                  </div>
                                </div>

                                <p className="font-open-sans text-deep-navy/80 text-sm leading-relaxed">
                                  👉 {route.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Month-by-Month Availability */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-6 flex items-center gap-3">
                      <div className="p-2 bg-deep-navy rounded-full">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      📅 Month-by-Month Availability
                    </h2>

                    <div className="bg-sand-beige-50 rounded-xl p-6 border border-sand-beige-200">
                      <ul className="space-y-3 font-open-sans text-deep-navy/90">
                        <li>
                          <strong>December:</strong> All routes active; busiest season with higher fares around
                          Christmas/New Year.
                        </li>
                        <li>
                          <strong>January:</strong> Excellent availability across UK, FRA, and all one-stops.
                        </li>
                        <li>
                          <strong>February:</strong> Still peak season, all routes running strong.
                        </li>
                        <li>
                          <strong>March:</strong> Virgin Atlantic's Heathrow flights typically end late March; others
                          continue.
                        </li>
                        <li>
                          <strong>April:</strong> British Airways (LGW) and Condor (FRA) still operate; U.S. one-stops
                          continue; Virgin usually ends by late March.
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Booking Tips */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-6 flex items-center gap-3">
                      <div className="p-2 bg-coral-orange rounded-full">
                        <Info className="w-6 h-6 text-white" />
                      </div>
                      ✨ Tips for Booking
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-turquoise-50 rounded-xl p-6 border border-turquoise-200">
                        <h4 className="font-montserrat font-bold text-lg text-deep-navy mb-3">Early Booking</h4>
                        <p className="font-open-sans text-deep-navy/80">
                          Book early (3–6 months in advance) for the best fares—especially around Christmas and Easter.
                        </p>
                      </div>

                      <div className="bg-coral-orange-50 rounded-xl p-6 border border-coral-orange-200">
                        <h4 className="font-montserrat font-bold text-lg text-deep-navy mb-3">Alliance Benefits</h4>
                        <p className="font-open-sans text-deep-navy/80">
                          Consider alliances: SkyTeam, oneworld, or Star Alliance for smoother baggage handling.
                        </p>
                      </div>

                      <div className="bg-sand-beige-50 rounded-xl p-6 border border-sand-beige-200">
                        <h4 className="font-montserrat font-bold text-lg text-deep-navy mb-3">US Transit</h4>
                        <p className="font-open-sans text-deep-navy/80">
                          Factor ESTA costs if connecting via the U.S. (currently $21 for most EU passports).
                        </p>
                      </div>

                      <div className="bg-deep-navy-50 rounded-xl p-6 border border-deep-navy-200">
                        <h4 className="font-montserrat font-bold text-lg text-deep-navy mb-3">Seasonal Schedules</h4>
                        <p className="font-open-sans text-deep-navy/80">
                          Check seasonal schedules: Virgin (LHR–ANU) and United (EWR–ANU) are winter-only.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-gradient-to-r from-deep-navy to-turquoise rounded-2xl p-8 text-white text-center">
                    <h2 className="font-montserrat font-bold text-3xl mb-4">🌴 Ready to Ride?</h2>
                    <p className="font-open-sans text-xl mb-6 text-turquoise-100">
                      Getting from Europe to Antigua is easier than ever. Whether you're hopping a non-stop from London
                      or Frankfurt, or making a smooth one-stop via Atlanta, Miami, Newark, or JFK—paradise is just half
                      a day away. Once you land, the steady trade winds and turquoise lagoons are waiting.
                    </p>
                    <Link
                      href="/packages"
                      className="inline-flex items-center bg-coral-orange hover:bg-coral-orange/90 text-white px-8 py-4 rounded-full font-montserrat font-bold text-lg transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />👉 Pack your kite, grab your board, and book your Kite
                      Safari to Antigua
                    </Link>
                  </div>

                  <div className="mt-12">
                    <SardinianAwakeningCTA variant="blog" />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-sand-beige rounded-lg p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-deep-navy mb-4 font-montserrat">Quick Reference</h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg border border-sand-beige-200">
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">Direct Flights</h4>
                      <ul className="font-open-sans text-sm text-deep-navy/80 space-y-1">
                        <li>🇬🇧 London (LGW/LHR)</li>
                        <li>🇩🇪 Frankfurt (FRA)</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-sand-beige-200">
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">Best One-Stops</h4>
                      <ul className="font-open-sans text-sm text-deep-navy/80 space-y-1">
                        <li>🇫🇷 Paris → Atlanta</li>
                        <li>🇳🇱 Amsterdam → Atlanta</li>
                        <li>🇪🇸 Madrid → Miami</li>
                        <li>🇮🇹 Rome → London</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-turquoise-50 rounded-lg border border-turquoise-200">
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">Price Range</h4>
                      <p className="font-open-sans text-sm text-deep-navy/80">€550 - €1,300 return</p>
                      <p className="font-open-sans text-xs text-turquoise-700 mt-1">December-April high season</p>
                    </div>

                    <div className="p-4 bg-coral-orange-50 rounded-lg border border-coral-orange-200">
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-coral-orange-600" />
                        Remember
                      </h4>
                      <ul className="font-open-sans text-xs text-deep-navy/80 space-y-1">
                        <li>• ESTA required for US transit</li>
                        <li>• Book 2-3 months ahead</li>
                        <li>• Check seasonal schedules</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-deep-navy/10">
                    <h4 className="text-sm font-semibold text-deep-navy/60 mb-3">Ready for Your Kite Safari?</h4>
                    <Link
                      href="/packages"
                      className="block w-full text-center bg-coral-orange text-white py-3 px-4 rounded-lg hover:bg-coral-orange/90 transition-colors font-semibold"
                    >
                      View Kite Safari Packages
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
