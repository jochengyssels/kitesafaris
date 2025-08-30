import { Navigation } from "@/components/navigation"
import { DestinationDetail } from "@/components/destination-detail"
import { DestinationFocusedMap } from "@/components/destination-focused-map"
import { AntiguaTripCalendar } from "@/components/antigua-trip-calendar"
import { notFound } from "next/navigation"

const destinations = [
  {
    id: "antigua",
    name: "Antigua & Barbuda",
    region: "Caribbean",
    coordinates: { lat: 17.0608, lng: -61.7964 },
    bannerImage: "/antigua-jolly-harbor-kiting.png",
    windRating: 5,
    difficulty: "All Levels",
    tideRating: 5,
    season: "Dec - Apr",
    windSpeed: "15-25 knots",
    culture: "Caribbean island culture",
    intro:
      "7-day luxury catamaran kitesafari in Antigua & Barbuda. Ride the Caribbean trade winds, explore wild lagoons, and enjoy life on board. Limited to 6 spots. All meals, coaching, and fun included.",
    highlights: [
      "Hansons Bay - flat-water playground ideal for beginners and freestyle",
      "Nonsuch Bay and Green Island - protected by reef with butter-flat water",
      "Great Bird Island - remote and reef-protected with wildlife",
      "Barbuda - Coco Point, Spanish Point, and Codrington Lagoon",
      "Jolly Harbor and Falmouth Harbor - cultural stops with bars and restaurants",
    ],
    itinerary: [
      {
        day: "Saturday",
        activity: "Arrival and yacht orientation",
        description: "Welcome aboard at Jolly Harbor, safety briefing, and equipment setup",
      },
      {
        day: "Sunday",
        activity: "Hansons Bay session",
        description: "Flat-water playground on northwest coast, perfect for beginners and freestyle",
      },
      {
        day: "Monday",
        activity: "Nonsuch Bay exploration",
        description: "Protected by reef with butter-flat water and scenic green hills",
      },
      {
        day: "Tuesday",
        activity: "Great Bird Island adventure",
        description: "Remote wildlife sanctuary with sea turtles and stunning sunsets",
      },
      {
        day: "Wednesday",
        activity: "Barbuda expedition",
        description: "Coco Point shallow waters and Spanish Point wilder conditions",
      },
      {
        day: "Thursday",
        activity: "Codrington Lagoon",
        description: "Large shallow lagoon with safe conditions for progression",
      },
      {
        day: "Friday",
        activity: "Falmouth Harbor farewell",
        description: "Historic harbor near Nelson's Dockyard, departure Saturday morning",
      },
    ],
    gallery: [
      "/antigua-jolly-harbor-kiting.png",
      "/antigua-caribbean-sunset-kiteboarding.png",
      "/antigua-coral-reef-underwater-snorkeling.png",
      "/antigua-tropical-landscape-palm-trees-beach.png",
      "/antigua-aerial-harbor-view-new.jpg",
      "/banner-kitesafari-antigua-branded.png",
      "/antigua-sunset-harbor-romantic.jpeg",
    ],
  },
  {
    id: "greece",
    name: "Aegean Islands",
    region: "Greece",
    coordinates: { lat: 37.4449, lng: 25.3662 },
    bannerImage: "/greek-aegean-islands-kiteboarding-meltemi-winds.png",
    windRating: 5,
    difficulty: "Intermediate",
    tideRating: 4,
    season: "Coming Soon",
    windSpeed: "15-25 knots",
    culture: "Ancient Greek island heritage",
    intro:
      "Coming Soon: Experience the ultimate kitesurfing adventure in Greece with pristine islands, consistent meltemi winds, and boutique catamaran comfort.",
    highlights: [
      "Consistent meltemi winds - daily 15-25 kt thermal breezes",
      "Aegean island playground - secluded bays and empty beaches",
      "Warm water and easy launches - waist-deep comfortable sessions",
      "Cultural kite fusion - fresh Greek cuisine and Mediterranean evenings",
      "Uncrowded riding conditions in hidden coves",
    ],
    itinerary: [],
    gallery: [],
  },
  {
    id: "sardinia",
    name: "Punta Trettu",
    region: "Sardinia",
    coordinates: { lat: 39.0458, lng: 8.8394 },
    bannerImage: "/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
    windRating: 4,
    difficulty: "All Levels",
    tideRating: 4,
    season: "Coming Soon",
    windSpeed: "12-22 knots",
    culture: "Mediterranean island lifestyle",
    intro:
      "Coming Soon: Year-round kitesurfing from our home base location at Punta Trettu, Sardinia. Consistent conditions and authentic Mediterranean lifestyle.",
    highlights: [
      "Year-round kitesurfing conditions",
      "Home base location for KiteSafaris",
      "Consistent wind patterns and safe launches",
      "Authentic Mediterranean island culture",
      "Perfect for all skill levels and progression",
    ],
    itinerary: [],
    gallery: [],
  },
]

interface PageProps {
  params: { slug: string }
}

export default function DestinationDetailPage({ params }: PageProps) {
  const destination = destinations.find((d) => d.id === params.slug)

  if (!destination) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DestinationDetail destination={destination} />
              {destination.id === "antigua" && (
                <div className="mt-8">
                  <AntiguaTripCalendar />
                </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <DestinationFocusedMap
                  destination={{
                    id: destination.id,
                    name: destination.name,
                    coordinates: destination.coordinates,
                    zoom: 9,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.id,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const destination = destinations.find((d) => d.id === params.slug)

  if (!destination) {
    return {
      title: "Destination Not Found",
    }
  }

  return {
    title: `${destination.name} - KiteSafaris.com`,
    description: destination.intro,
  }
}
