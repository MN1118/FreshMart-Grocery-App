import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    setServerError('')
    const result = registerUser(data)
    if (!result.ok) {
      setServerError(result.error)
      return
    }
    toast.success('Account created — welcome to FreshMart!')
    navigate('/')
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ink dark:text-dark-text mb-1">Create your account</h1>
      <p className="text-ink-soft dark:text-dark-text-soft text-sm mb-8">Join FreshMart for fast, fresh grocery delivery.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" size={16} />
            <input
              {...register('fullName', { required: 'Full name is required' })}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          {errors.fullName && <p className="text-xs text-citrus-600 mt-1">{errors.fullName.message}</p>}
        </div>

        <div>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" size={16} />
            <input
              type="email"
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          {errors.email && <p className="text-xs text-citrus-600 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" size={16} />
            <input
              type="password"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } })}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          {errors.password && <p className="text-xs text-citrus-600 mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" size={16} />
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (v) => v === watch('password') || 'Passwords do not match',
              })}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          {errors.confirmPassword && <p className="text-xs text-citrus-600 mt-1">{errors.confirmPassword.message}</p>}
        </div>

        {serverError && <p className="text-sm text-citrus-600">{serverError}</p>}

        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-ink-soft dark:text-dark-text-soft mt-6">
        Already have an account? <Link to="/login" className="text-primary-700 dark:text-primary-300 font-semibold hover:underline">Log in</Link>
      </p>
    </div>
  )
}
