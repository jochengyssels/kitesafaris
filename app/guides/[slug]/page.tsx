import { Navigation } from "@/components/navigation"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, User, ArrowLeft, MapPin } from "lucide-react"

// Sample guide data - in a real app this would come from a CMS or database
const guides = [
  {
    slug: "kiteboarding-board-types-guide",
    title: "Understanding Kiteboarding Board Types and Characteristics",
    coverImage: "/kiteboarding-equipment-selection.png",
    skillLevel: "beginner" as const,
    readTime: 8,
    author: "Captain Tomaz Kodelja",
    summary:
      "Learn about different kiteboard shapes, sizes, and designs to choose the right board for your riding style and conditions.",
    tripType: "Equipment",
    destination: "antigua-barbuda",
    content: `
      <h2>Choosing the Right Kiteboard</h2>
      <p>Selecting the right kiteboard is crucial for your progression and enjoyment on the water. Different board types serve different purposes and riding styles.</p>
      
      <h3>Twin Tip Boards</h3>
      <p>Twin tip boards are symmetrical and allow you to ride in both directions without changing your stance. They're perfect for beginners and freestyle riders.</p>
      
      <h3>Directional Boards</h3>
      <p>Directional boards are designed to be ridden in one direction, similar to surfboards. They excel in waves and provide better upwind performance.</p>
      
      <h3>Board Size Considerations</h3>
      <p>Board size affects your riding experience significantly. Larger boards provide more stability and are easier for beginners, while smaller boards offer more maneuverability for advanced tricks.</p>
    `,
  },
  {
    slug: "kite-loops-techniques-safety",
    title: "Mastering Kite Loops: Techniques and Safety",
    coverImage: "/advanced-kiteboarding-jumping.png",
    skillLevel: "advanced" as const,
    readTime: 12,
    author: "José Martinez",
    summary:
      "Master one of kiteboarding's most thrilling moves with proper technique, timing, and safety considerations for kite loops.",
    tripType: "Advanced Skills",
    destination: "cyclades-greece",
    content: `
      <h2>Understanding Kite Loops</h2>
      <p>Kite loops are one of the most exhilarating maneuvers in kiteboarding, but they require proper technique and safety awareness.</p>
      
      <h3>Prerequisites</h3>
      <p>Before attempting kite loops, you should be comfortable with jumping, have good kite control, and understand wind windows thoroughly.</p>
      
      <h3>Safety First</h3>
      <p>Always practice kite loops in open water with plenty of space. Ensure your safety systems are working and you have rescue boat support nearby.</p>
    `,
  },
  {
    slug: "caribbean-mediterranean-wind-patterns",
    title: "Wind Patterns in the Caribbean vs Mediterranean",
    coverImage: "/antigua-jolly-harbor-kiting.png", // replaced missing wind conditions image with existing Antigua image
    skillLevel: "intermediate" as const,
    readTime: 10,
    author: "Captain Tomaz Kodelja",
    summary:
      "Compare trade winds in the Caribbean with Meltemi winds in Greece to understand seasonal patterns and optimal timing.",
    tripType: "Weather",
    destination: "grenadines",
    content: `
      <h2>Understanding Global Wind Patterns</h2>
      <p>Different regions offer unique wind characteristics that affect kiteboarding conditions and seasonal timing.</p>
      
      <h3>Caribbean Trade Winds</h3>
      <p>The Caribbean benefits from consistent trade winds that blow from November to May, providing reliable 15-25 knot conditions.</p>
      
      <h3>Mediterranean Meltemi</h3>
      <p>The Greek islands experience the famous Meltemi winds during summer months, offering strong and consistent conditions for advanced riders.</p>
    `,
  },
  {
    slug: "catamaran-kite-safety-protocols",
    title: "Catamaran Kite Safety: Remote Location Protocols",
    coverImage: "/antigua-jolly-harbor-kiting.png",
    skillLevel: "beginner" as const,
    readTime: 6,
    author: "Maria Santos",
    summary:
      "Essential safety protocols for kiteboarding from catamarans in remote locations with rescue boat procedures.",
    tripType: "Safety",
    destination: "red-sea-egypt",
    content: `
      <h2>Safety in Remote Locations</h2>
      <p>Kiteboarding from catamarans in remote locations requires additional safety considerations and protocols.</p>
      
      <h3>Rescue Boat Procedures</h3>
      <p>Understanding rescue boat signals and procedures is essential when kiteboarding in remote areas without beach access.</p>
      
      <h3>Communication Systems</h3>
      <p>Maintain constant communication with the catamaran crew and follow established check-in procedures.</p>
    `,
  },
  {
    slug: "packing-kite-cruise-essentials",
    title: "Packing for Multi-Day Kite Cruises",
    coverImage: "/kiteboarding-lesson-turquoise-water.png",
    skillLevel: "beginner" as const,
    readTime: 7,
    author: "Chef Bernard Dubois",
    summary:
      "Complete packing checklist for catamaran kite cruises including personal gear, clothing, and optional equipment.",
    tripType: "Travel Tips",
    destination: "cape-verde",
    content: `
      <h2>Essential Packing Guide</h2>
      <p>Packing for a multi-day kite cruise requires careful consideration of space limitations and essential items.</p>
      
      <h3>Clothing Essentials</h3>
      <p>Pack lightweight, quick-dry clothing suitable for tropical conditions and water activities.</p>
      
      <h3>Personal Gear</h3>
      <p>Bring personal safety equipment, sunscreen, and any medications you might need during the trip.</p>
    `,
  },
  {
    slug: "boat-kiteboarding-photography-tips",
    title: "Capturing Epic Kite Action: Photography from Boats",
    coverImage: "/kiteboarding-photography-tips.png",
    skillLevel: "intermediate" as const,
    readTime: 9,
    author: "José Martinez",
    summary:
      "Professional tips for photographing kiteboarding action from moving boats, including drone footage and safety considerations.",
    tripType: "Photography",
    destination: "mauritius",
    content: `
      <h2>Photography from Moving Platforms</h2>
      <p>Capturing kiteboarding action from boats presents unique challenges and opportunities for stunning imagery.</p>
      
      <h3>Camera Settings</h3>
      <p>Use fast shutter speeds and continuous autofocus to capture sharp action shots from a moving boat.</p>
      
      <h3>Drone Considerations</h3>
      <p>When using drones, be aware of wind conditions and maintain visual contact at all times for safety.</p>
    `,
  },
  {
    slug: "antigua-kite-spots-guide",
    title: "Antigua's Best Kiteboarding Spots: A Complete Guide",
    coverImage: "/antigua-jolly-harbor-kiting.png",
    skillLevel: "beginner" as const,
    readTime: 10,
    author: "Captain Tomaz Kodelja",
    summary:
      "Discover Antigua's premier kiteboarding locations, from beginner-friendly beaches to advanced wave spots, with detailed wind and access information.",
    tripType: "Destination Guide",
    destination: "antigua",
    content: `
      <h2>Antigua's Kiteboarding Paradise</h2>
      <p>Antigua offers some of the Caribbean's most consistent wind conditions and diverse kiteboarding spots suitable for all skill levels.</p>
      
      <h3>Jolly Harbour</h3>
      <p>Perfect for beginners with flat water conditions and consistent trade winds. The shallow lagoon provides ideal learning conditions.</p>
      
      <h3>Half Moon Bay</h3>
      <p>Advanced riders will love the wave conditions and stronger winds. This spot offers challenging but rewarding sessions.</p>
      
      <h3>Wind Conditions</h3>
      <p>Trade winds blow consistently from November to May, typically 15-25 knots, making Antigua a reliable destination for kiteboarding.</p>
    `,
  },
  {
    slug: "antigua-packing-essentials",
    title: "Antigua Kite Safari Packing Essentials",
    coverImage: "/kiteboarding-lesson-turquoise-water.png",
    skillLevel: "beginner" as const,
    readTime: 8,
    author: "Chef Bernard Dubois",
    summary:
      "Complete packing checklist for your Antigua kite safari, including clothing, gear, and personal items for tropical conditions.",
    tripType: "Travel Tips",
    destination: "antigua",
    content: `
      <h2>Packing for Tropical Kiteboarding</h2>
      <p>Proper packing ensures you're prepared for all conditions during your Antigua kite safari adventure.</p>
      
      <h3>Clothing Essentials</h3>
      <p>Pack lightweight, quick-dry clothing, swimwear, and sun protection. Include a light jacket for evening breezes.</p>
      
      <h3>Personal Gear</h3>
      <p>Bring reef-safe sunscreen, sunglasses, and any personal medications. Don't forget your camera for capturing memories.</p>
      
      <h3>Optional Equipment</h3>
      <p>While we provide all kiteboarding equipment, you may bring personal items like your own harness or board shorts.</p>
    `,
  },
  {
    slug: "caribbean-trade-winds-guide",
    title: "Understanding Caribbean Trade Winds for Kiteboarding",
    coverImage: "/antigua-jolly-harbor-kiting.png",
    skillLevel: "intermediate" as const,
    readTime: 12,
    author: "Captain Tomaz Kodelja",
    summary:
      "Learn about Caribbean trade wind patterns, seasonal variations, and how they affect kiteboarding conditions across the region.",
    tripType: "Weather",
    destination: "antigua",
    content: `
      <h2>Caribbean Trade Wind Patterns</h2>
      <p>The Caribbean's trade winds create some of the world's most consistent kiteboarding conditions, but understanding their patterns is key to planning your trip.</p>
      
      <h3>Seasonal Variations</h3>
      <p>Trade winds are strongest from December to March, providing reliable 20-30 knot conditions perfect for advanced riders.</p>
      
      <h3>Regional Differences</h3>
      <p>Wind strength and consistency vary across the Caribbean, with the eastern islands typically experiencing stronger and more consistent winds.</p>
      
      <h3>Weather Systems</h3>
      <p>Understanding how tropical storms and high-pressure systems affect wind patterns helps in trip planning and safety.</p>
    `,
  },
  {
    slug: "catamaran-kite-launching-guide",
    title: "Kite Launching from Catamarans: Techniques and Safety",
    coverImage: "/kiteboarding-lesson-turquoise-water.png",
    skillLevel: "intermediate" as const,
    readTime: 9,
    author: "Maria Santos",
    summary:
      "Master the art of launching kites from catamarans with proper techniques, safety protocols, and crew coordination methods.",
    tripType: "Safety",
    destination: "antigua",
    content: `
      <h2>Catamaran Kite Launching</h2>
      <p>Launching kites from catamarans requires specific techniques and coordination between riders and crew members.</p>
      
      <h3>Pre-Launch Checklist</h3>
      <p>Always check your equipment, wind conditions, and surrounding area before attempting to launch from a moving vessel.</p>
      
      <h3>Crew Coordination</h3>
      <p>Clear communication with the catamaran crew is essential for safe launches and landings in open water conditions.</p>
      
      <h3>Safety Protocols</h3>
      <p>Follow established safety procedures and always have a rescue plan in place before launching in remote locations.</p>
    `,
  },
  {
    slug: "small-group-safety-protocols",
    title: "Small Group Kiteboarding Safety Protocols",
    coverImage: "/kiteboarding-lesson-turquoise-water.png",
    skillLevel: "beginner" as const,
    readTime: 7,
    author: "Maria Santos",
    summary:
      "Essential safety protocols for small group kiteboarding sessions, including communication, rescue procedures, and emergency protocols.",
    tripType: "Safety",
    destination: "antigua",
    content: `
      <h2>Safety in Small Groups</h2>
      <p>Small group kiteboarding requires specific safety considerations to ensure everyone's well-being in remote locations.</p>
      
      <h3>Communication Systems</h3>
      <p>Establish clear communication protocols and emergency signals before starting any kiteboarding session.</p>
      
      <h3>Buddy System</h3>
      <p>Always kite with a buddy and maintain visual contact. Never kite alone in remote locations without support.</p>
      
      <h3>Emergency Procedures</h3>
      <p>Know the emergency procedures and have rescue equipment readily available for all participants.</p>
    `,
  },
  {
    slug: "upcoming-destinations-preview",
    title: "Upcoming KiteSafaris Destinations Preview",
    coverImage: "/kiteboarding-lesson-turquoise-water.png",
    skillLevel: "beginner" as const,
    readTime: 6,
    author: "Captain Tomaz Kodelja",
    summary:
      "Get a sneak peek at KiteSafaris' upcoming destinations and new routes being added to our adventure portfolio.",
    tripType: "Destinations",
    destination: "antigua",
    content: `
      <h2>New Destinations Coming Soon</h2>
      <p>KiteSafaris is constantly expanding our destination portfolio to bring you the world's best kiteboarding experiences.</p>
      
      <h3>Mediterranean Expansion</h3>
      <p>New routes in the Greek islands and Turkish coast are being developed for 2026, offering diverse wind conditions and cultural experiences.</p>
      
      <h3>Caribbean Additions</h3>
      <p>Additional Caribbean destinations are being scouted to provide more variety in our tropical kiteboarding adventures.</p>
      
      <h3>Stay Updated</h3>
      <p>Subscribe to our newsletter to be the first to know about new destinations and early booking opportunities.</p>
    `,
  },
]

