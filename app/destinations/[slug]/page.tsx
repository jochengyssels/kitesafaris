import { notFound } from "next/navigation"
import { DestinationDetail } from "@/components/destination-detail"
import { Navigation } from "@/components/navigation"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { AntiguaTripCalendar } from "@/components/antigua-trip-calendar"
import { SardiniaPartnerSchools } from "@/components/sardinia-partner-schools"

interface PageProps {
  params: Promise<{ slug: string }>
}

const destinations = [
  {
    id: "antigua",
    name: "Antigua & Barbuda",
    region: "Caribbean",
    coordinates: { lat: 17.0608, lng: -61.7964 },
    bannerImage: "/antigua-aerial-harbor-view.jpg",
    windRating: 5,
    difficulty: "All Levels",
    tideRating: 5,
    season: "Dec - Apr",
    windSpeed: "15-25 knots",
    culture: "Caribbean island culture",
    intro: "Experience the ultimate kiteboarding in Antigua with KiteSafaris. Kitesurf Antigua's world-class spots including Hansons Bay, Nonsuch Bay, and Barbuda on our 7-day luxury catamaran adventures. Ride the Caribbean trade winds, explore wild lagoons, and enjoy life on board. Limited to 6 spots. All meals, coaching, and fun included.",
    highlights: [
      "Hansons Bay - flat-water playground ideal for beginners and freestyle",
      "Nonsuch Bay and Green Island - protected by reef with butter-flat water",
      "Great Bird Island - remote and reef-protected with wildlife",
      "Barbuda - Coco Point, Spanish Point, and Codrington Lagoon",
      "Jolly Harbor and Falmouth Harbor - cultural stops with bars and restaurants",
    ],
    itinerary: [
      {
        day: 1,
        activity: "Arrival and yacht orientation",
        description: "Welcome aboard at Jolly Harbor, safety briefing, and equipment setup",
      },
      {
        day: 2,
        activity: "Hansons Bay session",
        description: "Flat-water playground on northwest coast, perfect for beginners and freestyle",
      },
      {
        day: 3,
        activity: "Nonsuch Bay exploration",
        description: "Protected by reef with butter-flat water and scenic green hills",
      },
      {
        day: 4,
        activity: "Great Bird Island adventure",
        description: "Remote wildlife sanctuary with sea turtles and stunning sunsets",
      },
      {
        day: 5,
        activity: "Barbuda expedition",
        description: "Coco Point shallow waters and Spanish Point wilder conditions",
      },
      {
        day: 6,
        activity: "Codrington Lagoon",
        description: "Large shallow lagoon with safe conditions for progression",
      },
      {
        day: 7,
        activity: "Falmouth Harbor farewell",
        description: "Historic harbor near Nelson's Dockyard, departure Saturday morning",
      },
    ],
    gallery: [
      "https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-catamaran-sunset.jpg",
      "https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-catamaran-islands2.jpg",
      "https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-catamaran-shore.jpg",
      "/antigua-aerial-harbor-view-new.jpg",
      "/banner-kitesafari-antigua-branded.png",
      "/antigua-sunset-harbor-romantic.jpeg",
      "/antigua-aerial-harbor-view.jpg",
    ],
  },
  {
    id: "greece",
    name: "Aegean Islands",
    region: "Greece",
    coordinates: { lat: 37.4449, lng: 25.3662 },
    bannerImage: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/greece:img-catamaran-shore-heli.jpg",
    windRating: 5,
    difficulty: "Intermediate",
    tideRating: 4,
    season: "Coming Soon",
    windSpeed: "15-25 knots",
    culture: "Ancient Greek island heritage",
    intro: "Coming Soon: Experience the ultimate kitesurfing adventure in Greece with pristine islands, consistent meltemi winds, and boutique catamaran comfort.",
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
    coordinates: { lat: 39.112133995367714, lng: 8.437520043416788 },
    bannerImage: "/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
    windRating: 4,
    difficulty: "All Levels",
    tideRating: 4,
    season: "Apr - Oct",
    windSpeed: "12-22 knots",
    culture: "Mediterranean island lifestyle",
    intro: "Discover Sardinia's premier kitesurfing destination at Punta Trettu, where flat shallow lagoons meet consistent thermal winds in one of Europe's most beginner-friendly locations. From April to October, experience world-class kitesurfing conditions with professional instruction from certified partner schools, exclusive KiteSafaris discounts, and the authentic charm of Mediterranean island life.",
    highlights: [
      "World-class flat shallow lagoon - Europe's premier beginner destination",
      "Consistent thermal winds 12-22 knots from April to October",
      "Professional IKO certified instruction from partner schools",
      "Exclusive KiteSafaris discounts on lessons and equipment",
      "Authentic Mediterranean culture and world-renowned cuisine",
      "Home base for KiteSafaris operations and expert guidance",
    ],
    itinerary: [
      {
        day: 1,
        activity: "Arrival and orientation",
        description: "Welcome to Punta Trettu, meet your certified instructors and get familiar with the world-class lagoon conditions",
      },
      {
        day: 2,
        activity: "Beginner kitesurf lesson",
        description: "Learn kite control and safety in the flat, shallow waters of the lagoon with professional guidance",
      },
      {
        day: 3,
        activity: "Water start practice",
        description: "Master the water start technique in ideal beginner conditions with personalized instruction",
      },
      {
        day: 4,
        activity: "Riding and progression",
        description: "Practice riding upwind and basic maneuvers with expert coaching and modern equipment",
      },
      {
        day: 5,
        activity: "Independent practice",
        description: "Apply your new skills with supervised practice sessions in the perfect learning environment",
      },
      {
        day: 6,
        activity: "Advanced techniques",
        description: "Learn transitions, turns, and build confidence in your riding with professional support",
      },
      {
        day: 7,
        activity: "Graduation and celebration",
        description: "Showcase your progress and celebrate your kitesurfing journey with fellow students",
      },
    ],
    gallery: [],
  },
]

