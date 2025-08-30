"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"

interface CrewMember {
  id: string
  name: string
  role: string
  certifications: string[]
  shortBio: string
  extendedBio: string
  languages: { code: string; name: string; flag: string }[]
  image: string
  alt: string
}

const crewMembers: CrewMember[] = [
  {
    id: "captain-enricco",
    name: "Captain Enricco",
    role: "Captain",
    certifications: ["RYA Yachtmaster", "15+ Years Experience", "Mediterranean & Caribbean Expert"],
    shortBio:
      "15 years of sailing experience and a deep love for the ocean, Captain Enrico is the heart and soul of our floating home.",
    extendedBio:
      "Born with salt in his veins, he has charted thousands of nautical miles across the Mediterranean and Caribbean — always chasing wind, freedom, and adventure. Calm, skilled, and endlessly passionate, Enrico isn't just your skipper — he's your guide, your storyteller, and your silent safety net. Whether he's navigating a remote bay in Barbuda or cooking up pasta barefoot on deck, Enrico's presence makes everyone feel at ease. \"The boat is more than a vessel — it's a way of life. I want guests to feel the rhythm of the sea and the peace that comes with it.\"",
    languages: [
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "it", name: "Italian", flag: "🇮🇹" },
    ],
    image: "/captain-enricco-portrait.jpg",
    alt: "Captain Enricco giving thumbs up from boat hatch with ocean background",
  },
  {
    id: "jochen-jo",
    name: 'Jochen "Jo"',
    role: "Co-Founder",
    certifications: ["Tech Entrepreneur", "Brand Strategist", "Global Partnerships"],
    shortBio:
      "With a background in tech entrepreneurship and a passion for the ocean, Jochen brings vision, strategy, and storytelling together to shape unforgettable kitesurfing adventures.",
    extendedBio:
      "He's the driving engine behind the brand, digital presence, client experience, and global partnerships. Jochen has kited all over the world but found his soul in combining freedom, community, and wind-powered travel. Whether he's tweaking a booking system or sharing beers on deck at sunset, he's always pushing for meaningful, human moments. Challenge Yourself and Push the Limits. Full Power!",
    languages: [
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "de", name: "German", flag: "🇩🇪" },
      { code: "nl", name: "Dutch", flag: "🇳🇱" },
    ],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jochen-profile.jpg-QtqYR9nhnwbB35zr9RjSIatTK3ZBZI.jpeg",
    alt: "Jochen Jo co-founder relaxing on catamaran netting with ocean background",
  },
  {
    id: "mattia",
    name: "Mattia",
    role: "Co-Founder & Senior Kite-Instructor",
    certifications: ["IKO Senior Instructor", "Kitesafari Guide", "Safety Specialist"],
    shortBio:
      "Mattia lives and breathes wind, waves, and the wild beauty of the sea. He's not just a top-level instructor — he's the soul of every kitesafari.",
    extendedBio:
      "From coaching absolute beginners to guiding advanced pros, Mattia leads each kitesafari with passion, calmness, and deep local knowledge. On board, he's the one making sure every rider feels safe, challenged, and free. Off the board, he's often the first one to organize something to get together, often creating unforgettable group moments. Eventually we're all just 'Freedom Chasers'.",
    languages: [
      { code: "it", name: "Italian", flag: "🇮🇹" },
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "es", name: "Spanish", flag: "🇪🇸" },
    ],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mattia.jpg-MPKFeIIwBF7zYvQnvQUXmILubEears.jpeg",
    alt: "Mattia senior kite instructor standing on catamaran with Mediterranean harbor background",
  },
  {
    id: "iryna",
    name: "Iryna",
    role: "HR Responsible & Hospitality Manager",
    certifications: ["Hospitality Excellence", "Safety Coordinator", "Culinary Arts"],
    shortBio:
      "Iryna is the gentle force that turns our catamaran into a floating home. With her bright smile, calm energy, and attention to every detail, she ensures your stay on board is not just comfortable — but unforgettable.",
    extendedBio:
      "From setting up beautifully prepared meals to keeping the cabins fresh and cozy, Iryna brings a touch of care to everything she does. She's always one step ahead — offering a cold drink after your session, preparing a sunset aperitivo, or sharing a heartfelt conversation under the stars. \"Hospitality means more than service — it's about making people feel at home, even in the middle of the ocean.\"",
    languages: [
      { code: "ua", name: "Ukrainian", flag: "🇺🇦" },
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "ru", name: "Russian", flag: "🇷🇺" },
    ],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iryna-1iicBYyUY45tOtFp8xx2jorObvtXVP.jpeg",
    alt: "Iryna hospitality manager preparing refreshments on yacht with turquoise water background",
  },
]

export function CrewBios() {
  const [expandedMember, setExpandedMember] = useState<string | null>(null)

  const toggleExpanded = (memberId: string) => {
    setExpandedMember(expandedMember === memberId ? null : memberId)
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-sand-beige to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-montserrat">Meet Our Professional Crew</h2>
          <p className="text-lg text-navy/80 font-open-sans max-w-2xl mx-auto">
            Our experienced team combines sailing expertise with kite instruction and hospitality to ensure every cruise
            exceeds expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {crewMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-sand-beige/30 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.alt}
                      fill
                      className="rounded-full object-cover border-2 border-turquoise/20"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-navy font-montserrat mb-1">{member.name}</h3>
                    <p className="text-turquoise font-semibold font-open-sans mb-2">{member.role}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {member.languages.map((lang) => (
                        <span
                          key={lang.code}
                          className="inline-flex items-center gap-1 text-sm bg-turquoise/10 text-turquoise px-2 py-1 rounded-full"
                          title={`Speaks ${lang.name}`}
                        >
                          <span className="text-xs">{lang.flag}</span>
                          <span className="font-open-sans">{lang.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-navy mb-2 font-montserrat">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.certifications.map((cert, index) => (
                      <span key={index} className="text-xs bg-navy/10 text-navy px-2 py-1 rounded font-open-sans">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-navy/80 font-open-sans mb-4">{member.shortBio}</p>

                <button
                  onClick={() => toggleExpanded(member.id)}
                  className="flex items-center gap-2 text-turquoise hover:text-turquoise/80 font-semibold font-open-sans transition-colors duration-200"
                  aria-expanded={expandedMember === member.id}
                  aria-controls={`extended-bio-${member.id}`}
                >
                  <span>{expandedMember === member.id ? "Show Less" : "Read More"}</span>
                  {expandedMember === member.id ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                </button>

                {expandedMember === member.id && (
                  <div
                    id={`extended-bio-${member.id}`}
                    className="mt-4 pt-4 border-t border-sand-beige/30 animate-in slide-in-from-top-2 duration-300"
                  >
                    <p className="text-navy/80 font-open-sans leading-relaxed">{member.extendedBio}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
