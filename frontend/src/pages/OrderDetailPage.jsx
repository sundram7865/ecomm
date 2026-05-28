import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOrders } from '../redux/slices/orderSlice'
import orderService from '../services/orderService'
import Loader from '../components/ui/Loader'
import { formatCurrency, formatDate, getStatusColor } from '../utils/helpers'

const STATUS_STEPS = ['placed', 'confirmed', 'shipped', 'delivered']

export default function OrderDetailPage() {
  const { id }   = useParams()
  const orders   = useSelector(selectOrders)
  const [order, setOrder]     = useState(orders.find((o) => String(o.id) === id) || null)
  const [loading, setLoading] = useState(!order)

  useEffect(() => {
    if (!order) {
      orderService.getById(id)
        .then(setOrder)
        .catch(() => setOrder(null))
        .finally(() => setLoading(false))
    }
  }, [id])

  if (loading) return <Loader text="Loading order…" size="lg" />

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="font-display text-2xl text-gray-400">Order not found</p>
        <Link to="/orders" className="btn-outline mt-6 inline-flex">Back to Orders</Link>
      </div>
    )
  }

  const currentStep = STATUS_STEPS.indexOf(order.status)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-body text-xs text-gray-500 mb-10">
        <Link to="/orders" className="hover:text-gold-400 transition-colors">My Orders</Link>
        <span>/</span>
        <span className="text-gray-300">Order #{order.id}</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl text-white">Order #{order.id}</h1>
          <p className="font-body text-sm text-gray-500 mt-1">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <span className={`font-body text-xs tracking-widest uppercase px-4 py-2 ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      {/* Progress tracker */}
      {order.status !== 'cancelled' && (
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between relative">
            {/* connecting line */}
            <div className="absolute left-0 right-0 top-4 h-px bg-dark-500 z-0" />
            {STATUS_STEPS.map((step, idx) => (
              <div key={step} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center text-xs font-body transition-all ${
                  idx <= currentStep
                    ? 'bg-gold-400 border-gold-400 text-dark-900 font-bold'
                    : 'bg-dark-800 border-dark-500 text-gray-500'
                }`}>
                  {idx < currentStep ? '✓' : idx + 1}
                </div>
                <span className={`font-body text-xs capitalize text-center ${
                  idx <= currentStep ? 'text-gold-400' : 'text-gray-600'
                }`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Items */}
        <div className="card p-6">
          <h2 className="font-display text-xl text-white mb-4">Items Ordered</h2>
          <div className="space-y-4">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start gap-2 pb-3 border-b border-dark-600 last:border-0 last:pb-0">
                <div>
                  <p className="font-body text-sm text-white">{item.name}</p>
                  <p className="font-body text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                </div>
                <p className="font-body text-sm text-gold-400 flex-shrink-0">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          {/* Price breakdown */}
          <div className="mt-4 pt-4 border-t border-dark-600 space-y-2">
            <div className="flex justify-between">
              <span className="font-body text-sm text-gray-400">Subtotal</span>
              <span className="font-body text-sm text-white">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-sm text-gray-400">Shipping</span>
              <span className={`font-body text-sm ${order.shipping === 0 ? 'text-green-400' : 'text-white'}`}>
                {order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-dark-600">
              <span className="font-display text-base text-white">Total</span>
              <span className="font-display text-lg text-gold-400">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Delivery address */}
        <div className="card p-6">
          <h2 className="font-display text-xl text-white mb-4">Delivery Address</h2>
          {order.address && (
            <address className="not-italic font-body text-sm text-gray-300 space-y-1">
              <p className="font-medium text-white">{order.address.fullName}</p>
              <p>{order.address.address}</p>
              <p>{order.address.city}, {order.address.state} — {order.address.pincode}</p>
              <p className="text-gray-500 mt-2">📱 {order.address.phone}</p>
            </address>
          )}
          <div className="mt-6 pt-4 border-t border-dark-600">
            <p className="font-body text-xs text-gray-500 tracking-widest uppercase mb-1">Payment</p>
            <p className="font-body text-sm text-white">Cash on Delivery</p>
          </div>
        </div>
      </div>
    </div>
  )
}