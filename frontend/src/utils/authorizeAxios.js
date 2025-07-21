import axios from 'axios'
import { toast, Bounce } from 'react-toastify'
import { intercepterLoadingElements } from '~/utils/formatters'
import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice'
import { refreshTokenAPI } from '~/apis'
import { API_ROOT, API_VERSION } from './constants'

let axiosReduxStore

export const injectStore = (mainStore) => { axiosReduxStore = mainStore}

let authorizedAxiosInstance = axios.create({
  baseURL: `${API_ROOT}/${API_VERSION}`
})

// Thoi gian doi req cua server
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

// Tự động đính kèm cookie vào trong request
authorizedAxiosInstance.defaults.withCredentials = true

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use(async (config) => {
  // Không cho bấm khi mà bấm nút addCard hoặc add cột
  // để tránh bị gọi api 2 lần.
  intercepterLoadingElements(true)

  return config
}, (error) => {
  return Promise.reject(error)
})

let refeshTokenPromise = null

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  // Cho bấm trở lại.
  intercepterLoadingElements(false)
  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  // Cho phép bấm trở lại.
  intercepterLoadingElements(false)

  let errorMessage = error?.message

  if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }

  // 401 thi se dang xuat user ra luon
  if (error.response?.status === 401) {
    let user = selectCurrentUser(axiosReduxStore.getState())
    axiosReduxStore.dispatch(logoutUserAPI(user))
  }

  // 410 GONE tu backend thi goi api refeshToken
  const originalRequest = error.config
  if (error.response?.status === 410 && originalRequest) {

    // Goi 1 lan duy nhat tai moi thoi diem
    originalRequest._retry = true

    if (!refeshTokenPromise) {
      refeshTokenPromise = refreshTokenAPI()
        .then(newAccessToken => {
          return newAccessToken
        })
        .catch((error) => {
          // Log out if error occer when call refeshToken
          axiosReduxStore.dispatch(logoutUserAPI())

          return Promise.reject(error)
        })
        .finally(() => {
          refeshTokenPromise = null
        })
    }

    // Goi tiep API neu ma refesh token thanh cong
    return refeshTokenPromise.then(async () => {
      // Luu lai accessToken

      return authorizedAxiosInstance(originalRequest)
    })
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
  }

  return Promise.reject(error)
})

export default authorizedAxiosInstance

