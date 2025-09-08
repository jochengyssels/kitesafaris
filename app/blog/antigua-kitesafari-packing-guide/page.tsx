import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, User, ArrowLeft, Calendar, Luggage, CheckCircle, Sun, Wind, Thermometer, Shield, Camera, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Antigua Kitesurfing Packing List 2025 | Caribbean Kitesurf Cruise Essentials Guide",
  description: "Complete Antigua kitesurfing packing list for Caribbean kitesurf cruise. Essential kitesafari packing checklist, gear guide, and travel tips for Antigua kiteboarding trips.",
  keywords: "Antigua kitesurfing packing list, Caribbean kitesurf cruise essentials, kitesafari packing checklist Antigua, what to pack Antigua kitesurfing trip, kitesurf holiday packing guide Caribbean, Antigua kitesurf gear checklist, Caribbean kiteboarding travel essentials, Antigua kite cruise packing tips, kitesurfing Antigua what to bring, Antigua windsurf packing list, kitesurfing equipment travel checklist, kitesurf gear packing list tropical, kiteboarding travel bag essentials, kitesurf holiday gear guide, kitesurfing vacation packing tips, tropical kitesurfing packing essentials, Caribbean sun protection kitesurfing, kitesurf packing list warm weather, kitesurfing gear hot climate packing, kitesurf cruise clothing essentials",
  alternates: {
    canonical: "https://www.kitesafaris.com/blog/antigua-kitesafari-packing-guide",
  },
  openGraph: {
    title: "Antigua Kitesurfing Packing List 2025 | Caribbean Kitesurf Cruise Essentials",
    description: "Complete Antigua kitesurfing packing list for Caribbean kitesurf cruise. Essential kitesafari packing checklist, gear guide, and travel tips for Antigua kiteboarding trips.",
    type: "article",
    url: "https://www.kitesafaris.com/blog/antigua-kitesafari-packing-guide",
    images: [
      {
        url: "/packing-images/caribbean-travel/caribbean-travel-main.svg",
        width: 800,
        height: 600,
        alt: "Antigua kitesurfing packing list - Caribbean kitesurf cruise essentials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antigua Kitesurfing Packing List 2025 | Caribbean Kitesurf Cruise Essentials",
    description: "Complete Antigua kitesurfing packing list for Caribbean kitesurf cruise. Essential kitesafari packing checklist and gear guide.",
    images: ["/packing-images/caribbean-travel/caribbean-travel-main.svg"],
  },
}

export default function AntiguaPackingGuidePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Antigua Kitesurfing Packing List 2025: Caribbean Kitesurf Cruise Essentials",
    "description": "Complete Antigua kitesurfing packing list for Caribbean kitesurf cruise. Essential kitesafari packing checklist, gear guide, and travel tips for Antigua kiteboarding trips.",
    "image": "https://www.kitesafaris.com/packing-images/caribbean-travel/caribbean-travel-main.svg",
    "author": {
      "@type": "Organization",
      "name": "KiteSafaris",
      "url": "https://www.kitesafaris.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KiteSafaris",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.kitesafaris.com/kitesafaris-zebra-logo.png"
      }
    },
    "datePublished": "2025-01-15",
    "dateModified": "2025-01-15",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.kitesafaris.com/blog/antigua-kitesafari-packing-guide"
    },
    "keywords": [
      "Antigua kitesurfing packing list",
      "Caribbean kitesurf cruise essentials",
      "kitesafari packing checklist Antigua",
      "what to pack Antigua kitesurfing trip",
      "kitesurf holiday packing guide Caribbean",
      "Antigua kitesurf gear checklist",
      "Caribbean kiteboarding travel essentials",
      "Antigua kite cruise packing tips",
      "kitesurfing Antigua what to bring",
      "Antigua windsurf packing list",
      "kitesurfing equipment travel checklist",
      "kitesurf gear packing list tropical",
      "kiteboarding travel bag essentials",
      "kitesurf holiday gear guide",
      "kitesurfing vacation packing tips",
      "tropical kitesurfing packing essentials",
      "Caribbean sun protection kitesurfing",
      "kitesurf packing list warm weather",
      "kitesurfing gear hot climate packing",
      "kitesurf cruise clothing essentials"
    ],
    "about": [
      {
        "@type": "Thing",
        "name": "Kitesurfing",
        "description": "Water sport using a kite and board"
      },
      {
        "@type": "Place",
        "name": "Antigua",
        "description": "Caribbean island destination for kitesurfing"
      },
      {
        "@type": "Thing",
        "name": "Travel Packing",
        "description": "Essential items for kitesurfing trips"
      }
    ],
    "mentions": [
      {
        "@type": "Place",
        "name": "Antigua and Barbuda",
        "description": "Caribbean destination"
      },
      {
        "@type": "Thing",
        "name": "Kitesurfing Equipment",
        "description": "Gear needed for kitesurfing"
      },
      {
        "@type": "Thing",
        "name": "Sun Protection",
        "description": "Essential for tropical kitesurfing"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navigation />
      
      <div className="min-h-screen bg-white">
        <main className="pt-20">
          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden">
            <Image
              src="/antigua-kiteboarding-catamaran-sunset.jpg"
              alt="Antigua kiteboarding adventure on luxury catamaran"
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
                    Travel Guide
                  </span>
                  <span className="bg-coral-orange/20 text-coral-orange px-3 py-1 rounded text-sm font-medium">
                    Antigua
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">
                  Antigua Kitesurfing Packing List 2025: Caribbean Kitesurf Cruise Essentials
                </h1>
                <div className="flex items-center text-white/80 space-x-6">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>12 min read</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>KiteSafaris Team</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>January 2025</span>
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
                      Based on extensive research of Antigua's tropical maritime climate, consistent trade wind conditions, and the unique requirements of a Caribbean kitesurf cruise expedition, here's your comprehensive <strong>Antigua kitesurfing packing list</strong> for the ultimate kitesafari adventure. This essential <strong>kitesurf holiday packing guide Caribbean</strong> covers everything you need for your <strong>Antigua kiteboarding trip</strong>.
                    </p>
                    
                    {/* Climate Overview */}
                    <div className="bg-gradient-to-r from-turquoise-50 to-blue-50 rounded-lg p-6 mb-8">
                      <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                        <Thermometer className="w-6 h-6 text-turquoise" />
                        🌴 Antigua Climate Overview
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Temperature:</strong> 77-88°F (25-31°C) year-round</p>
                          <p><strong>Best Kiting Season:</strong> December-July</p>
                          <p><strong>Wind Conditions:</strong> 12-20 knots northeast trade winds</p>
                        </div>
                        <div>
                          <p><strong>Water Temperature:</strong> 79-84°F (26-29°C)</p>
                          <p><strong>UV Index:</strong> Extremely high (11+)</p>
                          <p><strong>Humidity:</strong> 75-85% tropical maritime</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Kitesurfing Equipment */}
                    <div className="relative mb-8">
                      <Image
                        src="/packing-images/kitesurfing-equipment/kitesurfing-equipment-main.svg"
                        alt="Kitesurfing Equipment - Essential kiteboarding gear for your Antigua adventure"
                        width={800}
                        height={600}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                          <Wind className="w-6 h-6 text-coral-orange" />
                          🪁 Kitesurfing Equipment
                        </h2>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Essential Kitesurfing Equipment Travel Checklist</h3>
                    <p className="text-gray-700 mb-4">Your complete <strong>kitesurfing equipment travel checklist</strong> for Antigua's perfect conditions:</p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li><strong>Kites:</strong> 10m, 12m, 14m most common for Antigua's consistent 12-20 knot winds - essential for your <strong>kitesurf gear packing list tropical</strong> climate</li>
                      <li><strong>Board:</strong> Twin tip recommended for steady trade wind conditions</li>
                      <li><strong>Harness:</strong> Comfortable seat or waist harness with integrated safety leash</li>
                      <li><strong>Control Bar:</strong> Modern safety systems with quick-release mechanisms</li>
                      <li><strong>Safety Equipment:</strong> Impact vest, helmet, backup safety leash, line knife</li>
                      <li><strong>Repair Kit:</strong> Essential for equipment maintenance and emergency fixes</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Optional Gear</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                      <li><strong>Pump:</strong> Kite schools provide pumps, but backup recommended</li>
                      <li><strong>Wetsuit:</strong> Generally not needed - warm water year-round</li>
                      <li><strong>Reef Booties:</strong> Protection for rocky launch areas and coral</li>
                      <li><strong>Kite Gloves:</strong> Optional for extended sessions and grip enhancement</li>
                    </ul>
                    
                    {/* Clothing Essentials */}
                    <div className="relative mb-8">
                      <Image
                        src="/packing-images/tropical-clothing/tropical-clothing-main.svg"
                        alt="Tropical Clothing - Quick-dry and sun-protective clothing essentials"
                        width={800}
                        height={600}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                          <Luggage className="w-6 h-6 text-coral-orange" />
                          👕 Clothing Essentials
                        </h2>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Kitesurf Cruise Clothing Essentials</h3>
                    <p className="text-gray-700 mb-4">Essential <strong>kitesurf cruise clothing essentials</strong> for your Caribbean adventure:</p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li><strong>3-4 swimsuits/board shorts</strong> for daily rotation - perfect for <strong>kitesurfing gear hot climate packing</strong></li>
                      <li><strong>Secure athletic swimwear</strong> for active kitesurfing (no loose ties)</li>
                      <li><strong>Quick-dry materials</strong> essential for tropical humidity and <strong>kitesurf packing list warm weather</strong></li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Sun Protection Clothing (Critical)</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li><strong>Long-sleeve rashguards</strong> with UPF 50+ rating</li>
                      <li><strong>UV protection swim shirts</strong> for extended water exposure</li>
                      <li><strong>Lightweight cover-ups</strong> for beach time between sessions</li>
                      <li><strong>Wide-brimmed sun hat</strong> with chin strap for windy conditions</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Casual & Evening Wear</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li><strong>Lightweight cotton t-shirts</strong> and breathable tank tops</li>
                      <li><strong>Linen shorts and pants</strong> for maximum breathability</li>
                      <li><strong>Sundresses</strong> for comfortable evening dining</li>
                      <li><strong>Light cardigan/hoodie</strong> for air-conditioned restaurants</li>
                      <li><strong>One nice outfit</strong> for special dinners and island excursions</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Footwear</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                      <li><strong>Flip-flops</strong> for beach and casual wear</li>
                      <li><strong>Water shoes</strong> for reef protection and rocky areas</li>
                      <li><strong>Comfortable walking sandals</strong> for exploring</li>
                      <li><strong>Lightweight sneakers</strong> for island excursions</li>
                      <li><strong>Dress sandals</strong> for dinner and evening activities</li>
                    </ul>
                    
                    {/* Sun Protection */}
                    <div className="relative mb-8">
                      <Image
                        src="/packing-images/sun-protection/sun-protection-main.svg"
                        alt="Sun Protection - Critical sun safety items for Caribbean conditions"
                        width={800}
                        height={600}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                          <Sun className="w-6 h-6 text-coral-orange" />
                          ☀️ Sun Protection (Absolutely Critical)
                        </h2>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 border-l-4 border-orange-400 p-6 mb-8">
                      
                      <h3 className="text-xl font-semibold text-deep-navy mb-3">Caribbean Sun Protection Kitesurfing Essentials</h3>
                      <p className="text-gray-700 mb-4">Critical <strong>Caribbean sun protection kitesurfing</strong> items for your safety:</p>
                      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                        <li><strong>SPF 50+ minimum</strong> - Caribbean sun is extremely intense, essential for <strong>tropical kitesurfing packing essentials</strong></li>
                        <li><strong>Reef-safe formulation</strong> - Protect marine environment</li>
                        <li><strong>Water-resistant</strong> for extended water activities</li>
                        <li><strong>Broad-spectrum UVA/UVB protection</strong></li>
                        <li><strong>Recommended brands:</strong> Thinksport, Mama Kuleana, Badger</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold text-deep-navy mb-3">Application Protocol</h3>
                      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                        <li><strong>Apply 15 minutes before sun exposure</strong></li>
                        <li><strong>Reapply every 2 hours</strong> or after swimming/sweating</li>
                        <li><strong>Extra attention to face, shoulders, and feet</strong></li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold text-deep-navy mb-3">Additional Sun Protection</h3>
                      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                        <li><strong>Polarized sunglasses</strong> with retention strap</li>
                        <li><strong>SPF 30+ lip balm</strong> - lips burn easily in Caribbean sun</li>
                        <li><strong>Zinc oxide</strong> for nose and face protection</li>
                        <li><strong>After-sun lotion</strong> with aloe vera for evening care</li>
                      </ul>
                    </div>
                    
                    {/* Health & Safety */}
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Heart className="w-6 h-6 text-turquoise" />
                      🏥 Health & Safety
                    </h2>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Medications</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li><strong>Personal prescriptions</strong> (bring extra in case of delays)</li>
                      <li><strong>Seasickness remedies</strong> (even if not typically prone)</li>
                      <li><strong>Pain relievers</strong> (ibuprofen/acetaminophen) for muscle soreness</li>
                      <li><strong>Antihistamines</strong> for potential allergic reactions</li>
                      <li><strong>Anti-diarrheal medication</strong> for dietary adjustments</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">First Aid & Hygiene</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                      <li><strong>Waterproof bandages</strong> for cuts from equipment or coral</li>
                      <li><strong>Antiseptic wipes</strong> for wound cleaning</li>
                      <li><strong>DEET-based insect repellent</strong> for evening protection</li>
                      <li><strong>Hydrocortisone cream</strong> for insect bites and skin irritation</li>
                      <li><strong>Biodegradable toiletries</strong> to minimize environmental impact</li>
                    </ul>
                    
                    {/* Electronics */}
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Camera className="w-6 h-6 text-turquoise" />
                      📱 Electronics & Technology
                    </h2>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Waterproof Protection</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li><strong>Waterproof phone case</strong> (essential for daily water activities)</li>
                      <li><strong>GoPro or action camera</strong> with various mounts for kiting footage</li>
                      <li><strong>Large dry bag</strong> for electronics and valuables</li>
                      <li><strong>Waterproof watch</strong> for timing sessions and tides</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Power & Connectivity</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                      <li><strong>Universal power adapter</strong> (Type A/B plugs for Antigua)</li>
                      <li><strong>High-capacity power bank</strong> for extended excursions</li>
                      <li><strong>Multiple charging cables</strong> and backup options</li>
                      <li><strong>Bluetooth waterproof speaker</strong> for catamaran entertainment</li>
                    </ul>
                    
                    {/* Beach Essentials */}
                    <div className="relative mb-8">
                      <Image
                        src="/packing-images/travel-essentials/travel-essentials-main.svg"
                        alt="Travel Essentials - Must-have items for your kitesafari adventure"
                        width={800}
                        height={600}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                          <Shield className="w-6 h-6 text-coral-orange" />
                          🏖️ Beach & Convenience Items
                        </h2>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Kiteboarding Travel Bag Essentials</h3>
                    <p className="text-gray-700 mb-4">Complete <strong>kiteboarding travel bag essentials</strong> for your Antigua trip:</p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li><strong>2-3 quick-dry towels</strong> (avoid heavy cotton) - perfect for <strong>kitesurfing vacation packing tips</strong></li>
                      <li><strong>Insulated water bottle</strong> for hydration in tropical heat</li>
                      <li><strong>Electrolyte powder/tablets</strong> for post-kiting recovery</li>
                      <li><strong>Healthy snacks</strong> for energy during long kite sessions</li>
                      <li><strong>Beach bag/dry bag</strong> for daily essentials - essential for <strong>kitesurf holiday gear guide</strong></li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-deep-navy mb-3">Comfort Items</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                      <li><strong>Travel pillow</strong> for long-haul flights</li>
                      <li><strong>Eye mask and earplugs</strong> for quality sleep</li>
                      <li><strong>Portable clothesline</strong> for drying wet gear</li>
                      <li><strong>Laundry detergent pods</strong> for mid-trip washing</li>
                      <li><strong>Compact umbrella</strong> for unexpected tropical showers</li>
                    </ul>
                    
                    {/* Seasonal Considerations */}
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">📅 Seasonal Packing Considerations</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-deep-navy mb-2">December-February</h3>
                        <p className="text-sm text-gray-700 mb-2"><strong>Peak Dry Season</strong></p>
                        <p className="text-sm text-gray-700">77-82°F (25-28°C) - slightly cooler evenings. Light cardigan for evening dining.</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-deep-navy mb-2">March-May</h3>
                        <p className="text-sm text-gray-700 mb-2"><strong>Perfect Spring</strong></p>
                        <p className="text-sm text-gray-700">79-84°F (26-29°C) - warming up. Extra sunscreen and cooling towels.</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-deep-navy mb-2">June-November</h3>
                        <p className="text-sm text-gray-700 mb-2"><strong>Wet Season</strong></p>
                        <p className="text-sm text-gray-700">84-88°F (29-31°C) - warmest period. Rain poncho and extra dry bags.</p>
                      </div>
                    </div>
                    
                    {/* Expert Tips */}
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">💡 Expert Packing Tips</h2>
                    
                    <div className="bg-turquoise-50 border-l-4 border-turquoise-400 p-6 mb-6">
                      <h3 className="text-lg font-semibold text-deep-navy mb-3">Equipment Transportation</h3>
                      <ol className="list-decimal list-inside text-gray-700 space-y-2">
                        <li><strong>Use wheeled boardbag</strong> for easy airport navigation</li>
                        <li><strong>Pack kites without kite bags</strong> to save significant weight</li>
                        <li><strong>Wrap boards carefully</strong> in bubble wrap or towels</li>
                        <li><strong>Remove fins/bindings</strong> and pack separately</li>
                      </ol>
                    </div>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                      <h3 className="text-lg font-semibold text-deep-navy mb-3">Smart Packing Strategies</h3>
                      <ol className="list-decimal list-inside text-gray-700 space-y-2">
                        <li><strong>Bring reef-safe products</strong> to protect marine environment</li>
                        <li><strong>Pack electrolyte supplements</strong> for tropical heat management</li>
                        <li><strong>Store electronics in dry bags</strong> even when not on water</li>
                        <li><strong>Bring extra camera batteries/SD cards</strong> for daily documentation</li>
                        <li><strong>Pack light layers</strong> for air-conditioned spaces</li>
                        <li><strong>Include biodegradable toiletries</strong> for environmental responsibility</li>
                      </ol>
                    </div>
                    
                    {/* What NOT to Pack */}
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">🚫 What NOT to Pack</h2>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li><strong>Heavy winter clothing</strong> (unnecessary in tropical climate)</li>
                        <li><strong>Non-reef-safe sunscreens</strong> (harmful to coral reefs)</li>
                        <li><strong>Cotton towels</strong> (too heavy and slow-drying)</li>
                        <li><strong>Excessive formal wear</strong> (casual Caribbean dress code)</li>
                        <li><strong>Hair dryer</strong> (provided at accommodations)</li>
                        <li><strong>Too many shoes</strong> (2-3 pairs maximum recommended)</li>
                        <li><strong>Large liquid bottles</strong> (buy locally or use travel sizes)</li>
                        <li><strong>Expensive jewelry</strong> (risk of loss in water activities)</li>
                        <li><strong>Dark clothing</strong> for daytime (absorbs excessive heat)</li>
                      </ul>
                    </div>
                    
                    {/* Priority Levels */}
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">📊 Packing Priority Levels</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-800 mb-3">MUST HAVE (Essential)</h3>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>✅ Valid passport and travel documents</li>
                          <li>✅ Reef-safe sunscreen SPF 50+</li>
                          <li>✅ Multiple swimwear/board shorts</li>
                          <li>✅ Long-sleeve rashguards/sun shirts</li>
                          <li>✅ Wide-brimmed sun hat</li>
                          <li>✅ Polarized sunglasses with strap</li>
                          <li>✅ Personal medications</li>
                          <li>✅ Waterproof phone case</li>
                        </ul>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-yellow-800 mb-3">HIGHLY RECOMMENDED</h3>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>⭐ Kite gear (if bringing own equipment)</li>
                          <li>⭐ Quick-dry towels</li>
                          <li>⭐ DEET insect repellent</li>
                          <li>⭐ After-sun lotion with aloe</li>
                          <li>⭐ Action camera/GoPro</li>
                          <li>⭐ Electrolyte supplements</li>
                          <li>⭐ Light evening wear</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-3">NICE TO HAVE</h3>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>💫 Bluetooth waterproof speaker</li>
                          <li>💫 Personal snorkeling gear</li>
                          <li>💫 Travel pillow and comfort items</li>
                          <li>💫 Portable clothesline</li>
                          <li>💫 Extra camera accessories</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* What to Pack Antigua Kitesurfing Trip */}
                    <div className="bg-gradient-to-r from-turquoise-50 to-blue-50 rounded-lg p-6 mb-8">
                      <h2 className="text-2xl font-semibold text-deep-navy mb-4">What to Pack Antigua Kitesurfing Trip: Complete Checklist</h2>
                      <p className="text-gray-700 mb-4">
                        Planning your <strong>Antigua kitesurfing trip</strong>? Here's your complete <strong>kitesafari packing checklist Antigua</strong> with everything you need for the perfect <strong>Caribbean kiteboarding travel essentials</strong> experience.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-deep-navy mb-2">Essential Categories:</h3>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>✅ <strong>Kitesurfing equipment travel checklist</strong></li>
                            <li>✅ <strong>Kitesurf cruise clothing essentials</strong></li>
                            <li>✅ <strong>Caribbean sun protection kitesurfing</strong></li>
                            <li>✅ <strong>Kiteboarding travel bag essentials</strong></li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-deep-navy mb-2">Climate Considerations:</h3>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>🌡️ <strong>Kitesurfing gear hot climate packing</strong></li>
                            <li>☀️ <strong>Tropical kitesurfing packing essentials</strong></li>
                            <li>🏝️ <strong>Kitesurf packing list warm weather</strong></li>
                            <li>🌊 <strong>Kitesurf holiday packing guide Caribbean</strong></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Kitesafari-Specific */}
                    <div className="relative mb-8">
                      <Image
                        src="/packing-images/caribbean-travel/caribbean-travel-main.svg"
                        alt="Caribbean Travel - Perfect for your tropical kitesurfing vacation"
                        width={800}
                        height={600}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                          <span className="text-2xl">🎯</span>
                          Kitesafari-Specific Considerations
                        </h2>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-turquoise-50 to-blue-50 rounded-lg p-6 mb-8">
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li><strong>Pack for 7 days</strong> with potential laundry mid-week</li>
                        <li><strong>Bring multiple swimwear options</strong> for daily water activities</li>
                        <li><strong>Include day bag</strong> for shore excursions and island hopping</li>
                        <li><strong>Pack seasickness remedies</strong> even if not typically prone</li>
                        <li><strong>Bring portable speaker</strong> for catamaran entertainment</li>
                        <li><strong>Include extra batteries</strong> for daily photo/video documentation</li>
                        <li><strong>Pack one nice outfit</strong> for special dinners and cultural experiences</li>
                      </ul>
                    </div>
                    
                    {/* FAQ Section for SEO */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                      <h2 className="text-2xl font-semibold text-deep-navy mb-6">Frequently Asked Questions: Antigua Kitesurfing Packing</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-deep-navy mb-2">What to pack Antigua kitesurfing trip?</h3>
                          <p className="text-gray-700">
                            For your <strong>Antigua kitesurfing trip</strong>, pack essential <strong>kitesurfing equipment travel checklist</strong> items including kites (10m, 12m, 14m), twin-tip board, harness, and safety equipment. Don't forget <strong>Caribbean sun protection kitesurfing</strong> essentials like SPF 50+ reef-safe sunscreen and UPF 50+ rashguards.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-deep-navy mb-2">What are the essential kitesurf cruise clothing essentials?</h3>
                          <p className="text-gray-700">
                            Your <strong>kitesurf cruise clothing essentials</strong> should include 3-4 quick-dry swimsuits, long-sleeve rashguards with UPF 50+, lightweight cover-ups, and wide-brimmed sun hats. Focus on <strong>kitesurfing gear hot climate packing</strong> with breathable, quick-dry materials.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-deep-navy mb-2">How to pack for tropical kitesurfing packing essentials?</h3>
                          <p className="text-gray-700">
                            For <strong>tropical kitesurfing packing essentials</strong>, prioritize <strong>kitesurf packing list warm weather</strong> items: reef-safe sunscreen, electrolyte supplements, quick-dry towels, and waterproof electronics protection. Your <strong>kitesurf holiday gear guide</strong> should focus on heat management and sun protection.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-deep-navy mb-2">What's included in a complete kitesafari packing checklist Antigua?</h3>
                          <p className="text-gray-700">
                            A complete <strong>kitesafari packing checklist Antigua</strong> includes <strong>kiteboarding travel bag essentials</strong> like quick-dry towels, insulated water bottles, healthy snacks, and beach bags. Don't forget <strong>kitesurfing vacation packing tips</strong> for seasickness remedies and extra camera batteries.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-turquoise-50 border-l-4 border-turquoise-400 p-6 my-8">
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Final Pro Tip: Your Complete Antigua Kitesurfing Packing List</h3>
                      <p className="text-gray-700">
                        This comprehensive <strong>Antigua kitesurfing packing list</strong> ensures you're prepared for Antigua's intense tropical sun, consistent trade winds, and the unique demands of a luxury <strong>Caribbean kitesurf cruise</strong> adventure. Focus on <strong>Caribbean sun protection kitesurfing</strong>, quick-dry materials, and reef-safe products to maximize your comfort while protecting the pristine Caribbean environment you'll be exploring. This <strong>kitesafari packing checklist Antigua</strong> covers all your <strong>kitesurf holiday packing guide Caribbean</strong> needs.
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
                        <p className="text-deep-navy font-medium">Travel Guide</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Destination</span>
                        <p className="text-deep-navy font-medium">Antigua & Barbuda</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Author</span>
                        <p className="text-deep-navy font-medium">KiteSafaris Team</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Reading Time</span>
                        <p className="text-deep-navy font-medium">12 minutes</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Published</span>
                        <p className="text-deep-navy font-medium">January 2025</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-deep-navy/10">
                      <h4 className="text-sm font-semibold text-deep-navy/60 mb-3">Ready for Your Antigua Adventure?</h4>
                      <Link
                        href="/antigua-kite-safari-december-6-2025"
                        className="block w-full text-center bg-coral-orange text-white py-3 px-4 rounded-lg hover:bg-coral-orange/90 transition-colors font-semibold mb-2"
                      >
                        Book Antigua Kitesafari
                      </Link>
                      <Link
                        href="/packages"
                        className="block w-full text-center bg-turquoise text-white py-3 px-4 rounded-lg hover:bg-turquoise/90 transition-colors font-semibold"
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
