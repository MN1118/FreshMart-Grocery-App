import { createContext, useContext, useMemo, useCallback } from 'react'
import toast from 'react-hot-toast'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { COUPONS } from '../data/products'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('freshmart_cart', [])
  const [couponCode, setCouponCode] = useLocalStorage('freshmart_coupon', null)

  const addToCart = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + qty } : i))
      }
      return [...prev, { ...product, quantity: qty }]
    })
    toast.success(`${product.name} added to cart`)
  }, [setItems])

  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    toast('Removed from cart', { icon: '🗑️' })
  }, [setItems])

  const updateQuantity = useCallback((id, quantity) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
    )
  }, [setItems])

  const clearCart = useCallback(() => {
    setItems([])
    setCouponCode(null)
  }, [setItems, setCouponCode])

  const applyCoupon = useCallback((code) => {
    const found = COUPONS.find((c) => c.code.toLowerCase() === code.trim().toLowerCase())
    if (found) {
      setCouponCode(found.code)
      toast.success(`Coupon "${found.code}" applied`)
      return true
    }
    toast.error('Invalid coupon code')
    return false
  }, [setCouponCode])

  const removeCoupon = useCallback(() => setCouponCode(null), [setCouponCode])

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  )

  const activeCoupon = useMemo(
    () => COUPONS.find((c) => c.code === couponCode) || null,
    [couponCode]
  )

  const discount = useMemo(() => {
    if (!activeCoupon) return 0
    if (subtotal < activeCoupon.minOrder) return 0
    return activeCoupon.type === 'percent'
      ? Math.round((subtotal * activeCoupon.value) / 100)
      : activeCoupon.value
  }, [activeCoupon, subtotal])

  const deliveryFee = useMemo(() => (subtotal === 0 || subtotal >= 499 ? 0 : 29), [subtotal])

  const total = useMemo(
    () => Math.max(0, subtotal - discount) + deliveryFee,
    [subtotal, discount, deliveryFee]
  )

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    activeCoupon,
    subtotal,
    discount,
    deliveryFee,
    total,
    itemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
