import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/authService'

// ── Thunks ──────────────────────────────────────────────────────────────────
export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    return await authService.login(credentials)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || 'Login failed')
  }
})

export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    return await authService.register(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || 'Registration failed')
  }
})

// ── Slice ────────────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => { state.isLoading = true; state.error = null }
    const handleFulfilled = (state, action) => {
      state.isLoading = false
      state.token = action.payload.token
      state.user = action.payload.user
    }
    const handleRejected = (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleRejected)
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer

// ── Selectors ────────────────────────────────────────────────────────────────
export const selectAuth = (state) => state.auth
export const selectIsAuthenticated = (state) => !!state.auth.token
export const selectUser = (state) => state.auth.user