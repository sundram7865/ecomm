import axiosInstance from './axiosInstance'

const orderService = {
  create: async (orderData) => {
    const { data } = await axiosInstance.post('/orders', orderData)
    return data
  },

  getAll: async () => {
    const { data } = await axiosInstance.get('/orders')
    return data
  },

  getById: async (id) => {
    const { data } = await axiosInstance.get(`/orders/${id}`)
    return data
  },
}

export default orderService