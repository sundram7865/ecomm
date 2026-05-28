import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center px-4 py-12"
         style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(180,134,11,0.06) 0%, transparent 70%)' }}>
      <Link to="/" className="mb-10 block text-center">
        <span className="font-display text-4xl text-gold-400 tracking-[0.15em]">BABAFLY</span>
        <p className="font-body text-xs text-gray-500 tracking-widest uppercase mt-1">Fine Jewelry</p>
      </Link>
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  )
}