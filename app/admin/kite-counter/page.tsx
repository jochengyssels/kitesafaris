"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import KitesurferCounter from "@/components/webcam/KitesurferCounter"
import { ArrowLeft, Camera, Users } from "lucide-react"
import Link from "next/link"

export default function KiteCounterAdminPage() {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-turquoise transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Admin
              </Link>
            </div>
            <div className="mt-4">
              <h1 className="text-3xl font-montserrat font-bold text-deep-navy">
                Kite Counter Tool
              </h1>
              <p className="text-gray-600 mt-2">
                AI-powered kite counting using live webcam feed from Punta Trettu, Sardinia
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Kite Counter Component */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Camera className="w-6 h-6 text-turquoise" />
                <h2 className="text-xl font-semibold text-deep-navy">
                  Live Kite Counter
                </h2>
              </div>
              
              <div className="space-y-4">
                <KitesurferCounter />
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-turquoise" />
                <h2 className="text-xl font-semibold text-deep-navy">
                  How to Use
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-deep-navy mb-2">Step 1: Wait for Stream</h3>
                  <p className="text-sm">The tool will automatically connect to the Punta Trettu webcam stream. Wait for the "Count Kites" button to become active.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-deep-navy mb-2">Step 2: Capture Frame</h3>
                  <p className="text-sm">Click "Count Kites" to capture the current frame from the live stream and analyze it with AI.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-deep-navy mb-2">Step 3: Review Results</h3>
                  <p className="text-sm">The AI will count only kite sails/parachutes visible in the image and provide a confidence level.</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Note:</h4>
                  <p className="text-sm text-blue-700">
                    This tool counts only kite sails/parachutes, not people or other equipment. 
                    It uses OpenAI's GPT-4 Vision API for analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-deep-navy mb-4">Technical Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h3 className="font-semibold text-deep-navy mb-2">Data Source</h3>
                <p>Live HLS stream from Punta Trettu webcam</p>
                <p className="text-gray-500">URL: https://cdn-007.whatsupcams.com/hls/it_sangiovannisuergiu01.m3u8</p>
              </div>
              <div>
                <h3 className="font-semibold text-deep-navy mb-2">AI Analysis</h3>
                <p>OpenAI GPT-4 Vision API</p>
                <p className="text-gray-500">Specialized prompt for kite detection only</p>
              </div>
              <div>
                <h3 className="font-semibold text-deep-navy mb-2">Frame Capture</h3>
                <p>Canvas-based image capture from video stream</p>
                <p className="text-gray-500">Base64 encoded for API transmission</p>
              </div>
              <div>
                <h3 className="font-semibold text-deep-navy mb-2">Response Format</h3>
                <p>JSON with count, confidence, and analysis</p>
                <p className="text-gray-500">Real-time results with error handling</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
