import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, User, ArrowLeft, Calendar, MapPin, Wind, Thermometer } from "lucide-react"

export const metadata: Metadata = {
  title: "Mediterranean vs Caribbean: Which Kiteboarding Destination is Right for You? | KiteSafaris Blog",
  description: "Compare wind conditions, water temperatures, and cultural experiences between Mediterranean and Caribbean kiteboarding destinations.",
  keywords: "Mediterranean kiteboarding, Caribbean kiteboarding, kiteboarding destinations, wind conditions comparison",
  openGraph: {
    title: "Mediterranean vs Caribbean: Which Kiteboarding Destination is Right for You?",
    description: "Compare wind conditions, water temperatures, and cultural experiences between Mediterranean and Caribbean kiteboarding destinations.",
    type: "article",
  },
}

export default function MediterraneanVsCaribbeanPage() {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-white">
        <main className="pt-20">
          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden">
            <Image
              src="https://daggzx92agk0rfom.public.blob.vercel-storage.com/greece:img-catamaran-farback.jpg"
              alt="Greece and Sardinia destinations map"
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
                    Destination Guide
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">
                  Mediterranean vs Caribbean: Which Kiteboarding Destination is Right for You?
                </h1>
                <div className="flex items-center text-white/80 space-x-6">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>7 min read</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>KiteSafaris Team</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>October 2024</span>
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
                      Choosing between Mediterranean and Caribbean kiteboarding destinations can be challenging. Both offer unique experiences, but understanding their differences will help you select the perfect destination for your kite safari adventure.
                    </p>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Wind className="w-6 h-6 text-turquoise" />
                      Wind Conditions Comparison
                    </h2>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Caribbean Trade Winds</h3>
                    <p className="text-gray-700 mb-4">
                      The Caribbean benefits from consistent trade winds that blow from November to May. These winds typically range from 15-25 knots, providing reliable conditions perfect for all skill levels. The eastern Caribbean islands, like Antigua, experience the strongest and most consistent winds.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Mediterranean Meltemi</h3>
                    <p className="text-gray-700 mb-4">
                      The Mediterranean's famous Meltemi winds blow during the summer months (June to September), offering strong and consistent conditions. These winds can reach 25-35 knots, making them ideal for advanced riders seeking challenging conditions.
                    </p>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Thermometer className="w-6 h-6 text-turquoise" />
                      Water Temperature & Climate
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-deep-navy mb-2">Caribbean</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>Water: 26-28°C (79-82°F)</li>
                          <li>Air: 25-30°C (77-86°F)</li>
                          <li>Season: November to May</li>
                          <li>Humidity: High</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-deep-navy mb-2">Mediterranean</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>Water: 22-26°C (72-79°F)</li>
                          <li>Air: 25-35°C (77-95°F)</li>
                          <li>Season: June to September</li>
                          <li>Humidity: Moderate</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-turquoise" />
                      Cultural Experiences
                    </h2>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Caribbean Culture</h3>
                    <p className="text-gray-700 mb-4">
                      The Caribbean offers a vibrant mix of cultures, from reggae music and rum cocktails to colonial architecture and local markets. The laid-back island lifestyle creates a relaxed atmosphere perfect for unwinding after kiteboarding sessions.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Mediterranean Heritage</h3>
                    <p className="text-gray-700 mb-4">
                      The Mediterranean is rich in history and culture, with ancient ruins, traditional villages, and world-class cuisine. From Greek mythology to Italian art, the region offers endless opportunities for cultural exploration.
                    </p>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Best Time to Visit
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-turquoise-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-deep-navy mb-2">Caribbean Season</h4>
                        <p className="text-sm text-gray-700 mb-2">November to May</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Peak season: December to March</li>
                          <li>• Strongest winds: January to March</li>
                          <li>• Best for beginners: April to May</li>
                        </ul>
                      </div>
                      <div className="bg-sand-beige p-4 rounded-lg">
                        <h4 className="font-semibold text-deep-navy mb-2">Mediterranean Season</h4>
                        <p className="text-sm text-gray-700 mb-2">June to September</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Peak season: July to August</li>
                          <li>• Strongest winds: July to August</li>
                          <li>• Best for advanced: June to September</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Which Destination is Right for You?
                    </h2>
                    
                    <div className="bg-turquoise-50 border-l-4 border-turquoise-400 p-6 my-8">
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Choose Caribbean if:</h3>
                      <ul className="text-gray-700 space-y-1">
                        <li>• You're a beginner or intermediate rider</li>
                        <li>• You prefer consistent, moderate winds</li>
                        <li>• You want warm water year-round</li>
                        <li>• You enjoy tropical island vibes</li>
                        <li>• You're traveling in winter/spring</li>
                      </ul>
                    </div>
                    
                    <div className="bg-sand-beige border-l-4 border-coral-orange p-6 my-8">
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Choose Mediterranean if:</h3>
                      <ul className="text-gray-700 space-y-1">
                        <li>• You're an advanced rider seeking strong winds</li>
                        <li>• You enjoy cultural and historical exploration</li>
                        <li>• You prefer European summer travel</li>
                        <li>• You want to combine kiteboarding with sightseeing</li>
                        <li>• You're comfortable with variable conditions</li>
                      </ul>
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
                        <p className="text-deep-navy font-medium">Destination Guide</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Author</span>
                        <p className="text-deep-navy font-medium">KiteSafaris Team</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Reading Time</span>
                        <p className="text-deep-navy font-medium">7 minutes</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Published</span>
                        <p className="text-deep-navy font-medium">October 2024</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-deep-navy/10">
                      <h4 className="text-sm font-semibold text-deep-navy/60 mb-3">Ready to Choose Your Destination?</h4>
                      <Link
                        href="/packages"
                        className="block w-full text-center bg-coral-orange text-white py-3 px-4 rounded-lg hover:bg-coral-orange/90 transition-colors font-semibold"
                      >
                        View All Packages
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
