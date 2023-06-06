
import { toastError, toastWarning } from '@/utils';
import axios, { AxiosError } from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : window.location.origin + '/api'
})

axiosInstance.interceptors.response.use(
  res => {
    return res
  },
  (err: AxiosError) => {

    if (err.response?.status === 401) {
      toastWarning('Session expired, please login again')
      window.location.href = '/login'
    }

    if (err.response?.status === 403) {
      toastError('You are not authorized to access this page')
      window.location.href = '/'
    }

    if (err.response?.status === 404) {
      toastError('Page not found')
      window.location.href = '/'
    }

    if (err.response?.status === 500) {
      toastError('Something went wrong')
      window.location.href = '/'
    }

    return Promise.reject(err)
  }
)
export default axiosInstance
