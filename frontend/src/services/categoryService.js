import axiosInstance from './axiosInstance'

const categoryService = {
  getAll: async () => {
    const { data } = await axiosInstance.get('/categories')
    return data
  },
}

export default categoryService