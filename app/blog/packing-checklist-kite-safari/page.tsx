import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, User, ArrowLeft, Calendar, Luggage, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Ultimate Packing Checklist for Kite Safari Adventure | KiteSafaris Blog",
  description: "Don't forget anything! Complete packing guide for kiteboarding equipment, travel essentials, and luxury catamaran living.",
  keywords: "kite safari packing, kiteboarding travel checklist, catamaran packing, travel essentials",
  alternates: {
    canonical: "https://www.kitesafaris.com/blog/packing-checklist-kite-safari",
  },
  openGraph: {
    title: "Ultimate Packing Checklist for Your Kite Safari Adventure",
    description: "Complete packing guide for kiteboarding equipment, travel essentials, and luxury catamaran living.",
    type: "article",
  },
}

export default function PackingChecklistPage() {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-white">
        <main className="pt-20">
          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden">
            <Image
              src="/premium-kiteboarding-equipment-on-luxury-yacht-dec.png"
              alt="Premium kiteboarding equipment on luxury yacht"
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
                    Travel Tips
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">
                  Ultimate Packing Checklist for Your Kite Safari Adventure
                </h1>
                <div className="flex items-center text-white/80 space-x-6">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>5 min read</span>
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
                      Packing for a kite safari adventure requires careful planning. Our comprehensive checklist ensures you have everything you need for an unforgettable Caribbean kiteboarding experience.
                    </p>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Luggage className="w-6 h-6 text-turquoise" />
                      Essential Clothing
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Quick-dry board shorts (3-4 pairs)</li>
                      <li>Rash guards or UV protection shirts</li>
                      <li>Lightweight, breathable t-shirts</li>
                      <li>Long-sleeve sun protection shirt</li>
                      <li>Light jacket or hoodie for evenings</li>
                      <li>Comfortable shorts and pants</li>
                      <li>Swimwear (multiple sets)</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-turquoise" />
                      Personal Gear & Safety
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Reef-safe sunscreen (SPF 30+ or higher)</li>
                      <li>Polarized sunglasses with UV protection</li>
                      <li>Sun hat or cap</li>
                      <li>Personal medications and first aid kit</li>
                      <li>Waterproof phone case</li>
                      <li>Personal water bottle</li>
                      <li>Snorkel gear (optional)</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Kiteboarding Equipment
                    </h2>
                    <p className="text-gray-700 mb-4">
                      While we provide all kiteboarding equipment, you may want to bring personal items:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Personal harness (if you have a preferred one)</li>
                      <li>Kiteboarding gloves (optional)</li>
                      <li>Impact vest (if you prefer your own)</li>
                      <li>Personal kite leash (optional)</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Electronics & Documentation
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Camera or GoPro with waterproof housing</li>
                      <li>Extra memory cards and batteries</li>
                      <li>Phone charger and power bank</li>
                      <li>Travel adapter (if needed)</li>
                      <li>Passport and travel documents</li>
                      <li>Travel insurance documents</li>
                      <li>Emergency contact information</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Luxury Catamaran Living
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Our luxury catamarans are fully equipped, but consider bringing:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Lightweight, non-slip shoes</li>
                      <li>Personal toiletries (biodegradable preferred)</li>
                      <li>Beach towel (we provide towels, but you might want your own)</li>
                      <li>Small backpack for day trips</li>
                      <li>Cash for tips and local purchases</li>
                    </ul>
                    
                    <div className="bg-turquoise-50 border-l-4 border-turquoise-400 p-6 my-8">
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Pro Packing Tip</h3>
                      <p className="text-gray-700">
                        Pack in soft, collapsible bags rather than hard suitcases. This saves space on the catamaran and makes storage easier in your cabin.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      What NOT to Pack
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Heavy kiteboarding equipment (we provide everything)</li>
                      <li>Excessive clothing (space is limited on catamarans)</li>
                      <li>Valuables you don't need</li>
                      <li>Non-reef-safe sunscreen</li>
                      <li>Plastic bags (we're eco-friendly)</li>
                    </ul>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-sand-beige rounded-lg p-6 sticky top-24">
                    <h3 className="text-lg font-bold text-deep-navy mb-4 font-montserrat">Article Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Category</span>
                        <p className="text-deep-navy font-medium">Travel Tips</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Author</span>
                        <p className="text-deep-navy font-medium">KiteSafaris Team</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Reading Time</span>
                        <p className="text-deep-navy font-medium">5 minutes</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Published</span>
                        <p className="text-deep-navy font-medium">November 2024</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-deep-navy/10">
                      <h4 className="text-sm font-semibold text-deep-navy/60 mb-3">Ready for Your Adventure?</h4>
                      <Link
                        href="/packages"
                        className="block w-full text-center bg-coral-orange text-white py-3 px-4 rounded-lg hover:bg-coral-orange/90 transition-colors font-semibold"
                      >
                        Book Your Kite Safari
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
