import { activeBoardReducer } from './activeBoard/activeBoardSlice'

import { userReducer } from './user/userSlice'

import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  // Cho phép lưu trữ các Slice nào
  whitelist: ['user']
}

const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer
})


const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

