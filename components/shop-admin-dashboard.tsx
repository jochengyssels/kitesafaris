"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Order {
  id: string
  external_id: string
  status: string
  created: string
  recipient: {
    name: string
    email: string
    address1: string
    city: string
    state_code: string
    country_code: string
  }
  items: Array<{
    name: string
    quantity: number
    retail_price: string
  }>
  retail_costs: {
    total: string
    currency: string
  }
}

interface Product {
  id: number
  name: string
  thumbnail: string
  price: string
  currency: string
  category: string
  variants: number
  synced: number
  available: boolean
}

export function ShopAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch products
      const productsResponse = await fetch("/api/shop/products")
      const productsData = await productsResponse.json()

      if (productsData.success) {
        setProducts(productsData.products)
        setStats((prev) => ({
          ...prev,
          totalProducts: productsData.products.length,
        }))
      }

      // Mock orders data (in real implementation, this would come from Printful or database)
      const mockOrders: Order[] = [
        {
          id: "1",
          external_id: "KS-1703123456",
          status: "pending",
          created: "2024-01-15T10:30:00Z",
          recipient: {
            name: "John Doe",
            email: "john@example.com",
            address1: "123 Ocean Ave",
            city: "Miami",
            state_code: "FL",
            country_code: "US",
          },
          items: [
            {
              name: "KiteSafaris Logo T-Shirt",
              quantity: 2,
              retail_price: "29.99",
            },
          ],
          retail_costs: {
            total: "67.97",
            currency: "USD",
          },
        },
        {
          id: "2",
          external_id: "KS-1703123457",
          status: "fulfilled",
          created: "2024-01-14T15:45:00Z",
          recipient: {
            name: "Sarah Wilson",
            email: "sarah@example.com",
            address1: "456 Beach Blvd",
            city: "San Diego",
            state_code: "CA",
            country_code: "US",
          },
          items: [
            {
              name: "KiteSafaris Hoodie",
              quantity: 1,
              retail_price: "49.99",
            },
          ],
          retail_costs: {
            total: "49.99",
            currency: "USD",
          },
        },
      ]

      setOrders(mockOrders)
      setStats((prev) => ({
        ...prev,
        totalOrders: mockOrders.length,
        totalRevenue: mockOrders.reduce((sum, order) => sum + Number.parseFloat(order.retail_costs.total), 0),
        pendingOrders: mockOrders.filter((order) => order.status === "pending").length,
      }))
    } catch (error) {
      console.error("Error fetching shop data:", error)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "products", label: "Products", icon: "📦" },
    { id: "orders", label: "Orders", icon: "🛒" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-orange"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-deep-navy to-turquoise-blue p-6">
        <h1 className="font-montserrat text-2xl font-bold text-white mb-2">Shop Management</h1>
        <p className="text-turquoise-100">Manage your KiteSafaris merchandise store</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-coral-orange text-coral-orange"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-coral-orange/10 to-coral-orange/20 p-6 rounded-xl border border-coral-orange/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                    <p className="text-3xl font-bold text-coral-orange">{stats.totalProducts}</p>
                  </div>
                  <div className="p-3 bg-coral-orange/20 rounded-full">
                    <svg className="w-6 h-6 text-coral-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-turquoise-blue/10 to-turquoise-blue/20 p-6 rounded-xl border border-turquoise-blue/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-3xl font-bold text-turquoise-blue">{stats.totalOrders}</p>
                  </div>
                  <div className="p-3 bg-turquoise-blue/20 rounded-full">
                    <svg className="w-6 h-6 text-turquoise-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-500/20 p-6 rounded-xl border border-green-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-green-600">${stats.totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="p-3 bg-green-500/20 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/20 p-6 rounded-xl border border-yellow-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                  </div>
                  <div className="p-3 bg-yellow-500/20 rounded-full">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <h3 className="font-montserrat text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.external_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.recipient.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                order.status === "fulfilled"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${order.retail_costs.total}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.created).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-montserrat text-lg font-semibold text-gray-900">Products</h3>
              <button
                onClick={fetchData}
                className="px-4 py-2 bg-coral-orange text-white font-medium rounded-lg hover:bg-orange-500 transition-colors"
              >
                Refresh Products
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4">
                    <Image
                      src={product.thumbnail || "/placeholder.svg?height=200&width=200&query=product"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-coral-orange">${product.price}</span>
                    <span className="text-sm text-gray-500 capitalize">{product.category.replace("-", " ")}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{product.variants} variants</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-6">
            <h3 className="font-montserrat text-lg font-semibold text-gray-900">All Orders</h3>

            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.external_id}</div>
                            <div className="text-sm text-gray-500">{new Date(order.created).toLocaleDateString()}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.recipient.name}</div>
                            <div className="text-sm text-gray-500">{order.recipient.email}</div>
                            <div className="text-sm text-gray-500">
                              {order.recipient.city}, {order.recipient.state_code}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {order.items.map((item, index) => (
                              <div key={index} className="mb-1">
                                {item.name} (x{item.quantity})
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === "fulfilled"
                                ? "bg-green-100 text-green-800"
                                : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${order.retail_costs.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <h3 className="font-montserrat text-lg font-semibold text-gray-900">Shop Settings</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Printful Integration */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 mb-4">Printful Integration</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Key Status</label>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Connected</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store ID</label>
                    <input
                      type="text"
                      value="KiteSafaris Store"
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                    />
                  </div>
                  <button className="px-4 py-2 bg-coral-orange text-white font-medium rounded-lg hover:bg-orange-500 transition-colors">
                    Test Connection
                  </button>
                </div>
              </div>

              {/* Shipping Settings */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 mb-4">Shipping Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold</label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">$</span>
                      <input
                        type="number"
                        value="75"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Standard Shipping Rate</label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">$</span>
                      <input
                        type="number"
                        value="9.99"
                        step="0.01"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-coral-orange text-white font-medium rounded-lg hover:bg-orange-500 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
