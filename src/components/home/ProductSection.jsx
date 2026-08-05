import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../product/ProductCard'
import { ProductGridSkeleton } from '../ui/Skeleton'

export default function ProductSection({ title, subtitle, products, loading, viewAllHref, tinted = false }) {
  return (
    <section className={tinted ? 'bg-primary-50/60 dark:bg-dark-surface/60' : ''}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-ink dark:text-dark-text">{title}</h2>
            {subtitle && <p className="text-ink-soft dark:text-dark-text-soft text-sm mt-1">{subtitle}</p>}
          </div>
          {viewAllHref && (
            <Link to={viewAllHref} className="text-sm font-semibold text-primary-700 dark:text-primary-300 hover:underline whitespace-nowrap">
              View all
            </Link>
          )}
        </div>

        {loading ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
