import axios from 'axios'
import { toast, Bounce } from 'react-toastify'
import { intercepterLoadingElements } from '~/utils/formatters'
import { logOutUser, selectCurrentUser } from '~/redux/user/userSlice'
import localStorage from 'redux-persist/es/storage'
import { refeshTokenAPI } from '~/apis'

let axiosReduxStore

export const injectStore = (mainStore) => { axiosReduxStore = mainStore}

let authorizedAxiosInstance = axios.create()

// Thoi gian doi req cua server
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

authorizedAxiosInstance.defaults.withCredentials = true

// Add a request interceptor

authorizedAxiosInstance.interceptors.request.use(async (config) => {
  // Do something before request is sent
  intercepterLoadingElements(true)

  const isRefreshTokenRequest = config.url.includes('/refesh_token')

  if (isRefreshTokenRequest) {
    // Sử dụng refreshToken nếu là API refresh token
    const refeshToken = await localStorage.getItem('refeshToken')
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${refeshToken}`
    }
  } else {
    // Sử dụng accessToken cho các API khác
    const accessToken = await localStorage.getItem('accessToken')
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`
    }
  }

  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

let refeshTokenPromise = null

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  //
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

  // 401 thi se dang xuat user ra luon
  if (error.response?.status === 401) {
    let user = selectCurrentUser(axiosReduxStore.getState())
    axiosReduxStore.dispatch(logOutUser(user))
  }

  // 410 tu backend thi goi api refeshToken
  const originalRequest = error.config
  if (error.response?.status === 410 && originalRequest) {
    // Goi 1 lan duy nhat tai moi thoi diem
    originalRequest._retry = true

    if (!refeshTokenPromise) {
      refeshTokenPromise = refeshTokenAPI()
        .then(newAccessToken => {
          return newAccessToken
        })
        .catch((_error) => {
          // Log out if error occer when call refeshToken
          let user = selectCurrentUser(axiosReduxStore.getState())
          axiosReduxStore.dispatch(logOutUser(user))

          return Promise.reject(_error)
        })
        .finally(() => {
          refeshTokenPromise = null
        })
    }

    // Goi tiep API neu ma refesh token thanh cong
    return refeshTokenPromise.then(async accessToken => {
      // Luu lai accessToken
      await localStorage.setItem('accessToken', accessToken)

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

