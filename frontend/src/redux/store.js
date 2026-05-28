import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import createWebStorage from 'redux-persist/es/storage/createWebStorage'
import { combineReducers } from 'redux'

import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import productReducer from './slices/productSlice'
import orderReducer from './slices/orderSlice'

// Safe storage for Vite + Redux Persist
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : {
        getItem: () => Promise.resolve(null),
        setItem: (_key, value) => Promise.resolve(value),
        removeItem: () => Promise.resolve(),
      }

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productReducer,
  orders: orderReducer,
})

// Persist auth and cart across refreshes
const persistConfig = {
  key: 'babafly',
  storage,
  whitelist: ['auth', 'cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
})

export const persistor = persistStore(store)