import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../../redux/slices/cartSlice'
import { selectIsAuthenticated, selectUser } from '../../redux/slices/authSlice'
import useAuth from '../../hooks/useAuth'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const cartCount = useSelector(selectCartCount)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const navLinks = [
    { to: '/',           label: 'Home' },
    { to: '/products',   label: 'Shop' },
    { to: '/categories', label: 'Categories' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="font-display text-2xl text-gold-400 tracking-[0.12em]">BABAFLY</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `font-body text-sm tracking-widest uppercase transition-colors ${
                    isActive ? 'text-gold-400' : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-400 hover:text-gold-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gold-400 text-dark-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors"
                >
                  <div className="h-7 w-7 rounded-full bg-gold-400/20 border border-gold-400/30 flex items-center justify-center">
                    <span className="text-gold-400 font-body text-xs font-medium">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block font-body text-sm">{user?.name}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-600 shadow-xl z-50">
                    <Link to="/orders" onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-300 hover:text-gold-400 hover:bg-dark-700 transition-colors font-body">
                      My Orders
                    </Link>
                    <button onClick={() => { setUserMenuOpen(false); logout() }}
                      className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-dark-700 transition-colors font-body">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-outline text-xs py-2 px-4 hidden md:inline-flex">
                Login
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-dark-600 py-4 space-y-1">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 font-body text-sm tracking-widest uppercase ${isActive ? 'text-gold-400' : 'text-gray-400'}`
                }>
                {l.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/orders" onClick={() => setMenuOpen(false)} className="block px-4 py-2 font-body text-sm text-gray-400">My Orders</Link>
                <button onClick={() => { setMenuOpen(false); logout() }} className="block px-4 py-2 font-body text-sm text-red-400">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2 font-body text-sm text-gold-400">Login / Register</Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}