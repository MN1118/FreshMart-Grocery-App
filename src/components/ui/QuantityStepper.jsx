import { FiMinus, FiPlus } from 'react-icons/fi'

export default function QuantityStepper({ value, onChange, min = 1, max = 99, size = 'md' }) {
  const sizes = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-sm',
  }
  return (
    <div className={`inline-flex items-center rounded-lg border border-line dark:border-dark-line overflow-hidden ${sizes[size]}`}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="px-2.5 h-full flex items-center justify-center hover:bg-surface-sunken dark:hover:bg-dark-raised text-ink dark:text-dark-text disabled:opacity-40"
        disabled={value <= min}
      >
        <FiMinus />
      </button>
      <span className="w-8 text-center font-semibold text-ink dark:text-dark-text tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="px-2.5 h-full flex items-center justify-center hover:bg-surface-sunken dark:hover:bg-dark-raised text-ink dark:text-dark-text disabled:opacity-40"
        disabled={value >= max}
      >
        <FiPlus />
      </button>
    </div>
  )
}
