import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById, selectCurrentProduct } from '../redux/slices/productSlice'
import useCart from '../hooks/useCart'
import Loader from '../components/ui/Loader'
import { formatCurrency } from '../utils/helpers'

export default function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const product = useSelector(selectCurrentProduct)
  const { isDetailLoading } = useSelector((s) => s.products)
  const { add, isInCart } = useCart()
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    dispatch(fetchProductById(id))
    setActiveImage(0)
    window.scrollTo(0, 0)
  }, [id])

  if (isDetailLoading) return <Loader text="Loading product…" size="lg" />
  if (!product) return (
    <div className="text-center py-20">
      <p className="font-display text-2xl text-gray-400">Product not found</p>
      <Link to="/products" className="btn-outline mt-6 inline-flex">Back to Shop</Link>
    </div>
  )

  const inCart = isInCart(product.id)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-body text-xs text-gray-500 mb-10">
        <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-gold-400 transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-gray-300">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square bg-dark-800 border border-dark-600 overflow-hidden mb-4">
            <img
              src={product.images?.[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/600x600/111111/b8860b?text=BabaFly' }}
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 border-2 overflow-hidden transition-colors ${
                    i === activeImage ? 'border-gold-400' : 'border-dark-600 hover:border-dark-400'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/80x80/111111/b8860b?text=+' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="font-body text-xs text-gray-500 tracking-widest uppercase mb-2">{product.category}</p>
          <h1 className="font-display text-4xl text-white leading-tight">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-gold-400">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
            <span className="font-body text-sm text-gray-500">{product.rating} ({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-6 pb-6 border-b border-dark-600">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl text-gold-400">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="font-body text-lg text-gray-500 line-through">{formatCurrency(product.originalPrice)}</span>
              )}
            </div>
            {product.offer && (
              <span className="inline-block mt-2 font-body text-xs text-green-400 bg-green-400/10 px-2 py-1">
                {product.offer} — You save {formatCurrency(product.originalPrice - product.price)}
              </span>
            )}
          </div>

          {/* Specs */}
          <div className="mt-6 space-y-3">
            {[
              ['Metal Type',   product.metalType],
              ['Polish Type',  product.polishType],
              ['Availability', product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-4">
                <span className="font-body text-sm text-gray-500 w-28 flex-shrink-0">{label}</span>
                <span className="font-body text-sm text-white capitalize">{value}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="font-body text-xs text-gray-400 tracking-widest uppercase mb-2">Description</h3>
            <p className="font-body text-sm text-gray-400 leading-relaxed">{product.description}</p>
          </div>

          {/* CTA */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => add(product)}
              disabled={inCart || product.stock === 0}
              className={`flex-1 py-4 font-body text-sm tracking-widest uppercase transition-all ${
                inCart
                  ? 'bg-gold-400/20 border border-gold-400 text-gold-400 cursor-default'
                  : product.stock === 0
                  ? 'bg-dark-700 text-gray-500 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {inCart ? '✓ Added to Cart' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            {inCart && (
              <Link to="/cart" className="btn-outline flex-1 text-center py-4">
                View Cart
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}