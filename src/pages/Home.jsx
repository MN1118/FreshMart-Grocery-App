import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/api'
import Hero from '../components/home/Hero'
import CategoryRail from '../components/home/CategoryRail'
import ProductSection from '../components/home/ProductSection'
import DiscountBanner from '../components/home/DiscountBanner'
import BrandStrip from '../components/home/BrandStrip'
import Reviews from '../components/home/Reviews'
import Newsletter from '../components/home/Newsletter'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const trending = products.filter((p) => p.tags?.includes('trending')).slice(0, 4)
  const bestsellers = products.filter((p) => p.tags?.includes('bestseller')).slice(0, 4)

  return (
    <>
      <Hero />
      <CategoryRail />
      <ProductSection
        title="Trending Now"
        subtitle="What everyone's adding to cart this week"
        products={trending}
        loading={loading}
        viewAllHref="/products"
      />
      <DiscountBanner />
      <ProductSection
        title="Best Sellers"
        subtitle="Customer favourites, restocked daily"
        products={bestsellers}
        loading={loading}
        viewAllHref="/products"
        tinted
      />
      <BrandStrip />
      <Reviews />
      <Newsletter />
    </>
  )
}
