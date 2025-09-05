import { Navigation } from "@/components/navigation"
import { GuaranteedWindPage } from "@/components/guaranteed-wind-page"
import { JsonLd, generateReviewSchema } from "@/components/seo/JsonLd"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Guaranteed Wind Conditions | KiteSafaris.com",
  description:
    "Guaranteed wind conditions or we make it right. Learn about our wind guarantee policy, seasonal patterns, and backup activities for consistent kiteboarding experiences.",
  keywords: "guaranteed wind, kiteboarding conditions, wind patterns, weather guarantee, trade winds, meltemi winds",
  alternates: {
    canonical: "https://kitesafaris.com/guaranteed-wind",
  },
  openGraph: {
    title: "Guaranteed Wind Conditions | KiteSafaris.com",
    description:
      "Guaranteed wind conditions or we make it right. Learn about our wind guarantee policy, seasonal patterns, and backup activities for consistent kiteboarding experiences.",
    url: "https://kitesafaris.com/guaranteed-wind",
    siteName: "KiteSafaris.com",
    images: [
      {
        url: "https://kitesafaris.com/perfect-wind-conditions-for-kiteboarding-in-tropic.png",
        width: 1200,
        height: 630,
        alt: "Consistent wind conditions during peak kiteboarding season in Antigua Caribbean",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guaranteed Wind Conditions | KiteSafaris.com",
    description:
      "Guaranteed wind conditions or we make it right. Learn about our wind guarantee policy and seasonal patterns.",
    images: ["https://kitesafaris.com/perfect-wind-conditions-for-kiteboarding-in-tropic.png"],
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

export default function GuaranteedWindPageRoute() {
  // Reviews for wind guarantee testimonials
  const windReviews = [
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

  const reviewSchema = generateReviewSchema(windReviews)

  // Service schema for wind guarantee
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Guaranteed Wind Conditions",
    "description": "Wind guarantee policy ensuring consistent 15-25 knot conditions during peak seasons. Backup activities and alternative arrangements when conditions don't meet standards.",
    "provider": {
      "@type": "Organization",
      "name": "KiteSafaris",
      "url": "https://www.kitesafaris.com",
      "logo": "https://www.kitesafaris.com/logo.png",
    },
    "serviceType": "Weather Guarantee",
    "category": "Kiteboarding Services",
    "hasPolicy": {
      "@type": "Policy",
      "name": "Wind Guarantee Policy",
      "description": "Guaranteed wind conditions or alternative arrangements provided",
    },
    "areaServed": [
      {
        "@type": "Place",
        "name": "Caribbean",
      },
      {
        "@type": "Place",
        "name": "Greece",
      },
      {
        "@type": "Place",
        "name": "Sardinia",
      },
    ],
    "url": "https://www.kitesafaris.com/guaranteed-wind",
  }

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={serviceSchema} />
      <JsonLd data={reviewSchema} />
      <Navigation />
      <main className="pt-20">
        <GuaranteedWindPage />
      </main>
    </div>
  )
}
