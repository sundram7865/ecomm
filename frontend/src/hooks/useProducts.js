import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, fetchCategories, fetchFeaturedProducts, setFilters, setPage, clearFilters, selectProducts, selectFeatured, selectCategories, selectProductsLoading, selectFilters, selectTotalCount } from '../redux/slices/productSlice'

export default function useProducts() {
  const dispatch    = useDispatch()
  const products    = useSelector(selectProducts)
  const featured    = useSelector(selectFeatured)
  const categories  = useSelector(selectCategories)
  const isLoading   = useSelector(selectProductsLoading)
  const filters     = useSelector(selectFilters)
  const totalCount  = useSelector(selectTotalCount)

  const load = (params) => dispatch(fetchProducts(params || filters))
  const loadFeatured   = () => dispatch(fetchFeaturedProducts())
  const loadCategories = () => dispatch(fetchCategories())

  const applyFilter  = (newFilters) => dispatch(setFilters(newFilters))
  const changePage   = (page)       => dispatch(setPage(page))
  const resetFilters = ()           => dispatch(clearFilters())

  return {
    products, featured, categories, isLoading,
    filters, totalCount,
    load, loadFeatured, loadCategories,
    applyFilter, changePage, resetFilters,
  }
}