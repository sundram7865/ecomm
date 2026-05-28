import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useProducts from '../hooks/useProducts'
import ProductCard from '../components/product/ProductCard'
import ProductFilters from '../components/product/ProductFilters'
import { SkeletonProductGrid } from '../components/ui/Skeleton'
import Pagination from '../components/common/Pagination'
import SearchBar from '../components/common/SearchBar'
import EmptyState from '../components/common/EmptyState'

const LIMIT = 8

export default function ProductsPage() {
  const [searchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { products, isLoading, filters, totalCount, load, applyFilter, resetFilters } = useProducts()

  const totalPages = Math.ceil(totalCount / LIMIT)

  // Sync URL search param on mount
  useEffect(() => {
    const search = searchParams.get('search') || ''
    applyFilter({ search })
  }, [])

  // Reload when filters change
  useEffect(() => {
    load(filters)
  }, [JSON.stringify(filters)])

  const handleFilterChange = (newFilters) => applyFilter(newFilters)
  const handleReset = () => { resetFilters(); load({}) }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="font-display text-4xl text-white">All Jewelry</h1>
          <p className="font-body text-sm text-gray-500 mt-1">
            {isLoading ? 'Loading…' : `${totalCount} products found`}
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <SearchBar
            className="flex-1 sm:w-64"
            onSearch={(q) => applyFilter({ search: q })}
          />
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden btn-outline text-xs px-4 py-3 whitespace-nowrap"
          >
            {filtersOpen ? 'Hide Filters' : 'Filters'}
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters sidebar - desktop always visible, mobile toggleable */}
        <div className={`w-56 flex-shrink-0 ${filtersOpen ? 'block' : 'hidden'} lg:block`}>
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </div>

        {/* Products grid */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <SkeletonProductGrid count={LIMIT} />
          ) : products.length === 0 ? (
            <EmptyState
              icon="💎"
              title="No products found"
              description="Try adjusting your filters or search for something else."
              action={{ label: 'Clear Filters', href: '/products' }}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={(page) => applyFilter({ page })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}