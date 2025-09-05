import { Navigation } from "@/components/navigation"
import { SearchableFAQ } from "@/components/searchable-faq"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - KiteSafaris.com",
  description: "Frequently asked questions about kiteboarding safaris, bookings, and travel information.",
  alternates: {
    canonical: "https://www.kitesafaris.com/faq"
  },
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4 font-sans">Frequently Asked Questions</h1>
              <p className="text-lg text-gray-600 font-body">
                Find answers to common questions about our kiteboarding safaris
              </p>
            </div>
            <SearchableFAQ />
          </div>
        </div>
      </main>
    </div>
  )
}
