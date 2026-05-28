import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { addToCart, removeFromCart, updateQuantity, clearCart, selectCartItems, selectCartCount, selectCartTotal } from '../redux/slices/cartSlice'

export default function useCart() {
  const dispatch = useDispatch()
  const items    = useSelector(selectCartItems)
  const count    = useSelector(selectCartCount)
  const total    = useSelector(selectCartTotal)

  const add = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '',
      metalType: product.metalType,
      polishType: product.polishType,
    }))
    toast.success('Added to cart')
  }

  const remove = (id) => {
    dispatch(removeFromCart(id))
    toast.success('Removed from cart')
  }

  const updateQty = (id, quantity) => dispatch(updateQuantity({ id, quantity }))

  const clear = () => dispatch(clearCart())

  const isInCart = (id) => items.some((i) => i.id === id)

  return { items, count, total, add, remove, updateQty, clear, isInCart }
}