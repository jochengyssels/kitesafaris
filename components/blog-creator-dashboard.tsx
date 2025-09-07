'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Plus,
  FileText,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  User,
  Tag,
  BarChart3,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  Globe,
  Lock,
  RefreshCw,
  Download,
  Upload,
  Zap,
  BookOpen,
  Target,
  TrendingUp,
  Shield,
  Activity
} from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  status: 'draft' | 'published'
  author: string
  publishDate: string
  metaDescription?: string
  keywords: string[]
  tags: string[]
  category: string
  wordCount: number
  seoScore: number
  readabilityScore: number
  featuredImage?: {
    url: string
    alt: string
    caption?: string
  }
  images: Array<{
    url: string
    alt: string
    caption?: string
    position: number
  }>
  internalLinks: Array<{
    anchor: string
    url: string
  }>
  schema?: any
  targetAudience: string
  kitesafaris: {
    location?: string
    skillLevel?: string
    seasonality?: string
    equipmentMentioned?: boolean
    safetyMentioned?: boolean
    lessonsMentioned?: boolean
    rentalMentioned?: boolean
    caribbeanRelevance?: number
    kitesurfingFocus?: number
  }
  source: string
  createdAt: string
  updatedAt: string
}

interface BlogStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalWords: number
  averageSeoScore: number
  averageReadabilityScore: number
}

export function BlogCreatorDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [stats, setStats] = useState<BlogStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Load posts and stats
  useEffect(() => {
    loadPosts()
    loadStats()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/blog/posts', {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY || 'admin'}`,
          'X-API-Secret': process.env.NEXT_PUBLIC_API_SECRET || 'admin',
          'User-Agent': 'KiteSafaris-Blog-Automation/1.0'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to load posts')
      }

      const data = await response.json()
      setPosts(data.posts || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      // For now, calculate stats from posts
      // In production, this would come from a dedicated stats endpoint
      const totalPosts = posts.length
      const publishedPosts = posts.filter(p => p.status === 'published').length
      const draftPosts = posts.filter(p => p.status === 'draft').length
      const totalWords = posts.reduce((sum, p) => sum + p.wordCount, 0)
      const averageSeoScore = posts.length > 0 
        ? Math.round(posts.reduce((sum, p) => sum + p.seoScore, 0) / posts.length)
        : 0
      const averageReadabilityScore = posts.length > 0 
        ? Math.round(posts.reduce((sum, p) => sum + p.readabilityScore, 0) / posts.length)
        : 0

      setStats({
        totalPosts,
        publishedPosts,
        draftPosts,
        totalWords,
        averageSeoScore,
        averageReadabilityScore
      })
    } catch (err) {
      console.error('Failed to load stats:', err)
    }
  }

  // Update stats when posts change
  useEffect(() => {
    if (posts.length > 0) {
      loadStats()
    }
  }, [posts])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'draft':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-beige-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-turquoise-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sand-beige-50">
      {/* Header */}
      <header className="bg-navy-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-turquoise-400" />
              <div>
                <h1 className="font-montserrat font-bold text-xl">Blog Creator</h1>
                <p className="text-sm text-gray-300">Manage blog posts and content</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="flex items-center space-x-2 text-turquoise-400 hover:text-turquoise-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-sand-beige-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold text-navy-900">{stats.totalPosts}</p>
                </div>
                <FileText className="h-8 w-8 text-turquoise-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-sand-beige-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-green-600">{stats.publishedPosts}</p>
                </div>
                <Globe className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-sand-beige-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.draftPosts}</p>
                </div>
                <Lock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-sand-beige-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg SEO Score</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.averageSeoScore}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Drafts</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={loadPosts}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              
              <button
                onClick={() => setShowCreateForm(true)}
                className="flex items-center space-x-2 bg-turquoise-600 text-white px-4 py-2 rounded-lg hover:bg-turquoise-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>New Post</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-montserrat font-semibold text-lg text-navy-900">
              Blog Posts ({filteredPosts.length})
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-montserrat font-medium text-lg text-gray-900 mb-2">
                {posts.length === 0 ? 'No blog posts yet' : 'No posts match your filters'}
              </h3>
              <p className="text-gray-600 mb-4">
                {posts.length === 0 
                  ? 'Create your first blog post to get started.'
                  : 'Try adjusting your search terms or filters.'
                }
              </p>
              {posts.length === 0 && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-turquoise-600 text-white px-6 py-2 rounded-lg hover:bg-turquoise-700 transition-colors"
                >
                  Create First Post
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(post.status)}
                        <h3 className="font-montserrat font-semibold text-lg text-navy-900">
                          {post.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                          {post.status}
                        </span>
                      </div>
                      
                      {post.excerpt && (
                        <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                      )}
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BarChart3 className="h-4 w-4" />
                          <span>{post.wordCount} words</span>
                        </div>
                        {post.seoScore > 0 && (
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>SEO: {post.seoScore}%</span>
                          </div>
                        )}
                      </div>
                      
                      {post.tags.length > 0 && (
                        <div className="flex items-center space-x-2 mt-3">
                          <Tag className="h-4 w-4 text-gray-400" />
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{post.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit Post"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* API Status */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6">
          <h3 className="font-montserrat font-semibold text-lg text-navy-900 mb-4">
            API Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Activity className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium text-gray-900">Health Check</p>
                <p className="text-sm text-gray-600">GET /api/blog/health</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium text-gray-900">API Status</p>
                <p className="text-sm text-gray-600">GET /api/blog/status</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-purple-500" />
              <div>
                <p className="font-medium text-gray-900">Create Posts</p>
                <p className="text-sm text-gray-600">POST /api/blog/posts</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
