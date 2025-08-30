import { Star } from "lucide-react"

export function ReviewsHero() {
  return (
    <section className="bg-gradient-to-r from-deep-navy to-deep-navy/90 py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="font-montserrat text-4xl md:text-5xl font-bold text-white mb-6">What Our Guests Say</h1>
        <p className="font-open-sans text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Don't just take our word for it. Read authentic reviews from adventurers who've experienced our kiteboarding
          safaris.
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-coral-orange text-coral-orange" />
                ))}
              </div>
              <div className="font-montserrat text-3xl font-bold text-white">4.9</div>
              <div className="font-open-sans text-white/80">Average Rating</div>
            </div>

            <div className="w-px h-16 bg-white/20 hidden md:block"></div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="font-open-sans text-white font-medium">Google</span>
                </div>
                <div className="font-montserrat text-xl font-bold text-white">4.9</div>
                <div className="font-open-sans text-sm text-white/70">127 reviews</div>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="#00AA6C" />
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                      fill="white"
                    />
                  </svg>
                  <span className="font-open-sans text-white font-medium">TripAdvisor</span>
                </div>
                <div className="font-montserrat text-xl font-bold text-white">4.8</div>
                <div className="font-open-sans text-sm text-white/70">89 reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
