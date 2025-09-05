import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SardiniaPartnerSchools } from "@/components/sardinia-partner-schools"
import Link from "next/link"
import { BookOpen, Users, Shield, Clock, Star, CheckCircle, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Beginner's Guide to Kitesurfing in Sardinia | Learn Kitesurfing at Punta Trettu - KiteSafaris",
  description: "Complete beginner's guide to kitesurfing in Sardinia. Learn everything about starting your kitesurfing journey at Punta Trettu with professional instruction and safe conditions.",
  keywords: [
    "beginner kitesurfing Sardinia",
    "learn kitesurfing Sardinia",
    "kitesurfing beginner guide",
    "how to learn kitesurfing",
    "beginner kitesurfing Punta Trettu",
    "kitesurfing lessons beginner",
    "first time kitesurfing",
    "kitesurfing for beginners",
    "learn to kitesurf Sardinia",
    "beginner kitesurfing tips"
  ].join(", "),
  openGraph: {
    title: "Beginner's Guide to Kitesurfing in Sardinia | Learn at Punta Trettu",
    description: "Complete beginner's guide to kitesurfing in Sardinia. Learn everything about starting your kitesurfing journey at Punta Trettu with professional instruction.",
    images: [
      {
        url: "https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
        width: 1200,
        height: 630,
        alt: "Beginner kitesurfing Sardinia Punta Trettu learning guide",
      },
    ],
  },
  twitter: {
    title: "Beginner's Guide to Kitesurfing in Sardinia | Learn at Punta Trettu",
    description: "Complete beginner's guide to kitesurfing in Sardinia. Learn everything about starting your kitesurfing journey at Punta Trettu.",
    images: ["https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"],
  },
  alternates: {
    canonical: "https://kitesafaris.com/destinations/sardinia/beginner-guide",
  },
}

const learningSteps = [
  {
    step: 1,
    title: "Kite Control & Safety",
    duration: "2-3 hours",
    description: "Learn basic kite control, safety procedures, and wind window theory. Practice on land before entering the water.",
    skills: ["Kite setup and safety checks", "Wind window understanding", "Basic kite control", "Emergency procedures"]
  },
  {
    step: 2,
    title: "Body Dragging",
    duration: "1-2 hours",
    description: "Practice being pulled through the water by the kite without a board. Essential for water safety and board recovery.",
    skills: ["Upwind body dragging", "Downwind body dragging", "Kite relaunch from water", "Self-rescue techniques"]
  },
  {
    step: 3,
    title: "Water Start",
    duration: "2-4 hours",
    description: "Learn to get up on the board and start riding. This is where the magic happens!",
    skills: ["Board positioning", "Water start technique", "First rides", "Balance and control"]
  },
  {
    step: 4,
    title: "Riding & Progression",
    duration: "3-5 hours",
    description: "Develop riding skills, learn to go upwind, and practice basic maneuvers.",
    skills: ["Riding upwind", "Turning and transitions", "Speed control", "Basic tricks"]
  }
]

