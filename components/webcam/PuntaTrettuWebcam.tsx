"use client"

import { useEffect, useRef, useState } from "react"

export type PuntaTrettuWebcamProps = {
  src?: string
  poster?: string
  className?: string
  heightPx?: number
  ariaLabel?: string
}

export default function PuntaTrettuWebcam({
  src = "https://cdn-007.whatsupcams.com/hls/it_sangiovannisuergiu01.m3u8",
  poster,
  className = "w-full max-h-[540px] bg-black rounded-lg shadow-lg",
  heightPx,
  ariaLabel = "Live webcam stream: Punta Trettu, Sardinia",
}: PuntaTrettuWebcamProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [fatalError, setFatalError] = useState<string | null>(null)

  useEffect(() => {
    let hls: any | null = null

    // Guard: run only in browser and when ref is ready
    if (!videoRef.current) return

    const videoEl = videoRef.current

    async function init() {
      try {
        // Dynamic import on client only to avoid SSR bundling
        const Hls = (await import("hls.js")).default

        if (Hls.isSupported()) {
          hls = new Hls({
            // Reasonable defaults; keep it simple
            enableWorker: true,
            lowLatencyMode: true,
          })
          hls.loadSource(src)
          hls.attachMedia(videoEl)

          hls.on(Hls.Events.ERROR, (_, data) => {
            if (data.fatal) {
              setFatalError("The livestream is currently unavailable. Please try again later.")
              hls?.destroy()
              hls = null
            }
          })
        } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
          // iOS/Safari
          videoEl.src = src
        } else {
          setFatalError("Your browser does not support this livestream format.")
        }
      } catch (e) {
        // If import fails or other unexpected error
        setFatalError("Could not initialize the livestream player.")
      }
    }

    init()

    return () => {
      if (hls) {
        try { hls.destroy() } catch {}
      }
    }
  }, [src])

  if (fatalError) {
    return (
      <div className="flex items-center justify-center text-center text-sm text-gray-300 bg-black/60 rounded-lg p-6 min-h-[200px]">
        {fatalError}
      </div>
    )
  }

  return (
    <video
      ref={videoRef}
      // Autoplay policies: must start muted; user can unmute
      autoPlay
      muted
      playsInline
      controls
      poster={poster}
      aria-label={ariaLabel}
      // Size / styling
      className={className}
      style={heightPx ? { maxHeight: heightPx } : undefined}
    />
  )
}
