"use client"

import Link from "next/link"
import { BookOpen, Download, ArrowRight } from "lucide-react"
import { SARDINIAN_AWAKENING } from "@/lib/constants"

interface SardinianAwakeningCTAProps {
  variant: "homepage" | "destinations" | "blog" | "about"
  className?: string
}

export function SardinianAwakeningCTA({ variant, className = "" }: SardinianAwakeningCTAProps) {
  const getContent = () => {
    switch (variant) {
      case "homepage":
        return {
          headline: "Dreaming of a Life Reset? Download 'Sardinian Awakening'—a Journey from Boardrooms to Boardshorts",
          ctaText: SARDINIAN_AWAKENING.CTA_TEXT.PRIMARY,
          icon: BookOpen,
        }
      case "destinations":
        return {
          headline: "Thinking of more than a holiday? Read how one Belgian left it all for the Sardinian wind.",
          ctaText: SARDINIAN_AWAKENING.CTA_TEXT.SECONDARY,
          icon: BookOpen,
        }
      case "blog":
        return {
          headline: "Inspired by our stories? Get a free ebook that could change how you travel.",
          ctaText: SARDINIAN_AWAKENING.CTA_TEXT.PRIMARY,
          icon: Download,
        }
      case "about":
        return {
          headline: "From Corporate to Kite Safari—Read our founder's story in 'Sardinian Awakening'",
          ctaText: SARDINIAN_AWAKENING.CTA_TEXT.SECONDARY,
          icon: BookOpen,
        }
      default:
        return {
          headline: "Discover the story behind KiteSafaris in 'Sardinian Awakening'",
          ctaText: SARDINIAN_AWAKENING.CTA_TEXT.PRIMARY,
          icon: BookOpen,
        }
    }
  }

  const content = getContent()
  const IconComponent = content.icon

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sand-beige/20 via-turquoise/10 to-deep-navy/5 backdrop-blur-sm border border-sand-beige/30 shadow-xl">
          {/* Content - Removed blocking overlay */}
          <div className="relative p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Icon and visual element */}
              <div className="flex justify-center md:justify-start">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-coral-orange to-coral-orange/80 rounded-2xl flex items-center justify-center shadow-lg">
                    <IconComponent className="w-12 h-12 text-white" />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-turquoise rounded-full opacity-80" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-deep-navy rounded-full opacity-60" />
                </div>
              </div>

              {/* Text content */}
              <div className="md:col-span-2 text-center md:text-left">
                <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-deep-navy mb-4 text-balance leading-tight">
                  {content.headline}
                </h3>

                <p className="font-open-sans text-deep-navy/70 mb-6 leading-relaxed">{SARDINIAN_AWAKENING.SUBTEXT}</p>

                {/* CTA Button - Now clickable! */}
                <Link
                  href={SARDINIAN_AWAKENING.LANDING_PAGE_URL}
                  className="inline-flex items-center gap-3 bg-coral-orange hover:bg-coral-orange/90 text-white font-montserrat font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-coral-orange/30"
                  aria-label={`Download ${SARDINIAN_AWAKENING.TITLE} ebook`}
                >
                  {content.ctaText}
                  <ArrowRight className="w-5 h-5" />
                </Link>

                {/* Additional context for screen readers */}
                <span className="sr-only">
                  Free ebook download: {SARDINIAN_AWAKENING.TITLE} - {SARDINIAN_AWAKENING.SUBTITLE}
                </span>
              </div>
            </div>
          </div>

          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-4 left-4 w-32 h-32 bg-turquoise rounded-full blur-3xl" />
            <div className="absolute bottom-4 right-4 w-24 h-24 bg-coral-orange rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
