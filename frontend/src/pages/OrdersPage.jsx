import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOrders, selectOrders, selectOrdersLoading } from '../redux/slices/orderSlice'
import Loader from '../components/ui/Loader'
import EmptyState from '../components/common/EmptyState'
import { formatCurrency, formatDate, getStatusColor } from '../utils/helpers'

export default function OrdersPage() {
  const dispatch  = useDispatch()
  const orders    = useSelector(selectOrders)
  const isLoading = useSelector(selectOrdersLoading)

  useEffect(() => { dispatch(fetchOrders()) }, [])

  if (isLoading) return <Loader text="Loading your orders…" size="lg" />

  if (orders.length === 0) {
    return (
      <EmptyState
        icon="📦"
        title="No orders yet"
        description="You haven't placed any orders. Start shopping to see them here."
        action={{ label: 'Shop Now', href: '/products' }}
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-4xl text-white mb-10">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card p-6 hover:border-gold-400/30 transition-all">
            {/* Order header */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-dark-600">
              <div>
                <p className="font-body text-xs text-gray-500 tracking-widest uppercase">Order #{order.id}</p>
                <p className="font-body text-sm text-gray-400 mt-1">Placed on {formatDate(order.createdAt)}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-body text-xs tracking-widest uppercase px-3 py-1 ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <Link to={`/orders/${order.id}`}
                  className="font-body text-xs text-gold-400 hover:text-gold-300 transition-colors tracking-widest uppercase">
                  View Details →
                </Link>
              </div>
            </div>

            {/* Items preview */}
            <div className="py-4 border-b border-dark-600">
              <div className="space-y-2">
                {order.items?.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="font-body text-sm text-gray-300">{item.name} × {item.quantity}</span>
                    <span className="font-body text-sm text-gray-400">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                {order.items?.length > 3 && (
                  <p className="font-body text-xs text-gray-600">+{order.items.length - 3} more items</p>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 flex justify-between items-center">
              <div>
                <p className="font-body text-xs text-gray-500">Delivered to</p>
                <p className="font-body text-sm text-gray-300">
                  {order.address?.fullName}, {order.address?.city}
                </p>
              </div>
              <div className="text-right">
                <p className="font-body text-xs text-gray-500">Order Total</p>
                <p className="font-display text-xl text-gold-400">{formatCurrency(order.total)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}