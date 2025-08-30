import { Navigation } from "@/components/navigation"
import { GuaranteedWindPage } from "@/components/guaranteed-wind-page"
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
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Guaranteed Wind Conditions",
            description:
              "Wind guarantee policy ensuring consistent 15-25 knot conditions during peak seasons. Backup activities and alternative arrangements when conditions don't meet standards.",
            provider: {
              "@type": "Organization",
              name: "KiteSafaris.com",
              url: "https://kitesafaris.com",
              logo: "https://kitesafaris.com/logo.png",
            },
            serviceType: "Weather Guarantee",
            category: "Kiteboarding Services",
            hasPolicy: {
              "@type": "Policy",
              name: "Wind Guarantee Policy",
              description: "Guaranteed wind conditions or alternative arrangements provided",
            },
            areaServed: [
              {
                "@type": "Place",
                name: "Caribbean",
              },
              {
                "@type": "Place",
                name: "Greece",
              },
              {
                "@type": "Place",
                name: "Sardinia",
              },
            ],
            url: "https://kitesafaris.com/guaranteed-wind",
          }),
        }}
      />
      <main className="pt-20">
        <GuaranteedWindPage />
      </main>
    </div>
  )
}
