import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SardinianAwakeningLanding } from "@/components/sardinian-awakening-landing"

export const metadata: Metadata = {
  title: "Kitesurfing Ebook | Sardinian Kite Story | KiteSafaris.com",
  description:
    "Download our free kitesurfing ebook - the inspiring Sardinian kite story of leaving corporate life for wind, freedom & the kitesurfer's dream. Get it now!",
  keywords: "sardinia ebook, corporate escape, kitesurfing lifestyle, digital nomad, freedom, memoir",
  openGraph: {
    title: "Sardinian Awakening - Escape the Corporate World",
    description:
      "Download this candid memoir of leaving Belgium's corporate rat race to embrace ocean living in Sardinia.",
    images: ["/sardinian-awakening-cover.jpg"],
  },
}

export default function SardinianAwakeningPage() {
  return (
    <>
      <Navigation />
      <main>
        <SardinianAwakeningLanding />
      </main>
    </>
  )
}
