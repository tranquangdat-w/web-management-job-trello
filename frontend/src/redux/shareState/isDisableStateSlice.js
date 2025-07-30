import { createSlice } from '@reduxjs/toolkit'

export const isDisableDragNDropSlice = createSlice({
  name: 'isDisableDragNDrop',
  initialState: {
    value: false
  },
  reducers: {
    setIsDisableDragNDrop: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setIsDisableDragNDrop } = isDisableDragNDropSlice.actions

export const selectIsDisableDragNDrop = (state) => {
  return state.isDisableDragNDrop.value
}

export const isDisableDragNDropReducer = isDisableDragNDropSlice.reducer
