import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { debounce } from '../../utils/helpers'

export default function SearchBar({ onSearch, placeholder = 'Search jewelry…', className = '' }) {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const debouncedSearch = useCallback(
    debounce((q) => { if (onSearch) onSearch(q) }, 400),
    [onSearch]
  )

  const handleChange = (e) => {
    setValue(e.target.value)
    debouncedSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) {
      navigate(`/products?search=${encodeURIComponent(value.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="input-field pr-10"
      />
      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold-400 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
    </form>
  )
}