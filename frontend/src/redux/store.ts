import { configureStore } from '@reduxjs/toolkit'
import coinSlice from '../feature/coin/coinSlice'

export const store = configureStore({
  reducer: {
    coin: coinSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch