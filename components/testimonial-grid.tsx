"use client"

import { useState } from "react"
import { Star, Play, Quote } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  quote: string
  fullReview: string
  avatar: string
  destination: string
  isVideo?: boolean
  videoThumbnail?: string
  date: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "California, USA",
    rating: 5,
    quote: "The Antigua kitesafari was absolutely incredible! Perfect trade winds and amazing crew.",
    fullReview:
      "The 7-day catamaran experience in Antigua exceeded all expectations. Launching kites directly from the boat was amazing, and the crew's knowledge of local spots like Hansons Bay and Nonsuch Bay made all the difference. The small group of 6 people created such a personal experience.",
    avatar: "/smiling-woman-portrait.png",
    destination: "Antigua & Barbuda",
    date: "March 2024",
  },
  {
    id: "2",
    name: "Marco Rossi",
    location: "Milan, Italy",
    rating: 5,
    quote: "Can't wait for the Greece kitesafari to launch! Sardinia looks amazing too.",
    fullReview:
      "I've been following KiteSafaris for a while and did their Antigua trip. Now I'm eagerly waiting for their Greece and Sardinia offerings. The professionalism and attention to detail in the Caribbean gives me complete confidence in their upcoming destinations.",
    avatar: "/asian-man-portrait.png",
    destination: "Antigua & Barbuda",
    isVideo: true,
    videoThumbnail: "/kiteboarding-video-thumbnail.png",
    date: "February 2024",
  },
  {
    id: "3",
    name: "Emma Thompson",
    location: "London, UK",
    rating: 5,
    quote: "The rescue boat support and IKO certified instructors made me feel completely safe.",
    fullReview:
      "As a beginner, I was nervous about kitesurfing from a boat, but the professional crew and constant rescue boat assistance gave me confidence. Learning to launch from the catamaran opened up so many remote spots we never could have reached from shore.",
    avatar: "/spanish-woman-portrait.png",
    destination: "Antigua & Barbuda",
    date: "January 2024",
  },
  {
    id: "4",
    name: "Alex Chen",
    location: "Vancouver, Canada",
    rating: 5,
    quote: "The €1,900 price for 7 days all-inclusive was incredible value for this level of experience.",
    fullReview:
      "Everything was included - accommodation, meals, instruction, rescue support. The catamaran was luxurious and the spots like Great Bird Island and Barbuda were absolutely pristine. Worth every euro and more!",
    avatar: "/british-man-portrait.png",
    destination: "Antigua & Barbuda",
    date: "December 2023",
  },
  {
    id: "5",
    name: "Lisa Martinez",
    location: "Miami, USA",
    rating: 5,
    quote: "Already booked for next season! The Caribbean trade winds were perfect.",
    fullReview:
      "The consistency of the trade winds in Antigua during winter season is unmatched. Every day we had 15-25 knots, and the crew knew exactly where to position us for the best conditions. The small group size meant personalized attention throughout.",
    avatar: "/australian-woman-portrait.png",
    destination: "Antigua & Barbuda",
    isVideo: true,
    videoThumbnail: "/yacht-sunset-video.png",
    date: "April 2024",
  },
  {
    id: "6",
    name: "David Wilson",
    location: "Sydney, Australia",
    rating: 5,
    quote: "The remote spots accessible only by catamaran were absolutely magical.",
    fullReview:
      "Places like Codrington Lagoon and the protected bays around Barbuda - you simply can't reach these by land. The shallow turquoise waters and zero crowds made for the most epic kiting sessions of my life. Professional operation from start to finish.",
    avatar: "/korean-man-portrait.png",
    destination: "Antigua & Barbuda",
    date: "March 2024",
  },
]

export function TestimonialGrid() {
  const [expandedReview, setExpandedReview] = useState<string | null>(null)

  return (
    <section className="py-16 px-4 bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Caribbean Kite Safari Antigua",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: (testimonials?.length ?? 0).toString(),
              bestRating: "5",
              worstRating: "1",
            },
            review: testimonials.map((testimonial) => ({
              "@type": "Review",
              author: {
                "@type": "Person",
                name: testimonial.name,
              },
              reviewRating: {
                "@type": "Rating",
                ratingValue: (testimonial.rating ?? 5).toString(),
                bestRating: "5",
                worstRating: "1",
              },
              reviewBody: testimonial.fullReview,
              datePublished: new Date(testimonial.date).toISOString().split("T")[0],
            })),
          }),
        }}
      />

      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-deep-navy mb-4">
            Caribbean Kite Safari Reviews - What Our Guests Say
          </h2>
          <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Real reviews from guests who've experienced our luxury catamaran kitesafaris in Antigua, Caribbean. 5-star
            rated adventures with perfect safety record.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-sand-beige rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Video thumbnail for video reviews */}
              {testimonial.isVideo && testimonial.videoThumbnail && (
                <div className="relative mb-4 rounded-xl overflow-hidden group cursor-pointer">
                  <Image
                    src={testimonial.videoThumbnail || "/placeholder.svg"}
                    alt={`Video review by ${testimonial.name}`}
                    width={400}
                    height={200}
                    className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <div className="bg-coral-orange rounded-full p-3">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                </div>
              )}

              {/* Header with avatar and info */}
              <div className="flex items-start gap-4 mb-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={`${testimonial.name} profile photo`}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-montserrat font-semibold text-deep-navy">{testimonial.name}</h3>
                  <p className="font-open-sans text-sm text-gray-600">{testimonial.location}</p>
                  <p className="font-open-sans text-sm text-turquoise font-medium">{testimonial.destination}</p>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating ?? 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-coral-orange text-coral-orange" />
                ))}
                <span className="font-open-sans text-sm text-gray-500 ml-2">{testimonial.date}</span>
              </div>

              {/* Quote */}
              <div className="relative mb-4">
                <Quote className="w-6 h-6 text-coral-orange/30 absolute -top-2 -left-1" />
                <p className="font-open-sans text-gray-700 italic pl-4">"{testimonial.quote}"</p>
              </div>

              {/* Expandable full review */}
              {expandedReview === testimonial.id && (
                <div className="mb-4 p-4 bg-white/50 rounded-lg">
                  <p className="font-open-sans text-gray-700 text-sm leading-relaxed">{testimonial.fullReview}</p>
                </div>
              )}

              {/* Read more/less button */}
              <button
                onClick={() => setExpandedReview(expandedReview === testimonial.id ? null : testimonial.id)}
                className="font-open-sans text-sm text-coral-orange hover:text-coral-orange/80 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-coral-orange/20 rounded"
                aria-expanded={expandedReview === testimonial.id}
                aria-controls={`review-${testimonial.id}`}
              >
                {expandedReview === testimonial.id ? "Read Less" : "Read Full Review"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