export default async function DestinationDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const destination = destinations.find((d) => d.id === resolvedParams.slug)

  if (!destination) {
    notFound()
  }

  // Generate JSON-LD for destinations
  const destinationJsonLd = destination.id === "sardinia" ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Kitesurf Sardinia | Punta Trettu - Best Kitesurfing Destination Italy",
    "description": "Discover why Sardinia is Italy's premier kitesurfing destination. Punta Trettu offers perfect conditions for all levels with consistent winds, flat water, and professional instruction.",
    "url": "https://kitesafaris.com/destinations/sardinia",
    "mainEntity": {
      "@type": "Place",
      "name": "Punta Trettu, Sardinia",
      "description": "Italy's premier kitesurfing destination with world-class flat water conditions",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "San Giovanni Suergiu",
        "addressRegion": "Sardinia",
        "addressCountry": "Italy"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 39.112133995367714,
        "longitude": 8.437520043416788
      },
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Kitesurfing",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification", 
          "name": "Beginner Friendly",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Flat Water",
          "value": true
        }
      ]
    },
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
        }
      ]
    }
  } : destination.id === "antigua" ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Kiteboarding Antigua | Kitesurf Antigua | Caribbean Kite Safari Adventures",
    "description": "Discover the best kiteboarding in Antigua with KiteSafaris. Kitesurf Antigua's premier spots including Hansons Bay, Nonsuch Bay, and Barbuda. 7-day luxury catamaran adventures.",
    "url": "https://kitesafaris.com/destinations/antigua",
    "mainEntity": {
      "@type": "Place",
      "name": "Antigua & Barbuda",
      "description": "Caribbean's premier kiteboarding destination with world-class spots and consistent trade winds",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Antigua",
        "addressRegion": "Antigua & Barbuda",
        "addressCountry": "AG"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 17.0608,
        "longitude": -61.7964
      },
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Kiteboarding",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification", 
          "name": "Kitesurfing",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "All Levels",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Trade Winds",
          "value": true
        }
      ]
    },
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
          "name": "Antigua",
          "item": "https://kitesafaris.com/destinations/antigua"
        }
      ]
    }
  } : null

  return (
    <div className="min-h-screen bg-white">
      {destinationJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationJsonLd) }}
        />
      )}
      <Navigation />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-6">
          <BreadcrumbNavigation 
            items={[
              { label: "Destinations", href: "/destinations" },
              { label: destination.name }
            ]} 
          />
        </div>
        <DestinationDetail destination={destination} />
        {destination.id === "antigua" && (
          <div className="mt-8">
            <AntiguaTripCalendar />
          </div>
        )}
        {destination.id === "sardinia" && (
          <div className="mt-8">
            <SardiniaPartnerSchools />
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params
  const destination = destinations.find((d) => d.id === resolvedParams.slug)

  if (!destination) {
    return {
      title: "Destination Not Found",
      description: "The requested destination could not be found.",
    }
  }

  // Generate destination-specific metadata
  const getDestinationMetadata = (dest: typeof destinations[0]) => {
    switch (dest.id) {
      case "sardinia":
        return {
          title: `Sardinia Kitesurfing | Punta Trettu Mediterranean Safari | KiteSafaris`,
          description: `Experience Sardinia kitesurfing at Punta Trettu on Mediterranean kite safari adventures! Perfect conditions, consistent winds & professional instruction. Discover now!`,
          keywords: [
            "kitesurf Sardinia",
            "Punta Trettu",
            "kitesurf school Sardinia", 
            "kitesurfing Sardinia",
            "Punta Trettu kitesurfing",
            "kitesurf Punta Trettu",
            "Sardinia kitesurfing",
            "kitesurf Italy",
            "beginner kitesurfing Sardinia",
            "kitesurfing lessons Sardinia",
            "kitesurf instruction Sardinia",
            "Sardinia kiteboarding",
            "kitesurfing beginner Italy",
            "Punta Trettu kitesurf school",
            "Sardinia wind conditions"
          ].join(", "),
          openGraph: {
            title: `Kitesurf Sardinia | Punta Trettu - Best Kitesurfing Destination Italy`,
            description: `Discover why Sardinia is Italy's premier kitesurfing destination. Punta Trettu offers perfect conditions for all levels with consistent winds and professional instruction.`,
            images: [
              {
                url: "https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
                width: 1200,
                height: 630,
                alt: "Kitesurfing Sardinia Punta Trettu best kitesurfing destination Italy",
              },
            ],
          },
          twitter: {
            title: `Kitesurf Sardinia | Punta Trettu - Best Kitesurfing Destination Italy`,
            description: `Discover why Sardinia is Italy's premier kitesurfing destination. Punta Trettu offers perfect conditions for all levels with consistent winds.`,
            images: ["https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"],
          },
        }
      case "antigua":
        return {
          title: `Antigua Kitesurfing | Caribbean Kite Safari | KiteSafaris`,
          description: `Experience Antigua kitesurfing on luxury catamaran Caribbean kite safari adventures! Discover Hansons Bay, Nonsuch Bay & Barbuda with expert coaching. Book now!`,
          keywords: [
            "kiteboarding antigua",
            "kitesurf antigua",
            "Caribbean kite safari",
            "Antigua kiteboarding trip",
            "catamaran safari Antigua",
            "book kiteboarding holiday Caribbean",
            "luxury kitesafari",
            "Antigua kite spots",
            "Caribbean kitesurfing vacation",
            "kitesurfing antigua",
            "antigua kiteboarding",
            "kiteboarding caribbean",
            "kitesurf caribbean",
          ].join(", "),
          openGraph: {
            title: `Kiteboarding Antigua | Kitesurf Antigua | Caribbean Kite Safari Adventures`,
            description: `Discover the best kiteboarding in Antigua with KiteSafaris. Kitesurf Antigua's premier spots including Hansons Bay, Nonsuch Bay, and Barbuda. 7-day luxury catamaran adventures.`,
            images: [
              {
                url: "https://kitesafaris.com/antigua-aerial-harbor-view.jpg",
                width: 1200,
                height: 630,
                alt: "Kiteboarding Antigua kitesurf Antigua Caribbean kite safari adventure",
              },
            ],
          },
          twitter: {
            title: `Kiteboarding Antigua | Kitesurf Antigua | Caribbean Adventures`,
            description: `Discover the best kiteboarding in Antigua with KiteSafaris. Kitesurf Antigua's premier spots with luxury catamaran adventures from €1,900.`,
            images: ["https://kitesafaris.com/antigua-aerial-harbor-view.jpg"],
          },
        }
      case "greece":
        return {
          title: `Greece Kitesurfing | Cyclades Kite Safari | KiteSafaris`,
          description: `Discover Greece kitesurfing with Cyclades kite safari adventures! Experience consistent Meltemi winds, pristine islands & luxury catamaran comfort. Book now!`,
          keywords: [
            "Greek islands kitesurfing",
            "Aegean kitesurfing",
            "Greece kiteboarding",
            "Mediterranean kitesurfing",
          ].join(", "),
          openGraph: {
            title: `${dest.name} - KiteSafaris.com`,
            description: dest.intro,
            images: [
              {
                url: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/greece:img-catamaran-shore-heli.jpg",
                width: 1200,
                height: 630,
                alt: `${dest.name} kitesurfing destination`,
              },
            ],
          },
          twitter: {
            title: `${dest.name} - KiteSafaris.com`,
            description: dest.intro,
            images: ["https://daggzx92agk0rfom.public.blob.vercel-storage.com/greece:img-catamaran-shore-heli.jpg"],
          },
        }
      default:
        return {
          title: `${dest.name} - KiteSafaris.com`,
          description: dest.intro,
          keywords: ["kitesurfing", "kiteboarding", "safari", "adventure"].join(", "),
          openGraph: {
            title: `${dest.name} - KiteSafaris.com`,
            description: dest.intro,
            images: [
              {
                url: dest.bannerImage ? `http://localhost:3000${dest.bannerImage}` : "http://localhost:3000/placeholder.svg",
                width: 1200,
                height: 630,
                alt: `${dest.name} kitesurfing destination`,
              },
            ],
          },
          twitter: {
            title: `${dest.name} - KiteSafaris.com`,
            description: dest.intro,
            images: [dest.bannerImage ? `http://localhost:3000${dest.bannerImage}` : "http://localhost:3000/placeholder.svg"],
          },
        }
    }
  }

  const metadata = getDestinationMetadata(destination)

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    robots: "index, follow",
    googlebot: "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
    "google-site-verification": "your-google-verification-code",
    alternates: {
      canonical: `https://kitesafaris.com/destinations/${destination.id}`,
    },
    openGraph: {
      ...metadata.openGraph,
      url: `https://kitesafaris.com/destinations/${destination.id}`,
      siteName: "KiteSafaris.com",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      ...metadata.twitter,
    },
  }
}
