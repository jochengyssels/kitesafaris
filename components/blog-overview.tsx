import Image from "next/image"
import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"

// Blog post data structure matching the blog page
interface BlogPost {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  readTime: number
  author: string
  publishDate: string
  category: string
  featured: boolean
}

// Latest blog posts data (matching the blog page structure)
const latestBlogPosts: BlogPost[] = [
  {
    slug: "kitesafaris-kitehouse-sardinia-partnership",
    title: "KiteSafaris Forms Strategic Partnership with Kitehouse Sardinia",
    excerpt:
      "Strategic partnership expands kite-centric accommodations and course offerings in Punta Trettu, Sardinia's top kite destination. IKO certified instruction with luxury accommodations.",
    coverImage: "/partners/partnership-kitehouse-kitesafaris.jpg",
    readTime: 8,
    author: "KiteSafaris Team",
    publishDate: "September 2025",
    category: "Partnership",
    featured: true,
  },
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
    featured: false,
  },
  {
    slug: "best-flights-europe-antigua-kite-safaris",
    title: "Best Flights from Europe to Antigua for Kite Safaris (December–April)",
    excerpt:
      "Complete guide to the top 10 flight routes from Europe to Antigua during kite safari high season. Direct flights, connections, and booking tips for the best deals.",
    coverImage: "/antigua-flights-kite-safari.jpg",
    readTime: 12,
    author: "KiteSafaris Team",
    publishDate: "December 2024",
    category: "Travel Tips",
    featured: false,
  },
]

export default function BlogOverview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-deep-navy font-montserrat mb-6 text-balance">
            Latest from Our Blog
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-open-sans max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest kiteboarding tips, destination guides, and KiteSafaris news. 
            Expert insights to enhance your kite safari experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogPosts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              role="article"
              aria-labelledby={`blog-${post.slug}-title`}
            >
              {/* Image Container */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={`${post.title} - KiteSafaris blog post`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-turquoise-100 text-turquoise-800 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  id={`blog-${post.slug}-title`}
                  className="text-xl md:text-2xl font-bold text-deep-navy font-montserrat mb-3 line-clamp-2 group-hover:text-coral-orange transition-colors"
                >
                  {post.title}
                </h3>
                <p className="text-gray-600 font-open-sans text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{post.readTime} min read</span>
                  </div>
                  <span>{post.publishDate}</span>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-coral-orange hover:text-orange-500 font-semibold text-sm transition-colors group"
                  aria-label={`Read more about ${post.title}`}
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Blog Posts CTA */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center bg-coral-orange hover:bg-orange-500 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            aria-label="View all blog posts"
          >
            View All Blog Posts
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
