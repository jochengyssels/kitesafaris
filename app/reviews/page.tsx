import { Navigation } from "@/components/navigation"
import { ReviewsHero } from "@/components/reviews-hero"
import { TestimonialGrid } from "@/components/testimonial-grid"
import { ShareStorySection } from "@/components/share-story-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reviews & Testimonials | KiteSafaris.com",
  description:
    "Read authentic reviews and testimonials from our kiteboarding safari guests. See why travelers choose KiteSafaris for unforgettable adventures.",
}

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <ReviewsHero />
        <TestimonialGrid />
        <ShareStorySection />
      </main>
    </div>
  )
}
