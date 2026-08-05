import { FaStar } from 'react-icons/fa'

export default function Rating({ value, count, size = 14 }) {
  return (
    <div className="flex items-center gap-1 text-ink-soft dark:text-dark-text-soft">
      <span className="flex items-center gap-0.5 bg-primary-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
        {value.toFixed(1)}
        <FaStar size={size - 4} />
      </span>
      {count != null && <span className="text-xs">({count})</span>}
    </div>
  )
}
