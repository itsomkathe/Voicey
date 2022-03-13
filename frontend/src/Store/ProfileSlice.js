import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    username: null,
    phone: null,
    id: null,
    picture: null,
    isAuth: false
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
      setProfile: (state, action)=>{
        state.name = action.payload.name;
        state.username = action.payload.username;
        state.phone = action.payload.phone;
        state.id = action.payload._id;
        state.picture = action.payload.picture ? `${process.env.REACT_APP_BACKEND_URL}${action.payload.picture}`: null;
        state.isAuth = action.payload.isAuth;
      },
      setIsAuth: (state, action)=>{
        state.isAuth = action.payload.isAuth;
      }
    },
});

export const { setProfile, setIsAuth } = profileSlice.actions;
export default profileSlice.reducer;