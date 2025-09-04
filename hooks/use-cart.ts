"use client"

import { useState, useEffect } from "react"

export interface CartItem {
  id: string
  productId: number
  variantId?: number
  name: string
  price: number
  currency: string
  image: string
  quantity: number
  options: Array<{ id: string; value: string }>
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("kitesafaris-cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
        console.log("Cart hydrated from localStorage:", parsedCart)
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
        setItems([])
      }
    } else {
      console.log("No saved cart found in localStorage")
      setItems([])
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("kitesafaris-cart", JSON.stringify(items))
      console.log("Cart saved to localStorage:", items)
    }
  }, [items, isHydrated])

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i))
      }
      return [...prevItems, item]
    })
  }

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getItemCount = (itemId: string) => {
    const item = items.find((i) => i.id === itemId)
    return item?.quantity || 0
  }

  return {
    items,
    isHydrated,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemCount,
  }
}
