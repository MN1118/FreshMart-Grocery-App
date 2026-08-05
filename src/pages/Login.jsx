import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiMail, FiLock } from 'react-icons/fi'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    setServerError('')
    const result = login(data)
    if (!result.ok) {
      setServerError(result.error)
      return
    }
    toast.success('Welcome back!')
    navigate(location.state?.from || '/')
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ink dark:text-dark-text mb-1">Welcome back</h1>
      <p className="text-ink-soft dark:text-dark-text-soft text-sm mb-8">Log in to continue shopping fresh.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" size={16} />
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
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
              {...register('password', { required: 'Password is required' })}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          {errors.password && <p className="text-xs text-citrus-600 mt-1">{errors.password.message}</p>}
        </div>

        {serverError && <p className="text-sm text-citrus-600">{serverError}</p>}

        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          Login
        </Button>
      </form>

      <p className="text-center text-sm text-ink-soft dark:text-dark-text-soft mt-6">
        New to FreshMart? <Link to="/register" className="text-primary-700 dark:text-primary-300 font-semibold hover:underline">Create an account</Link>
      </p>
    </div>
  )
}
