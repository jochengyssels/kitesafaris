"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Play, Filter, X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryItem {
  id: string
  type: "image" | "video"
  src: string
  thumbnail?: string
  destination: string
  yacht?: string
  mood: "action" | "scenery" | "group"
  title: string
  description: string
  isUserSubmitted?: boolean
  aspectRatio: number
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    type: "image",
    src: "/antigua-caribbean-sunset-kiteboarding.png",
    destination: "Antigua",
    yacht: "Ocean Explorer",
    mood: "action",
    title: "High-speed kiteboarding in Antigua",
    description: "Professional kiteboarder performing aerial maneuvers over crystal clear Caribbean waters",
    aspectRatio: 1.5,
  },
  {
    id: "2",
    type: "image",
    src: "/antigua-caribbean-sunset-kiteboarding.png",
    destination: "Antigua",
    mood: "scenery",
    title: "Golden sunset over Antigua waters",
    description: "Breathtaking sunset view with kites silhouetted against the golden Caribbean sky",
    aspectRatio: 1.2,
  },
  {
    id: "3",
    type: "image",
    src: "/antigua-tropical-landscape-palm-trees-beach.png",
    destination: "Antigua",
    yacht: "Luxury Catamaran",
    mood: "group",
    title: "Group kiteboarding lesson in Antigua",
    description: "Friends learning kiteboarding together in the pristine waters of Antigua",
    aspectRatio: 1.8,
  },
  {
    id: "4",
    type: "image",
    src: "/antigua-aerial-harbor-view.jpg",
    destination: "Barbuda",
    mood: "action",
    title: "Guest adventure in Barbuda",
    description: "Amazing jump captured by our guest during their Barbuda safari",
    isUserSubmitted: true,
    aspectRatio: 1.3,
  },
  {
    id: "5",
    type: "image",
    src: "/antigua-coral-reef-underwater-snorkeling.png",
    thumbnail: "/antigua-coral-reef-underwater-snorkeling.png",
    destination: "Antigua",
    yacht: "Safari Yacht",
    mood: "action",
    title: "Epic kiteboarding session in Antigua",
    description: "High-energy kiteboarding image showcasing perfect Caribbean wind conditions",
    aspectRatio: 1.6,
  },
  {
    id: "6",
    type: "image",
    src: "/greek-aegean-islands-kiteboarding-destination.png",
    destination: "Greece",
    mood: "scenery",
    title: "Pristine Greek Aegean coastline",
    description: "Untouched natural beauty of Greece's upcoming kiteboarding spots",
    aspectRatio: 1.4,
  },
]

const destinations = ["All", ...Array.from(new Set(galleryItems.map((item) => item.destination)))]
const yachts = ["All", ...Array.from(new Set(galleryItems.filter((item) => item.yacht).map((item) => item.yacht!)))]
const moods = ["All", "action", "scenery", "group"]

export function GalleryGrid() {
  const [selectedDestination, setSelectedDestination] = useState("All")
  const [selectedYacht, setSelectedYacht] = useState("All")
  const [selectedMood, setSelectedMood] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const destinationMatch = selectedDestination === "All" || item.destination === selectedDestination
      const yachtMatch = selectedYacht === "All" || item.yacht === selectedYacht
      const moodMatch = selectedMood === "All" || item.mood === selectedMood
      return destinationMatch && yachtMatch && moodMatch
    })
  }, [selectedDestination, selectedYacht, selectedMood])

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item)
  }

  const closeLightbox = () => {
    setSelectedItem(null)
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!selectedItem) return
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id)
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % filteredItems.length
        : (currentIndex - 1 + filteredItems.length) % filteredItems.length
    setSelectedItem(filteredItems[newIndex])
  }

  return (
    <div>
      {/* Filter Controls */}
      <div className="mb-8">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-coral-orange text-white px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-opacity-90 transition-all duration-200 mb-4"
          aria-expanded={showFilters}
          aria-controls="filter-panel"
        >
          <Filter size={20} />
          Filters
        </button>

        {showFilters && (
          <div id="filter-panel" className="bg-sand-beige rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Destination Filter */}
              <div>
                <label className="block text-deep-navy font-montserrat font-semibold mb-2">Destination</label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg font-open-sans focus:ring-2 focus:ring-turquoise focus:border-transparent"
                >
                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              {/* Yacht Filter */}
              <div>
                <label className="block text-deep-navy font-montserrat font-semibold mb-2">Yacht</label>
                <select
                  value={selectedYacht}
                  onChange={(e) => setSelectedYacht(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg font-open-sans focus:ring-2 focus:ring-turquoise focus:border-transparent"
                >
                  {yachts.map((yacht) => (
                    <option key={yacht} value={yacht}>
                      {yacht}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mood Filter */}
              <div>
                <label className="block text-deep-navy font-montserrat font-semibold mb-2">Mood</label>
                <select
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg font-open-sans focus:ring-2 focus:ring-turquoise focus:border-transparent"
                >
                  {moods.map((mood) => (
                    <option key={mood} value={mood}>
                      {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {selectedDestination !== "All" && (
                <span className="bg-turquoise text-white px-3 py-1 rounded-full text-sm font-open-sans">
                  {selectedDestination}
                  <button
                    onClick={() => setSelectedDestination("All")}
                    className="ml-2 hover:text-gray-200"
                    aria-label={`Remove ${selectedDestination} filter`}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedYacht !== "All" && (
                <span className="bg-gold text-white px-3 py-1 rounded-full text-sm font-open-sans">
                  {selectedYacht}
                  <button
                    onClick={() => setSelectedYacht("All")}
                    className="ml-2 hover:text-gray-200"
                    aria-label={`Remove ${selectedYacht} filter`}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedMood !== "All" && (
                <span className="bg-coral-orange text-white px-3 py-1 rounded-full text-sm font-open-sans">
                  {selectedMood}
                  <button
                    onClick={() => setSelectedMood("All")}
                    className="ml-2 hover:text-gray-200"
                    aria-label={`Remove ${selectedMood} filter`}
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-300 font-open-sans">
          Showing {filteredItems.length} of {galleryItems.length} items
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid relative group cursor-pointer"
            onClick={() => openLightbox(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                openLightbox(item)
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View ${item.title}`}
          >
            <div className="relative overflow-hidden rounded-lg bg-sand-beige shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              {/* Image/Video Thumbnail */}
              <div className="relative">
                <Image
                  src={item.type === "video" ? item.thumbnail || item.src : item.src}
                  alt={item.description}
                  width={400}
                  height={Math.round(400 / item.aspectRatio)}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />

                {/* Video Play Button */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-200">
                    <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:scale-110 transition-transform duration-200">
                      <Play size={24} className="text-deep-navy ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* User Submitted Badge */}
                {item.isUserSubmitted && (
                  <div className="absolute top-3 right-3 bg-coral-orange text-white px-3 py-1 rounded-full text-xs font-montserrat font-semibold">
                    Guest Adventure
                  </div>
                )}

                {/* Overlay with Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-montserrat font-bold text-lg mb-1 line-clamp-2">{item.title}</h3>
                    <p className="font-open-sans text-sm opacity-90 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-turquoise font-montserrat font-semibold text-sm">{item.destination}</span>
                  <span className="text-gray-600 font-open-sans text-xs capitalize">{item.mood}</span>
                </div>
                {item.yacht && <p className="text-gray-500 font-open-sans text-xs">{item.yacht}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          aria-describedby="lightbox-description"
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateLightbox("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => navigateLightbox("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image/Video */}
            <div className="relative">
              {selectedItem.type === "image" ? (
                <Image
                  src={selectedItem.src || "/placeholder.svg"}
                  alt={selectedItem.description}
                  width={800}
                  height={Math.round(800 / selectedItem.aspectRatio)}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              ) : (
                <video
                  src={selectedItem.src}
                  controls
                  className="max-w-full max-h-[80vh] object-contain"
                  aria-describedby="lightbox-description"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Info Panel */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
              <h2 id="lightbox-title" className="font-montserrat font-bold text-xl mb-2">
                {selectedItem.title}
              </h2>
              <p id="lightbox-description" className="font-open-sans text-gray-300 mb-2">
                {selectedItem.description}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-turquoise font-semibold">{selectedItem.destination}</span>
                {selectedItem.yacht && <span className="text-gold">{selectedItem.yacht}</span>}
                <span className="text-coral-orange capitalize">{selectedItem.mood}</span>
                {selectedItem.isUserSubmitted && (
                  <span className="bg-coral-orange px-2 py-1 rounded text-xs font-semibold">Guest Adventure</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
