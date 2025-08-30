import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings - KiteSafaris Admin",
  description: "KiteSafaris system settings and configuration",
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="font-montserrat text-4xl font-bold text-deep-navy mb-8">System Settings</h1>
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <p className="font-open-sans text-gray-600 mb-6">Configure system settings, integrations, and preferences.</p>
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-montserrat font-semibold text-deep-navy mb-3">General Settings</h3>
              <p className="font-open-sans text-gray-700">Basic system configuration and preferences.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-montserrat font-semibold text-deep-navy mb-3">Integrations</h3>
              <p className="font-open-sans text-gray-700">Manage third-party service integrations and API keys.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
