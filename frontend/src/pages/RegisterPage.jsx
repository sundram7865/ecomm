import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearError, selectAuth } from '../redux/slices/authSlice'
import { registerSchema } from '../utils/validators'
import toast from 'react-hot-toast'

function FieldError({ msg }) {
  return msg ? <p className="mt-1 font-body text-xs text-red-400">{msg}</p> : null
}

export default function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector(selectAuth)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  })

  useEffect(() => { dispatch(clearError()) }, [])

  const onSubmit = async (data) => {
    const { confirmPassword, ...userData } = data
    const result = await dispatch(registerUser(userData))
    if (registerUser.fulfilled.match(result)) {
      toast.success(`Welcome to BabaFly, ${result.payload.user.name}!`)
      navigate('/')
    }
  }

  return (
    <div className="card p-8">
      <h2 className="font-display text-3xl text-white mb-1">Create account</h2>
      <p className="font-body text-sm text-gray-500 mb-8">Join BabaFly for exclusive jewelry deals</p>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 font-body text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="font-body text-xs text-gray-400 tracking-widest uppercase block mb-2">Full Name</label>
          <input {...register('name')} className="input-field" placeholder="Your full name" autoComplete="name" />
          <FieldError msg={errors.name?.message} />
        </div>

        <div>
          <label className="font-body text-xs text-gray-400 tracking-widest uppercase block mb-2">Email</label>
          <input {...register('email')} type="email" className="input-field" placeholder="you@example.com" autoComplete="email" />
          <FieldError msg={errors.email?.message} />
        </div>

        <div>
          <label className="font-body text-xs text-gray-400 tracking-widest uppercase block mb-2">Password</label>
          <input {...register('password')} type="password" className="input-field" placeholder="Min 6 characters" autoComplete="new-password" />
          <FieldError msg={errors.password?.message} />
        </div>

        <div>
          <label className="font-body text-xs text-gray-400 tracking-widest uppercase block mb-2">Confirm Password</label>
          <input {...register('confirmPassword')} type="password" className="input-field" placeholder="Repeat password" autoComplete="new-password" />
          <FieldError msg={errors.confirmPassword?.message} />
        </div>

        <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center mt-2">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" />
              Creating account…
            </span>
          ) : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 font-body text-sm text-gray-500 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-gold-400 hover:text-gold-300 transition-colors">Sign in</Link>
      </p>
    </div>
  )
}