"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: number
  quote: string
  author: string
  location: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Waking up on a catamaran, kiting in crystal-clear lagoons, and laughing with strangers who became family — this trip was magic. I came for the wind, but I left with so much more.",
    author: "Flavia",
    location: "Switzerland",
    rating: 4.5,
    image: "/images/reviews/flavia.JPG",
  },
  {
    id: 2,
    quote: "Even though I've never been to the Caribbean, I felt the energy from day one. What started as an idea between four of us quickly turned into something real — a shared vision, a deep connection, and a feeling of belonging. That's the power of this journey.",
    author: "Michele Sabiu",
    location: "Italy",
    rating: 5,
    image: "/images/reviews/michele.JPG",
  },
  {
    id: 3,
    quote: "From the coaching to the anchor spots, every day felt perfectly planned yet totally spontaneous. The crew was professional, the vibe was pure joy, and launching from the boat? Wild.",
    author: "Soa Mira",
    location: "Switzerland",
    rating: 5,
    image: "/images/reviews/soa.jpg",
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="bg-sand-beige rounded-lg p-6 max-w-2xl mx-auto relative">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevTestimonial}
          className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-coral-orange"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-navy" />
        </button>

        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < currentTestimonial.rating ? "text-coral-orange fill-coral-orange" : "text-gray-300"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        <button
          onClick={nextTestimonial}
          className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-coral-orange"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-navy" />
        </button>
      </div>

      <blockquote className="text-center">
        <p className="text-navy font-open-sans text-lg mb-4 leading-relaxed">"{currentTestimonial.quote}"</p>
        <footer className="flex items-center justify-center space-x-4">
          <Image
            src={currentTestimonial.image || "/placeholder.svg"}
            alt={`Portrait of ${currentTestimonial.author}, satisfied Caribbean kite safari guest`}
            width={48}
            height={48}
            className="rounded-full object-cover"
            loading="lazy"
          />
          <div className="text-left">
            <cite className="font-montserrat font-semibold text-navy not-italic">{currentTestimonial.author}</cite>
            <p className="text-sm text-gray-600 font-open-sans">{currentTestimonial.location}</p>
          </div>
        </footer>
      </blockquote>

      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-coral-orange ${
              index === currentIndex ? "bg-coral-orange" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
