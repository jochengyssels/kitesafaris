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
    intro: "Discover the Caribbean's premier kiteboarding paradise with KiteSafaris' exclusive 7-day luxury catamaran adventures. Experience world-class kitesurfing in Antigua's pristine waters, from the flat-water playgrounds of Hansons Bay to the wild lagoons of Barbuda. Our intimate groups of just 6 guests ensure personalized coaching, while our luxury catamaran provides the perfect base for exploring 365 beaches and crystal-clear waters. With consistent trade winds, professional instruction, and all-inclusive comfort, this is the ultimate kitesurfing safari experience.",
    highlights: [
      "Hansons Bay - World-renowned flat-water paradise perfect for beginners and freestyle progression",
      "Nonsuch Bay & Green Island - Protected reef systems creating butter-flat conditions with stunning scenery",
      "Great Bird Island - Remote wildlife sanctuary with pristine waters and incredible marine life",
      "Barbuda's Coco Point - Shallow crystal-clear waters ideal for learning and progression",
      "Spanish Point & Codrington Lagoon - Wild, untouched spots for advanced riders seeking adventure",
      "Jolly Harbor & Falmouth Harbor - Historic harbors with vibrant Caribbean culture and nightlife",
      "365 Beaches - Explore a different beach every day of the year in paradise",
      "Luxury Catamaran Living - Wake up to new spots daily with all-inclusive comfort and gourmet cuisine",
    ],
    itinerary: [
      {
        day: 1,
        activity: "Welcome Aboard & Jolly Harbor Orientation",
        description: "Arrive at the stunning Jolly Harbor marina where our luxury catamaran awaits. After a warm Caribbean welcome, enjoy a comprehensive safety briefing and equipment setup. Settle into your comfortable cabin, explore the yacht's amenities, and join your fellow adventurers for a sunset cocktail as we prepare for the ultimate kitesurfing safari.",
      },
      {
        day: 2,
        activity: "Hansons Bay - Flat Water Paradise",
        description: "Wake up to the gentle Caribbean breeze and sail to Hansons Bay, Antigua's most famous flat-water spot. This world-renowned location offers perfect conditions for beginners to learn and advanced riders to perfect their freestyle tricks. Spend the day in waist-deep, crystal-clear water with consistent winds and stunning mountain backdrops.",
      },
      {
        day: 3,
        activity: "Nonsuch Bay & Green Island Discovery",
        description: "Explore the protected waters of Nonsuch Bay, where reef systems create butter-flat conditions perfect for progression. The scenic green hills provide a breathtaking backdrop as you kite in some of the Caribbean's most beautiful waters. After an exhilarating session, enjoy a beach barbecue on Green Island.",
      },
      {
        day: 4,
        activity: "Great Bird Island Wildlife Adventure",
        description: "Sail to the remote Great Bird Island, a pristine wildlife sanctuary where you'll kite alongside sea turtles and tropical fish. This untouched paradise offers incredible riding conditions with the added bonus of snorkeling in crystal-clear waters. End the day with a spectacular sunset and stargazing session.",
      },
      {
        day: 5,
        activity: "Barbuda Expedition - Coco Point & Spanish Point",
        description: "Cross to the untouched island of Barbuda for a day of exploration. Start at Coco Point's shallow, crystal-clear waters perfect for learning, then challenge yourself at Spanish Point's wilder conditions. Experience the raw beauty of this uninhabited paradise with its pink sand beaches and incredible marine life.",
      },
      {
        day: 6,
        activity: "Codrington Lagoon Mastery",
        description: "Spend your final riding day in Barbuda's massive Codrington Lagoon, one of the Caribbean's largest shallow lagoons. Perfect your skills in these safe, consistent conditions while surrounded by incredible wildlife. Celebrate your progression with a beach party and traditional Caribbean feast.",
      },
      {
        day: 7,
        activity: "Falmouth Harbor Farewell",
        description: "Sail to historic Falmouth Harbor, home to Nelson's Dockyard and rich maritime history. Enjoy a final breakfast together, share stories of your adventure, and explore the charming colonial architecture. Depart with memories of the ultimate Caribbean kitesurfing experience and new friendships forged in paradise.",
      },
    ],
    gallery: [
      "/gallery/antigua/antigua:img-catamaran-sunset.jpg",
      "/gallery/antigua/antigua:img-catamaran-islands2.jpg",
      "/gallery/antigua/antigua:img-catamaran-shore.jpg",
      "/gallery/antigua/antigua:img-catamaran-islands-view.jpg",
      "/gallery/antigua/antigua:img-catamaran-sailing.jpg",
      "/gallery/antigua/antigua:img-heli-kiters.jpg",
      "/gallery/antigua/antigua:img-kite-next-to-catamaran.jpg",
      "/gallery/antigua/antigua:img-participants.jpg",
      "/gallery/catamaran/catamaran:img-helishot.jpg",
      "/gallery/catamaran/catamaran:img-sailing-nature.jpg",
      "/gallery/interior/iloveimg-converted/interior:img-bedroom.jpg",
      "/gallery/interior/iloveimg-converted/interior:img-cockpit.jpg",
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
    "name": "Antigua Kitesurfing | Luxury Caribbean Kite Safari | 7-Day Catamaran Adventure",
    "description": "Experience the ultimate Antigua kitesurfing adventure! 7-day luxury catamaran safari to Hansons Bay, Nonsuch Bay & Barbuda. All-inclusive with expert coaching, gourmet meals & 365 beaches.",
    "url": "https://kitesafaris.com/destinations/antigua",
    "mainEntity": {
      "@type": "TouristTrip",
      "name": "Antigua Kitesurfing Safari",
      "description": "7-day luxury catamaran kitesurfing adventure exploring Antigua's world-class kiteboarding spots including Hansons Bay, Nonsuch Bay, and Barbuda",
      "provider": {
        "@type": "Organization",
        "name": "KiteSafaris",
        "url": "https://kitesafaris.com",
        "sameAs": "https://www.kitesafaris.com"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "EUR",
        "price": "1900",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "1900",
          "maxPrice": "2500",
          "priceCurrency": "EUR"
        },
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-12-01",
        "validThrough": "2025-04-30"
      },
      "itinerary": [
        {
          "@type": "TouristAttraction",
          "name": "Hansons Bay",
          "description": "World-renowned flat-water paradise perfect for beginners and freestyle progression"
        },
        {
          "@type": "TouristAttraction", 
          "name": "Nonsuch Bay & Green Island",
          "description": "Protected reef systems creating butter-flat conditions with stunning scenery"
        },
        {
          "@type": "TouristAttraction",
          "name": "Great Bird Island",
          "description": "Remote wildlife sanctuary with pristine waters and incredible marine life"
        },
        {
          "@type": "TouristAttraction",
          "name": "Barbuda's Coco Point",
          "description": "Shallow crystal-clear waters ideal for learning and progression"
        },
        {
          "@type": "TouristAttraction",
          "name": "Spanish Point & Codrington Lagoon",
          "description": "Wild, untouched spots for advanced riders seeking adventure"
        }
      ],
      "touristType": "Kitesurfing Enthusiasts",
      "includes": [
        "Luxury catamaran accommodation",
        "Professional kitesurfing instruction",
        "All kitesurfing equipment",
        "Gourmet meals and beverages",
        "Transportation between spots",
        "Safety equipment and briefing"
      ],
      "duration": "P7D",
      "maximumAttendeeCapacity": 6,
      "location": {
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
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Flat Water",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Luxury Catamaran",
            "value": true
          }
        ]
      }
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
          title: `Antigua Kitesurfing | Luxury Caribbean Kite Safari | 7-Day Catamaran Adventure`,
          description: `Experience the ultimate Antigua kitesurfing adventure! 7-day luxury catamaran safari to Hansons Bay, Nonsuch Bay & Barbuda. All-inclusive with expert coaching, gourmet meals & 365 beaches. Book your Caribbean kite paradise!`,
          keywords: [
            "antigua kitesurfing",
            "caribbean kite safari",
            "luxury catamaran kitesurfing",
            "hansons bay kitesurfing",
            "nonsuch bay kitesurfing",
            "barbuda kitesurfing",
            "antigua kiteboarding trip",
            "caribbean kitesurfing vacation",
            "luxury kitesafari antigua",
            "antigua kite spots",
            "catamaran safari antigua",
            "kitesurfing antigua barbuda",
            "caribbean kiteboarding adventure",
            "antigua kiteboarding lessons",
            "luxury kitesurfing holiday",
            "antigua kite safari 2025",
            "caribbean kitesurfing spots",
            "antigua kiteboarding catamaran",
            "barbuda kiteboarding",
            "antigua kitesurfing schools",
            "caribbean kiteboarding trips",
            "antigua kiteboarding packages",
            "luxury kitesurfing antigua",
            "antigua kiteboarding all inclusive",
            "caribbean kitesurfing destinations"
          ].join(", "),
          openGraph: {
            title: `Antigua Kitesurfing | Luxury Caribbean Kite Safari | 7-Day Catamaran Adventure`,
            description: `Discover the Caribbean's premier kiteboarding paradise! 7-day luxury catamaran adventures to Antigua's world-class spots including Hansons Bay, Nonsuch Bay, and Barbuda. All-inclusive with expert coaching, gourmet meals, and 365 beaches to explore.`,
            images: [
              {
                url: "https://kitesafaris.com/antigua-aerial-harbor-view.jpg",
                width: 1200,
                height: 630,
                alt: "Luxury Antigua kitesurfing catamaran safari Caribbean kiteboarding adventure Hansons Bay Nonsuch Bay Barbuda",
              },
            ],
          },
          twitter: {
            title: `Antigua Kitesurfing | Luxury Caribbean Kite Safari Adventure`,
            description: `7-day luxury catamaran kitesurfing safari to Antigua & Barbuda. World-class spots, expert coaching, all-inclusive comfort. From €1,900. Book your Caribbean kite paradise!`,
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