const faqData = [
  {
    question: "How long does it take to learn kitesurfing?",
    answer: "Most beginners can get up and riding after 6-12 hours of instruction, typically spread over 2-3 days. However, becoming proficient and comfortable takes 20-40 hours of practice. The flat water conditions at Punta Trettu significantly accelerate the learning process compared to wave conditions."
  },
  {
    question: "Is kitesurfing dangerous for beginners?",
    answer: "Kitesurfing can be safe for beginners when proper instruction and safety protocols are followed. At Punta Trettu, the shallow flat water eliminates many risks associated with deep water or waves. Professional instructors use modern safety equipment and teach essential safety procedures from day one."
  },
  {
    question: "What should I wear for my first kitesurfing lesson?",
    answer: "Wear comfortable swimwear and bring a wetsuit if you have one (or rent one from the school). The schools provide all necessary safety equipment including helmets, impact vests, and harnesses. Don't forget sunscreen, sunglasses, and a hat for sun protection."
  },
  {
    question: "Do I need to be a strong swimmer to learn kitesurfing?",
    answer: "Basic swimming skills are helpful, but you don't need to be an Olympic swimmer. The shallow water at Punta Trettu means you can always stand up if needed. However, you should be comfortable in water and able to swim short distances if necessary."
  },
  {
    question: "What's the best age to start learning kitesurfing?",
    answer: "Kitesurfing can be learned at any age, but most schools recommend starting at age 12 or older due to the physical demands and safety considerations. Adults of all ages successfully learn kitesurfing, and the flat water conditions at Punta Trettu make it accessible for older beginners."
  },
  {
    question: "How much does it cost to learn kitesurfing in Sardinia?",
    answer: "Kitesurfing lessons in Sardinia typically cost €80-120 per hour for private instruction or €50-80 per hour for group lessons. Most beginners need 6-12 hours of instruction. KiteSafaris guests receive exclusive discounts of 15-20% on lessons through our partner schools."
  }
]

