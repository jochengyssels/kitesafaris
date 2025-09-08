import { Navigation } from "@/components/navigation"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { SearchableFAQ } from "@/components/searchable-faq"
import { JsonLd, generateFAQSchema } from "@/components/seo/JsonLd"
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
  // FAQ data for schema
  const faqData = [
    {
      question: "What destinations do you offer and when?",
      answer: "We operate in three destinations: Caribbean (Antigua & Barbuda) during winter season Dec-Apr, Greece (Aegean Islands) during summer season Jun-Sep, and Sardinia (Punta Trettu) year-round. Each destination is chosen for consistent 15-25 knot trade winds and optimal kitesurfing conditions."
    },
    {
      question: "How much does an Antigua kitesafari cost?",
      answer: "Our 7-day luxury catamaran kitesafari in Antigua & Barbuda costs €1,900 per person (discounted from €2,100). This includes catamaran accommodation, all meals, professional IKO certified instructor, rescue boat assistance, and access to remote kite spots. Limited to 6 spots maximum."
    },
    {
      question: "What's included in your kitesafari packages?",
      answer: "All packages include 7-day luxury catamaran accommodation, professional IKO certified instructor, all meals and snacks, rescue boat surveillance, launch kites directly from the boat, snorkeling gear, yacht fuel, safety equipment, and access to remote spots unreachable by land. Equipment rental available separately."
    },
    {
      question: "How many people are in each group?",
      answer: "We limit each kitesafari to maximum 6 people to ensure personalized attention, safety, and an intimate experience. This small group size allows our professional instructors to provide hands-on assistance and adapt to everyone's skill level."
    },
    {
      question: "Do you provide kite equipment and instruction?",
      answer: "Yes, we offer complete equipment packages and professional instruction. Our IKO certified instructors provide hands-on assistance and teach you to launch kites directly from the boat. Equipment rental and private coaching sessions are available as add-ons to your package."
    }
  ]

  const faqSchema = generateFAQSchema(faqData)

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={faqSchema} />
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
