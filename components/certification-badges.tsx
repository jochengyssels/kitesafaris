import { Shield, Award, Anchor, Heart } from "lucide-react"

const certifications = [
  {
    icon: Shield,
    title: "Safety Certified",
    description: "IKO & PADI Certified",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "TripAdvisor Excellence",
  },
  {
    icon: Anchor,
    title: "Insured Fleet",
    description: "Full Coverage",
  },
  {
    icon: Heart,
    title: "Eco Friendly",
    description: "Sustainable Tourism",
  },
]

export function CertificationBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-2">
      {certifications.map((cert, index) => {
        const IconComponent = cert.icon
        return (
          <div
            key={index}
            className="flex items-center space-x-2 bg-white rounded-full px-4 py-1 shadow-sm border border-gray-200"
          >
            <IconComponent className="w-5 h-5 text-coral-orange" aria-hidden="true" />
            <div className="text-center">
              <p className="font-montserrat font-semibold text-navy text-sm">{cert.title}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
