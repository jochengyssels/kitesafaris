import Link from "next/link"
import Image from "next/image"
import { Users, Clock, Heart, MapPin, Star, CheckCircle, X } from "lucide-react"
import { SocialSharing } from "@/components/social-sharing"
import { FeaturePageCrossLinks } from "@/components/feature-page-cross-links"

const benefits = [
  {
    icon: Clock,
    title: "More Kite Time Per Person",
    description:
      "With fewer people, you get significantly more individual practice time and personalized coaching sessions.",
  },
  {
    icon: Users,
    title: "Customized Instruction Levels",
    description:
      "Our instructors can adapt to each person's skill level without holding back advanced riders or rushing beginners.",
  },
  {
    icon: Heart,
    title: "Authentic Local Experiences",
    description:
      "Small groups can access hidden spots and local experiences that large tours simply cannot accommodate.",
  },
  {
    icon: MapPin,
    title: "Premium Catamaran Space",
    description:
      "Enjoy spacious accommodations and comfortable common areas without overcrowding or competition for space.",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "California, USA",
    quote:
      "The small group size made all the difference. I felt like I had a personal instructor and made lifelong friends with the other 5 guests.",
    image: "/smiling-woman-portrait.png",
    rating: 5,
  },
  {
    name: "Marco Rossi",
    location: "Milan, Italy",
    quote: "Unlike the crowded kite schools on shore, our group of 6 had the entire lagoon to ourselves. Pure magic!",
    image: "/asian-man-portrait.png",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    location: "London, UK",
    quote:
      "The intimate setting allowed us to progress at our own pace. No pressure, just pure enjoyment and learning.",
    image: "/spanish-woman-portrait.png",
    rating: 5,
  },
]

const comparisonData = [
  {
    feature: "Group Size",
    smallGroups: "2-8 people",
    largeTours: "15+ people",
    advantage: "small",
  },
  {
    feature: "Individual Attention",
    smallGroups: "High - Personal coaching",
    largeTours: "Limited - Shared instructor",
    advantage: "small",
  },
  {
    feature: "Kite Time Per Person",
    smallGroups: "4-6 hours daily",
    largeTours: "2-3 hours daily",
    advantage: "small",
  },
  {
    feature: "Flexibility",
    smallGroups: "Fully customizable",
    largeTours: "Fixed schedule",
    advantage: "small",
  },
  {
    feature: "Access to Remote Spots",
    smallGroups: "Exclusive locations",
    largeTours: "Popular spots only",
    advantage: "small",
  },
  {
    feature: "Catamaran Space",
    smallGroups: "Spacious & comfortable",
    largeTours: "Crowded conditions",
    advantage: "small",
  },
]

export function SmallGroupsPage() {
  return (
    <main className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm font-open-sans" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-gray-600">
              <li>
                <Link href="/" className="hover:text-coral-orange transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-coral-orange font-medium">Small Groups</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-deep-navy to-deep-navy/90 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 text-balance">
            Intimate Kite Safari Experiences
          </h1>
          <p className="font-montserrat text-xl md:text-2xl text-turquoise mb-4 font-medium">
            Maximum 8 Guests Per Trip
          </p>
          <p className="font-open-sans text-lg md:text-xl max-w-3xl mx-auto text-pretty opacity-90 leading-relaxed">
            Experience the ultimate in personalized kiteboarding adventures. Our small group approach ensures individual
            attention, authentic connections, and access to exclusive locations that large tours simply cannot offer.
          </p>
        </div>
      </section>

      {/* Why Small Groups Matter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-deep-navy mb-6">
              Why Small Groups Matter
            </h2>
            <p className="font-open-sans text-lg text-gray-600 leading-relaxed">
              The difference between a good kite safari and an extraordinary one often comes down to group size. Here's
              why we've chosen to keep our groups intimate and exclusive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div
                  key={index}
                  className="bg-sand-beige/50 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-3">{benefit.title}</h3>
                  <p className="font-open-sans text-gray-600 leading-relaxed text-balance">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-deep-navy mb-6">
                Small Groups vs Large Tours
              </h2>
              <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
                See the clear advantages of choosing an intimate kite safari experience over crowded group tours.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-deep-navy text-white">
                    <tr>
                      <th className="font-montserrat font-bold text-left py-4 px-6">Feature</th>
                      <th className="font-montserrat font-bold text-center py-4 px-6">Small Groups (2-8 people)</th>
                      <th className="font-montserrat font-bold text-center py-4 px-6">Large Tours (15+ people)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="font-open-sans font-medium py-4 px-6 text-deep-navy">{row.feature}</td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="font-open-sans text-gray-700">{row.smallGroups}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <X className="w-5 h-5 text-red-400" />
                            <span className="font-open-sans text-gray-500">{row.largeTours}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-deep-navy mb-6">
              Small Group Experience Stories
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from guests who've experienced the magic of our intimate kite safari adventures.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-sand-beige rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-coral-orange text-coral-orange" />
                  ))}
                  {testimonial.rating % 1 !== 0 && (
                    <Star className="w-5 h-5 fill-coral-orange text-coral-orange opacity-50" />
                  )}
                </div>

                <blockquote className="font-open-sans text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={`${testimonial.name} profile photo`}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="font-montserrat font-semibold text-deep-navy">{testimonial.name}</div>
                    <div className="font-open-sans text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-deep-navy mb-6">
              Intimate Group Moments
            </h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              See the personal connections and exclusive experiences that only small groups can provide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              {
                src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/img-diner.jpg",
                alt: "Small group enjoying gourmet dining on luxury catamaran",
              },
              {
                src: "/professional-kiteboarding-instructor-teaching-on-t.png",
                alt: "One-on-one kiteboarding coaching session",
              },
              {
                src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/img-champagne.jpg",
                alt: "Premium champagne celebration for small group",
              },
              {
                src: "/perfect-wind-conditions-for-kiteboarding-in-tropic.png",
                alt: "Small group enjoying perfect wind conditions",
              },
              {
                src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/img-drinks.jpg",
                alt: "Intimate group enjoying drinks on catamaran deck",
              },
              {
                src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/interior:img-bedroom.jpg",
                alt: "Luxury accommodation for small groups",
              },
              {
                src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/interior:img-bathroom.jpg",
                alt: "Premium bathroom facilities for small groups",
              },
              {
                src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/interior:img-dining-sofa.jpg",
                alt: "Comfortable common areas for small groups",
              },
            ].map((image, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-turquoise to-coral-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">Ready for Your Small Group Safari?</h2>
          <p className="font-open-sans text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Join a maximum of 7 other adventurers for the most personalized and authentic kite safari experience
            possible. Limited spots available for each departure.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center bg-white hover:bg-gray-100 text-deep-navy font-montserrat font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Book Your Small Group Safari
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Social Sharing Section */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <SocialSharing
              title="Small Groups Kite Safari | Maximum 8 Guests | KiteSafaris.com"
              description="Experience intimate kite safari adventures with maximum 8 guests per trip. Personalized attention, better learning, and authentic connections."
              url="https://kitesafaris.com/small-groups"
            />
          </div>
        </div>
      </section>

      {/* Cross Links to Other Feature Pages */}
      <FeaturePageCrossLinks currentPage="/small-groups" />
    </main>
  )
}
