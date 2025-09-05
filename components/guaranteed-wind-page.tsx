"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Wind,
  Calendar,
  Shield,
  CheckCircle,
  TrendingUp,
  MapPin,
  Waves,
  Sun,
  Activity,
  Camera,
  Anchor,
  Users,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { SocialSharing } from "@/components/social-sharing"
import { FeaturePageCrossLinks } from "@/components/feature-page-cross-links"

// Wind data for different destinations
const windData = {
  antigua: [
    { month: "Jan", avgWind: 18, reliability: 85 },
    { month: "Feb", avgWind: 20, reliability: 90 },
    { month: "Mar", avgWind: 22, reliability: 95 },
    { month: "Apr", avgWind: 19, reliability: 88 },
    { month: "May", avgWind: 16, reliability: 70 },
    { month: "Jun", avgWind: 14, reliability: 60 },
    { month: "Jul", avgWind: 13, reliability: 55 },
    { month: "Aug", avgWind: 14, reliability: 60 },
    { month: "Sep", avgWind: 15, reliability: 65 },
    { month: "Oct", avgWind: 17, reliability: 75 },
    { month: "Nov", avgWind: 19, reliability: 82 },
    { month: "Dec", avgWind: 20, reliability: 88 },
  ],
  greece: [
    { month: "Jan", avgWind: 12, reliability: 45 },
    { month: "Feb", avgWind: 14, reliability: 50 },
    { month: "Mar", avgWind: 16, reliability: 60 },
    { month: "Apr", avgWind: 18, reliability: 70 },
    { month: "May", avgWind: 20, reliability: 80 },
    { month: "Jun", avgWind: 22, reliability: 90 },
    { month: "Jul", avgWind: 24, reliability: 95 },
    { month: "Aug", avgWind: 23, reliability: 92 },
    { month: "Sep", avgWind: 20, reliability: 85 },
    { month: "Oct", avgWind: 17, reliability: 70 },
    { month: "Nov", avgWind: 15, reliability: 55 },
    { month: "Dec", avgWind: 13, reliability: 48 },
  ],
  sardinia: [
    { month: "Jan", avgWind: 15, reliability: 70 },
    { month: "Feb", avgWind: 16, reliability: 72 },
    { month: "Mar", avgWind: 17, reliability: 75 },
    { month: "Apr", avgWind: 18, reliability: 78 },
    { month: "May", avgWind: 19, reliability: 80 },
    { month: "Jun", avgWind: 20, reliability: 82 },
    { month: "Jul", avgWind: 21, reliability: 85 },
    { month: "Aug", avgWind: 20, reliability: 83 },
    { month: "Sep", avgWind: 19, reliability: 80 },
    { month: "Oct", avgWind: 18, reliability: 77 },
    { month: "Nov", avgWind: 17, reliability: 74 },
    { month: "Dec", avgWind: 16, reliability: 71 },
  ],
}

const destinations = [
  {
    id: "antigua",
    name: "Antigua & Barbuda",
    season: "Dec - Apr",
    windType: "Trade Winds",
    avgWind: "15-25 knots",
    reliability: "90%",
    image: "/antigua-caribbean-sunset-kiteboarding.png",
  },
  {
    id: "greece",
    name: "Greek Islands",
    season: "Jun - Sep",
    windType: "Meltemi Winds",
    avgWind: "18-28 knots",
    reliability: "92%",
    image: "/greek-aegean-islands-kiteboarding-meltemi-winds.png",
  },
  {
    id: "sardinia",
    name: "Sardinia",
    season: "All Year",
    windType: "Thermal Winds",
    avgWind: "12-22 knots",
    reliability: "78%",
    image: "/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
  },
]

const alternativeActivities = [
  {
    title: "Stand-Up Paddleboarding",
    description: "Explore calm bays and hidden coves on SUP boards",
    icon: Waves,
    image: "/placeholder.png",
  },
  {
    title: "Snorkeling Adventures",
    description: "Discover vibrant coral reefs and marine life",
    icon: Camera,
    image: "/antigua-coral-reef-underwater-snorkeling.png",
  },
  {
    title: "Island Exploration",
    description: "Visit secluded beaches and local villages",
    icon: MapPin,
    image: "/antigua-tropical-landscape-palm-trees-beach.png",
  },
  {
    title: "Sailing & Boat Trips",
    description: "Enjoy scenic cruises and sunset sails",
    icon: Anchor,
    image: "/luxury-catamaran-yacht-on-turquoise-water.png",
  },
]

