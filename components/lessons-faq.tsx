"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    question: "How many kitesurfing lessons do I need to learn?",
    answer: "Most beginners can achieve basic kite control and water starts within 3-5 days of lessons. Independent riding typically takes 5-7 days. The flat-water conditions at our destinations accelerate the learning process significantly compared to choppy ocean conditions.",
    category: "Learning Process"
  },
  {
    question: "What is the best age to start kitesurfing lessons?",
    answer: "Kitesurfing lessons are suitable for ages 12 and up, with no upper age limit. Children under 16 require parental consent. Our instructors adapt teaching methods for different age groups, ensuring safety and effective learning for all students.",
    category: "Requirements"
  },
  {
    question: "Do I need to know how to swim for kitesurfing lessons?",
    answer: "Yes, basic swimming ability is required for kitesurfing lessons. You should be comfortable in water and able to swim at least 50 meters. All lessons include safety equipment like impact vests and helmets, and rescue boat support is always available.",
    category: "Requirements"
  },
  {
    question: "What equipment is included in kitesurfing lessons?",
    answer: "All necessary kitesurfing equipment is included: kites, boards, harnesses, wetsuits, helmets, and safety gear. We use modern, well-maintained equipment suitable for all skill levels and conditions. No need to invest in equipment before you know what works for you.",
    category: "Equipment"
  },
  {
    question: "Are kitesurfing lessons safe for beginners?",
    answer: "Yes, kitesurfing lessons are very safe when taught by IKO certified instructors. We use shallow water areas, provide comprehensive safety briefings, rescue boat support, and radio communication systems. Our safety record is 100% with proper instruction and equipment.",
    category: "Safety"
  },
  {
    question: "What's the difference between group and private kitesurfing lessons?",
    answer: "Group lessons (4-6 students) are cost-effective and great for social learning. Private lessons (1:1) offer personalized attention and faster progression. Semi-private lessons (2:1) provide a balance of personalized instruction and social interaction.",
    category: "Lesson Types"
  },
  {
    question: "Can I learn kitesurfing if I'm not very athletic?",
    answer: "Absolutely! Kitesurfing is more about technique and understanding wind than physical strength. Our instructors work with students of all fitness levels, adapting teaching methods to individual capabilities. Many students find kitesurfing easier than they expected.",
    category: "Requirements"
  },
  {
    question: "What weather conditions are needed for kitesurfing lessons?",
    answer: "We need consistent wind of 12-25 knots for safe learning conditions. Our destinations are chosen for reliable wind patterns: Antigua's trade winds, Sardinia's Mistral, and Greece's Meltemi. Lessons are rescheduled if conditions are unsafe.",
    category: "Weather"
  },
  {
    question: "How much do kitesurfing lessons cost?",
    answer: "Lesson prices vary by destination and type: Group lessons €50-80/hour, Semi-private €80-120/hour, Private instruction €100-150/hour. Complete packages (6-9 hours) range from €360-530. Caribbean destinations have premium pricing due to consistent conditions.",
    category: "Pricing"
  },
  {
    question: "What should I bring to my first kitesurfing lesson?",
    answer: "Bring swimwear, sunscreen, a towel, and a positive attitude! We provide all kitesurfing equipment. For early/late season lessons, bring a light jacket for before and after sessions. Water and snacks are recommended for longer sessions.",
    category: "Preparation"
  },
  {
    question: "How long is each kitesurfing lesson session?",
    answer: "Standard lesson sessions are 2-3 hours, which is optimal for learning without fatigue. Private coaching can be customized from 1-4 hours. Complete courses typically include 6-9 hours of instruction spread over 3-5 days.",
    category: "Lesson Structure"
  },
  {
    question: "Can I get IKO certification through your lessons?",
    answer: "Yes! All our partner schools offer IKO certification programs. You'll progress through IKO levels (1-4) with official certification at each stage. This certification is recognized worldwide and allows you to rent equipment and take advanced lessons anywhere.",
    category: "Certification"
  },
  {
    question: "What happens if the weather is bad during my lesson?",
    answer: "Safety is our priority. If conditions are unsafe (too much wind, storms, or no wind), lessons are rescheduled at no extra cost. We monitor weather forecasts and have flexible scheduling to ensure you get the best learning conditions.",
    category: "Weather"
  },
  {
    question: "Are kitesurfing lessons available year-round?",
    answer: "Yes, but availability varies by destination. Sardinia (Punta Trettu) offers year-round lessons. Antigua operates December-April, and Greece operates June-September. Each destination is chosen for optimal wind conditions during its season.",
    category: "Availability"
  },
  {
    question: "Can I take kitesurfing lessons as a complete beginner?",
    answer: "Absolutely! Our lessons are designed for complete beginners with no prior experience. We start with beach theory, kite control, and safety protocols before moving to water. Many of our students have never tried any water sport before.",
    category: "Learning Process"
  },
  {
    question: "What's included in a complete kitesurfing course package?",
    answer: "Complete courses include 6-9 hours of instruction, equipment rental, accommodation (in some packages), meals, safety gear, and IKO certification. Some packages also include photography services and cultural activities. Everything you need for a complete learning experience.",
    category: "Packages"
  }
]

export default function LessonsFAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const categories = ["All", ...Array.from(new Set(faqData.map(item => item.category)))]

  const filteredFAQs = activeCategory === "All" 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory)

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-12 text-center">
            Frequently Asked Questions About Kitesurfing Lessons
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === category
                    ? "bg-coral-orange text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-deep-navy pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        openItems.has(index) ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                {openItems.has(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-deep-navy mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our kitesurfing experts are here to help you plan the perfect learning experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-coral-orange hover:bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Contact Our Experts
                </a>
                <a
                  href="/booking"
                  className="bg-white border-2 border-coral-orange text-coral-orange hover:bg-coral-orange hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Book Your Lesson
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
