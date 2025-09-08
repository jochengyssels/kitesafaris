import Link from "next/link"

interface RelatedContentSuggestionsProps {
  title?: string
  description?: string
  className?: string
}

export function RelatedContentSuggestions({ 
  title = "You Might Also Like", 
  description = "Discover more about our kite safari experiences and prepare for your adventure.",
  className = ""
}: RelatedContentSuggestionsProps) {
  return (
    <section className={`py-16 bg-gradient-to-br from-turquoise-50 to-sand-beige-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 font-open-sans max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/destinations" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-turquoise-200 transition-colors">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">Destinations</h3>
              <p className="text-sm text-gray-600 font-open-sans">Explore our kite safari locations</p>
            </div>
          </Link>
          <Link href="/booking" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-coral-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-coral-orange/20 transition-colors">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">Book Now</h3>
              <p className="text-sm text-gray-600 font-open-sans">Secure your adventure</p>
            </div>
          </Link>
          <Link href="/packages" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">Packages</h3>
              <p className="text-sm text-gray-600 font-open-sans">All-inclusive options</p>
            </div>
          </Link>
          <Link href="/guides" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">Expert Guides</h3>
              <p className="text-sm text-gray-600 font-open-sans">Learn from the best</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
