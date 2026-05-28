import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { placeOrder, selectIsPlacing } from '../redux/slices/orderSlice'
import useCart from '../hooks/useCart'
import { checkoutSchema } from '../utils/validators'
import { formatCurrency } from '../utils/helpers'
import Loader from '../components/ui/Loader'

const INDIAN_STATES = ['Andhra Pradesh','Assam','Bihar','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh',
  'Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Nagaland',
  'Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','Uttarakhand','West Bengal']

function FieldError({ msg }) {
  return msg ? <p className="mt-1 font-body text-xs text-red-400">{msg}</p> : null
}

export default function CheckoutPage() {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const isPlacing = useSelector(selectIsPlacing)
  const { items, total, clear } = useCart()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(checkoutSchema),
  })

  const shipping  = total >= 5000 ? 0 : 199
  const grandTotal = total + shipping

  const onSubmit = async (formData) => {
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    const orderData = {
      address:   formData,
      items:     items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
      subtotal:  total,
      shipping,
      total:     grandTotal,
    }
    const result = await dispatch(placeOrder(orderData))
    if (placeOrder.fulfilled.match(result)) {
      clear()
      toast.success('Order placed successfully! 🎉')
      navigate('/orders')
    } else {
      toast.error(result.payload || 'Failed to place order')
    }
  }

  if (isPlacing) return <Loader text="Placing your order…" size="lg" />

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-4xl text-white mb-10">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Address form */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h2 className="font-display text-2xl text-white mb-6">Delivery Address</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="font-body text-xs text-gray-400 tracking-widest uppercase block mb-2">Full Name *</label>
                  <input {...register('fullName')} className="input-field" placeholder="Your full name" />
                  <FieldError msg={errors.fullName?.message} />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-body text-xs text-gray-400 tracking-widest uppercase block mb-2">Phone Number *</label>
                  <input {...register('phone')} className="input-field" placeholder="10-digit mobile number" />
                  <FieldError msg={errors.phone?.message} />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-body text-xs text-gray-400 tracking-widest uppercase block mb-2">Address *</label>
                  <textarea {...register('address')} rows={3} className="input-field resize-none" placeholder="House no, street, area, landmark" />
                  <FieldError msg={errors.address?.message} />
                </div>

                <div>
                  <label className="font-body text-xs text-gray-400 tracking-widest uppercase block mb-2">City *</label>
                  <input {...register('city')} className="input-field" placeholder="City" />
                  <FieldError msg={errors.city?.message} />
                </div>

                <div>
                  <label className="font-body text-xs text-gray-400 tracking-widest uppercase block mb-2">State *</label>
                  <select {...register('state')} className="input-field">
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <FieldError msg={errors.state?.message} />
                </div>

                <div>
                  <label className="font-body text-xs text-gray-400 tracking-widest uppercase block mb-2">Pincode *</label>
                  <input {...register('pincode')} className="input-field" placeholder="6-digit pincode" maxLength={6} />
                  <FieldError msg={errors.pincode?.message} />
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="card p-6 sticky top-20">
              <h2 className="font-display text-2xl text-white mb-6">Order Summary</h2>

              <div className="space-y-3 pb-4 border-b border-dark-600 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-2">
                    <span className="font-body text-xs text-gray-400 flex-1 line-clamp-2">{item.name} × {item.quantity}</span>
                    <span className="font-body text-xs text-white flex-shrink-0">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="py-4 space-y-2 border-b border-dark-600">
                <div className="flex justify-between">
                  <span className="font-body text-sm text-gray-400">Subtotal</span>
                  <span className="font-body text-sm text-white">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-sm text-gray-400">Shipping</span>
                  <span className={`font-body text-sm ${shipping === 0 ? 'text-green-400' : 'text-white'}`}>
                    {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-4 mb-6">
                <span className="font-display text-lg text-white">Total</span>
                <span className="font-display text-xl text-gold-400">{formatCurrency(grandTotal)}</span>
              </div>

              <button type="submit" className="btn-primary w-full justify-center" disabled={isPlacing}>
                {isPlacing ? 'Placing Order…' : 'Place Order'}
              </button>
              <p className="font-body text-xs text-gray-600 text-center mt-3">Cash on Delivery • Secure Checkout</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}