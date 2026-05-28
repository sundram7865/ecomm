import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/helpers'
import useCart from '../../hooks/useCart'

export default function ProductCard({ product }) {
  const { add, isInCart } = useCart()
  const inCart = isInCart(product.id)

  return (
    <div className="card group hover:border-gold-400/40 hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-dark-700">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400/111111/b8860b?text=BabaFly' }}
          />
        </div>
        {/* Offer badge */}
        {product.offer && (
          <span className="absolute top-3 left-3 text-[10px] font-body font-medium bg-green-500 text-white px-2 py-0.5">
            {product.offer}
          </span>
        )}
        {product.isLatest && (
          <span className="absolute top-3 right-3 badge-gold text-[10px]">New</span>
        )}
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="font-body text-xs text-gray-500 tracking-widest uppercase mb-1">{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-display text-lg text-white leading-snug hover:text-gold-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-2 mt-2">
          <span className="font-body text-xs text-gray-500 capitalize">{product.metalType}</span>
          <span className="text-dark-500">•</span>
          <span className="font-body text-xs text-gray-500 capitalize">{product.polishType}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-gold-400 text-xs">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span className="font-body text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between mt-3">
          <div>
            <p className="price-current">{formatCurrency(product.price)}</p>
            {product.originalPrice && (
              <p className="price-original">{formatCurrency(product.originalPrice)}</p>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); add(product) }}
            disabled={inCart}
            className={`text-xs font-body tracking-widest uppercase px-3 py-2 border transition-all duration-200 ${
              inCart
                ? 'border-gold-400 text-gold-400 cursor-default'
                : 'border-dark-500 text-gray-400 hover:border-gold-400 hover:text-gold-400'
            }`}
          >
            {inCart ? '✓ Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}