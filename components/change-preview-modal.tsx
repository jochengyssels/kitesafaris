"use client"

import { useState } from "react"
import { X, Eye, Code, Edit3, CheckCircle, AlertCircle, Info } from "lucide-react"
import type { OptimizationChange } from "@/lib/seo-optimization-service"

interface ChangePreviewModalProps {
  change: OptimizationChange | null
  isOpen: boolean
  onClose: () => void
  onApprove: (changeId: string) => void
  onReject: (changeId: string) => void
  onEdit: (changeId: string, newAfter: string) => void
}

export function ChangePreviewModal({ change, isOpen, onClose, onApprove, onReject, onEdit }: ChangePreviewModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState("")
  const [previewMode, setPreviewMode] = useState<"visual" | "code">("visual")

  if (!isOpen || !change) return null

  const handleEdit = () => {
    setEditedValue(change.after)
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    onEdit(change.id, editedValue)
    setIsEditing(false)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-coral-orange-600 bg-coral-orange-50 border-coral-orange-200"
      case "medium":
        return "text-gold-600 bg-gold-50 border-gold-200"
      case "low":
        return "text-turquoise-600 bg-turquoise-50 border-turquoise-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "meta":
        return "🏷️"
      case "image":
        return "🖼️"
      case "schema":
        return "📊"
      case "content":
        return "📝"
      case "link":
        return "🔗"
      default:
        return "⚙️"
    }
  }

  const renderVisualPreview = () => {
    switch (change.type) {
      case "meta":
        return (
          <div className="space-y-4">
            <div className="bg-white border border-sand-beige-200 rounded-lg p-4">
              <h4 className="font-medium text-navy-900 mb-2">Search Result Preview</h4>
              <div className="bg-gray-50 p-4 rounded border">
                <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                  {change.after.length > 60 ? change.after.substring(0, 60) + "..." : change.after}
                </div>
                <div className="text-green-700 text-sm">kitesafaris.com{change.page}</div>
                <div className="text-gray-700 text-sm mt-1">
                  {change.description.includes("description") ? change.after : "Meta description preview..."}
                </div>
              </div>
            </div>
          </div>
        )
      case "image":
        return (
          <div className="space-y-4">
            <div className="bg-white border border-sand-beige-200 rounded-lg p-4">
              <h4 className="font-medium text-navy-900 mb-2">Image Alt Text Preview</h4>
              <div className="bg-gray-100 p-4 rounded border flex items-center space-x-3">
                <div className="w-16 h-16 bg-turquoise-200 rounded flex items-center justify-center">
                  <span className="text-2xl">🖼️</span>
                </div>
                <div>
                  <div className="font-medium text-navy-900">Alt Text:</div>
                  <div className="text-gray-700 text-sm">{change.after}</div>
                </div>
              </div>
            </div>
          </div>
        )
      case "schema":
        return (
          <div className="space-y-4">
            <div className="bg-white border border-sand-beige-200 rounded-lg p-4">
              <h4 className="font-medium text-navy-900 mb-2">Structured Data Preview</h4>
              <div className="bg-gray-50 p-4 rounded border">
                <div className="text-sm text-gray-600 mb-2">Rich Snippet Enhancement:</div>
                <div className="bg-white border-l-4 border-turquoise-500 p-3">
                  <div className="font-medium text-navy-900">KiteSafaris - Caribbean Kite Safari</div>
                  <div className="text-sm text-gray-600">⭐⭐⭐⭐⭐ 4.9 (127 reviews)</div>
                  <div className="text-sm text-green-600">From €1,900 • 7 days • Antigua</div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="bg-sand-beige-50 p-4 rounded border">
            <div className="text-center text-gray-600">
              <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Visual preview not available for this change type</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sand-beige-200">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getTypeIcon(change.type)}</span>
            <div>
              <h2 className="font-montserrat font-semibold text-xl text-navy-900">Change Preview</h2>
              <p className="text-sm text-gray-600">{change.page}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-600 hover:text-navy-900 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Change Info */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-navy-900 mb-2">{change.description}</h3>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getImpactColor(change.impact)}`}
                  >
                    {change.impact} impact
                  </span>
                  <span className="text-sm text-gray-600">Type: {change.type}</span>
                  {change.element && <span className="text-sm text-gray-600">Element: {change.element}</span>}
                </div>
              </div>
            </div>

            {/* Preview Mode Toggle */}
            <div className="flex items-center space-x-2 border-b border-sand-beige-200">
              <button
                onClick={() => setPreviewMode("visual")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  previewMode === "visual"
                    ? "border-turquoise-500 text-turquoise-600"
                    : "border-transparent text-gray-600 hover:text-navy-900"
                }`}
              >
                <Eye className="h-4 w-4 inline mr-2" />
                Visual Preview
              </button>
              <button
                onClick={() => setPreviewMode("code")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  previewMode === "code"
                    ? "border-turquoise-500 text-turquoise-600"
                    : "border-transparent text-gray-600 hover:text-navy-900"
                }`}
              >
                <Code className="h-4 w-4 inline mr-2" />
                Code View
              </button>
            </div>

            {/* Preview Content */}
            {previewMode === "visual" ? (
              renderVisualPreview()
            ) : (
              <div className="space-y-4">
                {/* Before */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Before (Current)
                  </h4>
                  <pre className="text-sm text-red-700 bg-white p-3 rounded border overflow-x-auto">
                    {change.before}
                  </pre>
                </div>

                {/* After */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-800 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      After (Proposed)
                    </h4>
                    <button
                      onClick={handleEdit}
                      className="text-turquoise-600 hover:text-turquoise-700 text-sm flex items-center"
                    >
                      <Edit3 className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                  </div>
                  {isEditing ? (
                    <div className="space-y-3">
                      <textarea
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        className="w-full p-3 border border-sand-beige-300 rounded font-mono text-sm"
                        rows={4}
                      />
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="bg-turquoise-500 text-white px-4 py-2 rounded text-sm hover:bg-turquoise-600 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <pre className="text-sm text-green-700 bg-white p-3 rounded border overflow-x-auto">
                      {change.after}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* SEO Impact Analysis */}
            <div className="bg-sand-beige-50 border border-sand-beige-200 rounded-lg p-4">
              <h4 className="font-medium text-navy-900 mb-3 flex items-center">
                <Info className="h-4 w-4 mr-2" />
                SEO Impact Analysis
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium text-gray-700">Keyword Relevance</div>
                  <div className="text-turquoise-600">+15% improvement</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Search Visibility</div>
                  <div className="text-turquoise-600">+8% estimated</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Click-through Rate</div>
                  <div className="text-turquoise-600">+12% potential</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-sand-beige-200 bg-sand-beige-50">
          <div className="text-sm text-gray-600">
            This change will be applied to: <span className="font-medium">{change.page}</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onReject(change.id)}
              className="px-4 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50 transition-colors"
            >
              Reject
            </button>
            <button
              onClick={() => onApprove(change.id)}
              className="px-6 py-2 bg-coral-orange-500 text-white rounded hover:bg-coral-orange-600 transition-colors"
            >
              Approve Change
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
