import { Navigation } from "@/components/navigation"
import { ReviewsHero } from "@/components/reviews-hero"
import { TestimonialGrid } from "@/components/testimonial-grid"
import { ShareStorySection } from "@/components/share-story-section"
import { JsonLd, generateReviewSchema } from "@/components/seo/JsonLd"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kite Safari Reviews | Kitesurfing Testimonials | KiteSafaris.com",
  description:
    "Read authentic kite safari reviews and kitesurfing testimonials from our guests. Discover why travelers choose KiteSafaris for unforgettable adventures!",
  alternates: {
    canonical: "https://www.kitesafaris.com/reviews"
  },
}

export default function ReviewsPage() {
  // Real testimonials data for schema
  const reviews = [
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

  const reviewSchema = generateReviewSchema(reviews)

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={reviewSchema} />
      <Navigation />
      <main>
        <ReviewsHero />
        <TestimonialGrid />
        <ShareStorySection />
      </main>
    </div>
  )
}
