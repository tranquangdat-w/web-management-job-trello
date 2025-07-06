import authorizedAxiosInstance from '~/utils/authorizeAxios'

// Board APIs
export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await authorizedAxiosInstance.put(`/boards/${boardId}`, updateData)
  return response.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await authorizedAxiosInstance.put('/boards/supports/moving_card', updateData)
  return response.data
}

// Column APIs
export const createNewColumnAPI = async (newColumnData) => {
  const response = await authorizedAxiosInstance.post('/columns', newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await authorizedAxiosInstance.put(`/columns/${columnId}`, updateData)
  return response.data
}

export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await authorizedAxiosInstance.delete(`/columns/${columnId}`)
  return response.data
}

// Card APIs
export const createNewCardAPI = async (newCardData) => {
  const response = await authorizedAxiosInstance.post('/cards', newCardData)
  return response.data
}

export const updateCardAPI = async (cardId, updateData) => {
  const response = await authorizedAxiosInstance.put(`/cards/${cardId}`, updateData)
  return response.data
}

export const deleteCardAPI = async (cardId) => {
  const response = await authorizedAxiosInstance.delete(`/cards/${cardId}`)
  return response.data
}

// User APIs
export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post('/users/register', data)
  return response.data
}

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put('/users/verify', data)
  return response.data
}

export const loginUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post('/users/login', data)
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get('/users/refresh_token')
  return response.data
}

