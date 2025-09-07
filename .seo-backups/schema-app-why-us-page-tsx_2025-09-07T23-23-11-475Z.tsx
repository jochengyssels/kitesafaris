import { Navigation } from "@/components/navigation"
import { WhyUsHero } from "@/components/why-us-hero"
import { CrewBios } from "@/components/crew-bios"

export const metadata = {
  title: "undefined",
  description:
    "Discover why KiteSafaris.com is the premier choice for luxury kiteboarding adventures. Safety certified, experienced crew, and eco-friendly practices.",
  alternates: {
    canonical: "https://www.kitesafaris.com/why-us"
  },
}

export default function WhyUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <CrewBios />
      <WhyUsHero />
    
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
