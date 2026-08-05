export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-surface-sunken dark:bg-dark-raised rounded-xl ${className}`} />
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-line dark:border-dark-line p-3 bg-surface-raised dark:bg-dark-surface">
      <Skeleton className="w-full aspect-square mb-3" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2 mb-3" />
      <Skeleton className="h-8 w-full" />
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
