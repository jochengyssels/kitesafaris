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
    quote: "An absolutely incredible experience! The crew was professional and the locations were breathtaking.",
    author: "Sarah Johnson",
    location: "Antigua & Barbuda",
    rating: 5,
    image: "/smiling-woman-portrait.png",
  },
  {
    id: 2,
    quote: "Perfect wind conditions and luxury accommodations. Exceeded all expectations!",
    author: "Marcus Chen",
    location: "Antigua & Barbuda",
    rating: 5,
    image: "/asian-man-portrait.png",
  },
  {
    id: 3,
    quote: "The best kiteboarding adventure I've ever had. Professional guides and amazing spots.",
    author: "Elena Rodriguez",
    location: "Antigua & Barbuda",
    rating: 5,
    image: "/spanish-woman-portrait.png",
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
