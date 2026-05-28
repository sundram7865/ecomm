import axiosInstance from './axiosInstance'

const authService = {
  login: async (credentials) => {
    const { data } = await axiosInstance.post('/auth/login', credentials)
    return data // { token, user }
  },

  register: async (userData) => {
    const { data } = await axiosInstance.post('/auth/register', userData)
    return data // { token, user }
  },

  getMe: async () => {
    const { data } = await axiosInstance.get('/auth/me')
    return data.user
  },
}

export default authService