import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart'
import { formatCurrency } from '../utils/helpers'
import EmptyState from '../components/common/EmptyState'

export default function CartPage() {
  const { items, total, remove, updateQty, count } = useCart()

  if (items.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Your cart is empty"
        description="Looks like you haven't added any jewelry yet."
        action={{ label: 'Shop Now', href: '/products' }}
      />
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-4xl text-white mb-10">Shopping Cart <span className="text-gray-500 text-2xl">({count} items)</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card flex gap-4 p-4">
              {/* Image */}
              <Link to={`/products/${item.id}`} className="flex-shrink-0">
                <div className="w-24 h-24 bg-dark-700 overflow-hidden">
                  <img src={item.image} alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/100x100/111111/b8860b?text=BF' }}
                  />
                </div>
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.id}`}>
                  <h3 className="font-display text-lg text-white hover:text-gold-400 transition-colors leading-snug">{item.name}</h3>
                </Link>
                <div className="flex gap-2 mt-1">
                  <span className="font-body text-xs text-gray-500 capitalize">{item.metalType}</span>
                  <span className="text-dark-500">•</span>
                  <span className="font-body text-xs text-gray-500 capitalize">{item.polishType}</span>
                </div>
                <p className="font-display text-xl text-gold-400 mt-2">{formatCurrency(item.price)}</p>
              </div>

              {/* Quantity & Remove */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                <div className="flex items-center border border-dark-500">
                  <button onClick={() => updateQty(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-400 hover:text-white hover:bg-dark-700 transition-colors font-body">−</button>
                  <span className="px-4 py-1 font-body text-sm text-white border-x border-dark-500">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-400 hover:text-white hover:bg-dark-700 transition-colors font-body">+</button>
                </div>
                <p className="font-display text-sm text-gray-400">{formatCurrency(item.price * item.quantity)}</p>
                <button onClick={() => remove(item.id)}
                  className="font-body text-xs text-red-400 hover:text-red-300 transition-colors">Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="font-display text-2xl text-white mb-6">Order Summary</h2>

            <div className="space-y-3 pb-6 border-b border-dark-600">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="font-body text-sm text-gray-400 flex-1 truncate pr-2">{item.name} × {item.quantity}</span>
                  <span className="font-body text-sm text-white flex-shrink-0">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="py-4 border-b border-dark-600 space-y-2">
              <div className="flex justify-between">
                <span className="font-body text-sm text-gray-400">Subtotal</span>
                <span className="font-body text-sm text-white">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-sm text-gray-400">Shipping</span>
                <span className="font-body text-sm text-green-400">{total >= 5000 ? 'Free' : formatCurrency(199)}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 mb-6">
              <span className="font-display text-lg text-white">Total</span>
              <span className="font-display text-xl text-gold-400">
                {formatCurrency(total >= 5000 ? total : total + 199)}
              </span>
            </div>

            <Link to="/checkout" className="btn-primary w-full justify-center text-center block">
              Proceed to Checkout
            </Link>
            <Link to="/products" className="mt-3 btn-ghost w-full justify-center text-center block text-xs">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}