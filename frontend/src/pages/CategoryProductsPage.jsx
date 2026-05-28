import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCategories } from '../redux/slices/productSlice'
import useProducts from '../hooks/useProducts'
import ProductCard from '../components/product/ProductCard'
import { SkeletonProductGrid } from '../components/ui/Skeleton'
import EmptyState from '../components/common/EmptyState'

export default function CategoryProductsPage() {
  const { id } = useParams()
  const categories = useSelector(selectCategories)
  const { products, isLoading, loadCategories, applyFilter, load, filters } = useProducts()

  const category = categories.find((c) => String(c.id) === id)

  useEffect(() => {
    loadCategories()
    applyFilter({ categoryId: id })
  }, [id])

  useEffect(() => {
    if (filters.categoryId === id) load(filters)
  }, [filters.categoryId])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 font-body text-xs text-gray-500 mb-10">
        <Link to="/categories" className="hover:text-gold-400 transition-colors">Categories</Link>
        <span>/</span>
        <span className="text-gray-300">{category?.name || 'Category'}</span>
      </nav>

      <div className="mb-10">
        <h1 className="section-title">{category?.name || 'Category'}</h1>
        <div className="gold-line mx-0" />
      </div>

      {isLoading ? (
        <SkeletonProductGrid count={6} />
      ) : products.length === 0 ? (
        <EmptyState
          icon="💍"
          title="No products in this category"
          action={{ label: 'Browse All', href: '/products' }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}