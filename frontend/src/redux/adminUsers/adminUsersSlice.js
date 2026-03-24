import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'

const initialState = {
  users: [],
  total: 0,
  page: 1,
  limit: 20,
  isLoading: false
}

export const fetchUsersAPI = createAsyncThunk(
  'adminUsers/fetchUsersAPI',
  async ({ page = 1, limit = 20, search = '' }) => {
    const response = await authorizedAxiosInstance.get('/users/admin/users', {
      params: { page, limit, search }
    })
    return response.data
  }
)

export const updateUserRoleAPI = createAsyncThunk(
  'adminUsers/updateUserRoleAPI',
  async ({ userId, role }) => {
    const response = await authorizedAxiosInstance.put(`/users/admin/users/${userId}/role`, { role })
    return response.data
  }
)

export const updateUserStatusAPI = createAsyncThunk(
  'adminUsers/updateUserStatusAPI',
  async ({ userId, isActive }) => {
    const response = await authorizedAxiosInstance.put(`/users/admin/users/${userId}/status`, { isActive })
    return response.data
  }
)

export const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAPI.pending, (state) => {
      state.isLoading = true
    }),
    builder.addCase(fetchUsersAPI.fulfilled, (state, action) => {
      state.users = action.payload.users
      state.total = action.payload.total
      state.page = action.payload.page
      state.limit = action.payload.limit
      state.isLoading = false
    }),
    builder.addCase(fetchUsersAPI.rejected, (state) => {
      state.isLoading = false
    }),
    builder.addCase(updateUserRoleAPI.fulfilled, (state, action) => {
      const updatedUser = action.payload.user
      const index = state.users.findIndex(u => u.username === updatedUser.username)
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedUser }
      }
    }),
    builder.addCase(updateUserStatusAPI.fulfilled, (state, action) => {
      const updatedUser = action.payload.user
      const index = state.users.findIndex(u => u.username === updatedUser.username)
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedUser }
      }
    })
  }
})

export const selectAdminUsers = (state) => state.adminUsers.users
export const selectAdminUsersTotal = (state) => state.adminUsers.total
export const selectAdminUsersPage = (state) => state.adminUsers.page
export const selectAdminUsersLimit = (state) => state.adminUsers.limit
export const selectAdminUsersLoading = (state) => state.adminUsers.isLoading

export const adminUsersReducer = adminUsersSlice.reducer
