import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError, selectAuth } from '../redux/slices/authSlice'
import { loginSchema } from '../utils/validators'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function FieldError({ msg }) {
  return msg ? <p className="mt-1 font-body text-xs text-red-400">{msg}</p> : null
}

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector(selectAuth)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  })

  useEffect(() => {
    dispatch(clearError())
  }, [])

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data))
    if (loginUser.fulfilled.match(result)) {
      toast.success(`Welcome back, ${result.payload.user.name}!`)
      navigate('/')
    }
  }

  return (
    <div className="card p-8">
      <h2 className="font-display text-3xl text-white mb-1">Welcome back</h2>
      <p className="font-body text-sm text-gray-500 mb-8">Sign in to your BabaFly account</p>

      {/* API error */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 font-body text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="font-body text-xs text-gray-400 tracking-widest uppercase block mb-2">Email</label>
          <input
            {...register('email')}
            type="email"
            className="input-field"
            placeholder="you@example.com"
            autoComplete="email"
          />
          <FieldError msg={errors.email?.message} />
        </div>

        <div>
          <label className="font-body text-xs text-gray-400 tracking-widest uppercase block mb-2">Password</label>
          <input
            {...register('password')}
            type="password"
            className="input-field"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <FieldError msg={errors.password?.message} />
        </div>

        <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center mt-2">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" />
              Signing in…
            </span>
          ) : 'Sign In'}
        </button>
      </form>

      {/* Demo hint */}
      <div className="mt-6 p-3 bg-dark-700 border border-dark-500">
        <p className="font-body text-xs text-gray-500 text-center">
          Demo: <span className="text-gold-400">demo@babafly.com</span> / <span className="text-gold-400">demo1234</span>
        </p>
      </div>

      <p className="mt-6 font-body text-sm text-gray-500 text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-gold-400 hover:text-gold-300 transition-colors">Register</Link>
      </p>
    </div>
  )
}