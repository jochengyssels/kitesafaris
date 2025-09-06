"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Camera, MapPin, Calendar, Users, Heart, Download, Share2, Filter, Grid, List } from "lucide-react"

interface GalleryImage {
  id: string
  src: string
  alt: string
  destination: string
  category: string
  date: string
  likes: number
  width: number
  height: number
}

// Sample gallery data - this will be replaced with Google Photos API data
const sampleGalleryData: GalleryImage[] = [
  {
    id: "1",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-catamaran-sailing.jpg",
    alt: "Sunset kiteboarding in Antigua Caribbean waters",
    destination: "Antigua",
    category: "Kiteboarding",
    date: "2024-12-15",
    likes: 127,
    width: 1200,
    height: 800,
  },
  {
    id: "2",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/greece:img-catamaran-back.jpg",
    alt: "Kiteboarding in Greek Aegean Islands with Meltemi winds",
    destination: "Greece",
    category: "Kiteboarding",
    date: "2024-08-20",
    likes: 89,
    width: 1200,
    height: 900,
  },
  {
    id: "3",
    src: "/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
    alt: "Mediterranean kiteboarding at Sardinia Punta Trettu",
    destination: "Sardinia",
    category: "Kiteboarding",
    date: "2024-09-10",
    likes: 156,
    width: 1200,
    height: 750,
  },
  {
    id: "4",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/catamaran:img-helishot.jpg",
    alt: "Luxury catamaran yacht on turquoise Caribbean waters",
    destination: "Caribbean",
    category: "Yacht",
    date: "2024-11-05",
    likes: 203,
    width: 1200,
    height: 800,
  },
  {
    id: "5",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-catamaran-shore.jpg",
    alt: "Tropical landscape with palm trees and beach in Antigua",
    destination: "Antigua",
    category: "Landscape",
    date: "2024-12-18",
    likes: 94,
    width: 1200,
    height: 900,
  },
  {
    id: "6",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-catamaran-islands.jpg",
    alt: "Underwater coral reef snorkeling in Antigua",
    destination: "Antigua",
    category: "Underwater",
    date: "2024-12-20",
    likes: 167,
    width: 1200,
    height: 800,
  },
  {
    id: "7",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/img-diner.jpg",
    alt: "Gourmet dining experience on luxury catamaran",
    destination: "Antigua",
    category: "Dining",
    date: "2024-12-22",
    likes: 145,
    width: 1200,
    height: 800,
  },
  {
    id: "8",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/img-champagne.jpg",
    alt: "Champagne celebration on catamaran deck",
    destination: "Antigua",
    category: "Dining",
    date: "2024-12-23",
    likes: 198,
    width: 1200,
    height: 900,
  },
  {
    id: "9",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/img-drinks.jpg",
    alt: "Refreshing drinks after kiteboarding session",
    destination: "Antigua",
    category: "Dining",
    date: "2024-12-24",
    likes: 112,
    width: 1200,
    height: 800,
  },
  {
    id: "10",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/img-aperol.jpg",
    alt: "Aperol spritz at sunset on catamaran",
    destination: "Antigua",
    category: "Dining",
    date: "2024-12-25",
    likes: 156,
    width: 1200,
    height: 900,
  },
  {
    id: "11",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/img-fruit-salad.jpg",
    alt: "Fresh tropical fruit salad for breakfast",
    destination: "Antigua",
    category: "Dining",
    date: "2024-12-26",
    likes: 134,
    width: 1200,
    height: 800,
  },
  {
    id: "12",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/interior:img-bedroom.jpg",
    alt: "Luxury master bedroom on catamaran",
    destination: "Antigua",
    category: "Accommodation",
    date: "2024-12-27",
    likes: 178,
    width: 1200,
    height: 900,
  },
  {
    id: "13",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/interior:img-bathroom.jpg",
    alt: "Modern en-suite bathroom with ocean views",
    destination: "Antigua",
    category: "Accommodation",
    date: "2024-12-28",
    likes: 145,
    width: 1200,
    height: 900,
  },
  {
    id: "14",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/interior:img-dining-sofa.jpg",
    alt: "Spacious dining and lounge area",
    destination: "Antigua",
    category: "Accommodation",
    date: "2024-12-29",
    likes: 167,
    width: 1200,
    height: 800,
  },
  {
    id: "15",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/interior:img-cockpit.jpg",
    alt: "Professional cockpit area for navigation",
    destination: "Antigua",
    category: "Accommodation",
    date: "2024-12-30",
    likes: 134,
    width: 1200,
    height: 800,
  },
  {
    id: "16",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/interior:img-bedroom2.jpg",
    alt: "Comfortable guest cabin with storage",
    destination: "Antigua",
    category: "Accommodation",
    date: "2024-12-31",
    likes: 156,
    width: 1200,
    height: 900,
  },
  {
    id: "17",
    src: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/interior:img-hallway.jpg",
    alt: "Elegant interior hallway with premium finishes",
    destination: "Antigua",
    category: "Accommodation",
    date: "2025-01-01",
    likes: 142,
    width: 1200,
    height: 900,
  },
]

