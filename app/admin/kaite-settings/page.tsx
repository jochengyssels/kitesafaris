'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Bot, 
  Eye, 
  EyeOff, 
  MessageCircle, 
  Settings, 
  Save,
  RefreshCw,
  CheckCircle,
  XCircle
} from 'lucide-react'

export default function KAIteSettingsPage() {
  const [isKAIteEnabled, setIsKAIteEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Load settings from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('kaite-enabled')
    // Default to false (disabled) if no setting exists
    setIsKAIteEnabled(saved === 'true')
  }, [])

  const handleToggleKAIte = async (enabled: boolean) => {
    setIsLoading(true)
    
    try {
      // Save to localStorage
      localStorage.setItem('kaite-enabled', enabled.toString())
      setIsKAIteEnabled(enabled)
      setLastSaved(new Date())
      
      // Optional: Show success feedback
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      
    } catch (error) {
      console.error('Error saving kAIte settings:', error)
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    const saved = localStorage.getItem('kaite-enabled')
    setIsKAIteEnabled(saved === 'true')
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Bot className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">kAIte Settings</h1>
        </div>
        <p className="text-gray-600">
          Configure your Virtual Kite Expert's visibility and behavior across the website. 
          <span className="text-sm text-orange-600 font-medium"> Currently disabled by default.</span>
        </p>
      </div>

      <div className="grid gap-6">
        {/* Main Toggle Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              kAIte Visibility
            </CardTitle>
            <CardDescription>
              Control whether kAIte appears on your website for visitors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="kaite-toggle" className="text-base font-medium">
                  Enable kAIte Chat Widget
                </Label>
                <p className="text-sm text-gray-600">
                  Show the floating chat widget on all pages
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={isKAIteEnabled ? "default" : "secondary"}>
                  {isKAIteEnabled ? (
                    <>
                      <Eye className="h-3 w-3 mr-1" />
                      Visible
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3 w-3 mr-1" />
                      Hidden
                    </>
                  )}
                </Badge>
                <Switch
                  id="kaite-toggle"
                  checked={isKAIteEnabled}
                  onCheckedChange={handleToggleKAIte}
                  disabled={isLoading}
                />
              </div>
            </div>

            {lastSaved && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Last saved: {lastSaved.toLocaleTimeString()}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {isKAIteEnabled ? 'ON' : 'OFF'}
                </div>
                <div className="text-sm text-gray-600">Widget Status</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  Active
                </div>
                <div className="text-sm text-gray-600">AI Service</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  1775+
                </div>
                <div className="text-sm text-gray-600">Kitespots</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage kAIte settings and test functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Status
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.open('/', '_blank')}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Website
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.open('/kaite', '_blank')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Test kAIte Chat
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>About kAIte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Intelligent kitesurfing advice</li>
                  <li>• Trip recommendations</li>
                  <li>• Equipment sizing help</li>
                  <li>• Booking assistance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Technology</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• OpenAI GPT-4o-mini</li>
                  <li>• 1775+ kitespot database</li>
                  <li>• Real-time weather data</li>
                  <li>• Context-aware responses</li>
                </ul>
              </div>
            </div>
            
            <Separator />
            
            <div className="text-sm text-gray-600">
              <strong>Note:</strong> Settings are stored locally in your browser. 
              To apply changes across all devices, consider implementing a database solution.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
