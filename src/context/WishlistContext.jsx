import { createContext, useContext, useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useLocalStorage } from '../hooks/useLocalStorage'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [items, setItems] = useLocalStorage('freshmart_wishlist', [])

  const isWishlisted = useCallback((id) => items.some((i) => i.id === id), [items])

  const toggleWishlist = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === product.id)
      if (exists) {
        toast('Removed from wishlist', { icon: '💔' })
        return prev.filter((i) => i.id !== product.id)
      }
      toast.success('Added to wishlist')
      return [...prev, product]
    })
  }, [setItems])

  const removeFromWishlist = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [setItems])

  const clearWishlist = useCallback(() => setItems([]), [setItems])

  const value = useMemo(
    () => ({ items, isWishlisted, toggleWishlist, removeFromWishlist, clearWishlist }),
    [items, isWishlisted, toggleWishlist, removeFromWishlist, clearWishlist]
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
