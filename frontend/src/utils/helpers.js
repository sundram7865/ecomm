// Format price in Indian Rupees
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

// Truncate text
export const truncate = (str, length = 80) =>
  str.length > length ? str.slice(0, length) + '...' : str

// Get star array for rating
export const getStars = (rating) => {
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return { full, half, empty }
}

// Debounce (for search input)
export const debounce = (fn, delay = 400) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

// Format date
export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

// Get order status color
export const getStatusColor = (status) => {
  const map = {
    placed:    'text-blue-400 bg-blue-400/10',
    confirmed: 'text-yellow-400 bg-yellow-400/10',
    shipped:   'text-purple-400 bg-purple-400/10',
    delivered: 'text-green-400 bg-green-400/10',
    cancelled: 'text-red-400 bg-red-400/10',
  }
  return map[status] || 'text-gray-400 bg-gray-400/10'
}