const testimonials = [
  {
    name: "Flavia",
    location: "Switzerland",
    text: "Waking up on a catamaran, kiting in crystal-clear lagoons, and laughing with strangers who became family — this trip was magic. I came for the wind, but I left with so much more.",
    rating: 4.5,
    trip: "Antigua Safari 2024",
  },
  {
    name: "Michele Sabiu",
    location: "Italy",
    text: "Even though I've never been to the Caribbean, I felt the energy from day one. What started as an idea between four of us quickly turned into something real — a shared vision, a deep connection, and a feeling of belonging. That's the power of this journey.",
    rating: 5,
    trip: "Antigua Safari 2024",
  },
  {
    name: "Soa Mira",
    location: "Switzerland",
    text: "From the coaching to the anchor spots, every day felt perfectly planned yet totally spontaneous. The crew was professional, the vibe was pure joy, and launching from the boat? Wild.",
    rating: 5,
    trip: "Antigua Safari 2024",
  },
]

export function GuaranteedWindPage() {
  const [selectedDestination, setSelectedDestination] = useState("antigua")
  const [activeTab, setActiveTab] = useState("patterns")

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-sand-beige/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm font-open-sans">
            <Link href="/" className="text-turquoise hover:text-turquoise/80">
              Home
            </Link>
            <span className="mx-2 text-deep-navy/60">/</span>
            <span className="text-deep-navy">Guaranteed Wind</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-turquoise/10 to-deep-navy/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Shield className="w-6 h-6 text-turquoise" />
              <span className="font-semibold text-deep-navy">Wind Guarantee</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-deep-navy mb-6 font-montserrat">
              Guaranteed Wind Conditions
              <span className="block text-coral-orange">Or We Make It Right</span>
            </h1>

            <p className="text-xl text-deep-navy/80 font-open-sans leading-relaxed mb-8 max-w-3xl mx-auto">
              We operate only during peak wind seasons with 10+ years of weather data backing our guarantee. If
              conditions don't meet our standards, you get a full refund or reschedule.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-turquoise/20">
                <TrendingUp className="w-8 h-8 text-turquoise mb-3 mx-auto" />
                <div className="text-2xl font-bold text-deep-navy mb-1">90%+</div>
                <div className="text-sm text-deep-navy/70">Wind Reliability</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-turquoise/20">
                <Wind className="w-8 h-8 text-turquoise mb-3 mx-auto" />
                <div className="text-2xl font-bold text-deep-navy mb-1">15-25</div>
                <div className="text-sm text-deep-navy/70">Knots Average</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-turquoise/20">
                <Calendar className="w-8 h-8 text-turquoise mb-3 mx-auto" />
                <div className="text-2xl font-bold text-deep-navy mb-1">10+</div>
                <div className="text-sm text-deep-navy/70">Years Experience</div>
              </div>
            </div>

            <Link
              href="/packages"
              className="inline-flex items-center gap-2 bg-coral-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-coral-orange/90 transition-colors"
            >
              Book Risk-Free
              <CheckCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Wind Guarantee Policy */}
      <section className="py-16 bg-sand-beige">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-deep-navy mb-8 font-montserrat text-center">
              Our Wind Guarantee Policy
            </h2>

            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-deep-navy mb-4 font-montserrat">What We Guarantee</h3>
                  <ul className="space-y-3 font-open-sans text-deep-navy/90">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-turquoise mt-0.5 flex-shrink-0" />
                      <span>Minimum 15 knots average wind speed during your trip</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-turquoise mt-0.5 flex-shrink-0" />
                      <span>At least 70% of scheduled kiting days with suitable conditions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-turquoise mt-0.5 flex-shrink-0" />
                      <span>Safe launching and landing conditions from catamaran</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-turquoise mt-0.5 flex-shrink-0" />
                      <span>Professional weather monitoring and daily briefings</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-deep-navy mb-4 font-montserrat">
                    If Conditions Don't Meet Standards
                  </h3>
                  <div className="space-y-4 font-open-sans text-deep-navy/90">
                    <div className="border-l-4 border-turquoise pl-4">
                      <p className="font-semibold">Full Refund</p>
                      <p className="text-sm">100% refund of all payments within 5-10 business days</p>
                    </div>
                    <div className="border-l-4 border-coral-orange pl-4">
                      <p className="font-semibold">Priority Rebooking</p>
                      <p className="text-sm">First choice on next available dates with guaranteed conditions</p>
                    </div>
                    <div className="border-l-4 border-gold pl-4">
                      <p className="font-semibold">Future Credit</p>
                      <p className="text-sm">Trip credit with no expiration date for any destination</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-turquoise/10 rounded-2xl p-6 border border-turquoise/20">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-turquoise" />
                <h4 className="font-bold text-deep-navy font-montserrat">Our Track Record</h4>
              </div>
              <p className="font-open-sans text-deep-navy/80">
                In 10+ years of operation, we have never canceled a charter due to weather conditions. Our seasonal
                timing and destination selection ensure consistent, reliable wind patterns for optimal kiteboarding
                experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Wind Patterns */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-deep-navy mb-8 font-montserrat text-center">
              Seasonal Wind Patterns
            </h2>

            {/* Destination Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDestination(dest.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedDestination === dest.id
                      ? "bg-turquoise text-white shadow-lg"
                      : "bg-sand-beige text-deep-navy hover:bg-turquoise/10"
                  }`}
                >
                  {dest.name}
                </button>
              ))}
            </div>

            {/* Selected Destination Info */}
            {destinations.map(
              (dest) =>
                selectedDestination === dest.id && (
                  <div key={dest.id} className="bg-sand-beige rounded-2xl p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h3 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">{dest.name}</h3>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <div className="text-sm text-deep-navy/60 mb-1">Best Season</div>
                            <div className="font-semibold text-deep-navy">{dest.season}</div>
                          </div>
                          <div>
                            <div className="text-sm text-deep-navy/60 mb-1">Wind Type</div>
                            <div className="font-semibold text-deep-navy">{dest.windType}</div>
                          </div>
                          <div>
                            <div className="text-sm text-deep-navy/60 mb-1">Average Wind</div>
                            <div className="font-semibold text-deep-navy">{dest.avgWind}</div>
                          </div>
                          <div>
                            <div className="text-sm text-deep-navy/60 mb-1">Reliability</div>
                            <div className="font-semibold text-turquoise">{dest.reliability}</div>
                          </div>
                        </div>
                      </div>
                      <div className="relative h-48 rounded-lg overflow-hidden">
                        <Image
                          src={dest.image || "/placeholder.svg"}
                          alt={`${dest.name} kiteboarding conditions`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ),
            )}

            {/* Wind Charts */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex flex-wrap gap-4 mb-6">
                <button
                  onClick={() => setActiveTab("patterns")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === "patterns"
                      ? "bg-turquoise text-white"
                      : "bg-sand-beige text-deep-navy hover:bg-turquoise/10"
                  }`}
                >
                  Wind Patterns
                </button>
                <button
                  onClick={() => setActiveTab("reliability")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === "reliability"
                      ? "bg-turquoise text-white"
                      : "bg-sand-beige text-deep-navy hover:bg-turquoise/10"
                  }`}
                >
                  Reliability
                </button>
              </div>

              <div className="h-80">
                <ChartContainer
                  config={{
                    avgWind: {
                      label: "Average Wind Speed (knots)",
                      color: "hsl(var(--color-turquoise))",
                    },
                    reliability: {
                      label: "Reliability (%)",
                      color: "hsl(var(--color-coral-orange))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    {activeTab === "patterns" ? (
                      <LineChart data={windData[selectedDestination as keyof typeof windData]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="avgWind"
                          stroke="var(--color-avgWind)"
                          strokeWidth={3}
                          dot={{ fill: "var(--color-avgWind)", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    ) : (
                      <BarChart data={windData[selectedDestination as keyof typeof windData]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="reliability" fill="var(--color-reliability)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Activities */}
      <section className="py-16 bg-sand-beige">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-deep-navy mb-4 font-montserrat text-center">
              Alternative Activities During Low Wind
            </h2>
            <p className="text-lg text-deep-navy/80 font-open-sans text-center mb-12 max-w-3xl mx-auto">
              Even when wind conditions are below our standards, your adventure continues with exciting backup
              activities included in every trip at no additional cost.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {alternativeActivities.map((activity, index) => {
                const IconComponent = activity.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={activity.image || "/placeholder.svg"}
                        alt={activity.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-turquoise" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-deep-navy mb-2 font-montserrat">{activity.title}</h3>
                    <p className="text-deep-navy/70 font-open-sans text-sm">{activity.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Weather Monitoring Technology */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-deep-navy mb-8 font-montserrat text-center">
              Advanced Weather Monitoring
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-sand-beige rounded-2xl p-8">
                <Activity className="w-12 h-12 text-turquoise mb-4" />
                <h3 className="text-xl font-bold text-deep-navy mb-4 font-montserrat">Real-Time Monitoring</h3>
                <ul className="space-y-3 font-open-sans text-deep-navy/80">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-turquoise flex-shrink-0" />
                    <span>Professional weather stations at each destination</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-turquoise flex-shrink-0" />
                    <span>Satellite wind data updated every 6 hours</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-turquoise flex-shrink-0" />
                    <span>Local weather radar and forecasting models</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-turquoise flex-shrink-0" />
                    <span>Radio communication with local weather services</span>
                  </li>
                </ul>
              </div>

              <div className="bg-turquoise/10 rounded-2xl p-8 border border-turquoise/20">
                <Sun className="w-12 h-12 text-coral-orange mb-4" />
                <h3 className="text-xl font-bold text-deep-navy mb-4 font-montserrat">Daily Briefings</h3>
                <ul className="space-y-3 font-open-sans text-deep-navy/80">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-coral-orange flex-shrink-0" />
                    <span>Morning weather briefing with captain</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-coral-orange flex-shrink-0" />
                    <span>Hourly wind updates during kiting sessions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-coral-orange flex-shrink-0" />
                    <span>Alternative activity planning for low wind days</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-coral-orange flex-shrink-0" />
                    <span>Safety assessments for all water activities</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-deep-navy rounded-2xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-4 font-montserrat">Historical Success Rate</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-turquoise mb-2">98.5%</div>
                  <div className="text-sm text-white/80">Trips with adequate wind</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-coral-orange mb-2">0</div>
                  <div className="text-sm text-white/80">Weather cancellations in 10+ years</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gold mb-2">100%</div>
                  <div className="text-sm text-white/80">Guest satisfaction with wind guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-sand-beige">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-deep-navy mb-12 font-montserrat text-center">
              What Our Guests Say About Wind Conditions
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <div key={i} className="w-5 h-5 text-gold">
                        ★
                      </div>
                    ))}
                    {testimonial.rating % 1 !== 0 && (
                      <div className="w-5 h-5 text-gold opacity-50">
                        ★
                      </div>
                    )}
                  </div>
                  <p className="font-open-sans text-deep-navy/80 mb-4 italic">"{testimonial.text}"</p>
                  <div className="border-t border-deep-navy/10 pt-4">
                    <div className="font-semibold text-deep-navy">{testimonial.name}</div>
                    <div className="text-sm text-deep-navy/60">{testimonial.location}</div>
                    <div className="text-xs text-turquoise mt-1">{testimonial.trip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-turquoise to-deep-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">
              Ready to Experience Guaranteed Wind?
            </h2>
            <p className="text-xl text-white/90 font-open-sans mb-8 max-w-2xl mx-auto">
              Book your risk-free kite safari with complete confidence. Our wind guarantee ensures you'll have the
              conditions you need for an unforgettable kiteboarding adventure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 bg-coral-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-coral-orange/90 transition-colors"
              >
                Book Risk-Free Safari
                <Wind className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/30 transition-colors"
              >
                Ask About Conditions
                <Users className="w-5 h-5" />
              </Link>
            </div>

            <div className="text-sm text-white/70 font-open-sans">
              Questions about our wind guarantee? Contact us at{" "}
              <a href="mailto:support@kitesafaris.com" className="text-white hover:underline">
                support@kitesafaris.com
              </a>{" "}
              or{" "}
              <a
                href="https://wa.me/12687193930"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <SocialSharing
              title="Guaranteed Wind Conditions | KiteSafaris.com"
              description="Guaranteed wind conditions or we make it right. Learn about our wind guarantee policy, seasonal patterns, and backup activities for consistent kiteboarding experiences."
              url="https://kitesafaris.com/guaranteed-wind"
            />
          </div>
        </div>
      </section>

      <FeaturePageCrossLinks currentPage="/guaranteed-wind" />
    </div>
  )
}
