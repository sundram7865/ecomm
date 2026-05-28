import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-dark-600 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <span className="font-display text-2xl text-gold-400 tracking-[0.12em]">BABAFLY</span>
            <p className="mt-3 font-body text-sm text-gray-500 leading-relaxed max-w-xs">
              Premium jewelry crafted for life's most precious moments. Hallmarked gold, silver and platinum.
            </p>
          </div>
          <div>
            <h4 className="font-body text-xs text-gray-400 tracking-widest uppercase mb-4">Navigate</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/products', 'Shop All'], ['/categories', 'Categories'], ['/cart', 'Cart']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="font-body text-sm text-gray-500 hover:text-gold-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body text-xs text-gray-400 tracking-widest uppercase mb-4">Account</h4>
            <ul className="space-y-2">
              {[['/login', 'Login'], ['/register', 'Register'], ['/orders', 'My Orders']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="font-body text-sm text-gray-500 hover:text-gold-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-dark-600 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-gray-600">© 2024 BabaFly Jewelry. All rights reserved.</p>
          <p className="font-body text-xs text-gray-600">Crafted with ❤️ for IBI Internship</p>
        </div>
      </div>
    </footer>
  )
}