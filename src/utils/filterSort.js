export function filterProducts(products, { search, category, minPrice, maxPrice, minRating, brand }) {
  return products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    if (category && category !== 'all' && p.category !== category) return false
    if (brand && brand !== 'all' && p.brand !== brand) return false
    if (minPrice != null && p.price < minPrice) return false
    if (maxPrice != null && p.price > maxPrice) return false
    if (minRating && p.rating < minRating) return false
    return true
  })
}

export function sortProducts(products, sortBy) {
  const sorted = [...products]
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
}
