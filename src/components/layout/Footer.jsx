import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Footer() {
  const [email, setEmail] = useState('')

  const subscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    toast.success('Subscribed! Look out for fresh deals in your inbox.')
    setEmail('')
  }

  return (
    <footer className="bg-primary-900 text-primary-50 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-800 font-display font-bold text-lg">F</span>
            <span className="font-display font-semibold text-lg">FreshMart</span>
          </div>
          <p className="text-primary-200 text-sm max-w-xs">
            Fresh fruits, vegetables, dairy and daily essentials delivered to your door in minutes.
          </p>
          <div className="flex items-center gap-3 mt-4">
            {[FiInstagram, FiTwitter, FiFacebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="w-9 h-9 rounded-full bg-primary-800 flex items-center justify-center hover:bg-primary-700 transition"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Shop</h4>
          <ul className="space-y-2 text-sm text-primary-200">
            <li><Link to="/products" className="hover:text-white">All Products</Link></li>
            <li><Link to="/categories" className="hover:text-white">Categories</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm text-primary-200">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/register" className="hover:text-white">Create Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Stay fresh</h4>
          <p className="text-primary-200 text-sm mb-3">Get weekly deals in your inbox.</p>
          <form onSubmit={subscribe} className="flex gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="you@email.com"
              className="min-w-0 flex-1 px-3 py-2 rounded-lg bg-primary-800 placeholder:text-primary-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <button type="submit" className="px-3 py-2 rounded-lg bg-citrus-500 hover:bg-citrus-600 text-sm font-semibold transition">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 text-xs text-primary-300 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} FreshMart. All rights reserved.</span>
          <span>Built with React, Tailwind CSS &amp; Framer Motion.</span>
        </div>
      </div>
    </footer>
  )
}
