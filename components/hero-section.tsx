"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const [currentHeadline, setCurrentHeadline] = useState(0)
  const headlines = ["Full Power. Pure Freedom.", "Kite Safaris"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length)
    }, 5000) // 5 seconds

    return () => clearInterval(interval)
  }, [headlines.length])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero%20Kite%20Safaris-hlxSEwWf9RYvPC2NX21SFMYh87gWwC.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-deep-navy/40" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          <h1 className="font-montserrat text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight text-balance animate-pulse-glow transition-all duration-1000 ease-in-out">
            {headlines[currentHeadline]}
          </h1>

          <p className="font-montserrat text-xl md:text-2xl lg:text-3xl text-turquoise mb-8 font-medium text-balance animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            Experience the ultimate Catamaran kitesurfing adventure.
          </p>

          <Link href="/destinations">
            <Button
              size="lg"
              className="bg-coral-orange hover:bg-coral-orange/90 text-white font-montserrat font-bold text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-700"
            >
              Explore Kite Safaris
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
