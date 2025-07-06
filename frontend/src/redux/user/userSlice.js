import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'

// Khoi tao gia tri State cua slice trong redux
const initialState = {
  currentUser: null
}

export const loginUserAPI = createAsyncThunk(
  'users/loginUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post('/users/login', data)

    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'users/logoutUserAPI',
  async () => {
    const response = await authorizedAxiosInstance.delete('/users/logout')

    return response.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'users/updateUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.put('/users/update', data)

    return response.data
  }
)
// Khoi tao slice trong kho luu tru redux
export const userSlice = createSlice({
  name: 'user',
  initialState,

  // ExtraReducers: Xu li du lieu bat dong bo api
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      let user = action.payload // respone.data khi ma api duoc goi thanh cong

      // Same with set State when call api
      state.currentUser = user
    }),
    builder.addCase(logoutUserAPI.fulfilled, (state, action) => {

      state.currentUser = null
    }),
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      let user = action.payload

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

