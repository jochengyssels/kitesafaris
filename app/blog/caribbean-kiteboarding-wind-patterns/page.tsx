import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, User, ArrowLeft, Calendar, Plane, Wind, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Caribbean Wind Patterns for Kiteboarding | KiteSafaris Blog",
  description: "Learn about the trade winds, seasonal variations, and best times to kiteboard in the Caribbean. Expert insights for optimal wind conditions.",
  keywords: "Caribbean wind patterns, trade winds, kiteboarding conditions, Caribbean kiteboarding, wind guide",
  alternates: {
    canonical: "https://www.kitesafaris.com/blog/caribbean-kiteboarding-wind-patterns",
  },
  openGraph: {
    title: "Understanding Caribbean Wind Patterns for Kiteboarding",
    description: "Learn about the trade winds, seasonal variations, and best times to kiteboard in the Caribbean.",
    type: "article",
  },
}

export default function CaribbeanWindPatternsPage() {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-white">
        <main className="pt-20">
          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden">
            <Image
              src="https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-catamaran-sunset.jpg"
              alt="Caribbean kiteboarding with sunset"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container mx-auto">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-turquoise-100 text-turquoise-800 px-3 py-1 rounded text-sm font-medium">
                    Wind Guide
                  </span>
                  <div className="flex items-center text-white/80 text-sm">
                    <Plane className="w-4 h-4 mr-1" />
                    <span>Caribbean</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">
                  Understanding Caribbean Wind Patterns for Kiteboarding
                </h1>
                <div className="flex items-center text-white/80 space-x-6">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>6 min read</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>KiteSafaris Team</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>November 2024</span>
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
                    <p className="text-xl text-deep-navy/80 font-open-sans leading-relaxed mb-8">
                      The Caribbean's trade winds create some of the world's most consistent kiteboarding conditions. Understanding these wind patterns is crucial for planning your kite safari adventure and maximizing your time on the water.
                    </p>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Wind className="w-6 h-6 text-turquoise" />
                      The Trade Winds Explained
                    </h2>
                    <p className="text-gray-700 mb-4">
                      The Caribbean trade winds are part of the global atmospheric circulation system. These consistent easterly winds blow from the northeast across the Atlantic Ocean, providing reliable wind conditions for kiteboarding throughout the region.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Seasonal Variations</h3>
                    <p className="text-gray-700 mb-4">
                      The trade winds are strongest during the winter months (December to March), typically providing 20-30 knot conditions perfect for advanced riders. During the summer months (June to September), winds are generally lighter but still consistent at 10-20 knots, ideal for beginners and intermediate riders.
                    </p>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-turquoise" />
                      Regional Wind Differences
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Wind strength and consistency vary across the Caribbean islands. The eastern islands (like Antigua and Barbuda) typically experience stronger and more consistent winds, while the western Caribbean tends to have lighter, more variable conditions.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Best Kiteboarding Months</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li><strong>December to March:</strong> Strongest winds (20-30 knots), perfect for advanced riders</li>
                      <li><strong>April to May:</strong> Moderate winds (15-25 knots), ideal for all skill levels</li>
                      <li><strong>June to September:</strong> Lighter winds (10-20 knots), great for beginners</li>
                      <li><strong>October to November:</strong> Transition period with variable conditions</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Weather Systems and Wind Patterns
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Understanding how tropical storms, high-pressure systems, and seasonal weather patterns affect wind conditions is essential for safe and successful kiteboarding in the Caribbean.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Hurricane Season Considerations</h3>
                    <p className="text-gray-700 mb-4">
                      The Atlantic hurricane season runs from June to November, with peak activity in August and September. While this can bring unpredictable wind conditions, it also creates opportunities for experienced riders to catch strong winds in the outer bands of storms.
                    </p>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Planning Your Kite Safari
                    </h2>
                    <p className="text-gray-700 mb-4">
                      When planning your Caribbean kite safari, consider the seasonal wind patterns and your skill level. Our experienced captains monitor weather conditions daily and can adjust routes to find the best wind conditions for your group.
                    </p>
                    
                    <div className="bg-turquoise-50 border-l-4 border-turquoise-400 p-6 my-8">
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Pro Tip</h3>
                      <p className="text-gray-700">
                        The trade winds are typically strongest in the morning and early afternoon, making these the best times for kiteboarding sessions. Late afternoon often brings lighter winds, perfect for beginners or those looking for a more relaxed session.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-sand-beige rounded-lg p-6 sticky top-24">
                    <h3 className="text-lg font-bold text-deep-navy mb-4 font-montserrat">Article Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Category</span>
                        <p className="text-deep-navy font-medium">Wind Guide</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Author</span>
                        <p className="text-deep-navy font-medium">KiteSafaris Team</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Reading Time</span>
                        <p className="text-deep-navy font-medium">6 minutes</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Published</span>
                        <p className="text-deep-navy font-medium">November 2024</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-deep-navy/10">
                      <h4 className="text-sm font-semibold text-deep-navy/60 mb-3">Ready to Experience Caribbean Winds?</h4>
                      <Link
                        href="/packages"
                        className="block w-full text-center bg-coral-orange text-white py-3 px-4 rounded-lg hover:bg-coral-orange/90 transition-colors font-semibold"
                      >
                        View Caribbean Packages
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