interface PageProps {
  params: { slug: string }
}

export default function GuideDetailPage({ params }: PageProps) {
  const guide = guides.find((g) => g.slug === params.slug)

  if (!guide) {
    notFound()
  }

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src={guide.coverImage || "/placeholder.svg"}
            alt={`${guide.title} - kiteboarding guide cover image`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link
                href="/guides"
                className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Guides
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSkillLevelColor(guide.skillLevel)}`}
                >
                  {guide.skillLevel.charAt(0).toUpperCase() + guide.skillLevel.slice(1)}
                </span>
                <span className="bg-coral-orange text-white px-3 py-1 rounded text-sm font-medium">
                  {guide.tripType}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">{guide.title}</h1>
              <div className="flex items-center text-white/80 space-x-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{guide.readTime} min read</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{guide.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-deep-navy/80 font-open-sans leading-relaxed mb-8">{guide.summary}</p>
                  <div
                    className="font-open-sans text-deep-navy/90 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: guide.content }}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-sand-beige rounded-lg p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-deep-navy mb-4 font-montserrat">Guide Information</h3>

                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-semibold text-deep-navy/60">Skill Level</span>
                      <div className="mt-1">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${getSkillLevelColor(guide.skillLevel)}`}
                        >
                          {guide.skillLevel.charAt(0).toUpperCase() + guide.skillLevel.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm font-semibold text-deep-navy/60">Topic</span>
                      <p className="text-deep-navy font-medium">{guide.tripType}</p>
                    </div>

                    <div>
                      <span className="text-sm font-semibold text-deep-navy/60">Author</span>
                      <p className="text-deep-navy font-medium">{guide.author}</p>
                    </div>

                    <div>
                      <span className="text-sm font-semibold text-deep-navy/60">Reading Time</span>
                      <p className="text-deep-navy font-medium">{guide.readTime} minutes</p>
                    </div>

                    {guide.destination && (
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Related Destination</span>
                        <Link
                          href={`/destinations/${guide.destination}`}
                          className="flex items-center text-turquoise hover:text-turquoise/80 font-medium mt-1"
                        >
                          <MapPin className="w-4 h-4 mr-1" />
                          View Destination
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-deep-navy/10">
                    <h4 className="text-sm font-semibold text-deep-navy/60 mb-3">Ready to Experience This?</h4>
                    <Link
                      href="/packages"
                      className="block w-full text-center bg-coral-orange text-white py-3 px-4 rounded-lg hover:bg-coral-orange/90 transition-colors font-semibold"
                    >
                      View Packages
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const guide = guides.find((g) => g.slug === params.slug)

  if (!guide) {
    return {
      title: "Guide Not Found",
    }
  }

  return {
    title: `${guide.title} | KiteSafaris.com`,
    description: guide.summary,
  }
}
