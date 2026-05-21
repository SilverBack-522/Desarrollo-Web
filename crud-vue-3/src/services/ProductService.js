import axios from 'axios'

const BASE_URL = 'https://6a0e467b1736097c3609a5c6.mockapi.io'
const RESOURCE = `${BASE_URL}/products`

export default {
  getAllProducts() {
    return axios.get(RESOURCE)
  },

  getProductById(id) {
    return axios.get(`${RESOURCE}/${id}`)
  },

  createProduct(data) {
    return axios.post(RESOURCE, data)
  },

  updateProduct(id, data) {
    return axios.put(`${RESOURCE}/${id}`, data)
  },

  deleteProduct(id) {
    return axios.delete(`${RESOURCE}/${id}`)
  }
}