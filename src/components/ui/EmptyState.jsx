import { Link } from 'react-router-dom'
import Button from './Button'

export default function EmptyState({ icon: Icon, title, message, actionLabel, actionTo }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      {Icon && (
        <div className="w-20 h-20 rounded-full bg-primary-50 dark:bg-dark-raised flex items-center justify-center mb-5">
          <Icon size={34} className="text-primary-500" />
        </div>
      )}
      <h3 className="font-display text-2xl text-ink dark:text-dark-text mb-2">{title}</h3>
      <p className="text-ink-soft dark:text-dark-text-soft max-w-sm mb-6">{message}</p>
      {actionLabel && actionTo && (
        <Button as={Link} to={actionTo} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
