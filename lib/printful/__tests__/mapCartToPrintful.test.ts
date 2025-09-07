// Unit tests for Printful cart mapping functionality
import { toPrintfulItem, mapCartToPrintfulItems } from '../mapCartToPrintful'
import { CartItem } from '../types'

describe('Printful Cart Mapping', () => {
  describe('toPrintfulItem', () => {
    it('should map sync variant to correct format', () => {
      const cartItem: CartItem = {
        qty: 2,
        syncVariantId: 4817,
        name: 'Test T-Shirt'
      }

      const result = toPrintfulItem(cartItem)

      expect(result).toEqual({
        sync_variant_id: 4817,
        quantity: 2
      })
    })

    it('should map catalog variant with print file to correct format', () => {
      const cartItem: CartItem = {
        qty: 1,
        catalogVariantId: 4958285381,
        printFileUrl: 'https://example.com/design.png',
        name: 'Custom T-Shirt'
      }

      const result = toPrintfulItem(cartItem)

      expect(result).toEqual({
        variant_id: 4958285381,
        quantity: 1,
        files: [{
          type: 'default',
          url: 'https://example.com/design.png'
        }]
      })
    })

    it('should throw error for catalog variant without print file URL', () => {
      const cartItem: CartItem = {
        qty: 1,
        catalogVariantId: 4958285381,
        name: 'Custom T-Shirt'
        // Missing printFileUrl
      }

      expect(() => toPrintfulItem(cartItem)).toThrow('catalogVariantId 4958285381 requires printFileUrl')
    })

    it('should throw error for cart item with no valid identifiers', () => {
      const cartItem: CartItem = {
        qty: 1,
        name: 'Test Item'
        // Missing both syncVariantId and catalogVariantId
      }

      expect(() => toPrintfulItem(cartItem)).toThrow('Cart item missing required identifiers')
    })
  })

  describe('mapCartToPrintfulItems', () => {
    it('should map multiple cart items successfully', () => {
      const cartItems: CartItem[] = [
        {
          qty: 2,
          syncVariantId: 4817,
          name: 'Test T-Shirt'
        },
        {
          qty: 1,
          catalogVariantId: 4958285381,
          printFileUrl: 'https://example.com/design.png',
          name: 'Custom T-Shirt'
        }
      ]

      const result = mapCartToPrintfulItems(cartItems)

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        sync_variant_id: 4817,
        quantity: 2
      })
      expect(result[1]).toEqual({
        variant_id: 4958285381,
        quantity: 1,
        files: [{
          type: 'default',
          url: 'https://example.com/design.png'
        }]
      })
    })

    it('should throw error if any item fails to map', () => {
      const cartItems: CartItem[] = [
        {
          qty: 2,
          syncVariantId: 4817,
          name: 'Test T-Shirt'
        },
        {
          qty: 1,
          name: 'Invalid Item'
          // Missing both identifiers
        }
      ]

      expect(() => mapCartToPrintfulItems(cartItems)).toThrow('Failed to map 1 cart items')
    })
  })
})
