import { configureStore } from '@reduxjs/toolkit'
import verify from './VerifySlice';
import auth from './AuthSlice'
import profile from './ProfileSlice';

export const store = configureStore({
    reducer: {
      verify, auth, profile
    },
});