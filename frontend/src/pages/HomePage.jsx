import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useProducts from '../hooks/useProducts'
import ProductCard from '../components/product/ProductCard'
import { SkeletonCard } from '../components/ui/Skeleton'
import SearchBar from '../components/common/SearchBar'
import { useNavigate } from 'react-router-dom'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

export default function HomePage() {
  const { featured, categories, isLoading, loadFeatured, loadCategories } = useProducts()
  const navigate = useNavigate()

  useEffect(() => {
    loadFeatured()
    loadCategories()
  }, [])

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(180,134,11,0.12) 0%, transparent 60%)' }}>
        {/* Decorative lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 80px, #b8860b 80px, #b8860b 81px)' }} />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="font-body text-xs text-gold-400 tracking-[0.4em] uppercase mb-6">
            Timeless. Handcrafted. Yours.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl text-white font-light leading-none tracking-tight">
            BABA<span className="text-gold-400">FLY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="mt-6 font-body text-base text-gray-400 tracking-wider max-w-lg mx-auto">
            Discover our curated collection of premium jewelry — crafted in hallmarked gold, sterling silver, and platinum.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary">Shop Collection</Link>
            <Link to="/categories" className="btn-outline">Browse Categories</Link>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="mt-10 max-w-md mx-auto">
            <SearchBar
              placeholder="Search rings, necklaces, earrings…"
              onSearch={(q) => q && navigate(`/products?search=${encodeURIComponent(q)}`)}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="section-title">Shop by Category</h2>
            <div className="gold-line" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <motion.div key={cat.id} variants={fadeUp}>
                <Link to={`/categories/${cat.id}`}
                  className="group block card hover:border-gold-400/40 transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img src={cat.image} alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/200x200/111111/b8860b?text=' + cat.name }}
                    />
                  </div>
                  <div className="p-3 text-center">
                    <p className="font-display text-base text-white group-hover:text-gold-400 transition-colors">{cat.name}</p>
                    <p className="font-body text-xs text-gray-500 mt-0.5">{cat.productCount} items</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Featured Products ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Collection</h2>
          <div className="gold-line" />
          <p className="font-body text-sm text-gray-500 mt-4">Handpicked pieces for you</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/products" className="btn-outline">View All Products</Link>
        </div>
      </section>

      {/* ── Banner ───────────────────────────────────────────── */}
      <section className="bg-dark-800 border-y border-dark-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-display text-4xl text-white mb-4">Free Shipping on orders above ₹5,000</h2>
          <p className="font-body text-sm text-gray-500 mb-8">BIS Hallmarked jewelry with 30-day easy returns</p>
          <Link to="/products" className="btn-primary">Shop Now</Link>
        </div>
      </section>
    </div>
  )
}