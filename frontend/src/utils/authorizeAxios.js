import axios from 'axios'
import { toast, Bounce } from 'react-toastify'
import { intercepterLoadingElements } from '~/utils/formatters'

let authorizedAxiosInstance = axios.create()

// Thoi gian doi req cua server
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

authorizedAxiosInstance.defaults.withCredentials = true

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use((config) => {
  // Do something before request is sent
  intercepterLoadingElements(true)

  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  intercepterLoadingElements(false)
  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  intercepterLoadingElements(false)

  let errorMessage = error?.message

  if (error.response?.data?.detail[0]?.msg) {
    errorMessage = error.response?.data?.detail[0]?.msg
  }

  if (error.response?.data?.detail) {
    errorMessage = error.response?.data?.detail
  }

  if (error.response?.status !== 410) {
    toast.error(errorMessage, {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseonhover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce
    })
  } else {
    console.log(error)
  }

  return Promise.reject(error)
})

export default authorizedAxiosInstance

