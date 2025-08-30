"use client"

import { Instagram } from "lucide-react"
import Image from "next/image"

const instagramPosts = [
  {
    id: 1,
    image: "/antigua-jolly-harbor-kiting.png",
    alt: "Caribbean kiteboarding adventure launching directly from luxury catamaran in Antigua's crystal turquoise waters with perfect trade winds",
    likes: 1247,
    caption: "Boat launches in Antigua paradise! 🪁",
  },
  {
    id: 2,
    image: "/antigua-caribbean-sunset-kiteboarding.png",
    alt: "Golden sunset kiteboarding session in Caribbean Antigua with luxury catamaran silhouette and perfect wind conditions",
    likes: 892,
    caption: "Caribbean sunset magic ✨",
  },
  {
    id: 3,
    image: "/antigua-group-session.png",
    alt: "Small group of 6 kiteboarders enjoying Caribbean kitesafari session in Antigua with professional instruction and rescue boat support",
    likes: 1156,
    caption: "Squad goals - max 6 people! 🏝️",
  },
  {
    id: 4,
    image: "/barbuda-pink-beach-aerial.png",
    alt: "Aerial view of Barbuda's famous pink beaches during Caribbean kitesafari accessible only by luxury catamaran",
    likes: 743,
    caption: "Barbuda's pink beaches 🌊",
  },
]

export function InstagramFeed() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Instagram className="w-8 h-8 text-coral-orange" aria-hidden="true" />
            <h2 className="font-montserrat font-bold text-3xl text-navy">Featured on Instagram</h2>
          </div>
          <p className="font-open-sans text-gray-600 max-w-2xl mx-auto">
            Follow our Caribbean adventures and see what our guests are sharing from their incredible Antigua
            kitesafaris.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <div key={post.id} className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                  <Instagram className="w-8 h-8 mx-auto mb-2" aria-hidden="true" />
                  <p className="font-open-sans text-sm">❤️ {post.likes.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com/kitesafaris"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-coral-orange text-white px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-coral-orange focus:ring-offset-2"
          >
            <Instagram className="w-5 h-5" aria-hidden="true" />
            <span>Follow @kitesafaris</span>
          </a>
        </div>
      </div>
    </section>
  )
}
