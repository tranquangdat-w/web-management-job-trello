import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'

// Khoi tao gia tri State cua slice trong redux
const initialState = {
  currentUser: null
}

export const loginUserAPI = createAsyncThunk(
  'users/loginUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/users/login`, data)

    const { accessToken, refeshToken } = response.data

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refeshToken', refeshToken)

    return response.data
  }
)

// Khoi tao slice trong kho luu tru redux
export const userSlice = createSlice({
  name: 'user',
  initialState,

  // Xu li du lieu dong bo
  reducers: {
    logOutUser: (state) => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refeshToken')

      state.currentUser = null
    }
  },
  // ExtraReducers: Xu li du lieu bat dong bo api
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      let user = action.payload // respone.data khi ma api duoc goi thanh cong

      // Same with set State when call api
      state.currentUser = user
    })
  }

})


// Selectors
export const selectCurrentUser = (state) => {
  // State.nameslice.
  return state.user.currentUser
}

export const userReducer = userSlice.reducer

export const { logOutUser } = userSlice.actions

