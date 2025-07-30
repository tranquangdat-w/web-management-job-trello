import { createSlice } from '@reduxjs/toolkit'

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
  }
})

export const activeCardReducer = activeCardSlice.reducer

export const { updateActiveCard } = activeCardSlice.actions

export const selectCurrentCard = (state) => state.activeCard.currentActiveCard
