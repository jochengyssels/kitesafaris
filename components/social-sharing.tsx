"use client"

import { Share2, Facebook, Twitter, Linkedin, Copy, Check } from "lucide-react"
import { useState } from "react"

interface SocialSharingProps {
  title: string
  description: string
  url: string
  className?: string
}

export function SocialSharing({ title, description, url, className = "" }: SocialSharingProps) {
  const [copied, setCopied] = useState(false)

  const shareData = {
    title,
    text: description,
    url,
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.log("Error copying:", error)
    }
  }

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-open-sans text-sm text-gray-600 font-medium">Share:</span>

      {/* Native Share (Mobile) */}
      {typeof navigator !== "undefined" && navigator.share && (
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
          aria-label="Share page"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      )}

      {/* Social Media Buttons */}
      <div className="flex items-center gap-2">
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors duration-200"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>

        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>

        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-colors duration-200"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>

        <button
          onClick={handleCopyLink}
          className="w-10 h-10 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors duration-200"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>
    </div>
  )
}
