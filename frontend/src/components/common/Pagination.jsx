export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 border border-dark-500 text-gray-400 hover:border-gold-400 hover:text-gold-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-body text-sm"
      >
        ←
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 font-body text-sm transition-colors border ${
            page === currentPage
              ? 'bg-gold-400 text-dark-900 border-gold-400'
              : 'border-dark-500 text-gray-400 hover:border-gold-400 hover:text-gold-400'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border border-dark-500 text-gray-400 hover:border-gold-400 hover:text-gold-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-body text-sm"
      >
        →
      </button>
    </div>
  )
}