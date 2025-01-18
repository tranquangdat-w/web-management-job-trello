import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'

// Hàm dùng token cho các request cần authentication
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/boards/${boardId}`)

  return response.data
}

export const updateBoardDetailsAPI = async (boardId, columnOrderIdsData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/boards/${boardId}`, columnOrderIdsData)

  return response.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/boards/supports/moving_card`, updateData)

  return response.data
}

export const updateColumnDetailsAPI = async (columnId, cardOrderIdsData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/columns/${columnId}`, cardOrderIdsData)

  return response.data
}

export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/columns/${columnId}`)

  return response.data
}

export const createNewColumnAPI = async (columnData) => {
  const createdNewColumn = await authorizedAxiosInstance.post(`${API_ROOT}/columns`, columnData)

  return createdNewColumn.data
}

export const createNewCardAPI = async (cardData) => {
  const createdNewCard = await authorizedAxiosInstance.post(`${API_ROOT}/cards`, cardData)

  return createdNewCard.data
}

export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/users/register`, data)
  toast.success('Account created! Please check email and verify your account', { theme: 'colored' })

  return response.data
}

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/users/verify`, data)
  toast.success('Account verified successfully!', { theme: 'colored' })

  return response.data
}

export const refeshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/users/refesh_token`)

  return response.data
}

export const deleteCardAPI = async (cardId, column_data) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/cards/${cardId}`, { data: column_data })

  return response.data
}

export const updatePasswordAPI = async (passwordData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/users/change_password`, passwordData)
  toast.success('Password change successfully', { theme: 'colored' })

  return response.data
}

