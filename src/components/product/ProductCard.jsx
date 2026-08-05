import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import PriceTag from '../ui/PriceTag'
import Rating from '../ui/Rating'
import QuantityStepper from '../ui/QuantityStepper'
import Button from '../ui/Button'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

function ProductCard({ product }) {
  const { items, addToCart, updateQuantity } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const [imgLoaded, setImgLoaded] = useState(false)

  const cartItem = items.find((i) => i.id === product.id)
  const wishlisted = isWishlisted(product.id)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-2xl border border-line dark:border-dark-line bg-surface-raised dark:bg-dark-surface overflow-hidden hover:shadow-lifted transition-shadow duration-300 flex flex-col"
    >
      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-dark-raised/90 backdrop-blur flex items-center justify-center shadow-soft"
      >
        <FiHeart className={wishlisted ? 'fill-citrus-500 text-citrus-500' : 'text-ink-soft'} size={16} />
      </button>

      <Link to={`/products/${product.id}`} className="block relative overflow-hidden aspect-square bg-surface-sunken dark:bg-dark-raised">
        {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-surface-sunken dark:bg-dark-raised" />}
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover"
        />
        {product.tags?.includes('bestseller') && (
          <span className="absolute bottom-2 left-2 bg-primary-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">
            Bestseller
          </span>
        )}
      </Link>

      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-sm text-ink dark:text-dark-text line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-xs text-ink-soft dark:text-dark-text-soft">{product.unit}</p>
        <Rating value={product.rating} count={product.reviewCount} />
        <PriceTag price={product.price} mrp={product.mrp} size="sm" />

        <div className="mt-auto pt-2">
          {cartItem ? (
            <QuantityStepper
              value={cartItem.quantity}
              onChange={(q) => updateQuantity(product.id, q)}
              size="sm"
            />
          ) : (
            <Button
              variant="subtle"
              size="sm"
              className="w-full"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default memo(ProductCard)
