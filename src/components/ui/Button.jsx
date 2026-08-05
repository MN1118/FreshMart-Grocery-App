import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const VARIANTS = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-soft',
  citrus: 'bg-citrus-500 text-white hover:bg-citrus-600 shadow-soft',
  outline: 'border border-line dark:border-dark-line text-ink dark:text-dark-text hover:bg-surface-sunken dark:hover:bg-dark-raised',
  ghost: 'text-ink dark:text-dark-text hover:bg-surface-sunken dark:hover:bg-dark-raised',
  subtle: 'bg-primary-50 dark:bg-dark-raised text-primary-700 dark:text-primary-300 hover:bg-primary-100',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
}

const Button = forwardRef(function Button(
  { as = 'button', variant = 'primary', size = 'md', className = '', children, disabled, ...props },
  ref
) {
  const Comp = motion[as] || motion.button
  return (
    <Comp
      ref={ref}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`inline-flex items-center justify-center font-semibold transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </Comp>
  )
})

export default Button
