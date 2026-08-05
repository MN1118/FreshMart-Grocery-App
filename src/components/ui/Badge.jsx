export default function Badge({ children, tone = 'primary', className = '' }) {
  const tones = {
    primary: 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
    citrus: 'bg-citrus-50 text-citrus-700 dark:bg-citrus-500/15 dark:text-citrus-400',
    neutral: 'bg-surface-sunken text-ink-soft dark:bg-dark-raised dark:text-dark-text-soft',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}
