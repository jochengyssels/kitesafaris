import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SardinianAwakeningLanding } from "@/components/sardinian-awakening-landing"

export const metadata: Metadata = {
  title: "Sardinian Awakening - Free Ebook | KiteSafaris.com",
  description:
    "Download the candid memoir of leaving Belgium's corporate world for wind, freedom and the kitesurfer's life in Sardinia. Free ebook by KiteSafaris.",
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
