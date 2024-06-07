import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/persistance";

const initialState = {
    isLoading: false,
    loggedIn: false,
    error: null,
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // sign User
        signUserStart: (state) => {
            state.isLoading = true;
        },
        signUserSuccess: (state, action) => {
            state.loggedIn = true;
            state.isLoading = false;
            state.user = action.payload;
            setItem("token", action.payload.token)  // function coming  from hlpers
        },
        signUserFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logOutUser: (state) => {
            state.user = null
            state.loggedIn = false
        }
    },
});

export const { signUserStart, signUserSuccess, signUserFailure, logOutUser } = authSlice.actions;
export default authSlice.reducer;
