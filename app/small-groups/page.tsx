import { Navigation } from "@/components/navigation"
import { SmallGroupsPage } from "@/components/small-groups-page"
import { JsonLd, generateReviewSchema } from "@/components/seo/JsonLd"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Small Group Kite Safari | Intimate Kitesurfing | KiteSafaris.com",
  description:
    "Experience intimate kitesurfing adventures with small group kite safari trips! Max 8 guests for personalized attention, better learning & authentic connections.",
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
  // Reviews for small groups testimonials
  const smallGroupReviews = [
    {
      author: "Flavia (Switzerland)",
      text: "Waking up on a catamaran, kiting in crystal-clear lagoons, and laughing with strangers who became family — this trip was magic. I came for the wind, but I left with so much more.",
      rating: 4.5,
      date: "2024-03-15",
      trip: "Antigua Safari 2024"
    },
    {
      author: "Michele Sabiu (Italy)",
      text: "Even though I've never been to the Caribbean, I felt the energy from day one. What started as an idea between four of us quickly turned into something real — a shared vision, a deep connection, and a feeling of belonging. That's the power of this journey.",
      rating: 5,
      date: "2024-02-20",
      trip: "Antigua Safari 2024"
    },
    {
      author: "Soa Mira (Switzerland)",
      text: "From the coaching to the anchor spots, every day felt perfectly planned yet totally spontaneous. The crew was professional, the vibe was pure joy, and launching from the boat? Wild.",
      rating: 5,
      date: "2024-01-10",
      trip: "Antigua Safari 2024"
    }
  ]

  const reviewSchema = generateReviewSchema(smallGroupReviews)

  // Service schema for small groups
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Small Groups Kite Safari",
    "description": "Intimate kite safari adventures with maximum 8 guests per trip, featuring personalized attention and authentic connections on luxury catamarans.",
    "provider": {
      "@type": "Organization",
      "name": "KiteSafaris",
      "url": "https://www.kitesafaris.com",
      "logo": "https://www.kitesafaris.com/logo.png",
    },
    "serviceType": "Kiteboarding Instruction",
    "areaServed": {
      "@type": "Place",
      "name": "Caribbean",
    },
    "offers": {
      "@type": "Offer",
      "description": "Small group kite safari with maximum 8 guests",
      "priceRange": "€€€",
      "availability": "https://schema.org/InStock",
    },
    "url": "https://www.kitesafaris.com/small-groups",
  }

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={serviceSchema} />
      <JsonLd data={reviewSchema} />
      <Navigation />
      <SmallGroupsPage />
    
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "KiteSafaris",
        "description": "Luxury Caribbean kite safari adventures",
        "url": "https://kitesafaris.com",
        "logo": "https://kitesafaris.com/logo.png"
      })
    }}
  />
</div>
  )
}
