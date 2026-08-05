import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiFilter, FiX } from 'react-icons/fi'
import { fetchProducts } from '../services/api'
import ProductGrid from '../components/product/ProductGrid'
import FilterSidebar from '../components/filters/FilterSidebar'
import SortDropdown from '../components/filters/SortDropdown'
import { useDebounce } from '../hooks/useDebounce'
import { filterProducts, sortProducts } from '../utils/filterSort'

const DEFAULT_FILTERS = { category: 'all', brand: 'all', minPrice: 0, maxPrice: 0, minRating: 0 }

export default function Products() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    category: searchParams.get('category') || 'all',
  })
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [sortBy, setSortBy] = useState('featured')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const debouncedSearch = useDebounce(search, 250)

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    setSearch(searchParams.get('search') || '')
    setFilters((f) => ({ ...f, category: searchParams.get('category') || 'all' }))
  }, [searchParams])

  const filtered = useMemo(() => {
    const result = filterProducts(products, {
      search: debouncedSearch,
      category: filters.category,
      brand: filters.brand,
      minPrice: filters.minPrice > 0 ? filters.minPrice : null,
      maxPrice: filters.maxPrice > 0 ? filters.maxPrice : null,
      minRating: filters.minRating,
    })
    return sortProducts(result, sortBy)
  }, [products, debouncedSearch, filters, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <h1 className="font-display text-3xl text-ink dark:text-dark-text">All Products</h1>
        <p className="text-ink-soft dark:text-dark-text-soft text-sm mt-1">{filtered.length} products found</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search for groceries..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-line dark:border-dark-line bg-surface-raised dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-line dark:border-dark-line text-sm font-medium text-ink dark:text-dark-text"
          >
            <FiFilter size={15} /> Filters
          </button>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
        </div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-surface-raised dark:bg-dark-surface p-5 overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <span className="font-semibold text-ink dark:text-dark-text">Filters</span>
                <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                  <FiX size={18} />
                </button>
              </div>
              <FilterSidebar filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
            </div>
          </div>
        )}

        <ProductGrid products={filtered} loading={loading} />
      </div>
    </div>
  )
}