export default function BeginnerGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Beginner's Guide to Kitesurfing in Sardinia | Learn at Punta Trettu",
    "description": "Complete beginner's guide to kitesurfing in Sardinia. Learn everything about starting your kitesurfing journey at Punta Trettu with professional instruction.",
    "url": "https://kitesafaris.com/destinations/sardinia/beginner-guide",
    "mainEntity": {
      "@type": "HowTo",
      "name": "How to Learn Kitesurfing in Sardinia",
      "description": "Step-by-step guide to learning kitesurfing at Punta Trettu, Sardinia",
      "step": learningSteps.map(step => ({
        "@type": "HowToStep",
        "position": step.step,
        "name": step.title,
        "text": step.description,
        "url": `https://kitesafaris.com/destinations/sardinia/beginner-guide#step-${step.step}`
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://kitesafaris.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Destinations",
          "item": "https://kitesafaris.com/destinations"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Sardinia",
          "item": "https://kitesafaris.com/destinations/sardinia"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Beginner's Guide",
          "item": "https://kitesafaris.com/destinations/sardinia/beginner-guide"
        }
      ]
    }
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <div className="min-h-screen bg-white">
        <Navigation />
        
        {/* Breadcrumb */}
        <div className="pt-20 pb-4 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-deep-navy">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href="/destinations" className="text-gray-500 hover:text-deep-navy">Destinations</Link>
              <span className="text-gray-400">/</span>
              <Link href="/destinations/sardinia" className="text-gray-500 hover:text-deep-navy">Sardinia</Link>
              <span className="text-gray-400">/</span>
              <span className="text-deep-navy font-medium">Beginner's Guide</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-deep-navy via-turquoise to-sand-beige text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
                Beginner's Guide to Kitesurfing
              </h1>
              <p className="text-xl sm:text-2xl font-open-sans mb-8 leading-relaxed">
                Learn Kitesurfing in Sardinia at Punta Trettu
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">Complete Learning Guide</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Safe Learning Environment</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Professional Instruction</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Your Journey to Kitesurfing Mastery Starts Here
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Learning to kitesurf is one of the most rewarding experiences you can have, and there's no better place to start than at Punta Trettu in Sardinia. This beginner-friendly destination offers the perfect combination of safe conditions, professional instruction, and ideal learning environment that will accelerate your progress and build your confidence.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The flat shallow water at Punta Trettu eliminates many of the fears and challenges that beginners face at other locations. You can always stand up if needed, the water is warm and comfortable, and the consistent wind conditions provide predictable learning opportunities. These factors make Punta Trettu one of Europe's premier destinations for learning kitesurfing.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    This comprehensive guide will walk you through everything you need to know about learning kitesurfing in Sardinia, from what to expect in your first lesson to how to progress to advanced techniques. Whether you're a complete beginner or have some experience, this guide will help you make the most of your kitesurfing journey.
                  </p>
                </div>
              </section>

              {/* Learning Steps */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-8">
                  Step-by-Step Learning Process
                </h2>
                <div className="space-y-8">
                  {learningSteps.map((step, index) => (
                    <div key={index} id={`step-${step.step}`} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-turquoise text-white rounded-full flex items-center justify-center font-bold text-lg">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                            <h3 className="text-2xl font-montserrat font-bold text-deep-navy mb-2 lg:mb-0">
                              {step.title}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">{step.duration}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-6">
                            {step.description}
                          </p>
                          <div>
                            <h4 className="font-montserrat font-semibold text-deep-navy mb-3">Skills You'll Learn:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {step.skills.map((skill, skillIndex) => (
                                <div key={skillIndex} className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  <span className="text-gray-700 text-sm">{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Why Punta Trettu for Beginners */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Why Punta Trettu is Perfect for Beginners
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Shield className="w-6 h-6 text-turquoise" />
                      Safety First
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Shallow water (waist-deep maximum)</li>
                      <li>• No waves or choppy conditions</li>
                      <li>• Soft sandy bottom</li>
                      <li>• Easy access and exit points</li>
                      <li>• Professional safety equipment</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Users className="w-6 h-6 text-turquoise" />
                      Expert Instruction
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• IKO certified instructors</li>
                      <li>• Small class sizes</li>
                      <li>• Personalized attention</li>
                      <li>• Modern teaching methods</li>
                      <li>• Multilingual support</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Star className="w-6 h-6 text-turquoise" />
                      Perfect Conditions
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Consistent thermal winds</li>
                      <li>• Flat water surface</li>
                      <li>• Warm Mediterranean water</li>
                      <li>• Predictable weather patterns</li>
                      <li>• 7-month kitesurfing season</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-turquoise" />
                      All Equipment Included
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Modern kites and boards</li>
                      <li>• Safety gear and harnesses</li>
                      <li>• Wetsuits and accessories</li>
                      <li>• Insurance coverage</li>
                      <li>• Equipment maintenance</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {faqData.map((faq, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-montserrat font-semibold text-deep-navy mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Start */}
                <div className="bg-deep-navy text-white rounded-lg p-6">
                  <h3 className="text-xl font-montserrat font-bold mb-4">Ready to Start?</h3>
                  <p className="text-gray-300 mb-4">
                    Book your first kitesurfing lesson at Punta Trettu with exclusive KiteSafaris discounts.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-turquoise text-white px-4 py-2 rounded-lg font-medium hover:bg-turquoise/90 transition-colors w-full justify-center"
                  >
                    Book Your Lesson
                  </Link>
                </div>

                {/* Learning Timeline */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-montserrat font-bold text-deep-navy mb-4">Learning Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">First Ride:</span>
                      <span className="font-medium">6-8 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Basic Riding:</span>
                      <span className="font-medium">12-16 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Independent:</span>
                      <span className="font-medium">20-30 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Advanced:</span>
                      <span className="font-medium">40+ hours</span>
                    </div>
                  </div>
                </div>

                {/* Related Links */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-montserrat font-bold text-deep-navy mb-4">Related Pages</h3>
                  <div className="space-y-3">
                    <Link href="/destinations/sardinia" className="block text-turquoise hover:text-deep-navy transition-colors">
                      ← Back to Sardinia Overview
                    </Link>
                    <Link href="/destinations/sardinia/punta-trettu" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Punta Trettu Kitesurfing Spot
                    </Link>
                    <Link href="/destinations/sardinia/kitesurf-schools" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Kitesurf Schools in Sardinia
                    </Link>
                    <Link href="/destinations/sardinia/kitesurf-sardinia" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Kitesurf Sardinia Overview
                    </Link>
                    <Link href="/destinations/sardinia/wind-conditions" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Wind Conditions & Forecast
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Schools Component */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <SardiniaPartnerSchools />
          </div>
        </div>
      </div>
    </>
  )
}
