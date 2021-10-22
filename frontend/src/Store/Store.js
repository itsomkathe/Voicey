import { configureStore } from '@reduxjs/toolkit'
import verify from './VerifySlice';

export const store = configureStore({
  reducer: {
      verify
  },
});