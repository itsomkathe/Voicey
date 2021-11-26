import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    username: null,
    phone: null,
    _id: null,
    picture: null
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
      setProfile: (state, action)=>{
        state = {...action.payload};
      }
    },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;