import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../redux/slices/authSlice'

import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'

import HomePage            from '../pages/HomePage'
import LoginPage           from '../pages/LoginPage'
import RegisterPage        from '../pages/RegisterPage'
import ProductsPage        from '../pages/ProductsPage'
import ProductDetailPage   from '../pages/ProductDetailPage'
import CategoriesPage      from '../pages/CategoriesPage'
import CategoryProductsPage from '../pages/CategoryProductsPage'
import CartPage            from '../pages/CartPage'
import CheckoutPage        from '../pages/CheckoutPage'
import OrdersPage          from '../pages/OrdersPage'
import OrderDetailPage     from '../pages/OrderDetailPage'
import NotFoundPage        from '../pages/NotFoundPage'

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function GuestRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  return isAuthenticated ? <Navigate to="/" replace /> : children
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login"    element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
      </Route>

      {/* Main app */}
      <Route element={<MainLayout />}>
        <Route path="/"                          element={<HomePage />} />
        <Route path="/products"                  element={<ProductsPage />} />
        <Route path="/products/:id"              element={<ProductDetailPage />} />
        <Route path="/categories"                element={<CategoriesPage />} />
        <Route path="/categories/:id"            element={<CategoryProductsPage />} />
        <Route path="/cart"                      element={<CartPage />} />
        <Route path="/checkout"                  element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/orders"                    element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        <Route path="/orders/:id"                element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
        <Route path="*"                          element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}