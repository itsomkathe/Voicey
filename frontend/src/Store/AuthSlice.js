import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: null,
    otp: {
      phone:null,
      hash:null
    }
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setAuth: (state, action) => {
        
      },
      setOTP: (state, action) => {
        const {hash, phone} = action.payload;
        state.otp.phone = phone;
        state.otp.hash = hash;
      }
    },
});

export const { setOTP, setAuth } = authSlice.actions;

export default authSlice.reducer;
