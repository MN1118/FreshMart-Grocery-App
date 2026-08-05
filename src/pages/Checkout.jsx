import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTruck, FiCheckCircle } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { placeOrder } from '../services/api'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { formatCurrency } from '../utils/formatCurrency'

export default function Checkout() {
  const { items, subtotal, discount, deliveryFee, total, activeCoupon, clearCart } = useCart()
  const { currentUser } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      customerName: currentUser?.fullName || '',
      email: currentUser?.email || '',
      address: '',
      payment: 'cod',
    },
  })

  const onSubmit = async (formData) => {
    setSubmitting(true)
    const { orderId: id } = await placeOrder({
      ...formData,
      items,
      total,
    })
    setOrderId(id)
    clearCart()
    setSubmitting(false)
  }

  if (orderId) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35 }}>
          <FiCheckCircle className="text-primary-600 mx-auto mb-5" size={56} />
          <h1 className="font-display text-3xl text-ink dark:text-dark-text mb-2">Order placed successfully!</h1>
          <p className="text-ink-soft dark:text-dark-text-soft mb-1">Order ID: <span className="font-semibold text-ink dark:text-dark-text">#FM-{orderId}</span></p>
          <p className="text-ink-soft dark:text-dark-text-soft mb-8">Total paid: <span className="font-semibold text-ink dark:text-dark-text">{formatCurrency(total)}</span></p>
          <Button as={Link} to="/products" variant="primary">Continue Shopping</Button>
        </motion.div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Nothing to check out"
        message="Your cart is empty. Add a few fresh picks before checking out."
        actionLabel="Browse Products"
        actionTo="/products"
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl text-ink dark:text-dark-text mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-line dark:border-dark-line bg-surface-raised dark:bg-dark-surface p-6 space-y-4">
          <h2 className="font-semibold text-ink dark:text-dark-text flex items-center gap-2">
            <FiTruck /> Delivery Details
          </h2>

          <div>
            <input
              {...register('customerName', { required: 'Full name is required' })}
              placeholder="Full Name"
              className="w-full px-4 py-2.5 rounded-lg bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            {errors.customerName && <p className="text-xs text-citrus-600 mt-1">{errors.customerName.message}</p>}
          </div>

          <div>
            <input
              type="email"
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
              placeholder="Email Address"
              className="w-full px-4 py-2.5 rounded-lg bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            {errors.email && <p className="text-xs text-citrus-600 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <textarea
              {...register('address', { required: 'Delivery address is required' })}
              placeholder="Full Delivery Address"
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
            />
            {errors.address && <p className="text-xs text-citrus-600 mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink dark:text-dark-text mb-2">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 p-3 rounded-lg border border-line dark:border-dark-line cursor-pointer text-sm text-ink dark:text-dark-text">
                <input type="radio" value="cod" {...register('payment')} defaultChecked className="accent-primary-600" />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg border border-line dark:border-dark-line cursor-pointer text-sm text-ink dark:text-dark-text">
                <input type="radio" value="card" {...register('payment')} className="accent-primary-600" />
                Credit / Debit Card
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg border border-line dark:border-dark-line cursor-pointer text-sm text-ink dark:text-dark-text">
                <input type="radio" value="upi" {...register('payment')} className="accent-primary-600" />
                UPI
              </label>
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
            {submitting ? 'Placing order…' : `Place Order · ${formatCurrency(total)}`}
          </Button>
        </form>

        <div className="rounded-2xl border border-line dark:border-dark-line bg-surface-raised dark:bg-dark-surface p-5 h-fit">
          <h2 className="font-semibold text-ink dark:text-dark-text mb-4">Order Summary</h2>
          <ul className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 text-sm">
                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                <span className="flex-1 min-w-0 truncate text-ink dark:text-dark-text">{item.name} × {item.quantity}</span>
                <span className="font-semibold text-ink dark:text-dark-text shrink-0">{formatCurrency(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-2 text-sm border-t border-line dark:border-dark-line pt-4">
            <div className="flex justify-between text-ink-soft dark:text-dark-text-soft"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            {discount > 0 && (
              <div className="flex justify-between text-primary-700 dark:text-primary-300"><span>Discount ({activeCoupon.code})</span><span>−{formatCurrency(discount)}</span></div>
            )}
            <div className="flex justify-between text-ink-soft dark:text-dark-text-soft"><span>Delivery</span><span>{deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee)}</span></div>
            <div className="flex justify-between font-bold text-ink dark:text-dark-text text-base pt-2 border-t border-line dark:border-dark-line"><span>Total</span><span>{formatCurrency(total)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
