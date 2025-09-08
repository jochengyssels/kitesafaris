import Navigation from "@/components/navigation"
import { EnhancedFooter } from "@/components/enhanced-footer"
import PartnershipLessonsIntegration from "@/components/partnership-lessons-integration"
import LessonBookingCalculator from "@/components/lesson-booking-calculator"
import LessonsFAQ from "@/components/lessons-faq"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Professional Kite Surfing Lessons: Complete Guide to Learning Kitesurfing in Paradise Destinations | KiteSafaris",
  description: "Learn kitesurfing safely with IKO certified instructors. Beginner to advanced lessons in world-class destinations. Equipment included, small groups, proven results.",
  keywords: "kite surfing lessons, kitesurfing lessons, learn kitesurfing, IKO certified instructors, kitesurfing lessons beginners, private kite lessons, kitesurfing certification, kitesurfing safety, kitesurfing equipment, kitesurfing destinations",
  alternates: {
    canonical: "https://www.kitesafaris.com/kitesurfing-lessons",
  },
  openGraph: {
    title: "Professional Kite Surfing Lessons: Complete Guide to Learning Kitesurfing",
    description: "Learn kitesurfing safely with IKO certified instructors. Beginner to advanced lessons in world-class destinations. Equipment included, small groups, proven results.",
    url: "https://www.kitesafaris.com/kitesurfing-lessons",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://www.kitesafaris.com/images/kitesurfing-lessons-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Professional kitesurfing lessons with IKO certified instructors",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Kite Surfing Lessons: Complete Guide to Learning Kitesurfing",
    description: "Learn kitesurfing safely with IKO certified instructors. Beginner to advanced lessons in world-class destinations. Equipment included, small groups, proven results.",
    images: ["https://www.kitesafaris.com/images/kitesurfing-lessons-hero.jpg"],
  },
}

// Schema markup for Course
const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Professional Kitesurfing Lessons",
  "description": "Learn kitesurfing safely with IKO certified instructors in world-class destinations. Complete beginner to advanced courses with equipment included.",
  "provider": {
    "@type": "Organization",
    "name": "KiteSafaris",
    "url": "https://www.kitesafaris.com"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Discovery Lessons",
      "price": "120",
      "priceCurrency": "EUR",
      "description": "2-hour minimum private instruction"
    },
    {
      "@type": "Offer", 
      "name": "Beginner Packages",
      "price": "490",
      "priceCurrency": "EUR",
      "description": "6 hours + 3 days equipment rental"
    },
    {
      "@type": "Offer",
      "name": "Complete Courses", 
      "price": "790",
      "priceCurrency": "EUR",
      "description": "9 hours + accommodation + meals"
    },
    {
      "@type": "Offer",
      "name": "Private Coaching",
      "price": "150", 
      "priceCurrency": "EUR",
      "description": "Per hour with video analysis"
    }
  ],
  "courseMode": "blended",
  "educationalLevel": "beginner",
  "inLanguage": "en",
  "teaches": "Kitesurfing, kite control, water safety, independent riding",
  "coursePrerequisites": "Basic swimming ability",
  "syllabusSections": [
    {
      "@type": "Syllabus",
      "name": "Beach Theory and Safety",
      "description": "Understanding wind, equipment, and safety protocols"
    },
    {
      "@type": "Syllabus", 
      "name": "Kite Control and Body Dragging",
      "description": "Mastering kite control in shallow water"
    },
    {
      "@type": "Syllabus",
      "name": "Water Starts and Independent Riding", 
      "description": "Learning to ride independently with proper technique"
    }
  ]
}

