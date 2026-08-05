import { formatCurrency, discountPercent } from '../../utils/formatCurrency'

export default function PriceTag({ price, mrp, size = 'md' }) {
  const off = discountPercent(price, mrp)
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl',
  }
  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className={`font-bold text-ink dark:text-dark-text ${sizes[size]}`}>{formatCurrency(price)}</span>
      {off > 0 && (
        <>
          <span className="text-ink-soft dark:text-dark-text-soft line-through text-sm">{formatCurrency(mrp)}</span>
          <span className="text-citrus-600 dark:text-citrus-400 text-xs font-semibold">{off}% off</span>
        </>
      )}
    </div>
  )
}
