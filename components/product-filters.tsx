"use client"

interface Filters {
  category: string
  priceRange: [number, number]
  sortBy: string
  searchQuery: string
}

interface ProductFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const categories = [
    { value: "all", label: "All Products", icon: "🏪" },
    { value: "apparel", label: "Apparel", icon: "👕" },
    { value: "accessories", label: "Accessories", icon: "🧢" },
    { value: "kite-gear", label: "Kite Gear", icon: "🪁" },
    { value: "lifestyle", label: "Lifestyle", icon: "☕" },
  ]

  const sortOptions = [
    { value: "name", label: "Name A-Z" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ]

  const updateFilters = (updates: Partial<Filters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-6 sticky top-24">
      <h2 className="font-montserrat text-xl font-bold text-gray-900 mb-6">Filters</h2>

      {/* Search */}
      <div className="mb-6">
        <label htmlFor="search" className="block font-medium text-gray-700 mb-2">
          Search Products
        </label>
        <input
          type="text"
          id="search"
          value={filters.searchQuery}
          onChange={(e) => updateFilters({ searchQuery: e.target.value })}
          placeholder="Search by name..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => updateFilters({ category: category.value })}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                filters.category === category.value
                  ? "bg-coral-orange text-white"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-3">Price Range</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) =>
                updateFilters({
                  priceRange: [Number(e.target.value), filters.priceRange[1]],
                })
              }
              placeholder="Min"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) =>
                updateFilters({
                  priceRange: [filters.priceRange[0], Number(e.target.value)],
                })
              }
              placeholder="Max"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div className="text-sm text-gray-600">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-3">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilters({ sortBy: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() =>
          onFiltersChange({
            category: "all",
            priceRange: [0, 100],
            sortBy: "name",
            searchQuery: "",
          })
        }
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  )
}
