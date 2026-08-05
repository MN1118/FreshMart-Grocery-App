import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

export default function DiscountBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl bg-citrus-500 px-6 sm:px-12 py-10 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-6 text-white"
      >
        <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/10" />
        <div className="absolute -left-10 -bottom-16 w-48 h-48 rounded-full bg-white/10" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-wide text-citrus-50/90">Limited time</p>
          <h3 className="font-display text-3xl sm:text-4xl mt-1 text-balance">Flat 20% off on orders above ₹999</h3>
          <p className="text-citrus-50/90 mt-2 text-sm">Use code <span className="font-bold">BIGBASKET20</span> at checkout.</p>
        </div>
        <Link
          to="/products"
          className="relative inline-flex items-center gap-2 bg-white text-citrus-600 font-semibold px-6 py-3 rounded-xl shrink-0 hover:bg-citrus-50 transition-colors"
        >
          Shop the deal <FiArrowRight />
        </Link>
      </motion.div>
    </section>
  )
}
