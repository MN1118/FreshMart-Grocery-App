import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CATEGORIES, PRODUCTS } from '../data/products'

export default function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl text-ink dark:text-dark-text mb-3">Shop by Category</h1>
        <p className="text-ink-soft dark:text-dark-text-soft max-w-lg mx-auto">
          Browse everything we stock, organised the way your kitchen thinks.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CATEGORIES.map((cat, i) => {
          const count = PRODUCTS.filter((p) => p.category === cat.id).length
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                to={`/products?category=${cat.id}`}
                className="group block rounded-2xl border border-line dark:border-dark-line bg-surface-raised dark:bg-dark-surface p-6 hover:shadow-lifted hover:-translate-y-1 transition-all duration-200"
              >
                <span
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: `${cat.color}1A` }}
                >
                  {cat.emoji}
                </span>
                <h3 className="font-semibold text-ink dark:text-dark-text mb-1">{cat.name}</h3>
                <p className="text-sm text-ink-soft dark:text-dark-text-soft">{count} products</p>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
