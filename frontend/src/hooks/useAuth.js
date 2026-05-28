import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { loginUser, registerUser, logout, selectAuth, selectIsAuthenticated, selectUser } from '../redux/slices/authSlice'

export default function useAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector(selectAuth)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)

  const login = async (credentials) => {
    const result = await dispatch(loginUser(credentials))
    if (loginUser.fulfilled.match(result)) {
      toast.success(`Welcome back, ${result.payload.user.name}!`)
      navigate('/')
    }
  }

  const register = async (userData) => {
    const result = await dispatch(registerUser(userData))
    if (registerUser.fulfilled.match(result)) {
      toast.success(`Welcome to BabaFly, ${result.payload.user.name}!`)
      navigate('/')
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return { user, isAuthenticated, isLoading, error, login, register, logout: handleLogout }
}