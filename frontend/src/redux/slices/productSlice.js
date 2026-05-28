import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from '../../services/productService'
import categoryService from '../../services/categoryService'

export const fetchProducts = createAsyncThunk('products/fetchAll', async (params, thunkAPI) => {
  try {
    return await productService.getAll(params)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to fetch products')
  }
})

export const fetchProductById = createAsyncThunk('products/fetchOne', async (id, thunkAPI) => {
  try {
    return await productService.getById(id)
  } catch (err) {
    return thunkAPI.rejectWithValue('Product not found')
  }
})

export const fetchFeaturedProducts = createAsyncThunk('products/fetchFeatured', async (_, thunkAPI) => {
  try {
    return await productService.getFeatured()
  } catch (err) {
    return thunkAPI.rejectWithValue('Failed to fetch featured products')
  }
})

export const fetchCategories = createAsyncThunk('products/fetchCategories', async (_, thunkAPI) => {
  try {
    return await categoryService.getAll()
  } catch (err) {
    return thunkAPI.rejectWithValue('Failed to fetch categories')
  }
})

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    featured: [],
    categories: [],
    currentProduct: null,
    totalCount: 0,
    isLoading: false,
    isDetailLoading: false,
    error: null,
    filters: {
      metalType: '',
      polishType: '',
      minPrice: '',
      maxPrice: '',
      sort: '',
      search: '',
      categoryId: '',
      page: 1,
    },
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload, page: 1 }
    },
    setPage(state, action) {
      state.filters.page = action.payload
    },
    clearFilters(state) {
      state.filters = { metalType: '', polishType: '', minPrice: '', maxPrice: '', sort: '', search: '', categoryId: '', page: 1 }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload.data
        state.totalCount = action.payload.total
      })
      .addCase(fetchProducts.rejected, (state, action) => { state.isLoading = false; state.error = action.payload })
      .addCase(fetchProductById.pending, (state) => { state.isDetailLoading = true; state.currentProduct = null })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.isDetailLoading = false; state.currentProduct = action.payload })
      .addCase(fetchProductById.rejected, (state, action) => { state.isDetailLoading = false; state.error = action.payload })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => { state.featured = action.payload })
      .addCase(fetchCategories.fulfilled, (state, action) => { state.categories = action.payload })
  },
})

export const { setFilters, setPage, clearFilters } = productSlice.actions
export default productSlice.reducer

export const selectProducts = (state) => state.products.list
export const selectFeatured = (state) => state.products.featured
export const selectCategories = (state) => state.products.categories
export const selectCurrentProduct = (state) => state.products.currentProduct
export const selectProductsLoading = (state) => state.products.isLoading
export const selectFilters = (state) => state.products.filters
export const selectTotalCount = (state) => state.products.totalCount