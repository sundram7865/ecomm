import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4"
      style={{ background: 'radial-gradient(ellipse at center, rgba(180,134,11,0.05) 0%, transparent 60%)' }}>
      <p className="font-display text-[120px] md:text-[180px] text-gold-400/10 leading-none select-none font-light">404</p>
      <div className="-mt-8">
        <h1 className="font-display text-4xl text-white">Page Not Found</h1>
        <div className="gold-line" />
        <p className="font-body text-sm text-gray-500 mt-4 max-w-sm">
          The page you're looking for doesn't exist. Maybe browse our collection instead?
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">Go Home</Link>
          <Link to="/products" className="btn-outline">Browse Jewelry</Link>
        </div>
      </div>
    </div>
  )
}