import { Navigation } from "@/components/navigation"
import { WhyUsHero } from "@/components/why-us-hero"
import { CrewBios } from "@/components/crew-bios"

export const metadata = {
  title: "Why Choose KiteSafaris.com - Expert Crew & Eco-Friendly Adventures",
  description:
    "Discover why KiteSafaris.com is the premier choice for luxury kiteboarding adventures. Safety certified, experienced crew, and eco-friendly practices.",
}

export default function WhyUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <CrewBios />
      <WhyUsHero />
    </div>
  )
}
