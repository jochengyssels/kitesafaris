"use client"

import type React from "react"
import { MessageCircle, MessageSquare, Phone, Mail, Send, CheckCircle, AlertCircle, Loader2, Globe, Shield, Clock, Award, Users, Star, Home, Waves, Wind } from "lucide-react"
import Image from "next/image"

import { Navigation } from "@/components/navigation"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { FloatingActionButtons } from "@/components/floating-action-buttons"
import { DestinationFocusedMap } from "@/components/destination-focused-map"
import { useState, useRef, useEffect } from "react"

export default function KitehouseContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
    serviceType: 'kitesurf-courses',
    accommodationType: 'holiday-apartment',
    experienceLevel: 'beginner'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isVisible, setIsVisible] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('kitehouse-contact-form')
      if (element) {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0
        setIsVisible(isVisible)
      }
    }
    
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Real-time validation
  const validateField = (name: string, value: string) => {
    let error = ''
    
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required'
        else if (value.trim().length < 2) error = 'Name must be at least 2 characters'
        break
      case 'email':
        if (!value.trim()) error = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email'
        break
      case 'message':
        if (!value.trim()) error = 'Message is required'
        else if (value.trim().length < 10) error = 'Message must be at least 10 characters'
        break
    }
    
    return error
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Validate field in real-time for better UX
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const isFormValid = () => {
    // Check if required fields are filled
    const hasRequiredFields = formData.name.trim() && 
                             formData.email.trim() && 
                             formData.message.trim() && 
                             !formData.honeypot
    
    // Check if there are any validation errors
    const hasNoErrors = Object.values(errors).every(error => !error)
    
    // Validate fields in real-time
    const nameError = validateField('name', formData.name)
    const emailError = validateField('email', formData.email)
    const messageError = validateField('message', formData.message)
    
    const hasNoValidationErrors = !nameError && !emailError && !messageError
    
    return hasRequiredFields && hasNoErrors && hasNoValidationErrors
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'honeypot' && key !== 'serviceType' && key !== 'accommodationType' && key !== 'experienceLevel') {
        const error = validateField(key, formData[key as keyof typeof formData])
        if (error) newErrors[key] = error
      }
    })
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Check honeypot
    if (formData.honeypot) {
      console.log('Honeypot triggered - potential spam')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.name.split(' ')[0] || formData.name,
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone,
          subject: `Kitehouse Sardinia Inquiry - ${formData.serviceType}`,
          message: `Service Type: ${formData.serviceType}\nAccommodation Type: ${formData.accommodationType}\nExperience Level: ${formData.experienceLevel}\n\nMessage: ${formData.message}`,
          destination: 'sardinia',
          source: 'kitehouse-contact-page',
          recipient: 'info@kitesafaris.com',
          userAgent: navigator.userAgent
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setSubmitMessage("Thank you for your interest in Kitehouse Sardinia! Our team will get back to you within 24 hours with accommodation details, course information, and availability.")
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          honeypot: '',
          serviceType: 'kitesurf-courses',
          accommodationType: 'holiday-apartment',
          experienceLevel: 'beginner'
        })
        setErrors({})
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.error || "There was an error sending your message. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Kitehouse contact form submission error:", error)
      setSubmitStatus('error')
      setSubmitMessage("There was an error sending your message. Please try again or contact us directly.")
    }

    setIsSubmitting(false)
  }

  // Quick contact handlers
  const handleWhatsApp = () => {
    const message = "Hi! I'd like to inquire about Kitehouse Sardinia accommodations and kitesurfing courses."
    const whatsappUrl = `https://wa.me/3933444368672?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleLiveChat = () => {
    // For now, redirect to WhatsApp as a fallback
    handleWhatsApp()
  }

  const handlePhone = () => {
    window.location.href = "tel:+3933444368672"
  }

  const handleEmail = () => {
    const subject = "Kitehouse Sardinia Accommodation & Course Inquiry"
    const body = "Hi, I'm interested in learning more about your accommodations and kitesurfing courses at Punta Trettu."
    const mailtoUrl = `mailto:info@kitehousesardinia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
  }

  const serviceTypes = [
    { value: 'kitesurf-courses', label: 'Kitesurf Courses', description: 'IKO certified instruction for all levels' },
    { value: 'accommodation-only', label: 'Accommodation Only', description: 'Holiday apartments and kitecamp stays' },
    { value: 'combined-package', label: 'Combined Package', description: 'Courses + accommodation in one package' },
    { value: 'wingfoil-training', label: 'Wingfoil Training', description: 'Advanced clinics and progression training' },
    { value: 'group-booking', label: 'Group Booking', description: 'Special rates for groups and families' },
    { value: 'custom-experience', label: 'Custom Experience', description: 'Tailored packages for your needs' }
  ]

  const accommodationTypes = [
    { value: 'holiday-apartment', label: 'Holiday Apartment', description: 'Private apartments with full amenities' },
    { value: 'kitecamp-stay', label: 'Kitecamp Stay', description: 'Shared accommodation with community atmosphere' },
    { value: 'family-room', label: 'Family Room', description: 'Spacious rooms perfect for families' },
    { value: 'private-room', label: 'Private Room', description: 'Individual rooms with shared facilities' },
    { value: 'long-term', label: 'Long-term Stay', description: 'Extended stays for serious kiters' }
  ]

  const experienceLevels = [
    { value: 'beginner', label: 'Complete Beginner', description: 'Never kitesurfed before' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some kitesurfing experience' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced kitesurfer' },
    { value: 'expert', label: 'Expert', description: 'Looking for specialized training' }
  ]

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-deep-navy via-turquoise to-sand-beige py-20 overflow-hidden">
        {/* Ocean Wave Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        {/* Floating Kite Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-16 h-16 opacity-20 animate-pulse">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute top-20 right-20 w-12 h-12 opacity-15 animate-pulse" style={{animationDelay: '1s'}}>
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 opacity-10 animate-pulse" style={{animationDelay: '2s'}}>
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                <Image
                  src="/logos/kitehouse-logo.png"
                  alt="Kitehouse Sardinia Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="font-montserrat text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Kitehouse Sardinia
            </h1>
            <p className="font-open-sans text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Experience the perfect blend of kitesurfing instruction and accommodation at Punta Trettu. IKO certified courses with kiter-designed lodging in Sardinia's premier kite destination.
            </p>
          </div>
        </div>
      </section>

      {/* Kitehouse Credentials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-4">Why Choose Kitehouse Sardinia?</h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              The only place in Sardinia where kitesurfing instruction meets authentic accommodation experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-turquoise-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-turquoise" />
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">IKO Certified</h3>
              <p className="font-open-sans text-gray-600 text-sm">Professional instruction</p>
            </div>
            <div className="text-center">
              <div className="bg-coral-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-coral-orange" />
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Kiter-Designed</h3>
              <p className="font-open-sans text-gray-600 text-sm">Accommodation by kiters</p>
            </div>
            <div className="text-center">
              <div className="bg-sand-beige-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-sand-beige" />
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Community</h3>
              <p className="font-open-sans text-gray-600 text-sm">International atmosphere</p>
            </div>
            <div className="text-center">
              <div className="bg-deep-navy-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-deep-navy" />
              </div>
              <h3 className="font-montserrat font-bold text-deep-navy mb-2">Perfect Location</h3>
              <p className="font-open-sans text-gray-600 text-sm">5-min from Punta Trettu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Kitehouse Inquiry Form */}
            <div 
              id="kitehouse-contact-form"
              className={`transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
                {/* Oceanic Gradient Header */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-turquoise via-deep-navy to-coral-orange" />
                
                {/* Zebra Pattern Accent */}
                <div className="absolute top-4 right-4 opacity-10">
                  <div className="w-16 h-16" style={{
                    backgroundImage: `repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 4px,
                      #0f766e 4px,
                      #0f766e 8px
                    )`
                  }} />
                </div>

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-3">
                      Accommodation & Course Inquiry
                    </h2>
                    <p className="font-open-sans text-gray-600 mb-4">
                      Get personalized recommendations for courses and accommodation. We reply within 24 hours.
                    </p>
                    
                    {/* Social Proof */}
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Join our international kitesurfing community!</span>
                    </div>
                  </div>

                  <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-6">
                    {/* Honeypot Field */}
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleInputChange}
                      className="absolute left-[-9999px] opacity-0"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* Name Field */}
                    <div className="relative">
                      <label htmlFor="name" className="block font-montserrat font-semibold text-deep-navy mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          required
                          className={`w-full px-4 py-4 pl-12 border-2 rounded-xl focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans transition-all duration-200 ${
                            errors.name 
                              ? 'border-red-300 focus:ring-red-200' 
                              : 'border-gray-200 focus:border-turquoise'
                          }`}
                          placeholder="Enter your full name"
                          aria-label="Full name"
                          aria-describedby={errors.name ? `name-error` : undefined}
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                      {errors.name && (
                        <p id="name-error" className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <label htmlFor="email" className="block font-montserrat font-semibold text-deep-navy mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          required
                          className={`w-full px-4 py-4 pl-12 border-2 rounded-xl focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans transition-all duration-200 ${
                            errors.email 
                              ? 'border-red-300 focus:ring-red-200' 
                              : 'border-gray-200 focus:border-turquoise'
                          }`}
                          placeholder="Enter your email address"
                          aria-label="Email address"
                          aria-describedby={errors.email ? `email-error` : undefined}
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Mail className="w-5 h-5" />
                        </div>
                      </div>
                      {errors.email && (
                        <p id="email-error" className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Field (Optional) */}
                    <div className="relative">
                      <label htmlFor="phone" className="block font-montserrat font-semibold text-deep-navy mb-2">
                        Phone Number <span className="text-sm font-normal text-gray-500">(Optional - for direct callback)</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans transition-all duration-200"
                          placeholder="Enter your phone number"
                          aria-label="Phone number"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Phone className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Service Type Selector */}
                    <div className="relative">
                      <label htmlFor="serviceType" className="block font-montserrat font-semibold text-deep-navy mb-2">
                        Service Interest
                      </label>
                      <div className="relative">
                        <select
                          id="serviceType"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans transition-all duration-200 appearance-none bg-white"
                          aria-label="Select service type"
                        >
                          {serviceTypes.map((service) => (
                            <option key={service.value} value={service.value}>
                              {service.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Award className="w-5 h-5" />
                        </div>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {serviceTypes.find(s => s.value === formData.serviceType)?.description}
                      </p>
                    </div>

                    {/* Accommodation Type Selector */}
                    <div className="relative">
                      <label htmlFor="accommodationType" className="block font-montserrat font-semibold text-deep-navy mb-2">
                        Accommodation Preference
                      </label>
                      <div className="relative">
                        <select
                          id="accommodationType"
                          name="accommodationType"
                          value={formData.accommodationType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans transition-all duration-200 appearance-none bg-white"
                          aria-label="Select accommodation type"
                        >
                          {accommodationTypes.map((accommodation) => (
                            <option key={accommodation.value} value={accommodation.value}>
                              {accommodation.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Home className="w-5 h-5" />
                        </div>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {accommodationTypes.find(a => a.value === formData.accommodationType)?.description}
                      </p>
                    </div>

                    {/* Experience Level Selector */}
                    <div className="relative">
                      <label htmlFor="experienceLevel" className="block font-montserrat font-semibold text-deep-navy mb-2">
                        Kitesurfing Experience
                      </label>
                      <div className="relative">
                        <select
                          id="experienceLevel"
                          name="experienceLevel"
                          value={formData.experienceLevel}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans transition-all duration-200 appearance-none bg-white"
                          aria-label="Select experience level"
                        >
                          {experienceLevels.map((level) => (
                            <option key={level.value} value={level.value}>
                              {level.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Users className="w-5 h-5" />
                        </div>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {experienceLevels.find(l => l.value === formData.experienceLevel)?.description}
                      </p>
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <label htmlFor="message" className="block font-montserrat font-semibold text-deep-navy mb-2">
                        Message *
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          required
                          rows={4}
                          className={`w-full px-4 py-4 pl-12 border-2 rounded-xl focus:ring-2 focus:ring-turquoise focus:border-transparent font-open-sans resize-none transition-all duration-200 ${
                            errors.message 
                              ? 'border-red-300 focus:ring-red-200' 
                              : 'border-gray-200 focus:border-turquoise'
                          }`}
                          placeholder="Tell us about your kitesurfing goals, preferred dates, group size, accommodation needs, or any specific questions about our services..."
                          aria-label="Your message"
                          aria-describedby={errors.message ? `message-error` : undefined}
                        />
                        <div className="absolute left-4 top-4 text-gray-400">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                      </div>
                      {errors.message && (
                        <p id="message-error" className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!isFormValid() || isSubmitting}
                      className={`w-full py-4 px-6 rounded-xl font-montserrat font-bold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-turquoise/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                        isSubmitting 
                          ? 'bg-gray-400' 
                          : 'bg-gradient-to-r from-coral-orange to-turquoise hover:from-coral-orange/90 hover:to-turquoise/90'
                      }`}
                      aria-label="Send inquiry"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Send className="w-5 h-5" />
                          <span>Send Inquiry</span>
                        </div>
                      )}
                    </button>

                    {/* Success/Error Messages */}
                    {submitStatus === 'success' && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3 animate-in slide-in-from-top-2">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <p className="text-green-800 font-medium">{submitMessage}</p>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 animate-in slide-in-from-top-2">
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                        <p className="text-red-800 font-medium">{submitMessage}</p>
                      </div>
                    )}

                    {/* Privacy & Trust Indicators */}
                    <div className="text-center space-y-3 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Shield className="w-4 h-4" />
                          <span>100% Secure</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>24h Response</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">
                        By submitting this form, you agree to our{' '}
                        <a href="/privacy" className="text-turquoise hover:underline">Privacy Policy</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Kitehouse Contact Information & Quick Actions */}
            <div className="space-y-8">
              <div>
                <h2 className="font-montserrat text-2xl font-bold text-deep-navy mb-6">Kitehouse Sardinia Contact</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-turquoise rounded-full p-3 mr-4">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-deep-navy mb-1">Phone</h3>
                      <p className="font-open-sans text-gray-700">+39 334 443 6867</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-turquoise rounded-full p-3 mr-4">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-deep-navy mb-1">Email</h3>
                      <p className="font-open-sans text-gray-700">info@kitehousesardinia.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-turquoise rounded-full p-3 mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-deep-navy mb-1">Location</h3>
                      <p className="font-open-sans text-gray-700">San Giovanni Suergiu</p>
                      <p className="font-open-sans text-gray-700">Sardinia, Italy</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="bg-gradient-to-br from-deep-navy to-turquoise rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="font-montserrat text-xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="font-open-sans mb-6">
                  For urgent accommodation or course inquiries, use our instant channels below.
                </p>

                <div className="space-y-4">
                  <button 
                    onClick={handleWhatsApp} 
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200 rounded-lg p-4 flex items-center group hover:scale-105"
                    aria-label="Contact Kitehouse on WhatsApp"
                    role="button"
                  >
                    <MessageCircle className="h-6 w-6 mr-3 text-white group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="font-montserrat font-bold text-white">WhatsApp</div>
                      <div className="font-open-sans text-sm text-white/90">Instant support</div>
                    </div>
                  </button>

                  <button 
                    onClick={handleLiveChat} 
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200 rounded-lg p-4 flex items-center group hover:scale-105"
                    aria-label="Start live chat with Kitehouse team"
                    role="button"
                  >
                    <MessageSquare className="h-6 w-6 mr-3 text-white group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="font-montserrat font-bold text-white">Live Chat</div>
                      <div className="font-open-sans text-sm text-white/90">Chat with Kitehouse team</div>
                    </div>
                  </button>

                  <button 
                    onClick={handlePhone} 
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200 rounded-lg p-4 flex items-center group hover:scale-105"
                    aria-label="Call Kitehouse directly"
                    role="button"
                  >
                    <Phone className="h-6 w-6 mr-3 text-white group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="font-montserrat font-bold text-white">Call Kitehouse</div>
                      <div className="font-open-sans text-sm text-white/90">Direct phone support</div>
                    </div>
                  </button>

                  <button 
                    onClick={handleEmail} 
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200 rounded-lg p-4 flex items-center group hover:scale-105"
                    aria-label="Send Kitehouse an email"
                    role="button"
                  >
                    <Mail className="h-6 w-6 mr-3 text-white group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="font-montserrat font-bold text-white">Email Kitehouse</div>
                      <div className="font-open-sans text-sm text-white/90">Accommodation & courses</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Service Information */}
              <div>
                <h3 className="font-montserrat text-xl font-bold text-deep-navy mb-4">Service Information</h3>
                <div className="space-y-3 font-open-sans text-gray-700">
                  <div className="flex justify-between">
                    <span>Season</span>
                    <span>April - November</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Languages</span>
                    <span>Multilingual</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Equipment</span>
                    <span>Premium gear</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Safety</span>
                    <span>Radio-equipped</span>
                  </div>
                </div>
                <p className="font-open-sans text-sm text-gray-600 mt-4">
                  * All services include professional instruction and rescue support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Punta Trettu Location Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl font-bold text-deep-navy mb-4">Kitehouse Sardinia Location</h2>
            <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Located in San Giovanni Suergiu, just 5 minutes from Punta Trettu's perfect kitesurfing conditions
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <DestinationFocusedMap
              destination={{
                id: "sardinia",
                name: "Kitehouse Sardinia - San Giovanni Suergiu",
                coordinates: { lat: 39.112133995367714, lng: 8.437520043416788 },
                zoom: 15,
              }}
            />
          </div>
        </div>
      </section>

      <EnhancedFooter />
      <FloatingActionButtons />
    </>
  )
}
