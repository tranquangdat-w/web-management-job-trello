import { mapOrder } from '~/utils/sorts'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'

// Khoi tao gia tri State cua slice trong redux
const initialState = {
  currentActiveBoard: null
}

export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await authorizedAxiosInstance .get(`${API_ROOT}/boards/${boardId}`)

    return response.data
  }
)

// Khoi tao slice trong kho luu tru redux
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,

  // Xu li du lieu dong bo
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      const fullBoard = action.payload

      state.currentActiveBoard = fullBoard
    }
  },
  // ExtraReducers: Xu li du lieu bat dong bo api
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      let board = action.payload // respone.data khi ma api duoc goi thanh cong

      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

      board.columns.forEach(column => {
        column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
      })

      // Same with set State when call api
      state.currentActiveBoard = board
    })
  }

})

// Action creators are generated for each case reducer function
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// Selectors
export const selectCurrentActiveBoard = (state) => {
  // State.nameslice.
  return state.activeBoard.currentActiveBoard
}

// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer

