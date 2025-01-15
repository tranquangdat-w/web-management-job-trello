import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/boards/${boardId}`)

  return response.data
}

export const updateBoardDetailsAPI = async (boardId, columnOrderIdsData) => {
  const response = await axios.put(`${API_ROOT}/boards/${boardId}`, columnOrderIdsData)

  return response.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/boards/supports/moving_card`, updateData)

  return response.data
}

export const updateColumnDetailsAPI = async (columnId, cardOrderIdsData) => {
  const response = await axios.put(`${API_ROOT}/columns/${columnId}`, cardOrderIdsData)

  return response.data
}

export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/columns/${columnId}`)

  return response.data
}

export const createNewColumnAPI = async (columnData) => {
  const createdNewColumn = await axios.post(`${API_ROOT}/columns`, columnData)

  return createdNewColumn.data
}

export const createNewCardAPI = async (cardData) => {
  const createdNewCard = await axios.post(`${API_ROOT}/cards`, cardData)

  return createdNewCard.data
}

