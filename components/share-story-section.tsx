"use client"

import { useState } from "react"
import { Upload, Camera, MessageSquare, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ShareStorySection() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-deep-navy mb-4">Share Your Story</h2>
          <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Had an amazing kitesafari with us? We'd love to hear about your Antigua experience and share it with future
            adventurers.
          </p>
        </div>

        <div className="bg-sand-beige rounded-2xl p-8">
          <form className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block font-montserrat font-medium text-deep-navy mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-coral-orange focus:border-transparent font-open-sans"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="location" className="block font-montserrat font-medium text-deep-navy mb-2">
                  Your Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-coral-orange focus:border-transparent font-open-sans"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* Safari Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="destination" className="block font-montserrat font-medium text-deep-navy mb-2">
                  Safari Destination *
                </label>
                <select
                  id="destination"
                  name="destination"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-coral-orange focus:border-transparent font-open-sans"
                >
                  <option value="">Select destination</option>
                  <option value="antigua">Antigua & Barbuda</option>
                  <option value="greece">Greece (Coming Soon)</option>
                  <option value="sardinia">Sardinia (Coming Soon)</option>
                </select>
              </div>
              <div>
                <label htmlFor="safari-date" className="block font-montserrat font-medium text-deep-navy mb-2">
                  Safari Date
                </label>
                <input
                  type="month"
                  id="safari-date"
                  name="safari-date"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-coral-orange focus:border-transparent font-open-sans"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block font-montserrat font-medium text-deep-navy mb-2">Overall Rating *</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none focus:ring-2 focus:ring-coral-orange/20 rounded"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoveredRating || rating) ? "fill-coral-orange text-coral-orange" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="font-open-sans text-sm text-gray-600 ml-2">
                  {rating > 0 && `${rating} star${rating !== 1 ? "s" : ""}`}
                </span>
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label htmlFor="review" className="block font-montserrat font-medium text-deep-navy mb-2">
                Your Review *
              </label>
              <textarea
                id="review"
                name="review"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-coral-orange focus:border-transparent font-open-sans resize-vertical"
                placeholder="Tell us about your kitesafari experience in Antigua..."
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block font-montserrat font-medium text-deep-navy mb-2">Share Photos or Videos</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-coral-orange transition-colors">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-4">
                    <div className="bg-coral-orange/10 p-3 rounded-full">
                      <Camera className="w-6 h-6 text-coral-orange" />
                    </div>
                    <div className="bg-coral-orange/10 p-3 rounded-full">
                      <Upload className="w-6 h-6 text-coral-orange" />
                    </div>
                  </div>
                  <div>
                    <p className="font-montserrat font-medium text-deep-navy mb-1">
                      Drop files here or click to upload
                    </p>
                    <p className="font-open-sans text-sm text-gray-600">
                      Support for images and videos up to 10MB each
                    </p>
                  </div>
                  <input type="file" multiple accept="image/*,video/*" className="hidden" id="file-upload" />
                  <label
                    htmlFor="file-upload"
                    className="bg-coral-orange text-white px-6 py-2 rounded-lg font-open-sans font-medium hover:bg-coral-orange/90 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-coral-orange/20"
                  >
                    Choose Files
                  </label>
                </div>
              </div>
            </div>

            {/* Contact Permission */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="contact-permission"
                name="contact-permission"
                className="mt-1 w-4 h-4 text-coral-orange border-gray-300 rounded focus:ring-coral-orange"
              />
              <label htmlFor="contact-permission" className="font-open-sans text-sm text-gray-700">
                I give permission for KiteSafaris to use my review and photos/videos for marketing purposes and to
                contact me about my experience.
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <Button
                type="submit"
                className="bg-coral-orange hover:bg-coral-orange/90 text-white px-8 py-3 rounded-lg font-montserrat font-semibold text-lg transition-colors focus:ring-2 focus:ring-coral-orange/20"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Share Your Story
              </Button>
            </div>
          </form>
        </div>

        {/* Contact Alternative */}
        <div className="text-center mt-8">
          <p className="font-open-sans text-gray-600 mb-4">
            Prefer to share your story directly? Get in touch with us:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="border-coral-orange text-coral-orange hover:bg-coral-orange hover:text-white bg-transparent"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp Us
            </Button>
            <Button
              variant="outline"
              className="border-turquoise text-turquoise hover:bg-turquoise hover:text-white bg-transparent"
            >
              Email Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
