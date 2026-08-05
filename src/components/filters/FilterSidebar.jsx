import { CATEGORIES, BRANDS } from '../../data/products'
import { FaStar } from 'react-icons/fa'

const RATINGS = [4, 3, 2]

export default function FilterSidebar({ filters, onChange, onReset }) {
  const update = (patch) => onChange({ ...filters, ...patch })

  return (
    <aside className="space-y-7">
      <div>
        <h4 className="font-semibold text-sm text-ink dark:text-dark-text mb-3">Category</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-ink-soft dark:text-dark-text-soft cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={filters.category === 'all'}
              onChange={() => update({ category: 'all' })}
              className="accent-primary-600"
            />
            All categories
          </label>
          {CATEGORIES.map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-sm text-ink-soft dark:text-dark-text-soft cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === c.id}
                onChange={() => update({ category: c.id })}
                className="accent-primary-600"
              />
              {c.emoji} {c.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-sm text-ink dark:text-dark-text mb-3">Brand</h4>
        <select
          value={filters.brand}
          onChange={(e) => update({ brand: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="all">All brands</option>
          {BRANDS.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      <div>
        <h4 className="font-semibold text-sm text-ink dark:text-dark-text mb-3">Price range</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) => update({ minPrice: Number(e.target.value) || 0 })}
            placeholder="Min"
            className="w-full px-3 py-2 rounded-lg bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          <span className="text-ink-soft">–</span>
          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => update({ maxPrice: Number(e.target.value) || 0 })}
            placeholder="Max"
            className="w-full px-3 py-2 rounded-lg bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-sm text-ink dark:text-dark-text mb-3">Rating</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-ink-soft dark:text-dark-text-soft cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === 0}
              onChange={() => update({ minRating: 0 })}
              className="accent-primary-600"
            />
            Any rating
          </label>
          {RATINGS.map((r) => (
            <label key={r} className="flex items-center gap-1.5 text-sm text-ink-soft dark:text-dark-text-soft cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() => update({ minRating: r })}
                className="accent-primary-600"
              />
              <span className="flex items-center gap-0.5">
                {Array.from({ length: r }).map((_, i) => <FaStar key={i} size={11} className="text-citrus-500" />)}
              </span>
              &amp; up
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="text-sm font-semibold text-primary-700 dark:text-primary-300 hover:underline"
      >
        Reset filters
      </button>
    </aside>
  )
}
