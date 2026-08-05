import { motion } from 'framer-motion'
import { FiTruck, FiShield, FiHeart } from 'react-icons/fi'
import { GiPlantRoots } from 'react-icons/gi'

const VALUES = [
  { icon: FiTruck, title: 'Fast Delivery', text: 'Groceries delivered to your doorstep in as little as 10 minutes.' },
  { icon: GiPlantRoots, title: 'Always Fresh', text: 'Fruits, vegetables and dairy sourced daily from trusted local farms.' },
  { icon: FiShield, title: 'Secure Shopping', text: 'Your data and payments are protected at every step.' },
  { icon: FiHeart, title: 'Customer First', text: 'Real support from real people, whenever you need it.' },
]

export default function About() {
  return (
    <div>
      <section className="bg-primary-50 dark:bg-dark-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-ink dark:text-dark-text mb-4 text-balance">
            Groceries, the way they should be.
          </h1>
          <p className="text-ink-soft dark:text-dark-text-soft max-w-xl mx-auto">
            FreshMart started with a simple idea: shopping for groceries should be fast,
            fresh, and effortless. Today we deliver to thousands of households, every day.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.img
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"
          alt="Fresh produce arranged in crates"
          className="rounded-3xl shadow-lifted w-full aspect-[4/3] object-cover"
        />
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-display text-3xl text-ink dark:text-dark-text mb-4">Our story</h2>
          <p className="text-ink-soft dark:text-dark-text-soft leading-relaxed mb-4">
            We built FreshMart because we were tired of choosing between speed and quality.
            By partnering directly with local farms and running our own dark-store network,
            we get fresh produce to your door faster — without cutting corners.
          </p>
          <p className="text-ink-soft dark:text-dark-text-soft leading-relaxed">
            Every order is picked, packed and quality-checked by our team before it ever
            leaves the store. That's our promise, every single time.
          </p>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="font-display text-3xl text-ink dark:text-dark-text mb-8 text-center">Why FreshMart?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-2xl border border-line dark:border-dark-line bg-surface-raised dark:bg-dark-surface p-6 text-center"
            >
              <Icon className="text-primary-600 mx-auto mb-3" size={28} />
              <h3 className="font-semibold text-ink dark:text-dark-text mb-2">{title}</h3>
              <p className="text-sm text-ink-soft dark:text-dark-text-soft">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
