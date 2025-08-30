"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Shield,
  Award,
  Globe,
  Users,
  Heart,
  Star,
  CheckCircle,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Play,
} from "lucide-react"

interface Instructor {
  id: string
  name: string
  role: string
  image: string
  certifications: string[]
  specialties: string[]
  experience: string
  languages: { code: string; name: string; flag: string }[]
  bio: string
  safetyRecord: string
  destinations: string[]
}

const instructors: Instructor[] = [
  {
    id: "mattia",
    name: "Mattia",
    role: "Co-Founder & Senior IKO Instructor",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mattia.jpg-MPKFeIIwBF7zYvQnvQUXmILubEears.jpeg",
    certifications: ["IKO Senior Instructor", "PADI Rescue Diver", "First Aid Certified", "VHF Radio License"],
    specialties: ["Advanced Freestyle", "Wave Riding", "Beginner Progression", "Safety Protocols"],
    experience: "8+ Years Professional Instruction",
    languages: [
      { code: "it", name: "Italian", flag: "🇮🇹" },
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "es", name: "Spanish", flag: "🇪🇸" },
    ],
    bio: "Mattia lives and breathes wind, waves, and the wild beauty of the sea. From coaching absolute beginners to guiding advanced pros, he leads each kitesafari with passion, calmness, and deep local knowledge.",
    safetyRecord: "Zero incidents in 2000+ instruction hours",
    destinations: ["Antigua", "Greece", "Sardinia"],
  },
  {
    id: "captain-enricco",
    name: "Captain Enricco",
    role: "Master Captain & Kite Instructor",
    image: "/captain-enricco-portrait.jpg",
    certifications: ["RYA Yachtmaster", "IKO Level 2 Instructor", "Maritime Safety", "Emergency Response"],
    specialties: ["Catamaran Operations", "Weather Analysis", "Remote Location Safety", "Rescue Procedures"],
    experience: "15+ Years Maritime & Kite Experience",
    languages: [
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "it", name: "Italian", flag: "🇮🇹" },
    ],
    bio: "Born with salt in his veins, Captain Enricco has charted thousands of nautical miles across the Mediterranean and Caribbean. He's your guide, storyteller, and silent safety net.",
    safetyRecord: "Perfect safety record across 500+ charters",
    destinations: ["Caribbean", "Mediterranean", "Red Sea"],
  },
  {
    id: "jose-martinez",
    name: "José Martinez",
    role: "Advanced Instructor & Safety Specialist",
    image: "/jose-martinez-instructor.jpg",
    certifications: ["IKO Level 3 Instructor", "Lifeguard Certified", "Wilderness First Aid", "Drone Pilot License"],
    specialties: ["Big Air Training", "Kite Loops", "Competition Coaching", "Action Photography"],
    experience: "6+ Years Competition & Instruction",
    languages: [
      { code: "es", name: "Spanish", flag: "🇪🇸" },
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    ],
    bio: "Former competitive kiteboarder turned instructor, José specializes in advanced techniques and safety. His calm demeanor and technical expertise make complex maneuvers accessible to all skill levels.",
    safetyRecord: "Advanced rescue specialist with 1500+ hours",
    destinations: ["Cape Verde", "Canary Islands", "Brazil"],
  },
  {
    id: "maria-santos",
    name: "Maria Santos",
    role: "Beginner Specialist & Youth Instructor",
    image: "/maria-santos-instructor.jpg",
    certifications: ["IKO Level 2 Instructor", "Youth Teaching Certified", "CPR/AED", "Marine Biology Degree"],
    specialties: ["Beginner Progression", "Youth Instruction", "Marine Conservation", "Equipment Maintenance"],
    experience: "5+ Years Specialized Instruction",
    languages: [
      { code: "pt", name: "Portuguese", flag: "🇵🇹" },
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "fr", name: "French", flag: "🇫🇷" },
    ],
    bio: "Marine biologist turned kite instructor, Maria combines her love for ocean conservation with patient, encouraging instruction. She excels at building confidence in new riders.",
    safetyRecord: "Specialist in beginner safety with 1200+ hours",
    destinations: ["Azores", "Madeira", "Morocco"],
  },
]

