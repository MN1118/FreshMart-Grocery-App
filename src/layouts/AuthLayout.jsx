import { Link, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface dark:bg-dark-bg">
      <div className="hidden lg:flex flex-col justify-between p-10 bg-primary-700 text-primary-50 relative overflow-hidden">
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <span className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center text-primary-800 font-display font-bold text-lg">F</span>
          <span className="font-display font-semibold text-xl">FreshMart</span>
        </Link>
        <div className="relative z-10 max-w-sm">
          <p className="font-display text-3xl leading-snug mb-3 text-balance">
            Fresh groceries, delivered before your coffee gets cold.
          </p>
          <p className="text-primary-200 text-sm">Join thousands of happy customers shopping smarter with FreshMart.</p>
        </div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary-600/40" />
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-citrus-500/20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center p-6 sm:p-10"
      >
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <span className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-display font-bold text-lg">F</span>
            <span className="font-display font-semibold text-lg text-ink dark:text-dark-text">FreshMart</span>
          </Link>
          <Outlet />
        </div>
      </motion.div>
    </div>
  )
}
