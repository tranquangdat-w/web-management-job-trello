import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'

export const fetchAndSetActiveCard = createAsyncThunk(
  'activeCard/fetchCardAPI',
  async (cardId) => {
    const response = await authorizedAxiosInstance
      .get(`/cards/${cardId}`)

    return response.data
  }
)

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState: {
    currentActiveCard: null,
    isDisplay: false
  },

  reducers: {
    updateActiveCard: (state, action) => {
      const fullCard = action.payload

      if (!state.isDisplay) {
        state.currentActiveCard = null
        return
      }

      state.currentActiveCard = fullCard
    },
    updateIsDisplayCard: (state, action) => {
      const isDisplayCard = action.payload

      state.isDisplay = isDisplayCard
    },
    clearActiveCard: (state) => {
      state.currentActiveCard = null

      state.isDisplay = false
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchAndSetActiveCard.fulfilled, (state, action) => {
      let card = action.payload

      state.currentActiveCard = card

      state.isDisplay = true
    })
  }
})

export const activeCardReducer = activeCardSlice.reducer

export const {
  updateActiveCard,
  updateIsDisplayCard,
  clearActiveCard
} = activeCardSlice.actions

export const selectCurrentCard = (state) => state.activeCard.currentActiveCard

export const selectIsDisPlayActiveCard = (state) => state.activeCard.isDisplay
