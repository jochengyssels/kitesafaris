"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Mail, Star, Wind, Waves, Sun } from "lucide-react"

export function SardinianAwakeningLanding() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [consentMarketing, setConsentMarketing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [currentPreview, setCurrentPreview] = useState(0)

  const previews = [
    {
      quote: "The meeting room felt like a cage, and I was the bird that had forgotten how to fly...",
      context: "Chapter 1: The Corporate Prison",
    },
    {
      quote:
        "My first sunrise session on Poetto beach changed everything—the wind wasn't just moving my kite, it was moving my soul...",
      context: "Chapter 3: First Touch of Freedom",
    },
    {
      quote: "Sardinia didn't just give me a new home; it gave me back myself...",
      context: "Chapter 7: The Awakening",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch("/api/ebook-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          first_name: firstName,
          consent_marketing: consentMarketing,
          source: "Sardinian Awakening Ebook Landing Page",
          campaign: "ebook-download"
        }),
      })

      const result = await response.json()

      if (result.success) {
        console.log("[v0] Ebook lead captured successfully:", result.leadId)
        setSubmitMessage("Thank you! We've received your request. You'll be among the first to receive the ebook by email once it's ready for release.")
        setEmail("")
        setFirstName("")
        setConsentMarketing(false)
      } else {
        console.error("[v0] Ebook lead capture failed:", result.error)
        setSubmitMessage("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Ebook lead submission error:", error)
      setSubmitMessage("Network error. Please check your connection and try again.")
    }

    setIsSubmitting(false)
  }

  const scrollToForm = () => {
    document.getElementById('signup-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/sardinian-beach-sunset-with-kitesurfer-silhouette-.png"
            alt="Sardinian beach at sunset"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              <span className="text-white">Sardinian Awakening</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                Escape the Corporate World
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-slate-200 leading-relaxed max-w-3xl mx-auto">
              Download this candid memoir of leaving Belgium's corporate rat race to embrace ocean living in Sardinia.
            </p>

            {/* Ebook Cover */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-2xl blur-xl transform rotate-3" />
                <Image
                  src="/ebook-cover-sardinian-awakening-with-beach-and-kit.png"
                  alt="Sardinian Awakening Ebook Cover"
                  width={300}
                  height={400}
                  className="relative rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Primary CTA */}
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={scrollToForm}
              aria-label="Get your free ebook"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get Your Free Ebook
            </Button>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="signup-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-bold text-3xl md:text-4xl mb-6 text-slate-900">Get Your Free Copy Now</h2>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First name (optional)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-12 text-lg border-2 border-slate-200 focus:border-cyan-500 rounded-full px-6"
                  aria-label="First name for personalization"
                />
                <Input
                  type="email"
                  placeholder="Email address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 text-lg border-2 border-slate-200 focus:border-cyan-500 rounded-full px-6"
                  aria-label="Email address for ebook download"
                />
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg">
                <input
                  type="checkbox"
                  id="consent-marketing"
                  checked={consentMarketing}
                  onChange={(e) => setConsentMarketing(e.target.checked)}
                  required
                  className="mt-1 h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-slate-300 rounded"
                />
                <label htmlFor="consent-marketing" className="text-sm text-slate-700 leading-relaxed">
                  I agree to receive the ebook and occasional KiteSafaris updates about ocean lifestyle, 
                  travel inspiration, and kiteboarding adventures. You can unsubscribe anytime. 
                  <a href="/policies/privacy" className="text-cyan-600 hover:text-cyan-700 underline ml-1">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white px-8 py-3 h-12 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Submit form and download ebook"
              >
                <Mail className="mr-2 h-5 w-5" />
                {isSubmitting ? "Sending..." : "Get My Free Ebook"}
              </Button>
            </form>

            {submitMessage && (
              <div
                className={`text-center mb-4 p-3 rounded-lg ${
                  submitMessage.includes("Thank you") || submitMessage.includes("Success")
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
              >
                {submitMessage}
              </div>
            )}

            <p className="text-slate-600 text-sm">
              We'll send your ebook and occasional ocean-lifestyle inspiration—unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-bold text-3xl md:text-4xl mb-12 text-slate-900">Why This Story Matters</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Wind className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-2 text-slate-900">
                    Raw, personal story of <strong>corporate burnout</strong> and self-liberation
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-2 text-slate-900">
                    Discover the <strong>courage behind a radical life reset</strong>
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Waves className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-2 text-slate-900">
                    <strong>Kite, wind, waves</strong>, and the Sardinian transformation
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Sun className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-2 text-slate-900">
                    Perfect for <strong>aspiring nomads, adventure seekers, kitesurfers</strong>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-bold text-3xl md:text-4xl mb-12 text-slate-900">What's Inside</h2>

            <div className="relative">
              <Card className="bg-gradient-to-br from-cyan-50 to-teal-50 border-2 border-cyan-100 shadow-lg">
                <CardContent className="p-8">
                  <blockquote className="text-xl md:text-2xl italic text-slate-700 mb-4 leading-relaxed">
                    "{previews[currentPreview].quote}"
                  </blockquote>
                  <cite className="text-cyan-600 font-semibold">{previews[currentPreview].context}</cite>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-center items-center mt-6 space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPreview((prev) => (prev - 1 + previews.length) % previews.length)}
                  className="rounded-full"
                  aria-label="Previous preview"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex space-x-2">
                  {previews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPreview(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentPreview ? "bg-cyan-600" : "bg-slate-300"
                      }`}
                      aria-label={`Go to preview ${index + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPreview((prev) => (prev + 1) % previews.length)}
                  className="rounded-full"
                  aria-label="Next preview"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <Image
                  src="/authentic-portrait-of-kite-instructor-on-beach-in-.png"
                  alt="Author portrait"
                  width={200}
                  height={200}
                  className="rounded-full shadow-lg"
                />
              </div>

              <div className="text-center md:text-left">
                <h2 className="font-bold text-3xl md:text-4xl mb-4 text-slate-900">About the Author</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Ex-corporate, now kite instructor, dad, freedom advocate. I wrote this book to inspire big, true life
                  changes. After 15 years in Belgium's corporate world, I traded my suit for a wetsuit and found my true
                  calling on Sardinia's windswept shores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Connection Callout */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 backdrop-blur-sm" />

        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-bold text-3xl md:text-4xl mb-6">Dreaming about more than a vacation?</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Sardinian Awakening is your gateway to a new way of living—and a great reason to start your Kite Safari.
            </p>

            <Link href="/destinations/sardinia">
              <Button
                size="lg"
                className="bg-white text-cyan-600 hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                See Kite Safaris in Sardinia
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-bold text-3xl md:text-4xl mb-12 text-center text-slate-900">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              <Card className="border-2 border-slate-100 hover:border-cyan-200 transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-3 text-slate-900">
                    Do I need to be a kitesurfer to enjoy this book?
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    No! This is for anyone thinking about life-changing travel, working remotely, or making a radical
                    career shift. The kitesurfing is just the backdrop for a deeper story about finding freedom and
                    authenticity.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-100 hover:border-cyan-200 transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-3 text-slate-900">Is this really free?</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Yes, completely free! We believe this story can inspire positive life changes, and we want to share
                    it with as many people as possible. You'll just receive occasional emails about ocean lifestyle and
                    travel inspiration.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-bold text-3xl md:text-4xl mb-6 text-slate-900">Ready for Your Own Awakening?</h2>
            <p className="text-xl mb-8 text-slate-700">
              Get your free copy of Sardinian Awakening and discover what's possible when you choose freedom over fear.
            </p>

            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={scrollToForm}
              aria-label="Get your free ebook"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get Your Free Ebook
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
