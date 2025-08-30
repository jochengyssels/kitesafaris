import { Navigation } from "@/components/navigation"
import { SmallGroupsPage } from "@/components/small-groups-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Small Groups Kite Safari | Maximum 8 Guests | KiteSafaris.com",
  description:
    "Experience intimate kite safari adventures with maximum 8 guests per trip. Personalized attention, better learning, and authentic connections on luxury catamarans.",
  keywords:
    "small group kiteboarding, intimate kite safari, personalized instruction, luxury catamaran small groups, Caribbean kiteboarding lessons",
  alternates: {
    canonical: "https://kitesafaris.com/small-groups",
  },
  openGraph: {
    title: "Small Groups Kite Safari | Maximum 8 Guests | KiteSafaris.com",
    description:
      "Experience intimate kite safari adventures with maximum 8 guests per trip. Personalized attention, better learning, and authentic connections.",
    url: "https://kitesafaris.com/small-groups",
    siteName: "KiteSafaris.com",
    images: [
      {
        url: "https://kitesafaris.com/small-group-kiteboarding-lesson-on-luxury-catamara.png",
        width: 1200,
        height: 630,
        alt: "Small group kiteboarding session with personalized instruction on luxury catamaran",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Small Groups Kite Safari | Maximum 8 Guests",
    description:
      "Experience intimate kite safari adventures with maximum 8 guests per trip. Personalized attention and authentic connections.",
    images: ["https://kitesafaris.com/small-group-kiteboarding-lesson-on-luxury-catamara.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function SmallGroupsPageRoute() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Small Groups Kite Safari",
            description:
              "Intimate kite safari adventures with maximum 8 guests per trip, featuring personalized attention and authentic connections on luxury catamarans.",
            provider: {
              "@type": "Organization",
              name: "KiteSafaris.com",
              url: "https://kitesafaris.com",
              logo: "https://kitesafaris.com/logo.png",
            },
            serviceType: "Kiteboarding Instruction",
            areaServed: {
              "@type": "Place",
              name: "Caribbean",
            },
            offers: {
              "@type": "Offer",
              description: "Small group kite safari with maximum 8 guests",
              priceRange: "€€€",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "127",
            },
            url: "https://kitesafaris.com/small-groups",
          }),
        }}
      />
      <SmallGroupsPage />
    </div>
  )
}
