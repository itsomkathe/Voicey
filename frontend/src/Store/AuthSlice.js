import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    password: null,
    name: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setGlobalUsername: (state, action)=>{
            state.username = action.payload;
        },
        setGlobalPassword: (state, action)=>{
            state.password = action.payload;
        },
        setGlobalName: (state, action)=>{
            state.name = action.payload;
        }
    },
});

export const { setGlobalName, setGlobalPassword, setGlobalUsername } = authSlice.actions;

export default authSlice.reducer;