const destinations = ["All", "Antigua", "Greece", "Sardinia", "Caribbean"]
const categories = ["All", "Kiteboarding", "Yacht", "Landscape", "Underwater", "Adventure", "Dining", "Accommodation"]

export function DestinationsGallery() {
  const [selectedDestination, setSelectedDestination] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry")
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(sampleGalleryData)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    let filtered = sampleGalleryData

    if (selectedDestination !== "All") {
      filtered = filtered.filter(img => img.destination === selectedDestination)
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(img => img.category === selectedCategory)
    }

    setFilteredImages(filtered)
  }, [selectedDestination, selectedCategory])

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-deep-navy via-deep-navy/90 to-turquoise/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
        </div>
        
        {/* Glassmorphic Overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 flex items-center min-h-[70vh]">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <div className="flex items-center justify-center gap-2 text-sm font-open-sans text-turquoise-100">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Destinations
                </Link>
                <span>/</span>
                <span className="text-white">Gallery</span>
              </div>
            </nav>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-montserrat text-balance">
              Destinations Gallery
              <span className="block text-turquoise">See Where Your Adventure Takes You</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-turquoise-100 mb-8 font-open-sans text-balance">
              Explore breathtaking moments from our kite safaris across the Caribbean and Mediterranean
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-turquoise" />
                <span>Professional Photography</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-turquoise" />
                <span>Multiple Destinations</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-turquoise" />
                <span>Year-Round Adventures</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Controls */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Destination Filter */}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-turquoise" />
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans text-sm"
                >
                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-turquoise" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-white text-turquoise shadow-sm" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("masonry")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "masonry" ? "bg-white text-turquoise shadow-sm" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            }`}>
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleImageClick(image)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Image Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold bg-turquoise/90 px-2 py-1 rounded-full">
                          {image.destination}
                        </span>
                        <span className="text-sm bg-coral-orange/90 px-2 py-1 rounded-full">
                          {image.category}
                        </span>
                      </div>
                      <p className="text-sm text-white/90 line-clamp-2">{image.alt}</p>
                    </div>

                    {/* Like Button */}
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="p-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{image.date}</span>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500 fill-current" />
                        <span>{image.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-turquoise to-deep-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat">
            Ready to Create Your Own Gallery?
          </h2>
          <p className="text-xl text-turquoise-100 mb-8 font-open-sans max-w-2xl mx-auto">
            Book your kite safari adventure and capture stunning moments that could be featured in our gallery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/packages"
              className="bg-coral-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors"
            >
              Book Your Adventure
            </Link>
            <Link
              href="/destinations"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] max-h-[70vh]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-deep-navy mb-2 font-montserrat">
                    {selectedImage.destination} - {selectedImage.category}
                  </h3>
                  <p className="text-deep-navy/80 font-open-sans">{selectedImage.alt}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{selectedImage.date}</span>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-coral-orange hover:text-coral-orange/80 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>{selectedImage.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-turquoise hover:text-turquoise/80 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center gap-2 text-deep-navy hover:text-deep-navy/80 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
