import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { ExpertGuidesPage } from "@/components/expert-guides-page"

export const metadata: Metadata = {
  title: "Expert Kite Instructors & Guides | KiteSafaris.com",
  description:
    "Meet our world-class kite instructors with IKO certifications, safety expertise, and local knowledge. Your safety and progress guaranteed.",
  keywords:
    "IKO certified kite instructors, professional kiteboarding guides, kite safari instructors, Caribbean kite teachers, expert kiteboarding coaches",
  alternates: {
    canonical: "https://kitesafaris.com/expert-guides",
  },
  openGraph: {
    title: "Expert Kite Instructors & Guides | KiteSafaris.com",
    description:
      "Meet our world-class kite instructors with IKO certifications, safety expertise, and local knowledge. Your safety and progress guaranteed.",
    url: "https://kitesafaris.com/expert-guides",
    siteName: "KiteSafaris.com",
    images: [
      {
        url: "https://kitesafaris.com/professional-kiteboarding-instructor-teaching-on-t.png",
        width: 1200,
        height: 630,
        alt: "Professional IKO certified kiteboarding instructor providing guidance in Antigua",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Kite Instructors & Guides | KiteSafaris.com",
    description:
      "Meet our world-class kite instructors with IKO certifications, safety expertise, and local knowledge.",
    images: ["https://kitesafaris.com/professional-kiteboarding-instructor-teaching-on-t.png"],
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

export default function ExpertGuides() {
  return (
    <div className="min-h-screen bg-sand-beige">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Expert Kite Instructors & Guides",
            description:
              "World-class kite instructors with IKO certifications, safety expertise, and local knowledge providing professional kiteboarding instruction.",
            provider: {
              "@type": "Organization",
              name: "KiteSafaris.com",
              url: "https://kitesafaris.com",
              logo: "https://kitesafaris.com/logo.png",
            },
            serviceType: "Professional Kiteboarding Instruction",
            areaServed: {
              "@type": "Place",
              name: "Caribbean",
            },
            hasCredential: [
              {
                "@type": "EducationalOccupationalCredential",
                name: "IKO Certification",
                credentialCategory: "Professional Certification",
              },
              {
                "@type": "EducationalOccupationalCredential",
                name: "First Aid Certification",
                credentialCategory: "Safety Certification",
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "127",
            },
            url: "https://kitesafaris.com/expert-guides",
          }),
        }}
      />
      <ExpertGuidesPage />
    </div>
  )
}
