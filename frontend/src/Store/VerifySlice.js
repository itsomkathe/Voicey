import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVerified: false,
    user: null,
    otp: {
      phone:null,
      hash:null
    }
};

export const verifySlice = createSlice({
    name: "verify",
    initialState,
    reducers: {
      setVerify: (state, action)=>{
        state.isVerified = action.payload;
      },
      setOTP: (state, action) => {
        const {hash, phone} = action.payload;
        state.otp.phone = phone;
        state.otp.hash = hash;
      }
    },
});

export const { setOTP, setVerify } = verifySlice.actions;

export default verifySlice.reducer;
