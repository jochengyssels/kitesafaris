import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Content Management - KiteSafaris Admin",
  description: "KiteSafaris content management system",
}

export default function ContentPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="font-montserrat text-4xl font-bold text-deep-navy mb-8">Content Management</h1>
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <p className="font-open-sans text-gray-600 mb-6">Manage website content, blog posts, and media assets.</p>
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-montserrat font-semibold text-deep-navy mb-3">Blog Posts</h3>
              <p className="font-open-sans text-gray-700">Create and manage blog content for SEO and engagement.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-montserrat font-semibold text-deep-navy mb-3">Media Library</h3>
              <p className="font-open-sans text-gray-700">Upload and organize images, videos, and documents.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
