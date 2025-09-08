import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, User, ArrowLeft, Calendar, Camera, Settings, Lightbulb } from "lucide-react"

export const metadata: Metadata = {
  title: "Kiteboarding Photography Tips for Safari Adventures | KiteSafaris Blog",
  description: "Professional photography tips for capturing your kiteboarding adventure. Equipment recommendations and composition techniques.",
  keywords: "kiteboarding photography, action photography, sports photography, adventure photography, camera tips",
  alternates: {
    canonical: "https://www.kitesafaris.com/blog/photography-tips-kiteboarding-adventure",
  },
  openGraph: {
    title: "How to Capture Stunning Kiteboarding Photos on Your Safari",
    description: "Professional photography tips for capturing your kiteboarding adventure. Equipment recommendations and composition techniques.",
    type: "article",
  },
}

export default function PhotographyTipsPage() {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-white">
        <main className="pt-20">
          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden">
            <Image
              src="/kiteboarding-photography-tips.png"
              alt="Kiteboarding photography tips"
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
                    Photography
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">
                  How to Capture Stunning Kiteboarding Photos on Your Safari
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
                    <span>September 2024</span>
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
                      Capturing stunning kiteboarding photos during your safari adventure requires the right equipment, techniques, and timing. Follow these professional tips to create memorable images of your kiteboarding experience.
                    </p>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Camera className="w-6 h-6 text-turquoise" />
                      Essential Photography Equipment
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Waterproof camera or housing for your DSLR/mirrorless</li>
                      <li>GoPro or action camera for POV shots</li>
                      <li>Telephoto lens (70-200mm or 100-400mm) for action shots</li>
                      <li>Wide-angle lens (16-35mm) for environmental shots</li>
                      <li>Polarizing filter to reduce water glare</li>
                      <li>Extra memory cards and batteries</li>
                      <li>Dry bag for equipment protection</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Settings className="w-6 h-6 text-turquoise" />
                      Camera Settings for Action Photography
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Optimize your camera settings for fast-moving kiteboarding action:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li><strong>Shutter Speed:</strong> 1/1000s or faster to freeze action</li>
                      <li><strong>Aperture:</strong> f/5.6 to f/8 for good depth of field</li>
                      <li><strong>ISO:</strong> 200-800 depending on lighting conditions</li>
                      <li><strong>Focus Mode:</strong> Continuous autofocus (AI-Servo/AF-C)</li>
                      <li><strong>Drive Mode:</strong> High-speed continuous shooting</li>
                      <li><strong>Metering:</strong> Center-weighted or spot metering</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-turquoise" />
                      Composition Techniques
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Create compelling compositions that tell the story of your kiteboarding adventure:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li><strong>Rule of Thirds:</strong> Position the rider off-center for dynamic composition</li>
                      <li><strong>Leading Lines:</strong> Use kite lines and board tracks to guide the eye</li>
                      <li><strong>Foreground/Background:</strong> Include tropical scenery for context</li>
                      <li><strong>Action Sequences:</strong> Capture multiple frames of jumps and tricks</li>
                      <li><strong>Environmental Shots:</strong> Show the kiteboarding location and conditions</li>
                      <li><strong>Close-ups:</strong> Focus on equipment details and expressions</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Best Times for Photography
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Timing is crucial for capturing the best kiteboarding photos:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li><strong>Golden Hour:</strong> Early morning and late afternoon for warm lighting</li>
                      <li><strong>Blue Hour:</strong> Just before sunrise and after sunset for dramatic skies</li>
                      <li><strong>Midday:</strong> Bright conditions for action shots with clear visibility</li>
                      <li><strong>Overcast Days:</strong> Even lighting without harsh shadows</li>
                      <li><strong>Stormy Weather:</strong> Dramatic skies and lighting (safety permitting)</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Shooting from Different Perspectives
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Vary your shooting angles to create diverse and interesting images:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li><strong>From the Catamaran:</strong> Elevated perspective with stable platform</li>
                      <li><strong>From the Water:</strong> Eye-level shots for intimate action</li>
                      <li><strong>From the Beach:</strong> Wide shots showing the full scene</li>
                      <li><strong>Drone Photography:</strong> Aerial views of kiteboarding action</li>
                      <li><strong>Underwater:</strong> Unique perspective of board and rider</li>
                      <li><strong>From Another Kite:</strong> Kite-to-kite photography</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Safety Considerations
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Always prioritize safety when photographing kiteboarding:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Maintain safe distance from kiteboarding action</li>
                      <li>Be aware of kite lines and equipment</li>
                      <li>Use waterproof protection for all equipment</li>
                      <li>Have a spotter when shooting from the water</li>
                      <li>Respect other water users and marine life</li>
                      <li>Follow local regulations for drone use</li>
                    </ul>
                    
                    <div className="bg-turquoise-50 border-l-4 border-turquoise-400 p-6 my-8">
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Pro Photography Tip</h3>
                      <p className="text-gray-700">
                        Pre-focus on the area where you expect the action to happen, then use continuous autofocus to track the rider. This technique ensures sharp images of fast-moving kiteboarding action.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Post-Processing Tips
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Enhance your kiteboarding photos with these editing techniques:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Adjust exposure and contrast for tropical lighting</li>
                      <li>Enhance colors to bring out the turquoise water</li>
                      <li>Sharpen images to emphasize action details</li>
                      <li>Crop for better composition and impact</li>
                      <li>Remove distracting elements from backgrounds</li>
                      <li>Create action sequences and collages</li>
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
                        <p className="text-deep-navy font-medium">Photography</p>
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
                        <p className="text-deep-navy font-medium">September 2024</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-deep-navy/10">
                      <h4 className="text-sm font-semibold text-deep-navy/60 mb-3">Capture Your Adventure</h4>
                      <Link
                        href="/packages"
                        className="block w-full text-center bg-coral-orange text-white py-3 px-4 rounded-lg hover:bg-coral-orange/90 transition-colors font-semibold"
                      >
                        Book Your Safari
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
