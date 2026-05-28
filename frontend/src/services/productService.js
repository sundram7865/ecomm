import axiosInstance from './axiosInstance'

const LIMIT = 8 // products per page

const productService = {
  getAll: async (filters = {}) => {
    const { metalType, polishType, minPrice, maxPrice, sort, search, categoryId, page = 1 } = filters

    const params = { _page: page, _limit: LIMIT }

    if (metalType)   params.metalType   = metalType
    if (polishType)  params.polishType  = polishType
    if (categoryId)  params.categoryId  = categoryId
    if (search)      params.name_like   = search // json-server supports _like suffix

    // Sorting
    if (sort === 'price_asc')  { params._sort = 'price'; params._order = 'asc' }
    if (sort === 'price_desc') { params._sort = 'price'; params._order = 'desc' }
    if (sort === 'latest')     { params._sort = 'createdAt'; params._order = 'desc' }
    if (sort === 'rating')     { params._sort = 'rating'; params._order = 'desc' }

    const res = await axiosInstance.get('/products', { params })

    // json-server returns total count in X-Total-Count header
    const total = parseInt(res.headers['x-total-count'] || '0', 10)

    // Client-side price filter (json-server doesn't support range natively)
    let data = res.data
    if (minPrice) data = data.filter((p) => p.price >= Number(minPrice))
    if (maxPrice) data = data.filter((p) => p.price <= Number(maxPrice))

    return { data, total }
  },

  getById: async (id) => {
    const { data } = await axiosInstance.get(`/products/${id}`)
    return data
  },

  getFeatured: async () => {
    const { data } = await axiosInstance.get('/products', { params: { isFeatured: true, _limit: 6 } })
    return data
  },

  getLatest: async () => {
    const { data } = await axiosInstance.get('/products', {
      params: { isLatest: true, _limit: 4, _sort: 'createdAt', _order: 'desc' },
    })
    return data
  },

  getByCategory: async (categoryId) => {
    const { data } = await axiosInstance.get('/products', { params: { categoryId } })
    return data
  },
}

export default productService