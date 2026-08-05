import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import { REVIEWS } from '../../data/products'

export default function Reviews() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <h2 className="font-display text-2xl sm:text-3xl text-ink dark:text-dark-text mb-8">What customers say</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REVIEWS.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-2xl bg-surface-raised dark:bg-dark-surface border border-line dark:border-dark-line p-5"
          >
            <div className="flex items-center gap-1 text-citrus-500 mb-3">
              {Array.from({ length: 5 }).map((_, idx) => (
                <FaStar key={idx} size={13} className={idx < r.rating ? '' : 'opacity-25'} />
              ))}
            </div>
            <p className="text-sm text-ink dark:text-dark-text mb-4 leading-relaxed">&ldquo;{r.comment}&rdquo;</p>
            <div className="flex items-center gap-2.5">
              <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover" />
              <span className="text-sm font-semibold text-ink dark:text-dark-text">{r.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
