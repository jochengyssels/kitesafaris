// Cart to Printful Item Mapper
import { CartItem, PrintfulOrderItem } from './types'

/**
 * Maps a cart item to the correct Printful order item format
 * 
 * Primary flow: Use sync variants (recommended for products created in Printful Dashboard)
 * Fallback flow: Use catalog variants with print files
 */
export function toPrintfulItem(cartItem: CartItem): PrintfulOrderItem {
  console.log(`[PrintfulMapper] Processing cart item:`, {
    syncVariantId: cartItem.syncVariantId,
    catalogVariantId: cartItem.catalogVariantId,
    hasPrintFileUrl: !!cartItem.printFileUrl,
    qty: cartItem.qty
  })

  // Primary flow: Use sync variant (no files needed - files are already attached in Printful Dashboard)
  if (cartItem.syncVariantId) {
    console.log(`[PrintfulMapper] Using sync variant flow for syncVariantId: ${cartItem.syncVariantId}`)
    return {
      sync_variant_id: cartItem.syncVariantId,
      quantity: cartItem.qty
    }
  }

  // Fallback flow: Use catalog variant with print files
  if (cartItem.catalogVariantId) {
    if (!cartItem.printFileUrl) {
      throw new Error(`catalogVariantId ${cartItem.catalogVariantId} requires printFileUrl`)
    }
    
    console.log(`[PrintfulMapper] Using catalog variant flow for catalogVariantId: ${cartItem.catalogVariantId}`)
    return {
      variant_id: cartItem.catalogVariantId,
      quantity: cartItem.qty,
      files: [{
        type: 'default',
        url: cartItem.printFileUrl
      }]
    }
  }

  // No valid identifiers found
  throw new Error(`Cart item missing required identifiers. Must have either syncVariantId or (catalogVariantId + printFileUrl). Item: ${JSON.stringify(cartItem)}`)
}

/**
 * Maps an array of cart items to Printful order items
 */
export function mapCartToPrintfulItems(cartItems: CartItem[]): PrintfulOrderItem[] {
  console.log(`[PrintfulMapper] Mapping ${cartItems.length} cart items to Printful format`)
  
  const printfulItems: PrintfulOrderItem[] = []
  const errors: string[] = []

  for (let i = 0; i < cartItems.length; i++) {
    try {
      const printfulItem = toPrintfulItem(cartItems[i])
      printfulItems.push(printfulItem)
      console.log(`[PrintfulMapper] Successfully mapped item ${i + 1}/${cartItems.length}`)
    } catch (error) {
      const errorMsg = `Item ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`
      errors.push(errorMsg)
      console.error(`[PrintfulMapper] Failed to map cart item ${i + 1}:`, error)
    }
  }

  if (errors.length > 0) {
    throw new Error(`Failed to map ${errors.length} cart items: ${errors.join('; ')}`)
  }

  console.log(`[PrintfulMapper] Successfully mapped all ${printfulItems.length} items`)
  return printfulItems
}
