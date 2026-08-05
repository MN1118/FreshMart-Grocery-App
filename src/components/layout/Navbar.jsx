import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { itemCount } = useCart()
  const { items: wishItems } = useWishlist()
  const { isAuthenticated, currentUser, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submitSearch = (e) => {
    e.preventDefault()
    navigate(search.trim() ? `/products?search=${encodeURIComponent(search.trim())}` : '/products')
    setMobileOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-shadow duration-300 bg-surface/90 dark:bg-dark-bg/90 backdrop-blur-md ${
        scrolled ? 'shadow-soft border-b border-line dark:border-dark-line' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-display font-bold text-lg">F</span>
          <span className="font-display font-semibold text-lg text-ink dark:text-dark-text hidden sm:block">FreshMart</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-2">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-dark-raised'
                    : 'text-ink-soft dark:text-dark-text-soft hover:text-ink dark:hover:text-dark-text'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-sm ml-auto relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search groceries..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </form>

        <div className="flex items-center gap-1 ml-auto md:ml-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-soft dark:text-dark-text-soft hover:bg-surface-sunken dark:hover:bg-dark-raised transition"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative w-9 h-9 rounded-lg flex items-center justify-center text-ink-soft dark:text-dark-text-soft hover:bg-surface-sunken dark:hover:bg-dark-raised transition"
          >
            <FiHeart size={18} />
            {wishItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-citrus-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative w-9 h-9 rounded-lg flex items-center justify-center text-ink-soft dark:text-dark-text-soft hover:bg-surface-sunken dark:hover:bg-dark-raised transition"
          >
            <FiShoppingCart size={18} />
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-2 pl-2">
              <span className="text-sm text-ink-soft dark:text-dark-text-soft">Hi, {currentUser.fullName.split(' ')[0]}</span>
              <button onClick={logout} className="text-sm font-medium text-primary-700 dark:text-primary-300 hover:underline">
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              aria-label="Login"
              className="hidden sm:flex w-9 h-9 rounded-lg items-center justify-center text-ink-soft dark:text-dark-text-soft hover:bg-surface-sunken dark:hover:bg-dark-raised transition"
            >
              <FiUser size={18} />
            </Link>
          )}

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-ink-soft dark:text-dark-text-soft hover:bg-surface-sunken dark:hover:bg-dark-raised transition"
          >
            <FiMenu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-surface-raised dark:bg-dark-surface z-50 shadow-lifted p-5 flex flex-col gap-1 lg:hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-semibold text-lg text-ink dark:text-dark-text">Menu</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-sunken dark:hover:bg-dark-raised">
                  <FiX size={18} />
                </button>
              </div>

              <form onSubmit={submitSearch} className="relative mb-3">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" size={16} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search groceries..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-sunken dark:bg-dark-raised text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </form>

              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive ? 'bg-primary-50 dark:bg-dark-raised text-primary-700 dark:text-primary-300' : 'text-ink dark:text-dark-text'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="border-t border-line dark:border-dark-line my-2" />

              {isAuthenticated ? (
                <button
                  onClick={() => { logout(); setMobileOpen(false) }}
                  className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-ink dark:text-dark-text"
                >
                  Log out ({currentUser.fullName.split(' ')[0]})
                </button>
              ) : (
                <>
                  <NavLink to="/login" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-ink dark:text-dark-text">
                    Login
                  </NavLink>
                  <NavLink to="/register" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-ink dark:text-dark-text">
                    Create Account
                  </NavLink>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
