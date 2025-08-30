"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Settings, ExternalLink } from "lucide-react"

interface ConnectionStatus {
  connected: boolean
  error?: string
  details?: {
    hasApiKey: boolean
    hasBaseId: boolean
  }
}

export function AirtableSetupGuide() {
  const [status, setStatus] = useState<ConnectionStatus | null>(null)
  const [loading, setLoading] = useState(true)

  const checkConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/trips/test-connection")
      const result = await response.json()
      setStatus(result)
    } catch (error) {
      setStatus({
        connected: false,
        error: "Failed to test connection",
        details: { hasApiKey: false, hasBaseId: false },
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  if (loading) {
    return (
      <div className="bg-sand-beige rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-coral-orange-600"></div>
          <span className="font-montserrat font-medium text-deep-navy">Checking Airtable connection...</span>
        </div>
      </div>
    )
  }

  if (status?.connected) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="font-montserrat font-medium text-green-800">✅ Airtable connection successful!</span>
        </div>
        <p className="font-open-sans text-green-700 mt-2">
          Your trip data is now synced with Airtable. All changes will be saved persistently.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-montserrat font-bold text-amber-800 mb-2">Airtable Configuration Required</h3>
          <p className="font-open-sans text-amber-700 mb-4">
            To save trip data persistently, you need to configure your Airtable integration.
          </p>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2">
              {status?.details?.hasApiKey ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-600" />
              )}
              <span className="font-open-sans text-sm">
                AIRTABLE_API_KEY {status?.details?.hasApiKey ? "✓" : "(missing)"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {status?.details?.hasBaseId ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-600" />
              )}
              <span className="font-open-sans text-sm">
                AIRTABLE_BASE_ID {status?.details?.hasBaseId ? "✓" : "(missing)"}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-md p-4 border border-amber-200 mb-4">
            <h4 className="font-montserrat font-semibold text-deep-navy mb-2 flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Setup Instructions
            </h4>
            <ol className="font-open-sans text-sm text-gray-700 space-y-2 list-decimal list-inside">
              <li>Go to Project Settings → Environment Variables</li>
              <li>
                Add <code className="bg-gray-100 px-1 rounded">AIRTABLE_API_KEY</code> with your Airtable API key
              </li>
              <li>
                Add <code className="bg-gray-100 px-1 rounded">AIRTABLE_BASE_ID</code> with your Airtable base ID
              </li>
              <li>Make sure your Airtable base has a "Trips" table</li>
              <li>Refresh this page to test the connection</li>
            </ol>
          </div>

          <div className="flex gap-3">
            <button
              onClick={checkConnection}
              className="bg-coral-orange-600 hover:bg-coral-orange-700 text-white px-4 py-2 rounded-lg font-montserrat font-medium text-sm transition-colors"
            >
              Test Connection
            </button>
            <a
              href="https://airtable.com/developers/web/api/introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-50 text-deep-navy border border-gray-300 px-4 py-2 rounded-lg font-montserrat font-medium text-sm transition-colors flex items-center gap-2"
            >
              Airtable API Docs
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
