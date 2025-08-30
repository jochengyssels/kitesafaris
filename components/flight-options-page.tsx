"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Plane,
  Clock,
  Euro,
  MapPin,
  Info,
  Calendar,
  Luggage,
  Users,
  ChevronDown,
  ChevronUp,
  Star,
  AlertTriangle,
  ExternalLink,
  Filter,
  Globe,
  Shield,
  Zap,
} from "lucide-react"

const countries = [
  { code: "all", name: "Show All", flag: "🌍" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
]

const flightOptions = [
  {
    id: 1,
    country: "United Kingdom",
    countryCode: "UK",
    flag: "🇬🇧",
    airport: "London Gatwick (LGW)",
    airlines: ["British Airways"],
    route: "Direct",
    frequency: "Daily (7× weekly)",
    duration: "8h 30m nonstop",
    fare: "€600–€1,300",
    fareMin: 600,
    fareMax: 1300,
    notes: "Highest frequency service, generous baggage, direct, best for UK travelers",
    isDirect: true,
    logo: "/airline-logos/british-airways.png",
    priority: "premium",
    usTransit: false,
    bookingTips: "Book 2-3 months ahead for best rates. Premium economy worth considering for comfort.",
    seasonalAlerts: "Peak pricing during school holidays and Christmas period.",
  },
  {
    id: 2,
    country: "United Kingdom",
    countryCode: "UK",
    flag: "🇬🇧",
    airport: "London Heathrow (LHR)",
    airlines: ["Virgin Atlantic"],
    route: "Direct (via Barbados)",
    frequency: "3–4× weekly",
    duration: "~9h (1h tech stop)",
    fare: "€550–€1,000",
    fareMin: 550,
    fareMax: 1000,
    notes: "Direct service with brief Barbados stop (same plane). SkyTeam partner connections available",
    isDirect: true,
    logo: "/airline-logos/virgin-atlantic.png",
    usTransit: false,
    bookingTips: "Technical stop in Barbados - you stay on the plane. Great for earning miles.",
    seasonalAlerts: "Winter schedule only (November-April).",
  },
  {
    id: 3,
    country: "Germany",
    countryCode: "DE",
    flag: "🇩🇪",
    airport: "Frankfurt (FRA)",
    airlines: ["Condor"],
    route: "Direct",
    frequency: "1× weekly (Tuesdays)",
    duration: "9h 45m nonstop",
    fare: "€600–€1,000",
    fareMin: 600,
    fareMax: 1000,
    notes: "Seasonal winter route (Nov–May). Only direct flight from mainland Europe",
    isDirect: true,
    logo: "/airline-logos/condor.png",
    usTransit: false,
    bookingTips: "Book early - limited weekly capacity. Consider Tuesday departures for best rates.",
    seasonalAlerts: "Winter season only. Book by September for best availability.",
  },
  {
    id: 4,
    country: "France",
    countryCode: "FR",
    flag: "🇫🇷",
    airport: "Paris (CDG)",
    airlines: ["Air France", "Delta Air Lines"],
    route: "One-stop via Atlanta",
    frequency: "7× to ATL; 1–2× ATL–ANU",
    duration: "~13h total (9h+4h)",
    fare: "€700–€1,200",
    fareMin: 700,
    fareMax: 1200,
    notes: "1-stop via Atlanta (SkyTeam). Bags checked through. ESTA required (USA transit)",
    isDirect: false,
    logo: "/airline-logos/air-france-delta.png",
    usTransit: true,
    bookingTips: "ESTA required for US transit. SkyTeam alliance benefits apply.",
    seasonalAlerts: "Higher fares during French school holidays.",
  },
  {
    id: 5,
    country: "Netherlands",
    countryCode: "NL",
    flag: "🇳🇱",
    airport: "Amsterdam (AMS)",
    airlines: ["KLM", "Delta Air Lines"],
    route: "One-stop via Atlanta",
    frequency: "7× to ATL; 1–2× ATL–ANU",
    duration: "~13h total (9h+4h)",
    fare: "€700–€1,200",
    fareMin: 700,
    fareMax: 1200,
    notes: "1-stop via Atlanta (SkyTeam). Alternative: via London (Virgin/BA)",
    isDirect: false,
    logo: "/airline-logos/klm-delta.png",
    usTransit: true,
    bookingTips: "Consider KLM's generous baggage policy for kite gear.",
    seasonalAlerts: "Peak pricing during Dutch holidays and Carnival season.",
  },
  {
    id: 6,
    country: "Spain",
    countryCode: "ES",
    flag: "🇪🇸",
    airport: "Madrid (MAD)",
    airlines: ["Iberia", "American Airlines"],
    route: "One-stop via Miami",
    frequency: "7× to MIA; 7× MIA–ANU",
    duration: "~12h total (9h+3h)",
    fare: "€700–€1,100",
    fareMin: 700,
    fareMax: 1100,
    notes: "1-stop via Miami (oneworld). Daily connections; US transit required",
    isDirect: false,
    logo: "/airline-logos/iberia-american.png",
    usTransit: true,
    bookingTips: "Oneworld alliance benefits. Miami connection usually smooth.",
    seasonalAlerts: "Higher demand during Spanish summer holidays.",
  },
  {
    id: 7,
    country: "Italy",
    countryCode: "IT",
    flag: "🇮🇹",
    airport: "Rome (FCO)",
    airlines: ["ITA Airways", "Virgin Atlantic"],
    route: "One-stop via London",
    frequency: "~14× to LHR; 3–4× LHR–ANU",
    duration: "~12h total (2.5h+9h)",
    fare: "€700–€1,100",
    fareMin: 700,
    fareMax: 1100,
    notes: "1-stop via London Heathrow. SkyTeam through-ticket (ITA → Virgin)",
    isDirect: false,
    logo: "/airline-logos/ita-virgin.png",
    usTransit: false,
    bookingTips: "Book as single ticket for baggage protection and better connections.",
    seasonalAlerts: "Peak pricing during Italian holidays and August.",
  },
  {
    id: 8,
    country: "Switzerland",
    countryCode: "CH",
    flag: "🇨🇭",
    airport: "Zurich (ZRH)",
    airlines: ["Swiss International", "United Airlines"],
    route: "One-stop via Newark",
    frequency: "7× to EWR; 1× EWR–ANU",
    duration: "~13h total (8h45+4h)",
    fare: "€650–€1,100",
    fareMin: 650,
    fareMax: 1100,
    notes: "1-stop via Newark (Star Alliance). Weekly Antigua flight in winter",
    isDirect: false,
    logo: "/airline-logos/swiss-united.png",
    usTransit: true,
    bookingTips: "Star Alliance benefits. Swiss service quality excellent.",
    seasonalAlerts: "Limited winter schedule to Antigua.",
  },
  {
    id: 9,
    country: "Sweden",
    countryCode: "SE",
    flag: "🇸🇪",
    airport: "Stockholm (ARN)",
    airlines: ["SAS", "United Airlines"],
    route: "One-stop via Newark",
    frequency: "7× to EWR; 1× EWR–ANU",
    duration: "~12–13h (8h+4h)",
    fare: "€700–€1,300",
    fareMin: 700,
    fareMax: 1300,
    notes: "1-stop via Newark (Star Alliance). Weekly winter service to ANU",
    isDirect: false,
    logo: "/airline-logos/sas-united.png",
    usTransit: true,
    bookingTips: "SAS Plus worth considering for extra comfort on long journey.",
    seasonalAlerts: "Book early for limited winter capacity.",
  },
  {
    id: 10,
    country: "Ireland",
    countryCode: "IE",
    flag: "🇮🇪",
    airport: "Dublin (DUB)",
    airlines: ["Aer Lingus", "JetBlue"],
    route: "One-stop via New York",
    frequency: "7× to JFK; 7× JFK–ANU",
    duration: "~12h total (7.5h+4h)",
    fare: "€700–€1,100",
    fareMin: 700,
    fareMax: 1100,
    notes: "1-stop via New York. Preclearance in DUB; daily connections",
    isDirect: false,
    logo: "/airline-logos/aer-lingus-jetblue.png",
    usTransit: true,
    bookingTips: "US preclearance in Dublin saves time on arrival in New York.",
    seasonalAlerts: "Popular route - book 2-3 months ahead.",
  },
]

export default function FlightOptionsPage() {
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [showTable, setShowTable] = useState(false)
  const [isTableSticky, setIsTableSticky] = useState(false)

  const filteredFlights = useMemo(() => {
    if (selectedCountry === "all") return flightOptions
    return flightOptions.filter((flight) => flight.countryCode === selectedCountry)
  }, [selectedCountry])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsTableSticky(scrollY > 1200 && showTable)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showTable])

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-turquoise-50/30 to-sand-beige-50/50">
      <section className="relative h-screen w-full overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flight-options-europe-y3IfZkxaFcXPEvTEJPA9QGoXyerfry.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-deep-navy/40" />

        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="text-center max-w-6xl">
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center gap-2 text-sm font-open-sans text-turquoise-100">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li className="text-turquoise-300">→</li>
                <li>
                  <a href="/destinations" className="hover:text-white transition-colors">
                    Destinations
                  </a>
                </li>
                <li className="text-turquoise-300">→</li>
                <li className="text-white font-semibold">Flights to Antigua</li>
              </ol>
            </nav>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl">
                <Plane className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-montserrat font-bold text-5xl md:text-7xl text-white text-balance leading-tight">
                Find Your Best Flight from Europe to Antigua
              </h1>
            </div>

            <div className="inline-flex items-center gap-3 bg-coral-orange-500/90 backdrop-blur-md px-8 py-3 rounded-full border border-coral-orange-400/50 mb-10 shadow-xl">
              <Calendar className="w-6 h-6 text-white" />
              <span className="font-montserrat font-bold text-xl text-white">Top 10 Routes • High Season Dec–Apr</span>
            </div>

            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 max-w-5xl mx-auto border border-white/30 shadow-2xl">
              <p className="font-open-sans text-xl md:text-2xl leading-relaxed text-pretty text-turquoise-50 mb-6">
                We screen and research only the{" "}
                <span className="font-bold text-white">fastest and most convenient connections</span> for European
                kiters heading to Antigua's pristine waters.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-open-sans text-turquoise-100">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Under 14h total travel</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Trusted airline partnerships</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>10 European departure cities</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="font-montserrat font-bold text-3xl text-deep-navy-900 mb-4">Filter by Departure Country</h2>
            <p className="font-open-sans text-lg text-gray-600">
              Select your departure country to see personalized flight options
            </p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-turquoise-600" />
            <span className="font-open-sans text-sm text-gray-600">
              Showing {filteredFlights.length} of {flightOptions.length} routes
            </span>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex gap-3 min-w-max">
              {countries.map((country) => (
                <Button
                  key={country.code}
                  onClick={() => setSelectedCountry(country.code)}
                  variant={selectedCountry === country.code ? "default" : "outline"}
                  className={`flex items-center gap-3 px-6 py-4 rounded-full font-open-sans font-bold whitespace-nowrap transition-all duration-300 ${
                    selectedCountry === country.code
                      ? "bg-gradient-to-r from-turquoise-600 to-coral-orange-500 text-white shadow-lg scale-105"
                      : "bg-white/90 backdrop-blur-sm border-turquoise-300 text-turquoise-700 hover:bg-turquoise-50 hover:border-turquoise-400 hover:scale-105"
                  }`}
                >
                  <span className="text-2xl drop-shadow-sm" role="img" aria-label={`${country.name} flag`}>
                    {country.flag}
                  </span>
                  <span className="text-base">{country.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 mb-16">
          {filteredFlights.map((flight, index) => (
            <Card
              key={flight.id}
              className="group relative overflow-hidden bg-white/95 backdrop-blur-md border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise-500/5 via-transparent to-coral-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-turquoise-500 to-coral-orange-500"></div>

              <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-deep-navy-900 to-deep-navy-800 text-white rounded-full font-montserrat font-bold text-sm">
                  {flightOptions.findIndex((f) => f.id === flight.id) + 1}
                </div>
              </div>

              {flight.priority === "premium" && (
                <div className="absolute top-6 right-6 z-10">
                  <Badge className="bg-gradient-to-r from-coral-orange-500 to-coral-orange-600 text-white font-montserrat font-bold px-3 py-1 shadow-lg">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="relative pt-20 pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-8">
                    <div className="text-6xl animate-pulse" role="img" aria-label={`${flight.country} flag`}>
                      {flight.flag}
                    </div>
                    <div>
                      <CardTitle className="font-montserrat font-bold text-3xl md:text-4xl text-deep-navy-900 mb-3 group-hover:text-turquoise-700 transition-colors">
                        {flight.country}
                      </CardTitle>
                      <p className="font-open-sans text-xl text-gray-600 mb-4">{flight.airport}</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        {flight.airlines.map((airline, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="font-open-sans text-sm bg-white/80 backdrop-blur-sm border-turquoise-300 text-turquoise-700 hover:bg-turquoise-50 px-3 py-1"
                          >
                            {airline}
                          </Badge>
                        ))}
                        {flight.isDirect && (
                          <Badge className="bg-gradient-to-r from-coral-orange-500 to-coral-orange-600 hover:from-coral-orange-600 hover:to-coral-orange-700 text-white shadow-lg border-0 px-3 py-1">
                            <Plane className="w-3 h-3 mr-1" />
                            Direct Flight
                          </Badge>
                        )}
                        {flight.usTransit && (
                          <Badge variant="outline" className="border-amber-400 text-amber-700 bg-amber-50 px-3 py-1">
                            <Shield className="w-3 h-3 mr-1" />
                            ESTA Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-coral-orange-600 to-coral-orange-700 hover:from-coral-orange-700 hover:to-coral-orange-800 text-white font-montserrat font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Book This Route
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => toggleCard(flight.id)}
                      className="hover:bg-turquoise-100/70 backdrop-blur-sm border border-turquoise-200/50 rounded-full font-open-sans"
                      aria-label={`${expandedCard === flight.id ? "Collapse" : "Expand"} flight details for ${flight.country}`}
                    >
                      {expandedCard === flight.id ? (
                        <>
                          <ChevronUp className="w-5 h-5 mr-2 text-turquoise-600" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-5 h-5 mr-2 text-turquoise-600" />
                          View Details
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative pb-8">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-turquoise-50/90 to-turquoise-100/60 backdrop-blur-sm border border-turquoise-200/40">
                    <div className="p-3 bg-deep-navy-900 rounded-full shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-montserrat font-bold text-lg text-deep-navy-900">{flight.frequency}</p>
                      <p className="font-open-sans text-turquoise-700">{flight.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-coral-orange-50/90 to-coral-orange-100/60 backdrop-blur-sm border border-coral-orange-200/40">
                    <div className="p-3 bg-coral-orange-500 rounded-full shadow-lg">
                      <Euro className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-montserrat font-bold text-2xl text-coral-orange-600">{flight.fare}</p>
                      <p className="font-open-sans text-coral-orange-700">Economy Class</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-sand-beige-50/90 to-sand-beige-100/60 backdrop-blur-sm border border-sand-beige-200/40">
                    <div className="p-3 bg-deep-navy-900 rounded-full shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-montserrat font-bold text-lg text-deep-navy-900">{flight.route}</p>
                      <p className="font-open-sans text-gray-600">Connection Type</p>
                    </div>
                  </div>
                </div>

                {expandedCard === flight.id && (
                  <div className="mt-8 space-y-6 animate-in slide-in-from-top-4 duration-500">
                    <div className="p-6 bg-gradient-to-br from-sand-beige-50/95 to-white/95 backdrop-blur-sm rounded-2xl border border-sand-beige-200/50">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-turquoise-500 rounded-full shrink-0">
                          <Info className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-montserrat font-bold text-xl text-deep-navy-900 mb-3">
                            Flight Details & Route Information
                          </h4>
                          <p className="font-open-sans text-gray-700 leading-relaxed mb-4">{flight.notes}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gradient-to-br from-turquoise-50/95 to-white/95 backdrop-blur-sm rounded-2xl border border-turquoise-200/50">
                        <h5 className="font-montserrat font-bold text-lg text-deep-navy-900 mb-3 flex items-center gap-2">
                          <Luggage className="w-5 h-5 text-turquoise-600" />
                          Booking Tips
                        </h5>
                        <p className="font-open-sans text-gray-700 leading-relaxed">{flight.bookingTips}</p>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-coral-orange-50/95 to-white/95 backdrop-blur-sm rounded-2xl border border-coral-orange-200/50">
                        <h5 className="font-montserrat font-bold text-lg text-deep-navy-900 mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-coral-orange-600" />
                          Seasonal Alerts
                        </h5>
                        <p className="font-open-sans text-gray-700 leading-relaxed">{flight.seasonalAlerts}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-12">
          <Button
            onClick={() => setShowTable(!showTable)}
            size="lg"
            className="bg-gradient-to-r from-turquoise-600 via-turquoise-700 to-deep-navy-800 hover:from-turquoise-700 hover:via-deep-navy-800 hover:to-deep-navy-900 text-white font-montserrat font-bold px-12 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full border border-turquoise-500/30"
          >
            <Star className="w-6 h-6 mr-3" />
            {showTable ? "Hide" : "View"} Smart Comparison Table
            {showTable ? <ChevronUp className="w-6 h-6 ml-3" /> : <ChevronDown className="w-6 h-6 ml-3" />}
          </Button>
          {selectedCountry !== "all" && (
            <p className="font-open-sans text-sm text-gray-600 mt-3">
              Table filtered to show {countries.find((c) => c.code === selectedCountry)?.name} routes only
            </p>
          )}
        </div>

        {showTable && (
          <div
            className={`transition-all duration-500 ${isTableSticky ? "fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto" : "relative mb-16"}`}
          >
            <Card className="bg-white/98 backdrop-blur-xl border border-white/70 shadow-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-deep-navy-900 via-turquoise-600 to-coral-orange-500 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-montserrat font-bold text-2xl flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full">
                      <Star className="w-6 h-6" />
                    </div>
                    Smart Flight Comparison
                    {selectedCountry !== "all" && (
                      <Badge className="bg-white/20 text-white border-white/30 ml-4">
                        {countries.find((c) => c.code === selectedCountry)?.flag}{" "}
                        {countries.find((c) => c.code === selectedCountry)?.name}
                      </Badge>
                    )}
                  </CardTitle>
                  {isTableSticky && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowTable(false)}
                      className="text-white hover:bg-white/20 rounded-full"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 z-10">
                      <tr className="bg-gradient-to-r from-turquoise-50 to-sand-beige-50 border-b-2 border-turquoise-300">
                        <th className="text-left p-4 font-montserrat font-bold text-deep-navy-900 border-r border-turquoise-200">
                          #
                        </th>
                        <th className="text-left p-4 font-montserrat font-bold text-deep-navy-900 border-r border-turquoise-200">
                          Departure City
                        </th>
                        <th className="text-left p-4 font-montserrat font-bold text-deep-navy-900 border-r border-turquoise-200">
                          Airlines & Route
                        </th>
                        <th className="text-left p-4 font-montserrat font-bold text-deep-navy-900 border-r border-turquoise-200">
                          Weekly Frequency
                        </th>
                        <th className="text-left p-4 font-montserrat font-bold text-deep-navy-900 border-r border-turquoise-200">
                          Flight Duration
                        </th>
                        <th className="text-left p-4 font-montserrat font-bold text-deep-navy-900 border-r border-turquoise-200">
                          Fare Range (EUR)
                        </th>
                        <th className="text-left p-4 font-montserrat font-bold text-deep-navy-900">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFlights.map((flight, index) => (
                        <tr
                          key={flight.id}
                          className={`border-b border-turquoise-100 hover:bg-gradient-to-r hover:from-turquoise-50/50 hover:to-sand-beige-50/50 transition-all duration-200 ${
                            index % 2 === 0 ? "bg-white" : "bg-turquoise-50/20"
                          }`}
                        >
                          <td className="p-4 border-r border-turquoise-100">
                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-turquoise-500 to-turquoise-600 text-white rounded-full font-montserrat font-bold text-sm">
                              {flightOptions.findIndex((f) => f.id === flight.id) + 1}
                            </div>
                          </td>
                          <td className="p-4 border-r border-turquoise-100">
                            <div className="flex items-center gap-4">
                              <span className="text-2xl" role="img" aria-label={`${flight.country} flag`}>
                                {flight.flag}
                              </span>
                              <div>
                                <p className="font-montserrat font-bold text-deep-navy-900">{flight.country}</p>
                                <p className="font-open-sans text-sm text-gray-600">{flight.airport}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 border-r border-turquoise-100">
                            <div className="space-y-1">
                              <p className="font-open-sans font-semibold text-deep-navy-900">
                                {flight.airlines.join(" + ")}
                              </p>
                              <div className="flex items-center gap-2">
                                <p className="font-open-sans text-sm text-gray-600">{flight.route}</p>
                                {flight.isDirect && (
                                  <Badge className="bg-coral-orange-500 text-white text-xs px-2 py-0.5">Direct</Badge>
                                )}
                                {flight.usTransit && (
                                  <Badge
                                    variant="outline"
                                    className="border-amber-400 text-amber-700 text-xs px-2 py-0.5"
                                  >
                                    ESTA
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 border-r border-turquoise-100 font-open-sans text-sm text-deep-navy-900">
                            {flight.frequency}
                          </td>
                          <td className="p-4 border-r border-turquoise-100 font-open-sans text-sm text-deep-navy-900">
                            {flight.duration}
                          </td>
                          <td className="p-4 border-r border-turquoise-100 font-montserrat font-bold text-lg text-coral-orange-600">
                            {flight.fare}
                          </td>
                          <td className="p-4">
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-coral-orange-500 to-coral-orange-600 hover:from-coral-orange-600 hover:to-coral-orange-700 text-white font-open-sans font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Book
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className={`${showTable && isTableSticky ? "mt-96" : ""} grid lg:grid-cols-4 gap-8`}>
          <div className="lg:col-span-3">
            <Card className="bg-gradient-to-br from-white/95 to-turquoise-50/80 backdrop-blur-xl border border-white/60 shadow-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-turquoise-50/80 to-sand-beige-50/80 backdrop-blur-sm border-b border-turquoise-200/30">
                <CardTitle className="font-montserrat font-bold text-3xl text-deep-navy-900 flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-turquoise-500 to-turquoise-600 rounded-full">
                    <Info className="w-7 h-7 text-white" />
                  </div>
                  Essential Travel Tips for Your Kite Safari
                </CardTitle>
                <p className="font-open-sans text-lg text-gray-600 mt-2">
                  Make your journey to Antigua as smooth as your kite sessions
                </p>
              </CardHeader>
              <CardContent className="p-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/80 to-turquoise-50/50 backdrop-blur-sm hover:from-white/90 hover:to-turquoise-50/70 transition-all duration-300 border border-turquoise-200/30 hover:border-turquoise-300/50 hover:shadow-lg">
                    <div className="p-3 bg-gradient-to-br from-coral-orange-500 to-coral-orange-600 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-montserrat font-bold text-xl text-deep-navy-900 mb-3">Book Early & Smart</h4>
                    <p className="font-open-sans text-gray-700 leading-relaxed">
                      Secure best fares 2-3 months ahead. Holiday periods (Christmas, New Year, Easter) see 30-50% price
                      premiums.
                    </p>
                  </div>

                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/80 to-sand-beige-50/50 backdrop-blur-sm hover:from-white/90 hover:to-sand-beige-50/70 transition-all duration-300 border border-sand-beige-200/30 hover:border-sand-beige-300/50 hover:shadow-lg">
                    <div className="p-3 bg-gradient-to-br from-turquoise-500 to-turquoise-600 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-montserrat font-bold text-xl text-deep-navy-900 mb-3">
                      US Transit Requirements
                    </h4>
                    <p className="font-open-sans text-gray-700 leading-relaxed">
                      ESTA authorization required for US connections. Apply online 72+ hours before departure for
                      seamless transit.
                    </p>
                  </div>

                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/80 to-turquoise-50/50 backdrop-blur-sm hover:from-white/90 hover:to-turquoise-50/70 transition-all duration-300 border border-turquoise-200/30 hover:border-turquoise-300/50 hover:shadow-lg">
                    <div className="p-3 bg-gradient-to-br from-coral-orange-500 to-coral-orange-600 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Luggage className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-montserrat font-bold text-xl text-deep-navy-900 mb-3">Baggage & Gear</h4>
                    <p className="font-open-sans text-gray-700 leading-relaxed">
                      Same-ticket alliances check bags through. Consider kite gear shipping services for hassle-free
                      travel.
                    </p>
                  </div>

                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/80 to-sand-beige-50/50 backdrop-blur-sm hover:from-white/90 hover:to-sand-beige-50/70 transition-all duration-300 border border-sand-beige-200/30 hover:border-sand-beige-300/50 hover:shadow-lg">
                    <div className="p-3 bg-gradient-to-br from-deep-navy-800 to-deep-navy-900 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-montserrat font-bold text-xl text-deep-navy-900 mb-3">Alliance Benefits</h4>
                    <p className="font-open-sans text-gray-700 leading-relaxed">
                      Single-ticket bookings simplify connections, protect against delays, and often include lounge
                      access.
                    </p>
                  </div>
                </div>

                <div className="mt-12 p-8 bg-gradient-to-r from-deep-navy-900 via-turquoise-600 to-coral-orange-500 rounded-2xl text-white text-center">
                  <h3 className="font-montserrat font-bold text-2xl mb-4">Ready for Your Caribbean Kite Adventure?</h3>
                  <p className="font-open-sans text-lg mb-6 text-turquoise-50">
                    Book your flights and join us for the ultimate kitesurfing experience in Antigua's pristine waters.
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-deep-navy-900 hover:bg-turquoise-50 font-montserrat font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Explore Our Kite Safaris
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card className="bg-white/95 backdrop-blur-md border border-white/60 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-coral-orange-50 to-coral-orange-100 border-b border-coral-orange-200/30">
                  <CardTitle className="font-montserrat font-bold text-lg text-deep-navy-900 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-coral-orange-600" />
                    Quick Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <p className="font-open-sans font-semibold text-sm text-amber-800">ESTA Reminder</p>
                      <p className="font-open-sans text-xs text-amber-700">Required for US transit</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-turquoise-50 border border-turquoise-200">
                    <Calendar className="w-5 h-5 text-turquoise-600 shrink-0" />
                    <div>
                      <p className="font-open-sans font-semibold text-sm text-turquoise-800">Book Ahead</p>
                      <p className="font-open-sans text-xs text-turquoise-700">Best fares 2-3 months early</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-sand-beige-50 border border-sand-beige-200">
                    <Luggage className="w-5 h-5 text-sand-beige-600 shrink-0" />
                    <div>
                      <p className="font-open-sans font-semibold text-sm text-sand-beige-800">Baggage Transfer</p>
                      <p className="font-open-sans text-xs text-sand-beige-700">Same-ticket protection</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-coral-orange-50 border border-coral-orange-200">
                    <Plane className="w-5 h-5 text-coral-orange-600 shrink-0" />
                    <div>
                      <p className="font-open-sans font-semibold text-sm text-coral-orange-800">Plan Around Trips</p>
                      <p className="font-open-sans text-xs text-coral-orange-700">Match kite safari dates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-deep-navy-900 to-turquoise-700 text-white shadow-xl">
                <CardContent className="p-6 text-center">
                  <h4 className="font-montserrat font-bold text-lg mb-3">Need Help Choosing?</h4>
                  <p className="font-open-sans text-sm text-turquoise-100 mb-4">
                    Our travel experts can help you find the perfect flight for your kite safari.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 font-open-sans"
                  >
                    Contact Travel Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
