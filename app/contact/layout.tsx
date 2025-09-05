import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact KiteSafaris | Plan Your Kitesurfing Adventure",
  description: "Get in touch with KiteSafaris. Ask questions, plan your kitesurf safari, or request custom packages.",
  keywords: "contact KiteSafaris, kitesurf safari planning, custom packages, kitesurfing questions",
  alternates: {
    canonical: "https://www.kitesafaris.com/contact"
  },
  openGraph: {
    title: "Contact KiteSafaris | Plan Your Kitesurfing Adventure",
    description: "Get in touch with KiteSafaris. Ask questions, plan your kitesurf safari, or request custom packages.",
    type: "website",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
