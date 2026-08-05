import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CATEGORIES } from '../../data/products'

export default function CategoryRail() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-display text-2xl sm:text-3xl text-ink dark:text-dark-text">Shop by Category</h2>
        <Link to="/categories" className="text-sm font-semibold text-primary-700 dark:text-primary-300 hover:underline">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <Link
              to={`/products?category=${cat.id}`}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-surface-raised dark:bg-dark-surface border border-line dark:border-dark-line hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200"
            >
              <span
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                style={{ backgroundColor: `${cat.color}1A` }}
              >
                {cat.emoji}
              </span>
              <span className="text-xs font-semibold text-ink dark:text-dark-text text-center">{cat.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
