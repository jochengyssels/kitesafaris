"use client"

import { useState } from "react"
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Calendar,
  Filter,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Search,
  Globe
} from "lucide-react"

interface ExportReportsProps {
  onExport: (format: 'csv' | 'pdf', data: any) => void
}

export function ExportReports({ onExport }: ExportReportsProps) {
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'pdf'>('csv')
  const [selectedSections, setSelectedSections] = useState<string[]>(['overview', 'analytics', 'business', 'seo'])
  const [dateRange, setDateRange] = useState('30d')
  const [isExporting, setIsExporting] = useState(false)

  const reportSections = [
    {
      id: 'overview',
      name: 'Overview',
      description: 'Key metrics and summary statistics',
      icon: BarChart3,
      includes: ['Traffic summary', 'Revenue metrics', 'Top pages', 'Device breakdown']
    },
    {
      id: 'analytics',
      name: 'Website Analytics',
      description: 'Detailed traffic and user behavior data',
      icon: TrendingUp,
      includes: ['Page performance', 'Traffic sources', 'User demographics', 'Geographic data']
    },
    {
      id: 'business',
      name: 'Business Metrics',
      description: 'Revenue, bookings, and customer data',
      icon: DollarSign,
      includes: ['Revenue trends', 'Booking data', 'Customer demographics', 'Conversion funnel']
    },
    {
      id: 'seo',
      name: 'SEO Insights',
      description: 'Search engine optimization metrics',
      icon: Search,
      includes: ['Keyword rankings', 'SEO issues', 'Content opportunities', 'Backlink profile']
    },
    {
      id: 'alerts',
      name: 'Alerts & Issues',
      description: 'System alerts and recommendations',
      icon: AlertCircle,
      includes: ['Active alerts', 'Resolved issues', 'Recommendations', 'Performance warnings']
    }
  ]

  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ]

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleSelectAll = () => {
    setSelectedSections(reportSections.map(section => section.id))
  }

  const handleSelectNone = () => {
    setSelectedSections([])
  }

  const handleExport = async () => {
    if (selectedSections.length === 0) {
      alert('Please select at least one section to export.')
      return
    }

    setIsExporting(true)
    try {
      const exportData = {
        format: selectedFormat,
        sections: selectedSections,
        dateRange: dateRange,
        timestamp: new Date().toISOString(),
        metadata: {
          generatedBy: 'KiteSafaris Analytics Dashboard',
          version: '1.0.0'
        }
      }

      await onExport(selectedFormat, exportData)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Export Configuration */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-navy-900">Export Reports</h2>
          <Download className="h-6 w-6 text-gray-400" />
        </div>

        {/* Format Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-navy-900 mb-4">Export Format</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedFormat === 'csv' 
                  ? 'border-turquoise-500 bg-turquoise-50' 
                  : 'border-sand-beige-200 hover:border-sand-beige-300'
              }`}
              onClick={() => setSelectedFormat('csv')}
            >
              <div className="flex items-center space-x-3">
                <FileSpreadsheet className="h-8 w-8 text-green-600" />
                <div>
                  <h4 className="font-medium text-navy-900">CSV Export</h4>
                  <p className="text-sm text-gray-600">Spreadsheet format for data analysis</p>
                </div>
              </div>
            </div>

            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedFormat === 'pdf' 
                  ? 'border-turquoise-500 bg-turquoise-50' 
                  : 'border-sand-beige-200 hover:border-sand-beige-300'
              }`}
              onClick={() => setSelectedFormat('pdf')}
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-red-600" />
                <div>
                  <h4 className="font-medium text-navy-900">PDF Report</h4>
                  <p className="text-sm text-gray-600">Formatted report with charts and insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date Range Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-navy-900 mb-4">Date Range</h3>
          <div className="flex flex-wrap gap-2">
            {dateRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setDateRange(range.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dateRange === range.value
                    ? 'bg-turquoise-600 text-white'
                    : 'bg-sand-beige-100 text-gray-700 hover:bg-sand-beige-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-navy-900">Report Sections</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleSelectAll}
                className="px-3 py-1 text-sm bg-turquoise-100 text-turquoise-700 rounded hover:bg-turquoise-200 transition-colors"
              >
                Select All
              </button>
              <button
                onClick={handleSelectNone}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Select None
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportSections.map((section) => {
              const Icon = section.icon
              const isSelected = selectedSections.includes(section.id)
              
              return (
                <div
                  key={section.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected 
                      ? 'border-turquoise-500 bg-turquoise-50' 
                      : 'border-sand-beige-200 hover:border-sand-beige-300'
                  }`}
                  onClick={() => handleSectionToggle(section.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-turquoise-100' : 'bg-sand-beige-100'}`}>
                      <Icon className={`h-5 w-5 ${isSelected ? 'text-turquoise-600' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-navy-900">{section.name}</h4>
                        {isSelected && <CheckCircle className="h-4 w-4 text-turquoise-600" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{section.description}</p>
                      <div className="text-xs text-gray-500">
                        <p className="font-medium mb-1">Includes:</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          {section.includes.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Export Summary */}
        <div className="bg-sand-beige-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-navy-900 mb-2">Export Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Format:</p>
              <p className="font-medium text-navy-900">{selectedFormat.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-gray-600">Date Range:</p>
              <p className="font-medium text-navy-900">
                {dateRanges.find(r => r.value === dateRange)?.label}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Sections:</p>
              <p className="font-medium text-navy-900">{selectedSections.length} selected</p>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedSections.length > 0 ? (
              <span>Ready to export {selectedSections.length} section{selectedSections.length !== 1 ? 's' : ''}</span>
            ) : (
              <span className="text-red-600">Please select at least one section</span>
            )}
          </div>
          
          <button
            onClick={handleExport}
            disabled={selectedSections.length === 0 || isExporting}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedSections.length === 0 || isExporting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-turquoise-600 text-white hover:bg-turquoise-700'
            }`}
          >
            {isExporting ? (
              <>
                <Clock className="h-4 w-4 animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Export History */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
        <h3 className="text-lg font-semibold text-navy-900 mb-4">Recent Exports</h3>
        <div className="space-y-3">
          {[
            { name: 'Analytics Report - 30d', format: 'PDF', date: '2024-01-15', size: '2.4 MB' },
            { name: 'Business Metrics - 7d', format: 'CSV', date: '2024-01-14', size: '156 KB' },
            { name: 'SEO Insights - 90d', format: 'PDF', date: '2024-01-12', size: '1.8 MB' },
            { name: 'Full Dashboard - 30d', format: 'CSV', date: '2024-01-10', size: '3.2 MB' },
          ].map((export_, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-sand-beige-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {export_.format === 'PDF' ? (
                  <FileText className="h-5 w-5 text-red-600" />
                ) : (
                  <FileSpreadsheet className="h-5 w-5 text-green-600" />
                )}
                <div>
                  <p className="font-medium text-navy-900">{export_.name}</p>
                  <p className="text-sm text-gray-600">{export_.date} • {export_.size}</p>
                </div>
              </div>
              <button className="text-turquoise-600 hover:text-turquoise-700 text-sm font-medium">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
