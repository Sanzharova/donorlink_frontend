import axios from 'axios'
import router from '@/router'
import { toastError } from '@/utils/toast'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  withCredentials: true,
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status

    if (status === 401) {
      localStorage.removeItem('accessToken')

      if (router.currentRoute.value.path !== '/login') {
        await router.push('/login')
      }

      return Promise.reject(error)
    }

    let msg = 'Request error'

    if (error.response?.data?.message) msg = error.response.data.message
    else if (error.response?.data?.error) msg = error.response.data.error
    else if (error.message) msg = error.message

    toastError(msg)

    return Promise.reject(error)
  }
)

export default http
