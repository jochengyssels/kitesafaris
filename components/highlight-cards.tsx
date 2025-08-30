import { Star, Anchor, Users, Wind } from "lucide-react"
import Link from "next/link"

const highlights = [
  {
    title: "Expert Guides",
    description:
      "Professional IKO certified instructors with local knowledge and safety expertise. Launch kites directly from the boat with hands-on assistance.",
    icon: Users,
    image: "/professional-kiteboarding-instructor-teaching-on-t.png",
    alt: "Professional IKO certified kiteboarding instructor providing guidance in Antigua",
    href: "/expert-guides",
  },
  {
    title: "Small Groups",
    description:
      "Maximum 6 people per group ensuring personalized attention and safety. Intimate experience with dedicated support boat assistance.",
    icon: Star,
    image: "/small-group-kiteboarding-lesson-on-luxury-catamara.png",
    alt: "Small group kiteboarding session with personalized instruction on luxury catamaran",
    href: "/small-groups",
  },
  {
    title: "Premium Equipment",
    description:
      "Latest kites, boards, and safety equipment from top brands included. Professional rescue boat with experienced captains on standby.",
    icon: Anchor,
    image: "/premium-kiteboarding-equipment-on-luxury-yacht-dec.png",
    alt: "Premium kiteboarding equipment and luxury catamaran with professional gear",
    href: "/premium-equipment",
  },
  {
    title: "Guaranteed Wind",
    description:
      "We operate only during peak wind seasons for consistent 15-25 knot conditions. Caribbean winter, Greece summer, Sardinia all year.",
    icon: Wind,
    image: "/perfect-wind-conditions-for-kiteboarding-in-tropic.png",
    alt: "Consistent wind conditions during peak kiteboarding season in Antigua Caribbean",
    href: "/guaranteed-wind",
  },
]

export default function HighlightCards() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon
            return (
              <Link
                key={index}
                href={highlight.href}
                className="flex-none w-80 bg-sand-beige rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-coral-orange focus:ring-offset-2 text-left block"
                aria-label={`Learn more about ${highlight.title}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={highlight.image || "/placeholder.svg"}
                    alt={highlight.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-slate-300">
                    <IconComponent className="w-6 h-6 text-slate-700 stroke-2" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat font-bold text-xl text-slate-800 mb-3">{highlight.title}</h3>
                  <p className="font-open-sans text-slate-700 text-sm leading-relaxed mb-4">{highlight.description}</p>
                  <div className="inline-flex items-center gap-2 bg-coral-orange text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-coral-orange/90 transition-colors duration-200">
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
