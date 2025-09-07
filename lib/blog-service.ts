// Blog service for managing blog posts
export interface BlogPost {
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

export interface CreateBlogPostRequest {
  title: string
  slug: string
  content: string
  excerpt?: string
  status?: 'draft' | 'published'
  author?: string
  publishDate?: string
  metaDescription?: string
  keywords?: string[]
  tags?: string[]
  category?: string
  wordCount?: number
  seoScore?: number
  readabilityScore?: number
  featuredImage?: {
    url: string
    alt: string
    caption?: string
  }
  images?: Array<{
    url: string
    alt: string
    caption?: string
    position: number
  }>
  internalLinks?: Array<{
    anchor: string
    url: string
  }>
  schema?: any
  targetAudience?: string
  kitesafaris?: {
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
  source?: string
}

// In-memory storage for development (replace with database in production)
const blogPosts: Map<string, BlogPost> = new Map()

export class BlogService {
  private static instance: BlogService

  public static getInstance(): BlogService {
    if (!BlogService.instance) {
      BlogService.instance = new BlogService()
    }
    return BlogService.instance
  }

  async createPost(data: CreateBlogPostRequest): Promise<BlogPost> {
    // Validate required fields
    if (!data.title || !data.slug || !data.content) {
      throw new Error('Missing required fields: title, slug, content')
    }

    // Check for duplicate slug
    const existingPost = await this.getPostBySlug(data.slug)
    if (existingPost) {
      throw new Error('A post with this slug already exists')
    }

    // Generate unique ID
    const id = this.generateId()

    // Sanitize content (basic HTML sanitization)
    const sanitizedContent = this.sanitizeContent(data.content)

    // Generate excerpt if not provided
    const excerpt = data.excerpt || this.generateExcerpt(sanitizedContent)

    // Create post object
    const post: BlogPost = {
      id,
      title: data.title.trim(),
      slug: data.slug.trim(),
      content: sanitizedContent,
      excerpt,
      status: data.status || 'draft',
      author: data.author || 'KiteSafaris Team',
      publishDate: data.publishDate || new Date().toISOString(),
      metaDescription: data.metaDescription?.trim(),
      keywords: Array.isArray(data.keywords) ? data.keywords : [],
      tags: Array.isArray(data.tags) ? data.tags : [],
      category: data.category || 'Kitesurfing',
      wordCount: data.wordCount || 0,
      seoScore: data.seoScore || 0,
      readabilityScore: data.readabilityScore || 0,
      featuredImage: data.featuredImage || undefined,
      images: Array.isArray(data.images) ? data.images : [],
      internalLinks: Array.isArray(data.internalLinks) ? data.internalLinks : [],
      schema: data.schema || undefined,
      targetAudience: data.targetAudience || 'all',
      kitesafaris: data.kitesafaris || {},
      source: data.source || 'kitesafaris-automation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Store post
    blogPosts.set(id, post)

    console.log(`[Blog Service] Created post: ${post.title} (${post.id})`)
    return post
  }

  async getPost(id: string): Promise<BlogPost | null> {
    return blogPosts.get(id) || null
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    for (const post of blogPosts.values()) {
      if (post.slug === slug) {
        return post
      }
    }
    return null
  }

  async getAllPosts(): Promise<BlogPost[]> {
    return Array.from(blogPosts.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  async getPublishedPosts(): Promise<BlogPost[]> {
    return Array.from(blogPosts.values())
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
  }

  async updatePost(id: string, data: Partial<CreateBlogPostRequest>): Promise<BlogPost | null> {
    const existingPost = blogPosts.get(id)
    if (!existingPost) {
      return null
    }

    const updatedPost: BlogPost = {
      ...existingPost,
      ...data,
      id: existingPost.id, // Don't allow ID changes
      slug: data.slug || existingPost.slug,
      content: data.content ? this.sanitizeContent(data.content) : existingPost.content,
      updatedAt: new Date().toISOString()
    }

    blogPosts.set(id, updatedPost)
    console.log(`[Blog Service] Updated post: ${updatedPost.title} (${updatedPost.id})`)
    return updatedPost
  }

  async deletePost(id: string): Promise<boolean> {
    const deleted = blogPosts.delete(id)
    if (deleted) {
      console.log(`[Blog Service] Deleted post: ${id}`)
    }
    return deleted
  }

  private generateId(): string {
    return 'post_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  private sanitizeContent(content: string): string {
    // Basic HTML sanitization - in production, use a proper library like DOMPurify
    return content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/javascript:/gi, '')
  }

  private generateExcerpt(content: string, maxLength: number = 160): string {
    const textContent = content.replace(/<[^>]*>/g, '').trim()
    if (textContent.length <= maxLength) {
      return textContent
    }
    return textContent.substring(0, maxLength).trim() + '...'
  }

  // Get statistics
  async getStats(): Promise<{
    totalPosts: number
    publishedPosts: number
    draftPosts: number
    totalWords: number
    averageSeoScore: number
    averageReadabilityScore: number
  }> {
    const posts = Array.from(blogPosts.values())
    const publishedPosts = posts.filter(post => post.status === 'published')
    const draftPosts = posts.filter(post => post.status === 'draft')
    
    const totalWords = posts.reduce((sum, post) => sum + post.wordCount, 0)
    const averageSeoScore = posts.length > 0 
      ? posts.reduce((sum, post) => sum + post.seoScore, 0) / posts.length 
      : 0
    const averageReadabilityScore = posts.length > 0 
      ? posts.reduce((sum, post) => sum + post.readabilityScore, 0) / posts.length 
      : 0

    return {
      totalPosts: posts.length,
      publishedPosts: publishedPosts.length,
      draftPosts: draftPosts.length,
      totalWords,
      averageSeoScore: Math.round(averageSeoScore),
      averageReadabilityScore: Math.round(averageReadabilityScore)
    }
  }
}
