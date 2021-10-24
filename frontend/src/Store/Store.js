import { configureStore } from '@reduxjs/toolkit'
import verify from './VerifySlice';
import auth from './AuthSlice'

export const store = configureStore({
    reducer: {
      verify, auth
    },
});