export default function KitesurfingLessonsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <main className="min-h-screen bg-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-deep-navy via-turquoise-600 to-coral-orange text-white py-20 lg:py-32">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6 leading-tight">
                Professional Kite Surfing Lessons
              </h1>
              <p className="text-xl md:text-2xl font-open-sans mb-8 leading-relaxed">
                Learn kitesurfing safely with IKO certified instructors in world-class destinations. 
                Complete beginner to advanced courses with equipment included.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="#lesson-types"
                  className="bg-coral-orange hover:bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
                >
                  View Lesson Types
                </Link>
                <Link 
                  href="#destinations"
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-colors backdrop-blur-sm"
                >
                  Explore Destinations
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The Ultimate Lesson Experience */}
        <section id="lesson-experience" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-8 text-center">
                The Ultimate Lesson Experience
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h3 className="text-xl font-bold text-deep-navy mb-3">IKO Certified Excellence</h3>
                  <p className="text-gray-600">
                    All instructors hold International Kiteboarding Organization certification, 
                    ensuring the highest standards of safety and teaching methodology.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-coral-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="text-xl font-bold text-deep-navy mb-3">3-Day Proven Progression</h3>
                  <p className="text-gray-600">
                    Beach theory → Water skills → Independent riding. Our structured approach 
                    accelerates learning while maintaining safety as the top priority.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h3 className="text-xl font-bold text-deep-navy mb-3">Safety-First Approach</h3>
                  <p className="text-gray-600">
                    Comprehensive emergency protocols, rescue boat support, and radio 
                    communication systems ensure your safety throughout the learning process.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-turquoise-50 to-sand-beige-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-deep-navy mb-4">Why Choose Professional Kitesurfing Lessons?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-2">Accelerated Learning</h4>
                    <p className="text-gray-600 mb-4">
                      Professional instruction reduces learning time by 60% compared to self-teaching. 
                      Our IKO certified instructors use proven teaching methods that build confidence 
                      and technique systematically.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-2">Safety Guarantee</h4>
                    <p className="text-gray-600 mb-4">
                      Every lesson includes comprehensive safety briefings, rescue boat support, 
                      and emergency action plans. Your safety is our absolute priority.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-2">Equipment Included</h4>
                    <p className="text-gray-600 mb-4">
                      Modern, well-maintained kites, boards, harnesses, and safety gear are 
                      provided. No need to invest in equipment before you know what works for you.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-2">Small Group Advantage</h4>
                    <p className="text-gray-600 mb-4">
                      Maximum 6 students per instructor ensures personalized attention and 
                      faster progression. No getting lost in large classes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lesson Types & Pricing */}
        <section id="lesson-types" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-12 text-center">
                Lesson Types & Pricing Intelligence
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">👥</span>
                    </div>
                    <h3 className="text-lg font-bold text-deep-navy">Group Lessons</h3>
                    <p className="text-2xl font-bold text-coral-orange mt-2">€50-80/hour</p>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 4-6 students per instructor</li>
                    <li>• Social learning environment</li>
                    <li>• Great for meeting fellow kitesurfers</li>
                    <li>• Most cost-effective option</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">👥👤</span>
                    </div>
                    <h3 className="text-lg font-bold text-deep-navy">Semi-Private</h3>
                    <p className="text-2xl font-bold text-coral-orange mt-2">€80-120/hour</p>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 2:1 instructor ratio</li>
                    <li>• Personalized attention</li>
                    <li>• Faster progression</li>
                    <li>• Perfect for couples/friends</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">👤</span>
                    </div>
                    <h3 className="text-lg font-bold text-deep-navy">Private Instruction</h3>
                    <p className="text-2xl font-bold text-coral-orange mt-2">€100-150/hour</p>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 1:1 personalized coaching</li>
                    <li>• Accelerated progress</li>
                    <li>• Video analysis included</li>
                    <li>• Customized curriculum</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-coral-orange">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-coral-orange/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">📦</span>
                    </div>
                    <h3 className="text-lg font-bold text-deep-navy">Complete Packages</h3>
                    <p className="text-2xl font-bold text-coral-orange mt-2">€360-530</p>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 6-9 hour beginner courses</li>
                    <li>• Equipment rental included</li>
                    <li>• Accommodation options</li>
                    <li>• Best value for beginners</li>
                  </ul>
                  <div className="mt-4 text-center">
                    <span className="bg-coral-orange text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-deep-navy mb-6 text-center">Pricing Breakdown by Destination</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-deep-navy mb-3">Caribbean (Antigua)</h4>
                    <p className="text-gray-600 mb-4">Premium destination with consistent trade winds</p>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Group:</span> €60-80/hour</p>
                      <p><span className="font-semibold">Private:</span> €120-150/hour</p>
                      <p><span className="font-semibold">Package:</span> €490-650</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-deep-navy mb-3">Mediterranean (Sardinia)</h4>
                    <p className="text-gray-600 mb-4">Year-round flat water conditions</p>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Group:</span> €50-70/hour</p>
                      <p><span className="font-semibold">Private:</span> €100-130/hour</p>
                      <p><span className="font-semibold">Package:</span> €360-490</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-deep-navy mb-3">Greece (Aegean)</h4>
                    <p className="text-gray-600 mb-4">Summer Meltemi winds and culture</p>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Group:</span> €55-75/hour</p>
                      <p><span className="font-semibold">Private:</span> €110-140/hour</p>
                      <p><span className="font-semibold">Package:</span> €420-550</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* World-Class Learning Destinations */}
        <section id="destinations" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-12 text-center">
                World-Class Learning Destinations
              </h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src="/antigua-aerial-harbor-view.jpg"
                      alt="Antigua kitesurfing lessons in shallow Caribbean bays"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">Caribbean Paradise</h3>
                      <p className="text-sm opacity-90">Antigua & Barbuda</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-deep-navy mb-3">Perfect Beginner Conditions</h4>
                    <p className="text-gray-600 mb-4">
                      Antigua's shallow bays and consistent 15-25 knot trade winds create ideal 
                      learning conditions. Launch directly from our luxury catamarans into 
                      crystal-clear turquoise waters.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• Shallow water safety (1-2m depth)</li>
                      <li>• Consistent trade winds</li>
                      <li>• Catamaran-based instruction</li>
                      <li>• Remote spot access</li>
                    </ul>
                    <Link 
                      href="/destinations/antigua"
                      className="text-coral-orange hover:text-orange-500 font-semibold"
                    >
                      Learn more about Antigua →
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src="/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"
                      alt="Sardinia kitesurfing lessons at Punta Trettu flat water lagoon"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">Mediterranean Excellence</h3>
                      <p className="text-sm opacity-90">Punta Trettu, Sardinia</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-deep-navy mb-3">Flat Water Perfection</h4>
                    <p className="text-gray-600 mb-4">
                      Punta Trettu's legendary flat water lagoon offers the world's best 
                      beginner conditions. Year-round Mistral winds and shallow, protected 
                      waters accelerate learning.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• World-famous flat water</li>
                      <li>• Year-round conditions</li>
                      <li>• IKO certified schools</li>
                      <li>• Equipment rental included</li>
                    </ul>
                    <Link 
                      href="/destinations/sardinia/punta-trettu"
                      className="text-coral-orange hover:text-orange-500 font-semibold"
                    >
                      Explore Punta Trettu →
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src="https://daggzx92agk0rfom.public.blob.vercel-storage.com/greece:img-catamaran.jpg"
                      alt="Greece kitesurfing lessons in Aegean Islands with Meltemi winds"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">Aegean Adventure</h3>
                      <p className="text-sm opacity-90">Greek Islands</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-deep-navy mb-3">Cultural Kitesurfing</h4>
                    <p className="text-gray-600 mb-4">
                      Combine powerful Meltemi winds with ancient Greek culture. Learn 
                      kitesurfing while exploring hidden coves and historic islands 
                      accessible only by catamaran.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• Powerful Meltemi winds</li>
                      <li>• Cultural experiences</li>
                      <li>• Hidden cove access</li>
                      <li>• Summer season (Jun-Sep)</li>
                    </ul>
                    <Link 
                      href="/destinations/greece"
                      className="text-coral-orange hover:text-orange-500 font-semibold"
                    >
                      Discover Greece →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-turquoise-50 to-sand-beige-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-deep-navy mb-6 text-center">Why Our Destinations Are Perfect for Learning</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-3">Consistent Wind Conditions</h4>
                    <p className="text-gray-600 mb-4">
                      Each destination is carefully selected for reliable wind patterns. 
                      Antigua's trade winds, Sardinia's Mistral, and Greece's Meltemi 
                      provide consistent learning conditions year-round.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-3">Safety-First Locations</h4>
                    <p className="text-gray-600 mb-4">
                      Shallow water areas, protected bays, and rescue boat support 
                      ensure your safety while learning. No deep water or dangerous 
                      conditions for beginners.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-3">Professional Infrastructure</h4>
                    <p className="text-gray-600 mb-4">
                      IKO certified schools, modern equipment, and experienced 
                      instructors at every location. You'll receive the same 
                      high-quality instruction regardless of destination.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-3">Unique Learning Experiences</h4>
                    <p className="text-gray-600 mb-4">
                      Catamaran-based instruction, remote spot access, and cultural 
                      immersion make learning kitesurfing an unforgettable adventure, 
                      not just a lesson.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety & Certification Standards */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-12 text-center">
                Safety & Certification Standards
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-deep-navy mb-4">IKO Level Progression</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-turquoise-500 pl-4">
                      <h4 className="font-semibold text-deep-navy">Level 1: Discovery</h4>
                      <p className="text-sm text-gray-600">Basic kite control, safety systems, and body dragging</p>
                    </div>
                    <div className="border-l-4 border-coral-orange pl-4">
                      <h4 className="font-semibold text-deep-navy">Level 2: Intermediate</h4>
                      <p className="text-sm text-gray-600">Water starts, first rides, and upwind riding</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-deep-navy">Level 3: Independent</h4>
                      <p className="text-sm text-gray-600">Advanced riding, jumping, and self-rescue techniques</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-deep-navy mb-4">Professional Instructor Requirements</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>IKO Level 1+ certification minimum</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>CPR and first aid training</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Minimum 3 years teaching experience</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Local knowledge and rescue training</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Multilingual instruction capabilities</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-deep-navy mb-6 text-center">Equipment Safety Standards</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🪁</span>
                    </div>
                    <h4 className="font-semibold text-deep-navy mb-2">Modern Kites</h4>
                    <p className="text-sm text-gray-600">
                      Latest generation kites with safety systems, quick-release mechanisms, 
                      and appropriate sizes for learning conditions.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🛡️</span>
                    </div>
                    <h4 className="font-semibold text-deep-navy mb-2">Safety Equipment</h4>
                    <p className="text-sm text-gray-600">
                      Helmets, impact vests, wetsuits, and harnesses. All equipment 
                      regularly inspected and maintained to highest standards.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📡</span>
                    </div>
                    <h4 className="font-semibold text-deep-navy mb-2">Communication Systems</h4>
                    <p className="text-sm text-gray-600">
                      Radio helmet communication for real-time instruction and emergency 
                      contact. Rescue boat support always available.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Success Stories */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-12 text-center">
                Student Success Stories
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-turquoise-50 to-sand-beige-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-turquoise-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      M
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-navy">Maria, 28</h4>
                      <p className="text-sm text-gray-600">Complete Beginner → Independent Rider</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "I was terrified of the water and had never tried any water sport. 
                    The instructors at Punta Trettu were incredibly patient and supportive. 
                    Within 5 days, I was riding independently! The flat water conditions 
                    made all the difference."
                  </p>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="text-yellow-500 mr-1">⭐⭐⭐⭐⭐</span>
                    <span>5 days to independence</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-coral-orange/10 to-sand-beige-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-coral-orange rounded-full flex items-center justify-center text-white font-bold mr-4">
                      J
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-navy">James, 35</h4>
                      <p className="text-sm text-gray-600">Private Coaching → Advanced Techniques</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "The private coaching in Antigua was worth every euro. The instructor 
                    identified my technique issues immediately and had me jumping within 
                    the first session. The catamaran-based lessons were incredible!"
                  </p>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="text-yellow-500 mr-1">⭐⭐⭐⭐⭐</span>
                    <span>Advanced in 3 days</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-deep-navy mb-6 text-center">Learning Milestones & Achievements</h3>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-turquoise-500 mb-2">95%</div>
                    <p className="text-sm text-gray-600">Success rate for water starts</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-coral-orange mb-2">3-5</div>
                    <p className="text-sm text-gray-600">Days to independent riding</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
                    <p className="text-sm text-gray-600">Safety record maintained</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-500 mb-2">500+</div>
                    <p className="text-sm text-gray-600">Students certified annually</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Integration */}
        <PartnershipLessonsIntegration />

        {/* FAQ Section */}
        <LessonsFAQ />

        {/* Interactive Booking System */}
        <section className="py-20 bg-gradient-to-br from-deep-navy to-turquoise-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-8">
                  Ready to Start Your Kitesurfing Journey?
                </h2>
                <p className="text-xl opacity-90">
                  Choose your destination, select your lesson type, and get instant pricing 
                  for your professional kitesurfing instruction.
                </p>
              </div>
              
              {/* Interactive Calculator */}
              <div className="mb-12">
                <LessonBookingCalculator />
              </div>

              {/* Quick Access Tools */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Course Finder Tool</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Match your skill level to the perfect destination and course type.
                  </p>
                  <Link 
                    href="/packages"
                    className="bg-coral-orange hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                  >
                    Find Your Course
                  </Link>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Real-Time Availability</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Check availability and book directly with our partner schools.
                  </p>
                  <Link 
                    href="/booking"
                    className="bg-coral-orange hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                  >
                    Check Availability
                  </Link>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Expert Consultation</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Get personalized advice from our kitesurfing experts.
                  </p>
                  <Link 
                    href="/contact"
                    className="bg-coral-orange hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                  >
                    Get Expert Advice
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Why Book with KiteSafaris?</h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold mb-2">Exclusive Partnerships</h4>
                    <p className="text-sm opacity-90 mb-4">
                      Access to the world's best kitesurf schools with exclusive 
                      discounts and packages not available elsewhere.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Complete Experience</h4>
                    <p className="text-sm opacity-90 mb-4">
                      Lessons, accommodation, equipment, and cultural experiences 
                      all included in one seamless booking.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Safety Guarantee</h4>
                    <p className="text-sm opacity-90 mb-4">
                      IKO certified instructors, rescue boat support, and 
                      comprehensive insurance coverage included.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Flexible Booking</h4>
                    <p className="text-sm opacity-90 mb-4">
                      Easy rescheduling, group discounts, and payment plans 
                      available for all lesson packages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <EnhancedFooter />
      </main>
    </>
  )
}
