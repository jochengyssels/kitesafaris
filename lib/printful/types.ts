// Printful API Types and Cart Item Definitions

export type CartItem = {
  qty: number
  syncVariantId?: number        // e.g., 4817 (Printful store sync variant)
  catalogVariantId?: number     // e.g., 4958285381 (Printful catalog)
  printFileUrl?: string         // required if using catalogVariantId
  name?: string
  price?: number
  sku?: string
}

export type PrintfulOrderItem = {
  sync_variant_id?: number
  variant_id?: number
  quantity: number
  files?: Array<{
    type: string
    url: string
  }>
}

export type PrintfulOrder = {
  external_id: string
  shipping: string
  recipient: {
    name: string
    company?: string
    address1: string
    address2?: string
    city: string
    state_code: string
    state_name: string
    country_code: string
    country_name: string
    zip: string
    phone?: string
    email: string
  }
  items: PrintfulOrderItem[]
  retail_costs?: {
    currency: string
    subtotal: string
    discount: string
    shipping: string
    tax: string
    total: string
  }
}

export type PrintfulSyncFile = {
  id: number
  type: string
  url?: string
  has_url: boolean
  is_temporary: boolean
  status: string
}

export type PrintfulSyncVariant = {
  id: number
  sync_product_id: number
  variant_id: number
  name: string
  synced: boolean
  files?: PrintfulSyncFile[]
}

export type PrintfulSyncProduct = {
  id: number
  external_id: string
  name: string
  variants: number
  synced: number
  thumbnail_url: string
  is_ignored: boolean
  sync_files?: PrintfulSyncFile[]
}
