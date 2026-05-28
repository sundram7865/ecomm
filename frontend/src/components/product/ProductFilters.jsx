import { useState } from 'react'

const METAL_TYPES   = ['gold', 'silver', 'white-gold', 'rose-gold', 'platinum']
const POLISH_TYPES  = ['glossy', 'matte', 'antique', 'oxidised']
const SORT_OPTIONS  = [
  { value: 'latest',     label: 'Latest First' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
]

export default function ProductFilters({ filters, onFilterChange, onReset }) {
  const [minPrice, setMinPrice] = useState(filters.minPrice || '')
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || '')

  const handlePriceApply = () => {
    onFilterChange({ minPrice, maxPrice })
  }

  return (
    <aside className="space-y-8">
      {/* Sort */}
      <div>
        <h3 className="font-body text-xs text-gray-400 tracking-widest uppercase mb-3">Sort By</h3>
        <div className="space-y-2">
          {SORT_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="sort"
                value={opt.value}
                checked={filters.sort === opt.value}
                onChange={() => onFilterChange({ sort: opt.value })}
                className="accent-gold-400"
              />
              <span className="font-body text-sm text-gray-400 group-hover:text-white transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-body text-xs text-gray-400 tracking-widest uppercase mb-3">Price Range (₹)</h3>
        <div className="flex gap-2">
          <input
            type="number" placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input-field w-1/2 py-2 text-xs"
          />
          <input
            type="number" placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input-field w-1/2 py-2 text-xs"
          />
        </div>
        <button onClick={handlePriceApply} className="mt-2 w-full btn-ghost border border-dark-500 hover:border-gold-400 text-xs py-2">
          Apply
        </button>
      </div>

      {/* Metal Type */}
      <div>
        <h3 className="font-body text-xs text-gray-400 tracking-widest uppercase mb-3">Metal Type</h3>
        <div className="space-y-2">
          {METAL_TYPES.map((m) => (
            <label key={m} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio" name="metalType" value={m}
                checked={filters.metalType === m}
                onChange={() => onFilterChange({ metalType: m })}
                className="accent-gold-400"
              />
              <span className="font-body text-sm text-gray-400 capitalize group-hover:text-white transition-colors">{m}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Polish Type */}
      <div>
        <h3 className="font-body text-xs text-gray-400 tracking-widest uppercase mb-3">Polish Type</h3>
        <div className="space-y-2">
          {POLISH_TYPES.map((p) => (
            <label key={p} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio" name="polishType" value={p}
                checked={filters.polishType === p}
                onChange={() => onFilterChange({ polishType: p })}
                className="accent-gold-400"
              />
              <span className="font-body text-sm text-gray-400 capitalize group-hover:text-white transition-colors">{p}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button onClick={onReset} className="w-full text-xs font-body text-red-400 hover:text-red-300 transition-colors py-2 border border-dark-600 hover:border-red-400/30">
        Clear All Filters
      </button>
    </aside>
  )
}