import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiClock } from 'react-icons/fi'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-50 dark:bg-dark-surface">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-200/60 dark:bg-primary-900/30 blur-2xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-citrus-100/70 dark:bg-citrus-500/10 blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 bg-white dark:bg-dark-raised text-primary-700 dark:text-primary-300 text-xs font-semibold px-3 py-1.5 rounded-full shadow-soft">
            <FiClock size={13} /> 10-minute delivery
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] text-ink dark:text-dark-text mt-5 text-balance">
            Fresh groceries,
            <br />
            delivered <span className="text-primary-600">fast.</span>
          </h1>

          <p className="text-ink-soft dark:text-dark-text-soft mt-5 max-w-md text-base sm:text-lg">
            Fruits, vegetables, dairy, snacks and daily essentials — hand-picked
            and on your doorstep before you know it.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-soft transition-colors"
            >
              Shop Now <FiArrowRight />
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 border border-line dark:border-dark-line text-ink dark:text-dark-text font-semibold px-6 py-3.5 rounded-xl hover:bg-white dark:hover:bg-dark-raised transition-colors"
            >
              Browse Categories
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-10 text-sm">
            <div>
              <p className="font-display text-2xl text-ink dark:text-dark-text">50k+</p>
              <p className="text-ink-soft dark:text-dark-text-soft">Happy customers</p>
            </div>
            <div className="w-px h-8 bg-line dark:bg-dark-line" />
            <div>
              <p className="font-display text-2xl text-ink dark:text-dark-text">1200+</p>
              <p className="text-ink-soft dark:text-dark-text-soft">Fresh products</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-lifted aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200"
              alt="A basket of fresh vegetables and fruits"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 bg-white dark:bg-dark-raised rounded-2xl shadow-lifted px-4 py-3 flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-pulse-soft absolute inline-flex h-full w-full rounded-full bg-primary-500" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-600" />
            </span>
            <div className="text-xs">
              <p className="font-semibold text-ink dark:text-dark-text">Arriving in 8 min</p>
              <p className="text-ink-soft dark:text-dark-text-soft">Order #FM-2291</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
