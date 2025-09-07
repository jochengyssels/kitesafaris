import { Navigation } from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, User, ArrowRight, Calendar, Plane } from "lucide-react"
import { SardinianAwakeningCTA } from "@/components/sardinian-awakening-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KiteSafaris Blog - Kiteboarding Travel Guides & Tips",
  description:
    "Expert kiteboarding travel guides, flight tips, destination insights, and kite safari advice from the KiteSafaris team.",
  keywords: "kiteboarding blog, kite safari guides, kitesurfing travel tips, Caribbean kiteboarding, flight guides",
  alternates: {
    canonical: "https://www.kitesafaris.com/blog"
  },
}

const blogPosts = [
  {
    slug: "kitesafaris-aba-kiting-partnership",
    title: "KiteSafaris Partners with ABA Kiting for Luxury Catamaran Operations",
    excerpt:
      "Strategic partnership expands luxury catamaran kitesurfing experiences across Caribbean and Mediterranean destinations. Premium fleet operations with year-round coverage.",
    coverImage: "/partners/partnership-kitesafaris-abakiting.jpg",
    readTime: 8,
    author: "KiteSafaris Team",
    publishDate: "September 2025",
    category: "Partnership",
    featured: true,
  },
  {
    slug: "kitesafaris-prokite-sardegna-partnership",
    title: "KiteSafaris Partners with ProKite Sardegna for Premium Kitesurfing Education",
    excerpt:
      "Strategic partnership brings world-class IKO certified instruction to luxury catamaran safari clients in Sardinia. Learn from the best with integrated safari and lesson packages.",
    coverImage: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/sardinia:img-kitesurfing-lessons.jpg",
    readTime: 6,
    author: "KiteSafaris Team",
    publishDate: "September 2025",
    category: "Partnership",
    featured: false,
  },
  {
    slug: "best-flights-europe-antigua-kite-safaris",
    title: "Best Flights from Europe to Antigua for Kite Safaris (December–April)",
    excerpt:
      "Discover the top 10 flight routes from Europe to Antigua for your kite safari adventure. Direct and one-stop options with airlines, schedules, and pricing.",
    coverImage: "/airplane-flying-over-turquoise-caribbean-waters-wi.png",
    readTime: 8,
    author: "KiteSafaris Team",
    publishDate: "December 2024",
    category: "Travel Guide",
    featured: false,
  },
  {
    slug: "caribbean-kiteboarding-wind-patterns",
    title: "Understanding Caribbean Wind Patterns for Kiteboarding",
    excerpt:
      "Learn about the trade winds, seasonal variations, and best times to kiteboard in the Caribbean. Expert insights for optimal wind conditions.",
    coverImage: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-catamaran-sunset.jpg",
    readTime: 6,
    author: "KiteSafaris Team",
    publishDate: "November 2024",
    category: "Wind Guide",
    featured: false,
  },
  {
    slug: "packing-checklist-kite-safari",
    title: "Ultimate Packing Checklist for Your Kite Safari Adventure",
    excerpt:
      "Don't forget anything! Complete packing guide for kiteboarding equipment, travel essentials, and luxury catamaran living.",
    coverImage: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/catamaran:img-mountain-shore.jpg",
    readTime: 5,
    author: "KiteSafaris Team",
    publishDate: "November 2024",
    category: "Travel Tips",
    featured: false,
  },
  {
    slug: "mediterranean-vs-caribbean-kiteboarding",
    title: "Mediterranean vs Caribbean: Which Kiteboarding Destination is Right for You?",
    excerpt:
      "Compare wind conditions, water temperatures, and cultural experiences between Mediterranean and Caribbean kiteboarding destinations.",
    coverImage: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/greece:img-catamaran-back.jpg",
    readTime: 7,
    author: "KiteSafaris Team",
    publishDate: "October 2024",
    category: "Destination Guide",
    featured: false,
  },
  {
    slug: "kiteboarding-safety-tips-tropical-destinations",
    title: "Essential Safety Tips for Kiteboarding in Tropical Destinations",
    excerpt:
      "Stay safe while kiteboarding in tropical waters. Learn about weather conditions, equipment checks, and emergency procedures.",
    coverImage: "/tropical-kiteboarding-safety.png",
    readTime: 4,
    author: "KiteSafaris Team",
    publishDate: "October 2024",
    category: "Safety Guide",
    featured: false,
  },
  {
    slug: "photography-tips-kiteboarding-adventure",
    title: "How to Capture Stunning Kiteboarding Photos on Your Safari",
    excerpt:
      "Professional photography tips for capturing your kiteboarding adventure. Equipment recommendations and composition techniques.",
    coverImage: "/kiteboarding-photography-tips.png",
    readTime: 6,
    author: "KiteSafaris Team",
    publishDate: "September 2024",
    category: "Photography",
    featured: false,
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-turquoise-50 to-sand-beige-50">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold text-deep-navy mb-6">KiteSafaris Blog</h1>
            <p className="font-open-sans text-xl text-gray-600 max-w-2xl mx-auto">
              Expert kiteboarding travel guides, flight tips, destination insights, and kite safari advice from our
              experienced team.
            </p>
          </div>
        </section>

        <SardinianAwakeningCTA variant="blog" />

        {/* Featured Post */}
        {blogPosts
          .filter((post) => post.featured)
          .map((post) => (
            <section key={post.slug} className="py-16">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative h-64 lg:h-full">
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-coral-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-turquoise-100 text-turquoise-800 px-3 py-1 rounded text-sm font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Plane className="w-4 h-4 mr-1" />
                          <span>Flight Guide</span>
                        </div>
                      </div>
                      <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-deep-navy mb-4">
                        {post.title}
                      </h2>
                      <p className="font-open-sans text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500 text-sm space-x-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{post.readTime} min read</span>
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{post.publishDate}</span>
                          </div>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center bg-coral-orange text-white px-6 py-3 rounded-lg hover:bg-coral-orange/90 transition-colors font-semibold"
                        >
                          Read Article
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

        {/* All Posts Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-8 text-center">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <Image 
                      src={post.coverImage || "/placeholder.svg"} 
                      alt={post.title} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-turquoise-100 text-turquoise-800 px-2 py-1 rounded text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-montserrat text-xl font-bold text-deep-navy mb-3 line-clamp-2">{post.title}</h3>
                    <p className="font-open-sans text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{post.readTime} min</span>
                      </div>
                      <span>{post.publishDate}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-coral-orange hover:text-coral-orange/80 font-semibold text-sm"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
