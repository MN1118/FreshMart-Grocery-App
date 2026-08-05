import { useState } from 'react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FiMail } from 'react-icons/fi'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    toast.success("You're on the list! Fresh deals headed your way.")
    setEmail('')
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-line dark:border-dark-line bg-surface-raised dark:bg-dark-surface px-6 sm:px-12 py-12 text-center"
      >
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 dark:bg-dark-raised text-primary-600 mb-4">
          <FiMail size={20} />
        </span>
        <h3 className="font-display text-2xl sm:text-3xl text-ink dark:text-dark-text mb-2">Never miss a deal</h3>
        <p className="text-ink-soft dark:text-dark-text-soft text-sm mb-6 max-w-md mx-auto">
          Subscribe for weekly discounts, new arrivals and recipe ideas — straight to your inbox.
        </p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="you@email.com"
            className="min-w-0 flex-1 px-4 py-3 rounded-xl bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          <button type="submit" className="px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors">
            Subscribe
          </button>
        </form>
      </motion.div>
    </section>
  )
}
