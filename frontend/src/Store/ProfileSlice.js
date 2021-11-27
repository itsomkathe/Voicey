import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    username: null,
    phone: null,
    _id: null,
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
        state._id = action.payload._id;
        state.picture = action.payload.picture;
        state.isAuth = action.payload.isAuth;
      }
    },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;