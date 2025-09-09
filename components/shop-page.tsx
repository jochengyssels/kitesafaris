"use client"

import { useState, useEffect } from "react"
import { ProductGrid } from "./product-grid"
import { ProductFilters } from "./product-filters"
import { ShoppingCart } from "./shopping-cart"
import { useCart } from "@/hooks/use-cart"

interface Product {
  id: number
  name: string
  thumbnail: string
  price: string
  currency: string
  category: string
  variants: Array<{
    id: number
    variant_id: number
    name: string
    price: string
    image: string
    options: Array<{ id: string; value: string }>
    available: boolean
  }>
  available: boolean
}

interface Filters {
  category: string
  priceRange: [number, number]
  sortBy: string
  searchQuery: string
}

export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<Filters>({
    category: "all",
    priceRange: [0, 100],
    sortBy: "name",
    searchQuery: "",
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const { items: cartItems, addItem, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCart()

  // Fetch products from Printful API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/shop/products?category=${filters.category}`)
        const data = await response.json()

        if (data.success) {
          setProducts(data.products)
        } else {
          setError(data.error || "Failed to load products")
        }
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters.category])

  // Apply filters to products
  useEffect(() => {
    let filtered = [...products]

    // Search filter
    if (filters.searchQuery) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()))
    }

    // Price range filter
    filtered = filtered.filter((product) => {
      const price = Number.parseFloat(product.price)
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return Number.parseFloat(a.price) - Number.parseFloat(b.price)
        case "price-high":
          return Number.parseFloat(b.price) - Number.parseFloat(a.price)
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, filters])

  const handleAddToCart = (product: Product, variantId?: number) => {
    // Check if this is an affiliate link product
    const isAffiliateLink = (product as any).isAffiliateLink
    
    if (isAffiliateLink) {
      // For affiliate links, redirect directly to the affiliate URL
      const affiliateUrl = (product as any).affiliateUrl
      if (affiliateUrl) {
        window.open(affiliateUrl, '_blank')
        return
      }
    }

    const variant = variantId ? product.variants.find((v) => v.id === variantId) : product.variants[0]

    // Check if this is an external product
    const isExternal = (product as any).isExternal

    addItem({
      id: `${product.id}-${variant?.id || "default"}`,
      productId: product.id,
      variantId: variant?.id, // Use the sync variant ID (variant.id) instead of catalog variant ID (variant.variant_id)
      name: product.name,
      price: Number.parseFloat(variant?.price || product.price),
      currency: product.currency,
      image: variant?.image || product.thumbnail,
      quantity: 1,
      options: variant?.options || [],
      isExternal: isExternal,
      affiliateUrl: isExternal ? (product as any).affiliateUrl : undefined,
      vendor: isExternal ? (product as any).vendor : undefined,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise-blue via-sand-beige to-coral-orange">
      {/* Hero Section */}
      <section className="relative h-80 md:h-96 overflow-hidden">
        <div className="absolute inset-0">
          {/* Beautiful gradient background with ocean-inspired patterns */}
          <div className="absolute inset-0 bg-gradient-to-br from-deep-navy via-turquoise-blue to-coral-orange" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-deep-navy/20" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            <h1 className="font-montserrat text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 text-balance animate-fade-in">
              KiteSafaris Gear
            </h1>
            <p className="font-open-sans text-lg sm:text-xl md:text-2xl text-turquoise-100 mb-6 md:mb-8 text-pretty animate-fade-in-delay px-2">
              Wear Your Adventure - Premium merchandise for ocean lovers and kiteboarding enthusiasts
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-delay-2">
              <div className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300">
                <span className="font-montserrat text-white font-medium text-sm sm:text-base">🚢 Free Shipping Over €75</span>
              </div>
              <div className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300">
                <span className="font-montserrat text-white font-medium text-sm sm:text-base">⭐ Premium Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shopping Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed top-24 sm:top-20 right-4 z-50 bg-coral-orange hover:bg-orange-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          aria-label={`Shopping cart with ${getTotalItems()} items`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
            />
          </svg>
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-deep-navy text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {getTotalItems()}
            </span>
          )}
        </button>
      </section>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-deep-navy text-white rounded-lg hover:bg-deep-navy/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="font-medium">Filters</span>
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{filteredProducts.length} products</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-coral-orange focus:border-transparent"
              >
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <ProductFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-orange"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-600 font-medium">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-coral-orange text-white rounded-lg hover:bg-orange-500 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFiltersOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setIsFiltersOpen(false)} />
          
          {/* Filter Drawer */}
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-50 lg:hidden transform transition-transform duration-300">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-montserrat text-xl font-bold text-gray-900">Filters</h2>
                <button
                  onClick={() => setIsFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close filters"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Mobile Filters Content */}
              <div className="max-h-96 overflow-y-auto">
                <ProductFilters filters={filters} onFiltersChange={setFilters} />
              </div>
              
              {/* Apply Button */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsFiltersOpen(false)}
                  className="w-full px-6 py-3 bg-coral-orange text-white font-medium rounded-lg hover:bg-orange-500 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Shopping Cart Sidebar */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        totalPrice={getTotalPrice()}
      />
    </div>
  )
}
