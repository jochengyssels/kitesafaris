import { Navigation } from "@/components/navigation"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { SearchableFAQ } from "@/components/searchable-faq"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kite Safari FAQ | Kitesurfing Questions | KiteSafaris.com",
  description: "Find answers to kite safari FAQ and kitesurfing questions. Get expert insights on bookings, travel info & safari details from our team!",
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
            <BreadcrumbNavigation items={[{ label: "FAQ" }]} />
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4 font-sans">Frequently Asked Questions</h1>
              <p className="text-lg text-gray-600 font-body">
                Find answers to common questions about our kiteboarding safaris. Still have questions? 
                <Link href="/contact" className="text-coral-orange hover:text-orange-500 font-semibold"> Contact us</Link> or 
                <Link href="/booking" className="text-coral-orange hover:text-orange-500 font-semibold"> book your adventure</Link>.
              </p>
            </div>
            <SearchableFAQ />
          </div>
        </div>
      </main>
    </div>
  )
}
