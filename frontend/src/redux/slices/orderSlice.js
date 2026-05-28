import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from '../../services/orderService'

export const placeOrder = createAsyncThunk('orders/place', async (orderData, thunkAPI) => {
  try {
    return await orderService.create(orderData)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to place order')
  }
})

export const fetchOrders = createAsyncThunk('orders/fetchAll', async (_, thunkAPI) => {
  try {
    return await orderService.getAll()
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to fetch orders')
  }
})

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [],
    isLoading: false,
    isPlacing: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => { state.isPlacing = true; state.error = null })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isPlacing = false
        state.list.unshift(action.payload)
      })
      .addCase(placeOrder.rejected, (state, action) => { state.isPlacing = false; state.error = action.payload })
      .addCase(fetchOrders.pending, (state) => { state.isLoading = true })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.isLoading = false; state.list = action.payload })
      .addCase(fetchOrders.rejected, (state, action) => { state.isLoading = false; state.error = action.payload })
  },
})

export default orderSlice.reducer
export const selectOrders = (state) => state.orders.list
export const selectOrdersLoading = (state) => state.orders.isLoading
export const selectIsPlacing = (state) => state.orders.isPlacing