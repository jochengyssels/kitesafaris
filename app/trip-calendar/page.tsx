import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { TripCalendarView } from "@/components/trip-calendar-view"

export const metadata: Metadata = {
  title: "Kite Safari Trip Calendar | Caribbean Kiteboarding | KiteSafaris",
  description:
    "Browse all upcoming kiteboarding safaris in our interactive calendar. Filter by destination, see real-time availability, and book your next adventure.",
  keywords: "trip calendar, kiteboarding safaris, availability, booking, destinations, antigua, sardinia, greece",
  alternates: {
    canonical: "https://www.kitesafaris.com/trip-calendar",
  },
  openGraph: {
    title: "Kite Safari Trip Calendar | Caribbean Kiteboarding",
    description: "Browse all upcoming kiteboarding safaris in our interactive calendar. Filter by destination and see real-time availability.",
    images: ["/trip-calendar-hero.jpg"],
  },
}

export default function TripCalendarPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <TripCalendarView />
      
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

</main>
    </>
  )
}
