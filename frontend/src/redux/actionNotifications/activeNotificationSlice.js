import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { INVITATION_STATUS } from '~/utils/constants'
import { sortInvitations } from '~/utils/sortInvitations'

export const getBoardInvitationsAPI = createAsyncThunk(
  'activeNotification/fetchInvitationsAPI',
  async () => {
    const response = await authorizedAxiosInstance.get('/invitations')

    return response.data
  }
)

export const updateInvitationAPI = createAsyncThunk(
  'activeNotifications/updateInvitationAPI',
  // createAsyncThunk must has only 1 argument playload to play data
  async ({ invitationId, status }) => {
    const response = await authorizedAxiosInstance
      .put(`/invitations/${invitationId}`, { status })

    return response.data
  }
)

// Khoi tao Slice trong kho luu tru redux
export const activeNotifications = createSlice({
  name: 'activeNotifications',
  initialState: {
    currentActiveNotifications: null
  },
  reducers: {
    clearCurrentActiveNotifications: (state) => {
      state.currentActiveNotifications = null
    }
  },

  // ExtraReducers: Xu li du lieu bat dong bo api
  extraReducers: (builder) => {
    builder.addCase(getBoardInvitationsAPI.fulfilled, (state, action) => {
      const listInvitation = action.payload

      sortInvitations(listInvitation)

      state.currentActiveNotifications = listInvitation
    })

    builder.addCase(updateInvitationAPI.fulfilled, (state, action) => {
      const updatedInvitation = action.payload

      const notification = state.currentActiveNotifications.find(
        n => n._id === updatedInvitation._id
      )

      if (notification) {
        notification.boardInvitation.status = updatedInvitation.boardInvitation.status
      }

      sortInvitations(state.currentActiveNotifications)

      if (notification.boardInvitation.status == INVITATION_STATUS.ACCEPTED) {
        toast.success(`You have joined in the board ${notification.boardTitle}`)
      }
    })

    builder.addCase(updateInvitationAPI.rejected, (state, action) => {
      const invitationIdToDelete = action.meta.arg.invitationId

      for (let i = 0; i < state.currentActiveNotifications.length; i++) {
        if (state.currentActiveNotifications[i]._id === invitationIdToDelete) {
          state.currentActiveNotifications.splice(i, 1)

          break
        }
      }
    })
  }
})

export const { clearCurrentActiveNotifications } = activeNotifications.actions

// Selectors
export const selectCurrentActiveNotifications = (state) => {
  return state.activeNotifications.currentActiveNotifications
}

// export default activeBoardSlice.reducer
export const activeNotificationsReducer = activeNotifications.reducer

