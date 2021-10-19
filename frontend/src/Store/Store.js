import { configureStore } from '@reduxjs/toolkit'
import auth from './AuthSlice';

export const store = configureStore({
  reducer: {
      auth
  },
})
