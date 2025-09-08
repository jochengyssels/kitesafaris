"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Search, ChevronDown, ChevronUp, ExternalLink, MessageCircle, FileText, Calendar } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  links?: {
    text: string
    href: string
    type: "internal" | "external" | "whatsapp"
  }[]
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What destinations do you offer and when?",
    answer:
      "We operate in three destinations: Caribbean (Antigua & Barbuda) during winter season Dec-Apr, Greece (Aegean Islands) during summer season Jun-Sep, and Sardinia (Punta Trettu) year-round. Each destination is chosen for consistent 15-25 knot trade winds and optimal kitesurfing conditions.",
    category: "Destinations",
    links: [
      { text: "View All Destinations", href: "/destinations", type: "internal" },
      { text: "Seasonal Calendar", href: "/destinations", type: "internal" },
    ],
  },
  {
    id: "2",
    question: "How much does an Antigua kitesafari cost?",
    answer:
      "Our 7-day luxury catamaran kitesafari in Antigua & Barbuda costs €1,900 per person (discounted from €2,100). This includes catamaran accommodation, all meals, professional IKO certified instructor, rescue boat assistance, and access to remote kite spots. Limited to 6 spots maximum.",
    category: "Pricing",
    links: [
      { text: "Book Antigua Safari", href: "/packages", type: "internal" },
      { text: "Pricing Calculator", href: "/packages#booking", type: "internal" },
    ],
  },
  {
    id: "3",
    question: "What's included in your kitesafari packages?",
    answer:
      "All packages include 7-day luxury catamaran accommodation, professional IKO certified instructor, all meals and snacks, rescue boat surveillance, launch kites directly from the boat, snorkeling gear, yacht fuel, safety equipment, and access to remote spots unreachable by land. Equipment rental available separately.",
    category: "Packages",
    links: [
      { text: "Package Details", href: "/packages", type: "internal" },
      { text: "Equipment Options", href: "/packages", type: "internal" },
    ],
  },
  {
    id: "4",
    question: "How many people are in each group?",
    answer:
      "We limit each kitesafari to maximum 6 people to ensure personalized attention, safety, and an intimate experience. This small group size allows our professional instructors to provide hands-on assistance and adapt to everyone's skill level.",
    category: "Experience",
    links: [
      { text: "Why Small Groups", href: "/why-us", type: "internal" },
      { text: "Meet Our Instructors", href: "/why-us", type: "internal" },
    ],
  },
  {
    id: "5",
    question: "Do you provide kite equipment and instruction?",
    answer:
      "Yes, we offer complete equipment packages and professional instruction. Our IKO certified instructors provide hands-on assistance and teach you to launch kites directly from the boat. Equipment rental and private coaching sessions are available as add-ons to your package.",
    category: "Equipment",
    links: [
      { text: "Equipment Packages", href: "/packages", type: "internal" },
      { text: "Instructor Qualifications", href: "/why-us", type: "internal" },
    ],
  },
  {
    id: "6",
    question: "What skill level do I need for kiteboarding?",
    answer:
      "All levels welcome! We cater to complete beginners with comprehensive instruction, intermediate riders looking to progress, and advanced kiters seeking challenging conditions. Our experienced crew adapts each day to match group skill levels and provides rescue boat assistance.",
    category: "Experience",
    links: [
      { text: "Skill Requirements", href: "/destinations", type: "internal" },
      { text: "Safety Support", href: "/why-us", type: "internal" },
    ],
  },
  {
    id: "7",
    question: "What about Greece and Sardinia kitesafaris?",
    answer:
      "Greece (Aegean Islands) and Sardinia (Punta Trettu) kitesafaris are coming soon! Greece offers consistent meltemi winds and pristine islands during summer, while Sardinia is our home base with year-round conditions. Contact us for updates and early booking opportunities.",
    category: "Destinations",
    links: [
      { text: "Greece Details", href: "/destinations/greece", type: "internal" },
      { text: "Sardinia Details", href: "/destinations/sardinia", type: "internal" },
      { text: "Contact for Updates", href: "https://wa.me/32492576427", type: "whatsapp" },
    ],
  },
  {
    id: "8",
    question: "How do I book and what's the payment schedule?",
    answer:
      "Booking is simple through our website or WhatsApp. Payment schedule: 10% deposit secures your booking, additional 40% due within 30 days, final 50% due 60 days before departure. We accept major credit cards and bank transfers.",
    category: "Booking",
    links: [
      { text: "Book Now", href: "/booking", type: "internal" },
      { text: "Payment Terms", href: "/terms", type: "internal" },
      { text: "WhatsApp Booking", href: "https://wa.me/32492576427", type: "whatsapp" },
    ],
  },
  {
    id: "9",
    question: "What safety measures do you have in place?",
    answer:
      "Safety is our top priority. We provide dedicated rescue boat assistance, professional IKO certified instructors, comprehensive safety briefings, quality safety equipment, and experienced crew. We launch kites from the boat and provide constant surveillance while you're on the water.",
    category: "Safety",
    links: [
      { text: "Safety Protocols", href: "/why-us", type: "internal" },
      { text: "Meet Our Crew", href: "/why-us", type: "internal" },
    ],
  },
  {
    id: "10",
    question: "Can I contact you directly for questions?",
    answer:
      "We're available via WhatsApp at +32 492 57 64 27 and email at info@kitesafaris.com. Our team responds during daylight hours and we're happy to help you plan the perfect kite safari adventure.",
    category: "Contact",
    links: [
      { text: "WhatsApp Us", href: "https://wa.me/32492576427", type: "whatsapp" },
      { text: "Contact Page", href: "/contact", type: "internal" },
    ],
  },
]

