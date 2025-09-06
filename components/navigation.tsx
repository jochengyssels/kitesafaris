"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect, useRef, useCallback } from "react"
import { CertificationBadges } from "./certification-badges"
import Image from "next/image"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const menuItemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const menuStructure = [
    {
      label: "Home",
      href: "/",
      isSimple: true,
    },
    {
      label: "Destinations",
      href: "/destinations",
      isSimple: false,
      submenu: [
        { href: "/destinations/caribbean", label: "🏝️ Caribbean" },
        { href: "/destinations/greece", label: "🇬🇷 Greece" },
        { href: "/destinations/sardinia", label: "🇮🇹 Sardinia" },
        { href: "/packages", label: "📋 Packages" },
        { href: "/destinations/gallery", label: "📸 Gallery" },
        { href: "/flights-europe-antigua", label: "✈️ Flight Options" },
        { href: "/trip-calendar", label: "🗓️ Trip Calendar" },
        { href: "/blog", label: "📝 Travel Guides" },
      ],
    },
    {
      label: "Fleet & Booking",
      href: "/fleet",
      isSimple: false,
      submenu: [
        { href: "/fleet", label: "⛵ Our Fleet" },
        { href: "/pricing", label: "💰 Pricing" },
        { href: "/booking", label: "📅 Book Now" },
        { href: "/trip-calendar", label: "🗓️ Trip Calendar" },
      ],
    },
    {
      label: "Shop",
      href: "/shop",
      icon: "shopping-bag",
      isSimple: false,
      submenu: [
        { href: "/shop?category=all", label: "🛍️ All Products" },
        { href: "/shop?category=apparel", label: "👕 Apparel" },
        { href: "/shop?category=accessories", label: "🎒 Accessories" },
        { href: "/shop?category=kite-gear", label: "🪁 Kite Gear" },
        { href: "/shop?category=lifestyle", label: "🌊 Lifestyle" },
      ],
    },
    {
      label: "About",
      href: "/why-us",
      isSimple: false,
      submenu: [
        { href: "/why-us", label: "❓ Why Choose Us" },
        { href: "/small-groups", label: "👥 Small Groups" },
        { href: "/expert-guides", label: "🏆 Expert Guides" },
        { href: "/premium-equipment", label: "⚡ Premium Equipment" },
        { href: "/guaranteed-wind", label: "💨 Guaranteed Wind" },
        { href: "/reviews", label: "⭐ Reviews" },
        { href: "/blog", label: "📝 Blog" },
      ],
    },
    {
      label: "Contact Us",
      href: "/contact",
      isSimple: true,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const isParentActive = (item: any) => {
    if (item.isSimple) return isActive(item.href)
    return isActive(item.href) || (item.submenu && item.submenu.some((sub: any) => isActive(sub.href)))
  }

  const clearDropdownTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // Removed hover handlers - submenus now only open on click

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (activeDropdown && !target.closest('[data-dropdown-container]')) {
        setActiveDropdown(null)
      }
    }

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeDropdown])

  const handleMainMenuClick = useCallback(
    (e: React.MouseEvent, item: any) => {
      if (!item.isSimple) {
        e.preventDefault()
        setActiveDropdown(activeDropdown === item.label ? null : item.label)
      } else {
        // For simple items, navigate to the href
        router.push(item.href)
      }
    },
    [activeDropdown, router],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, label: string, submenu?: any[]) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        if (submenu) {
          setActiveDropdown(activeDropdown === label ? null : label)
        }
      } else if (event.key === "Escape") {
        setActiveDropdown(null)
      } else if (event.key === "ArrowDown" && submenu && activeDropdown === label) {
        event.preventDefault()
        const dropdown = dropdownRefs.current[label]
        const firstLink = dropdown?.querySelector("a")
        firstLink?.focus()
      }
    },
    [activeDropdown],
  )

  const handleSubmenuKeyDown = useCallback((event: React.KeyboardEvent, currentIndex: number, submenu: any[]) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      const nextIndex = (currentIndex + 1) % submenu.length
      const dropdown = event.currentTarget.parentElement
      const nextLink = dropdown?.children[nextIndex] as HTMLAnchorElement
      nextLink?.focus()
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      const prevIndex = currentIndex === 0 ? submenu.length - 1 : currentIndex - 1
      const dropdown = event.currentTarget.parentElement
      const prevLink = dropdown?.children[prevIndex] as HTMLAnchorElement
      prevLink?.focus()
    } else if (event.key === "Escape") {
      setActiveDropdown(null)
      const mainItem = event.currentTarget.closest("[data-menu-item]")?.querySelector("a") as HTMLAnchorElement
      mainItem?.focus()
    }
  }, [])

  const handleMobileSubmenuClick = useCallback((href: string) => {
    router.push(href)
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [router])

  const handleMobileSubmenuKeyDown = useCallback((event: React.KeyboardEvent, href: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      router.push(href)
      setIsMobileMenuOpen(false)
      setActiveDropdown(null)
    }
  }, [router])


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close dropdown on outside click — desktop only
  useEffect(() => {
    if (!activeDropdown || isMobile) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-dropdown-container]')) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [activeDropdown, isMobile])

  // Handle escape key for both desktop and mobile
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdown(null)
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
      clearDropdownTimeout()
    }
  }, [clearDropdownTimeout])

  return (
    <>
      <nav className="sticky top-0 z-50 bg-deep-navy shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center font-montserrat text-xl font-bold text-white hover:text-coral-orange transition-colors"
              aria-label="KiteSafaris.com home page"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_zebra_transparent_1024-JraSDHCx06V31EF2ql9nH2rQNyBh2C.png"
                alt="KiteSafaris.com zebra logo - Caribbean kiteboarding adventures"
                width={32}
                height={32}
                className="mr-2"
                priority
              />
              Kite Safaris
            </Link>

            <div className="hidden lg:flex items-center space-x-6">
              {menuStructure.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  data-dropdown-container
                  data-menu-item={item.label}
                  ref={(el) => {
                    menuItemRefs.current[item.label] = el
                  }}
                >
                  <button
                    className={`font-montserrat font-bold text-sm transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-coral-orange focus:ring-opacity-50 rounded px-2 py-1 ${
                      isParentActive(item) ? "text-coral-orange" : "text-white hover:text-coral-orange"
                    }`}
                    aria-current={isParentActive(item) ? "page" : undefined}
                    aria-expanded={!item.isSimple && activeDropdown === item.label}
                    aria-haspopup={!item.isSimple}
                    onKeyDown={(e) => handleKeyDown(e, item.label, item.submenu)}
                    onClick={(e) => handleMainMenuClick(e, item)}
                  >
                    {item.icon === "shopping-bag" && (
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
                        />
                      </svg>
                    )}
                    {item.label}
                    {!item.isSimple && (
                      <svg
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {!item.isSimple && item.submenu && activeDropdown === item.label && (
                    <div
                      ref={(el) => {
                        dropdownRefs.current[item.label] = el
                      }}
                      className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 
                        animate-in fade-in slide-in-from-top-2 duration-200`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby={`menu-${item.label}`}
                    >
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-sm font-bold text-coral-orange border-b border-gray-100 mb-1 transition-colors focus:outline-none focus:ring-2 focus:ring-coral-orange focus:ring-inset rounded-md mx-2 hover:bg-turquoise-blue hover:bg-opacity-10"
                        role="menuitem"
                        onClick={() => setActiveDropdown(null)}
                      >
                        See All {item.label}
                      </Link>
                      {item.submenu.map((subItem, index) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`block px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-coral-orange focus:ring-inset rounded-md mx-2 ${
                            isActive(subItem.href)
                              ? "text-coral-orange bg-sand-beige bg-opacity-50"
                              : "text-gray-700 hover:text-coral-orange hover:bg-turquoise-blue hover:bg-opacity-10"
                          }`}
                          role="menuitem"
                          aria-current={isActive(subItem.href) ? "page" : undefined}
                          onKeyDown={(e) => handleSubmenuKeyDown(e, index, item.submenu!)}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            </div>

            <div className="hidden lg:flex items-center space-x-4 ml-6">
              <Link
                href="/booking"
                className="bg-coral-orange hover:bg-orange-500 text-white font-montserrat font-bold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-coral-orange focus:ring-opacity-50"
                aria-label="Book your Caribbean kite safari now"
              >
                Book Your Safari
              </Link>
            </div>

            <button
              className="lg:hidden text-white hover:text-coral-orange transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12M6 12h16" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`hidden lg:block border-t border-gray-700 bg-deep-navy transition-all duration-300 overflow-hidden ${
            isScrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CertificationBadges />
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-deep-navy bg-opacity-95 z-40 overflow-y-auto" data-mobile-menu data-dropdown-container>
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/booking"
                className="block w-full bg-coral-orange hover:bg-orange-500 text-white font-montserrat font-bold text-center py-4 px-6 rounded-full transition-all duration-300 mb-6"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Book your Caribbean kite safari now"
              >
                Book Your Safari
              </Link>

              {menuStructure.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    {item.isSimple ? (
                      <Link
                        href={item.href}
                        className={`flex-1 font-montserrat font-bold text-lg py-3 px-4 rounded-lg transition-colors ${
                          isParentActive(item)
                            ? "text-coral-orange bg-deep-navy bg-opacity-50"
                            : "text-white hover:text-coral-orange hover:bg-deep-navy hover:bg-opacity-30"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-current={isParentActive(item) ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        className={`flex-1 text-left font-montserrat font-bold text-lg py-3 px-4 rounded-lg transition-colors flex items-center justify-between ${
                          isParentActive(item)
                            ? "text-coral-orange bg-deep-navy bg-opacity-50"
                            : "text-white hover:text-coral-orange hover:bg-deep-navy hover:bg-opacity-30"
                        }`}
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        aria-expanded={activeDropdown === item.label}
                        aria-current={isParentActive(item) ? "page" : undefined}
                      >
                        <div className="flex items-center">
                          {item.icon === "shopping-bag" && (
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
                              />
                            </svg>
                          )}
                          {item.label}
                        </div>
                        {item.submenu && (
                          <svg
                            className={`h-5 w-5 transition-transform duration-200 ${
                              activeDropdown === item.label ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>

                  {!item.isSimple && item.submenu && activeDropdown === item.label && (
                    <div className="ml-4 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200 pointer-events-auto relative z-50" data-dropdown-container>
                      <Link
                        href={item.href}
                        className="block font-open-sans text-sm py-2 px-4 rounded-lg font-bold text-coral-orange border-b border-white border-opacity-20 mb-2 transition-colors hover:bg-deep-navy hover:bg-opacity-30 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsMobileMenuOpen(false)
                          setActiveDropdown(null)
                        }}
                      >
                        See All {item.label}
                      </Link>
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.href}
                          className={`block w-full text-left font-open-sans text-sm py-2 px-4 rounded-lg transition-colors cursor-pointer ${
                            isActive(subItem.href)
                              ? "text-coral-orange bg-turquoise-blue bg-opacity-20"
                              : "text-gray-300 hover:text-white hover:bg-deep-navy hover:bg-opacity-30"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsMobileMenuOpen(false)
                            setActiveDropdown(null)
                            router.push(subItem.href)
                          }}
                          aria-current={isActive(subItem.href) ? "page" : undefined}
                          role="menuitem"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}


              <div className="flex items-center justify-center space-x-8 pt-6 border-t border-white border-opacity-20">
                <button
                  className="flex flex-col items-center text-white hover:text-coral-orange transition-colors p-4"
                  aria-label="Contact us on WhatsApp"
                >
                  <svg className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-sm font-medium">WhatsApp</span>
                </button>
                <button
                  className="flex flex-col items-center text-white hover:text-coral-orange transition-colors p-4"
                  aria-label="Start live chat"
                >
                  <svg className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Live Chat</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navigation