const certificationBadges = [
  { icon: Shield, title: "IKO Certified", description: "International Kiteboarding Organization" },
  { icon: Award, title: "PADI Qualified", description: "Professional diving certifications" },
  { icon: Heart, title: "First Aid", description: "Current medical response training" },
  { icon: Globe, title: "VHF Licensed", description: "Maritime radio communication" },
]

const safetyProtocols = [
  {
    title: "Pre-Session Briefing",
    description: "Comprehensive safety briefing covering conditions, equipment, and emergency procedures",
    icon: CheckCircle,
  },
  {
    title: "Constant Supervision",
    description: "Maximum 4 students per instructor with dedicated rescue boat support",
    icon: Users,
  },
  {
    title: "Emergency Response",
    description: "All instructors trained in water rescue, first aid, and emergency communication",
    icon: Shield,
  },
  {
    title: "Equipment Inspection",
    description: "Daily safety checks on all kites, boards, harnesses, and safety systems",
    icon: CheckCircle,
  },
]

export function ExpertGuidesPage() {
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null)

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-deep-navy via-deep-navy/90 to-turquoise/20">
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 py-16 flex items-center min-h-[70vh]">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm font-open-sans text-turquoise-100">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <ChevronRight className="w-4 h-4" />
                <li className="text-white">Expert Guides</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-montserrat text-balance">
              World-Class Kite Instructors
            </h1>
            <p className="text-xl md:text-2xl text-turquoise-100 mb-8 font-open-sans text-balance">
              Your Safety & Progress Guaranteed
            </p>
            <p className="text-lg text-white/90 mb-8 font-open-sans leading-relaxed max-w-2xl">
              Meet our team of certified professionals who combine years of experience with genuine passion for
              kiteboarding and ocean safety.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/packages"
                className="bg-coral-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors"
              >
                Book Your Adventure
              </Link>
              <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors">
                <Play className="w-5 h-5" />
                Watch Safety Video
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Showcase */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy mb-4 font-montserrat">
              Professional Certifications
            </h2>
            <p className="text-lg text-deep-navy/80 font-open-sans max-w-2xl mx-auto">
              Our instructors maintain the highest industry standards with current certifications and ongoing training.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certificationBadges.map((cert, index) => {
              const IconComponent = cert.icon
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-sand-beige/30 rounded-lg hover:bg-sand-beige/50 transition-colors"
                >
                  <div className="w-16 h-16 bg-coral-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-montserrat font-bold text-deep-navy mb-2">{cert.title}</h3>
                  <p className="font-open-sans text-deep-navy/70 text-sm">{cert.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-sand-beige/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy mb-4 font-montserrat">
              Meet Your Expert Guides
            </h2>
            <p className="text-lg text-deep-navy/80 font-open-sans max-w-2xl mx-auto">
              Each instructor brings unique expertise and personality to create unforgettable learning experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={instructor.image || "/placeholder.svg"}
                    alt={`${instructor.name} - Professional Kite Instructor`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1 font-montserrat">{instructor.name}</h3>
                    <p className="text-turquoise-200 font-semibold font-open-sans">{instructor.role}</p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Languages */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {instructor.languages.map((lang) => (
                      <span
                        key={lang.code}
                        className="inline-flex items-center gap-1 text-sm bg-turquoise/10 text-turquoise px-3 py-1 rounded-full"
                      >
                        <span>{lang.flag}</span>
                        <span className="font-open-sans">{lang.name}</span>
                      </span>
                    ))}
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-coral-orange" />
                    <span className="text-deep-navy font-semibold font-open-sans">{instructor.experience}</span>
                  </div>

                  {/* Bio */}
                  <p className="text-deep-navy/80 font-open-sans mb-4 leading-relaxed">{instructor.bio}</p>

                  {/* Safety Record */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 font-semibold text-sm">{instructor.safetyRecord}</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-deep-navy mb-2 font-montserrat">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {instructor.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="text-xs bg-deep-navy/10 text-deep-navy px-2 py-1 rounded font-open-sans"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-deep-navy mb-2 font-montserrat">Certifications</h4>
                    <div className="space-y-1">
                      {instructor.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-deep-navy/80 font-open-sans">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Destinations */}
                  <div className="flex items-center gap-2 text-sm text-turquoise">
                    <MapPin className="w-4 h-4" />
                    <span className="font-open-sans">{instructor.destinations.join(", ")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Guides Expert */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy mb-4 font-montserrat">
              What Makes Our Guides "Expert"
            </h2>
            <p className="text-lg text-deep-navy/80 font-open-sans max-w-2xl mx-auto">
              Beyond certifications, our instructors embody the highest standards of safety, teaching, and local
              expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-coral-orange to-coral-orange/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3 font-montserrat">Safety Protocols</h3>
              <p className="text-deep-navy/80 font-open-sans">
                Rigorous safety standards with emergency response training and rescue boat support on every session.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-turquoise to-turquoise/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3 font-montserrat">Teaching Methodology</h3>
              <p className="text-deep-navy/80 font-open-sans">
                Personalized instruction adapted to individual learning styles with proven progression techniques.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-deep-navy to-deep-navy/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3 font-montserrat">Local Knowledge</h3>
              <p className="text-deep-navy/80 font-open-sans">
                Deep understanding of local conditions, weather patterns, and hidden spots for optimal experiences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3 font-montserrat">Equipment Expertise</h3>
              <p className="text-deep-navy/80 font-open-sans">
                Master knowledge of all equipment types with ability to optimize setup for any conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Standards */}
      <section className="py-16 bg-deep-navy text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat">
              Safety Standards & Emergency Procedures
            </h2>
            <p className="text-lg text-turquoise-100 font-open-sans max-w-2xl mx-auto">
              Our comprehensive safety protocols ensure every session is conducted with the highest level of security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {safetyProtocols.map((protocol, index) => {
              const IconComponent = protocol.icon
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-coral-orange rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 font-montserrat">{protocol.title}</h3>
                      <p className="text-turquoise-100 font-open-sans">{protocol.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-16 bg-sand-beige/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy mb-4 font-montserrat">
              Student Progression Stories
            </h2>
            <p className="text-lg text-deep-navy/80 font-open-sans max-w-2xl mx-auto">
              Real transformations from our expert instruction programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-deep-navy font-montserrat">Sarah M.</h4>
                  <p className="text-sm text-deep-navy/60">Complete Beginner → Independent Rider</p>
                </div>
              </div>
              <p className="text-deep-navy/80 font-open-sans mb-4">
                "Never touched a kite before. After 5 days with Mattia, I was riding independently and even jumped my
                first time!"
              </p>
              <div className="text-sm text-turquoise font-semibold">7-Day Antigua Safari</div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-deep-navy font-montserrat">Marcus K.</h4>
                  <p className="text-sm text-deep-navy/60">Intermediate → Advanced Freestyle</p>
                </div>
              </div>
              <p className="text-deep-navy/80 font-open-sans mb-4">
                "José's technical expertise helped me master kite loops and advanced jumps. The progression was
                incredible."
              </p>
              <div className="text-sm text-turquoise font-semibold">Advanced Skills Week</div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-deep-navy font-montserrat">Emma L.</h4>
                  <p className="text-sm text-deep-navy/60">Nervous Beginner → Confident Rider</p>
                </div>
              </div>
              <p className="text-deep-navy/80 font-open-sans mb-4">
                "Maria's patient approach helped me overcome my fear of water. Now I can't wait for my next kite
                session!"
              </p>
              <div className="text-sm text-turquoise font-semibold">Beginner Confidence Program</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-turquoise to-deep-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat">Ready to Meet Your Guide?</h2>
          <p className="text-xl text-turquoise-100 mb-8 font-open-sans max-w-2xl mx-auto">
            Book your kitesafari and get matched with the perfect instructor for your skill level and goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/packages"
              className="bg-coral-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors"
            >
              Book Your Adventure
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Ask About Instructors
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-turquoise-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Small Groups (Max 4 Students)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Personalized Instruction</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Safety Guaranteed</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
