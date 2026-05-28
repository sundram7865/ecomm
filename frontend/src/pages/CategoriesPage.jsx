import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useProducts from '../hooks/useProducts'
import Loader from '../components/ui/Loader'

export default function CategoriesPage() {
  const { categories, isLoading, loadCategories } = useProducts()

  useEffect(() => { loadCategories() }, [])

  if (isLoading) return <Loader text="Loading categories…" />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="section-title">All Categories</h1>
        <div className="gold-line" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/categories/${cat.id}`}
            className="group card hover:border-gold-400/40 transition-all duration-300 overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img src={cat.image} alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400/111111/b8860b?text=' + cat.name }}
              />
            </div>
            <div className="p-6">
              <h2 className="font-display text-2xl text-white group-hover:text-gold-400 transition-colors">{cat.name}</h2>
              <p className="font-body text-sm text-gray-500 mt-1">{cat.productCount} products</p>
              <span className="mt-4 inline-block font-body text-xs text-gold-400 tracking-widest uppercase">
                Browse Collection →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}