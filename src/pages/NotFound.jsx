import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-8xl text-primary-200 dark:text-primary-900 mb-2"
      >
        404
      </motion.p>
      <h1 className="font-display text-2xl text-ink dark:text-dark-text mb-2">This aisle doesn't exist</h1>
      <p className="text-ink-soft dark:text-dark-text-soft mb-8 max-w-sm">
        The page you're looking for may have been moved or no longer exists.
      </p>
      <Button as={Link} to="/" variant="primary">Back to Home</Button>
    </div>
  )
}
