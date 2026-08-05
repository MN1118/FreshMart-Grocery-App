import { AnimatePresence, motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { ProductGridSkeleton } from '../ui/Skeleton'
import EmptyState from '../ui/EmptyState'
import { FiSearch } from 'react-icons/fi'

export default function ProductGrid({ products, loading }) {
  if (loading) return <ProductGridSkeleton />

  if (!products?.length) {
    return (
      <EmptyState
        icon={FiSearch}
        title="No products found"
        message="Try adjusting your filters or search terms to find what you're looking for."
      />
    )
  }

  return (
    <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <AnimatePresence>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
