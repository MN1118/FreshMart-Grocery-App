import { FiHeart } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/product/ProductCard'
import EmptyState from '../components/ui/EmptyState'

export default function Wishlist() {
  const { items } = useWishlist()

  if (items.length === 0) {
    return (
      <EmptyState
        icon={FiHeart}
        title="Your wishlist is empty"
        message="Save products you love here so you can find them again easily."
        actionLabel="Explore Products"
        actionTo="/products"
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl text-ink dark:text-dark-text mb-1">Your Wishlist</h1>
      <p className="text-ink-soft dark:text-dark-text-soft text-sm mb-6">{items.length} saved products</p>
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
