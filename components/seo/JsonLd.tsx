import React from 'react'

interface JsonLdProps {
  data: Record<string, any>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Organization schema for KiteSafaris
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KiteSafaris",
  "description": "Premium kitesurfing safaris in the Caribbean and Mediterranean. Expert-guided catamaran trips with guaranteed wind conditions.",
  "url": "https://www.kitesafaris.com",
  "logo": "https://www.kitesafaris.com/images/logo.png",
  "foundingDate": "2020",
  "founder": {
    "@type": "Person",
    "name": "KiteSafaris Team"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Antigua and Barbuda",
    "addressRegion": "Caribbean"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "info@kitesafaris.com",
    "availableLanguage": ["English", "Italian", "French"]
  },
  "sameAs": [
    "https://www.instagram.com/kitesafaris",
    "https://www.facebook.com/kitesafaris"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 17.0608,
      "longitude": -61.7964
    },
    "geoRadius": "2000000"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Kitesurfing Safari Packages",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "7-Day Caribbean Kitesurf Safari",
          "description": "All-inclusive kitesurfing adventure with expert crew"
        }
      }
    ]
  }
}

// WebSite schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "KiteSafaris",
  "url": "https://www.kitesafaris.com",
  "description": "Premium kitesurfing safaris in the Caribbean and Mediterranean",
  "publisher": {
    "@type": "Organization",
    "name": "KiteSafaris",
    "url": "https://www.kitesafaris.com"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.kitesafaris.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

// Review schema generator
export function generateReviewSchema(reviews: Array<{
  author: string
  text: string
  rating: number
  date?: string
  trip?: string
}>) {
  const reviewItems = reviews.map((review, index) => ({
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewBody": review.text,
    "datePublished": review.date || new Date().toISOString(),
    "itemReviewed": {
      "@type": "Service",
      "name": review.trip || "KiteSafaris Kitesurfing Safari",
      "description": "Premium kitesurfing safari experience"
    }
  }))

  // Calculate aggregate rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = totalRating / reviews.length
  const reviewCount = reviews.length

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "KiteSafaris Kitesurfing Safaris",
    "description": "Premium kitesurfing safaris in the Caribbean and Mediterranean",
    "provider": {
      "@type": "Organization",
      "name": "KiteSafaris",
      "url": "https://www.kitesafaris.com"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": Math.round(averageRating * 10) / 10,
      "reviewCount": reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": reviewItems
  }
}

// LocalBusiness schema for specific destinations
export function generateLocalBusinessSchema(destination: {
  name: string
  description: string
  coordinates: { lat: number; lng: number }
  address?: string
  phone?: string
  website?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `KiteSafaris - ${destination.name}`,
    "description": destination.description,
    "url": destination.website || "https://www.kitesafaris.com",
    "telephone": destination.phone,
    "address": destination.address ? {
      "@type": "PostalAddress",
      "streetAddress": destination.address
    } : undefined,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": destination.coordinates.lat,
      "longitude": destination.coordinates.lng
    },
    "openingHours": "Mo-Su 08:00-18:00",
    "priceRange": "€€€",
    "currenciesAccepted": "EUR, USD",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer"
  }
}

// FAQ schema generator
export function generateFAQSchema(faqs: Array<{
  question: string
  answer: string
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}
