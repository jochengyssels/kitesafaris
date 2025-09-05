"use client"

import { useState, useRef, useEffect } from "react"
import { Users, Camera, Loader2 } from "lucide-react"

interface KiteCountResponse {
  success: boolean
  count: number
  confidence: number
  analysis: string
  error?: string
}

export default function KitesurferCounter() {
  const [isCounting, setIsCounting] = useState(false)
  const [result, setResult] = useState<KiteCountResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<any>(null)

  // Initialize HLS stream
  useEffect(() => {
    const initHLS = async () => {
      if (!videoRef.current) return

      try {
        // Dynamically import HLS.js only on client side
        const Hls = (await import('hls.js')).default

        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: false,
            lowLatencyMode: true,
          })
          
          hlsRef.current = hls
          
          hls.loadSource('https://cdn-007.whatsupcams.com/hls/it_sangiovannisuergiu01.m3u8')
          hls.attachMedia(videoRef.current)

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log('HLS manifest parsed, video ready')
            setIsVideoReady(true)
          })

          hls.on(Hls.Events.ERROR, (event, data) => {
            console.error('HLS error:', data)
            if (data.fatal) {
              setIsVideoReady(false)
            }
          })
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          // Safari native HLS support
          videoRef.current.src = 'https://cdn-007.whatsupcams.com/hls/it_sangiovannisuergiu01.m3u8'
          videoRef.current.addEventListener('loadedmetadata', () => {
            setIsVideoReady(true)
          })
        }
      } catch (error) {
        console.error('Failed to initialize HLS:', error)
        setIsVideoReady(false)
      }
    }

    initHLS()

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
      }
    }
  }, [])

  const captureFrame = async (): Promise<string | null> => {
    const video = videoRef.current
    if (!video || !isVideoReady) {
      throw new Error("Video not ready for capture")
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      throw new Error("Could not get canvas context")
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert to base64 data URL
    return canvas.toDataURL('image/jpeg', 0.8)
  }

  const countKites = async () => {
    setIsCounting(true)
    setError(null)
    setResult(null)

    try {
      // Capture frame from video
      const imageData = await captureFrame()
      if (!imageData) {
        throw new Error("Could not capture frame from video")
      }

      // Call our API endpoint
      const response = await fetch('/api/kitesurfer-count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to count kites')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsCounting(false)
    }
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <Users className="w-5 h-5 text-turquoise" />
        <h3 className="font-semibold text-deep-navy">Kite Counter</h3>
      </div>
      
      <button
        onClick={countKites}
        disabled={isCounting || !isVideoReady}
        className="w-full bg-turquoise hover:bg-turquoise/90 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isCounting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing...
          </>
        ) : !isVideoReady ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading Stream...
          </>
        ) : (
          <>
            <Camera className="w-4 h-4" />
            Count Kites
          </>
        )}
      </button>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-green-800">
              {result.count} Kite{result.count !== 1 ? 's' : ''} Detected
            </span>
          </div>
          <p className="text-green-700 text-sm mb-2">
            Confidence: {Math.round(result.confidence * 100)}%
          </p>
          <p className="text-green-600 text-xs">
            {result.analysis}
          </p>
        </div>
      )}

      {/* Hidden video element for frame capture */}
      <video
        ref={videoRef}
        className="hidden"
        autoPlay
        muted
        playsInline
        controls={false}
      />
    </div>
  )
}
