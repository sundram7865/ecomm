import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #2d2d2d',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#d4a017', secondary: '#0a0a0a' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#0a0a0a' } },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  )
}