const categories = [
  "All",
  "Destinations",
  "Pricing",
  "Packages",
  "Experience",
  "Equipment",
  "Booking",
  "Safety",
  "Contact",
]

export function SearchableFAQ() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggleExpanded(id)
    }
  }

  const renderLink = (link: NonNullable<FAQItem["links"]>[0]) => {
    const iconMap = {
      internal: <ExternalLink className="w-4 h-4" />,
      external: <ExternalLink className="w-4 h-4" />,
      whatsapp: <MessageCircle className="w-4 h-4" />,
    }

    const baseClasses =
      "inline-flex items-center gap-2 text-turquoise hover:text-turquoise-dark transition-colors duration-200 font-medium"

    if (link.type === "whatsapp") {
      return (
        <a key={link.text} href={link.href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
          {iconMap[link.type]}
          {link.text}
        </a>
      )
    }

    return (
      <a key={link.text} href={link.href} className={baseClasses}>
        {iconMap[link.type]}
        {link.text}
      </a>
    )
  }

  return (
    <div className="space-y-8">

      {/* Search and Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Caribbean kite safari questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent outline-none font-body"
            aria-label="Search FAQ about Caribbean kite safaris"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category ? "bg-navy text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-body">No FAQs found matching your search.</p>
          </div>
        ) : (
          filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-sand-beige rounded-lg border border-gray-200 overflow-hidden transition-shadow duration-200 hover:shadow-md"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleExpanded(faq.id)}
                onKeyDown={(e) => handleKeyDown(e, faq.id)}
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-turquoise focus:ring-inset"
                aria-expanded={expandedItems.has(faq.id)}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {/* Gold accent bar */}
                    <div className="w-12 h-1 bg-gold mb-3"></div>
                    <h3 className="text-lg font-bold text-navy font-sans pr-4">{faq.question}</h3>
                    <span className="inline-block mt-2 px-3 py-1 bg-turquoise/10 text-turquoise text-xs font-medium rounded-full">
                      {faq.category}
                    </span>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {expandedItems.has(faq.id) ? (
                      <ChevronUp className="w-5 h-5 text-navy" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-navy" />
                    )}
                  </div>
                </div>
              </button>

              {/* Answer Content */}
              <div
                id={`faq-answer-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedItems.has(faq.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 font-body leading-relaxed mb-4">{faq.answer}</p>

                    {/* Related Links */}
                    {faq.links && faq.links.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-navy font-sans">Related Resources:</h4>
                        <div className="flex flex-wrap gap-4">{faq.links.map(renderLink)}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Contact Support CTA */}
      <div className="bg-navy/5 rounded-lg p-6 text-center">
        <h3 className="text-lg font-bold text-navy font-sans mb-2">Still have questions?</h3>
        <p className="text-gray-600 font-body mb-4">
          Our team is available during daylight hours to help you plan the perfect kite safari adventure.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/32492576427"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-coral-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors duration-200"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Support
          </a>
          <a
            href="/booking"
            className="inline-flex items-center justify-center gap-2 bg-turquoise text-white px-6 py-3 rounded-lg font-semibold hover:bg-turquoise/90 transition-colors duration-200"
          >
            <Calendar className="w-5 h-5" />
            Book Consultation
          </a>
        </div>
      </div>
    </div>
  )
}
