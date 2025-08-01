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
    currentActiveCard: null
  },

  reducers: {
    updateActiveCard: (state, action) => {
      const fullCard = action.payload
      state.currentActiveCard = fullCard
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAndSetActiveCard.fulfilled, (state, action) => {
      let card = action.payload

      state.currentActiveCard = card
    })
  }
})

export const activeCardReducer = activeCardSlice.reducer

export const { updateActiveCard } = activeCardSlice.actions

export const selectCurrentCard = (state) => state.activeCard.currentActiveCard
