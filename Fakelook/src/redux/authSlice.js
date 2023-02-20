import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { refreshToken: null, accesToken: null },
    reducers: {
        setCredentials: (state, action) => {
            const { refreshToken, accesToken: accesToken } = action.payload;
            state.refreshToken = refreshToken;
            state.accesToken = accesToken;
        },
        logOut: (state, action) => {
            state.refreshToken = null;
            state.accesToken = null;
        }
    },

});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentRefreshToken = (state) => state.refreshToken;
export const selectCurrentToken = (state) => state.accesToken;