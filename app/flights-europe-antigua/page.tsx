import type { Metadata } from "next"
import Navigation from "@/components/navigation"
import FlightOptionsPage from "@/components/flight-options-page"

export const metadata: Metadata = {
  title: "Top 10 Flights from Europe to Antigua (High Season Dec–Apr) | KiteSafaris",
  description:
    "Discover the best flight options from Europe to Antigua during high season. Direct and one-stop routes under 14 hours, with airlines, schedules, and pricing for your kite safari adventure.",
  keywords:
    "flights to Antigua, Europe to Antigua flights, British Airways Antigua, Virgin Atlantic, Condor Frankfurt, kite safari flights",
}

export default function FlightsEuropeAntiguaPage() {
  return (
    <main>
      <Navigation />
      <FlightOptionsPage />
    </main>
  )
}
