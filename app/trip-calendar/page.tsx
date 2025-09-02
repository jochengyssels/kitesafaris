import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { TripCalendarView } from "@/components/trip-calendar-view"

export const metadata: Metadata = {
  title: "Trip Calendar - Upcoming KiteSafaris Adventures | KiteSafaris.com",
  description:
    "Browse all upcoming kiteboarding safaris in our interactive calendar. Filter by destination, see real-time availability, and book your next adventure.",
  keywords: "trip calendar, kiteboarding safaris, availability, booking, destinations, antigua, sardinia, greece",
  openGraph: {
    title: "Trip Calendar - Upcoming KiteSafaris Adventures",
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
      </main>
    </>
  )
}
