import { motion } from 'framer-motion'
import { BRANDS } from '../../data/products'

export default function BrandStrip() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-ink-soft dark:text-dark-text-soft mb-6">
        Trusted brands we stock
      </p>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
      >
        {BRANDS.map((b) => (
          <span key={b.id} className="font-display text-lg sm:text-xl text-ink-soft/70 dark:text-dark-text-soft/70 hover:text-primary-600 transition-colors">
            {b.name}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
