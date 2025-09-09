'use client'

import { useState, useEffect } from 'react'

export function useKAIteSettings() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kaite-enabled')
      // Default to false (disabled) if no setting exists
      setIsEnabled(saved === 'true')
    } catch (error) {
      console.error('Error loading kAIte settings:', error)
      setIsEnabled(false) // Default to disabled if there's an error
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Function to update the setting
  const updateSetting = (enabled: boolean) => {
    try {
      localStorage.setItem('kaite-enabled', enabled.toString())
      setIsEnabled(enabled)
      return true
    } catch (error) {
      console.error('Error saving kAIte settings:', error)
      return false
    }
  }

  // Function to toggle the setting
  const toggle = () => {
    return updateSetting(!isEnabled)
  }

  return {
    isEnabled,
    isLoading,
    updateSetting,
    toggle
  }
}
