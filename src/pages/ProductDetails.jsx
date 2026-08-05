import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiChevronRight, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi'
import { fetchProductById } from '../services/api'
import { getRelatedProducts, REVIEWS } from '../data/products'
import { Skeleton } from '../components/ui/Skeleton'
import PriceTag from '../components/ui/PriceTag'
import Rating from '../components/ui/Rating'
import QuantityStepper from '../components/ui/QuantityStepper'
import Button from '../components/ui/Button'
import ProductCard from '../components/product/ProductCard'
import EmptyState from '../components/ui/EmptyState'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { FaStar } from 'react-icons/fa'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(undefined)
  const [qty, setQty] = useState(1)
  const { addToCart, items } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  useEffect(() => {
    setProduct(undefined)
    setQty(1)
    fetchProductById(id).then(setProduct)
  }, [id])

  if (product === undefined) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-2 gap-10">
        <Skeleton className="aspect-square" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    )
  }

  if (product === null) {
    return (
      <EmptyState
        title="Product not found"
        message="This product may have been removed or the link is incorrect."
        actionLabel="Back to products"
        actionTo="/products"
      />
    )
  }

  const cartItem = items.find((i) => i.id === product.id)
  const related = getRelatedProducts(product)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-xs text-ink-soft dark:text-dark-text-soft mb-6">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <FiChevronRight size={12} />
        <Link to="/products" className="hover:text-primary-600">Products</Link>
        <FiChevronRight size={12} />
        <span className="text-ink dark:text-dark-text">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl overflow-hidden bg-surface-sunken dark:bg-dark-raised aspect-square"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 mb-2">{product.category}</p>
          <h1 className="font-display text-3xl text-ink dark:text-dark-text mb-2">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <Rating value={product.rating} count={product.reviewCount} />
            <span className="text-sm text-ink-soft dark:text-dark-text-soft">{product.unit}</span>
          </div>

          <PriceTag price={product.price} mrp={product.mrp} size="lg" />

          <p className="text-ink-soft dark:text-dark-text-soft mt-4 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-3 mt-6">
            <QuantityStepper value={qty} onChange={setQty} />
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                addToCart(product, qty)
                setQty(1)
              }}
            >
              Add to Cart
            </Button>
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className="w-11 h-11 rounded-xl border border-line dark:border-dark-line flex items-center justify-center shrink-0"
            >
              <FiHeart className={isWishlisted(product.id) ? 'fill-citrus-500 text-citrus-500' : 'text-ink-soft'} size={18} />
            </button>
          </div>

          {cartItem && (
            <p className="text-sm text-primary-700 dark:text-primary-300 mt-3">{cartItem.quantity} already in your cart</p>
          )}

          <Button as={Link} to="/checkout" variant="citrus" className="w-full mt-3" onClick={() => { if (!cartItem) addToCart(product, qty) }}>
            Buy Now
          </Button>

          <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-line dark:border-dark-line">
            {[
              { icon: FiTruck, label: '10-min delivery' },
              { icon: FiShield, label: 'Quality assured' },
              { icon: FiRefreshCw, label: 'Easy returns' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1.5">
                <Icon className="text-primary-600" size={20} />
                <span className="text-xs text-ink-soft dark:text-dark-text-soft">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl text-ink dark:text-dark-text mb-6">Customer reviews</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {REVIEWS.slice(0, 2).map((r) => (
            <div key={r.id} className="rounded-2xl border border-line dark:border-dark-line bg-surface-raised dark:bg-dark-surface p-5">
              <div className="flex items-center gap-1 text-citrus-500 mb-2">
                {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} size={12} className={i < r.rating ? '' : 'opacity-25'} />)}
              </div>
              <p className="text-sm text-ink dark:text-dark-text mb-3">&ldquo;{r.comment}&rdquo;</p>
              <div className="flex items-center gap-2">
                <img src={r.avatar} alt={r.name} className="w-7 h-7 rounded-full" />
                <span className="text-sm font-semibold text-ink dark:text-dark-text">{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl text-ink dark:text-dark-text mb-6">You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
