import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiShoppingBag, FiTag, FiX } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import QuantityStepper from '../components/ui/QuantityStepper'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { formatCurrency } from '../utils/formatCurrency'
import { COUPONS } from '../data/products'

export default function Cart() {
  const {
    items, updateQuantity, removeFromCart, clearCart,
    applyCoupon, removeCoupon, activeCoupon,
    subtotal, discount, deliveryFee, total,
  } = useCart()
  const [couponInput, setCouponInput] = useState('')

  if (items.length === 0) {
    return (
      <EmptyState
        icon={FiShoppingBag}
        title="Your cart is empty"
        message="Looks like you haven't added anything yet. Explore our fresh picks and start shopping."
        actionLabel="Start Shopping"
        actionTo="/products"
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-ink dark:text-dark-text">Your Cart</h1>
        <button onClick={clearCart} className="text-sm font-medium text-ink-soft dark:text-dark-text-soft hover:text-citrus-600 flex items-center gap-1.5">
          <FiTrash2 size={14} /> Clear cart
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-line dark:border-dark-line bg-surface-raised dark:bg-dark-surface"
              >
                <Link to={`/products/${item.id}`} className="shrink-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="font-semibold text-ink dark:text-dark-text text-sm truncate">{item.name}</h3>
                  </Link>
                  <p className="text-xs text-ink-soft dark:text-dark-text-soft mb-2">{item.unit}</p>
                  <p className="font-bold text-ink dark:text-dark-text text-sm">{formatCurrency(item.price)}</p>
                </div>
                <QuantityStepper value={item.quantity} onChange={(q) => updateQuantity(item.id, q)} />
                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-soft hover:text-citrus-600 hover:bg-citrus-50 dark:hover:bg-citrus-500/10 transition-colors shrink-0"
                >
                  <FiTrash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="rounded-2xl border border-line dark:border-dark-line bg-surface-raised dark:bg-dark-surface p-5 h-fit sticky top-24">
          <h2 className="font-semibold text-ink dark:text-dark-text mb-4">Order Summary</h2>

          {activeCoupon ? (
            <div className="flex items-center justify-between bg-primary-50 dark:bg-dark-raised rounded-lg px-3 py-2 mb-4 text-sm">
              <span className="flex items-center gap-1.5 text-primary-700 dark:text-primary-300 font-semibold">
                <FiTag size={13} /> {activeCoupon.code} applied
              </span>
              <button onClick={removeCoupon} aria-label="Remove coupon"><FiX size={15} /></button>
            </div>
          ) : (
            <div className="flex gap-2 mb-4">
              <input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => { if (applyCoupon(couponInput)) setCouponInput('') }}
              >
                Apply
              </Button>
            </div>
          )}

          <p className="text-xs text-ink-soft dark:text-dark-text-soft mb-4">
            Try: {COUPONS.map((c) => c.code).join(', ')}
          </p>

          <div className="space-y-2 text-sm border-t border-line dark:border-dark-line pt-4">
            <div className="flex justify-between text-ink-soft dark:text-dark-text-soft">
              <span>Subtotal</span><span>{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-primary-700 dark:text-primary-300">
                <span>Coupon discount</span><span>−{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-ink-soft dark:text-dark-text-soft">
              <span>Delivery</span><span>{deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-ink dark:text-dark-text text-base pt-2 border-t border-line dark:border-dark-line">
              <span>Total</span><span>{formatCurrency(total)}</span>
            </div>
          </div>

          <Button as={Link} to="/checkout" variant="primary" className="w-full mt-5">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
