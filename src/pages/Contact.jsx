import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import Button from '../components/ui/Button'

const CONTACT_INFO = [
  { icon: FiMail, label: 'Email', value: 'support@freshmart.example' },
  { icon: FiPhone, label: 'Phone', value: '+91 98765 43210' },
  { icon: FiMapPin, label: 'Address', value: 'FreshMart HQ, Pune, Maharashtra' },
]

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500))
    toast.success("Message sent — we'll get back to you soon!")
    reset()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl text-ink dark:text-dark-text mb-3">Get in touch</h1>
        <p className="text-ink-soft dark:text-dark-text-soft max-w-lg mx-auto">
          Questions, feedback, or partnership ideas — we'd love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10">
        <div className="space-y-4">
          {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-5 rounded-2xl border border-line dark:border-dark-line bg-surface-raised dark:bg-dark-surface"
            >
              <span className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-dark-raised flex items-center justify-center text-primary-600 shrink-0">
                <Icon size={17} />
              </span>
              <div>
                <p className="text-xs text-ink-soft dark:text-dark-text-soft">{label}</p>
                <p className="font-semibold text-ink dark:text-dark-text">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-line dark:border-dark-line bg-surface-raised dark:bg-dark-surface p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <input
                {...register('name', { required: 'Name is required' })}
                placeholder="Your Name"
                className="w-full px-4 py-2.5 rounded-lg bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              {errors.name && <p className="text-xs text-citrus-600 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Your Email"
                className="w-full px-4 py-2.5 rounded-lg bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              {errors.email && <p className="text-xs text-citrus-600 mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <input
              {...register('subject', { required: 'Subject is required' })}
              placeholder="Subject"
              className="w-full px-4 py-2.5 rounded-lg bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            {errors.subject && <p className="text-xs text-citrus-600 mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <textarea
              {...register('message', { required: 'Message is required' })}
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-2.5 rounded-lg bg-surface-sunken dark:bg-dark-raised text-sm text-ink dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
            />
            {errors.message && <p className="text-xs text-citrus-600 mt-1">{errors.message.message}</p>}
          </div>

          <Button type="submit" variant="primary" disabled={isSubmitting}>
            Send Message
          </Button>
        </form>
      </div>
    </div>
  )
}
