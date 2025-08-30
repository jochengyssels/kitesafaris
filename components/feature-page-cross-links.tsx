import Link from "next/link"
import { Users, Star, Anchor, Wind, ArrowLeft } from "lucide-react"

const featurePages = [
  {
    title: "Small Groups",
    description: "Maximum 8 guests per trip for personalized attention",
    href: "/small-groups",
    icon: Users,
    color: "from-turquoise to-turquoise/80",
  },
  {
    title: "Expert Guides",
    description: "IKO certified instructors with safety expertise",
    href: "/expert-guides",
    icon: Star,
    color: "from-coral-orange to-coral-orange/80",
  },
  {
    title: "Premium Equipment",
    description: "Latest kite gear from top brands included",
    href: "/premium-equipment",
    icon: Anchor,
    color: "from-deep-navy to-deep-navy/80",
  },
  {
    title: "Guaranteed Wind",
    description: "Consistent 15-25 knot conditions or we make it right",
    href: "/guaranteed-wind",
    icon: Wind,
    color: "from-sage-green to-sage-green/80",
  },
]

interface FeaturePageCrossLinksProps {
  currentPage: string
  className?: string
}

export function FeaturePageCrossLinks({ currentPage, className = "" }: FeaturePageCrossLinksProps) {
  const otherPages = featurePages.filter((page) => page.href !== currentPage)

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Back to Homepage */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-deep-navy hover:text-coral-orange transition-colors duration-200 font-open-sans font-medium mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Homepage
          </Link>

          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-deep-navy mb-6">Explore More Features</h2>
          <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what makes KiteSafaris the ultimate kiteboarding adventure experience.
          </p>
        </div>

        {/* Cross-links Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {otherPages.map((page, index) => {
            const IconComponent = page.icon
            return (
              <Link
                key={index}
                href={page.href}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${page.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-3 group-hover:text-coral-orange transition-colors duration-200">
                  {page.title}
                </h3>

                <p className="font-open-sans text-gray-600 leading-relaxed mb-4 text-balance">{page.description}</p>

                <div className="inline-flex items-center gap-2 text-coral-orange font-medium text-sm group-hover:gap-3 transition-all duration-200">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
