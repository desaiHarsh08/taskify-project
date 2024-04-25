import { createSlice } from '@reduxjs/toolkit'

const token = JSON.parse(localStorage.getItem("token")) || null;

const initialState = {
    auth: token,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthentication: (state, action) => {
            const {accessToken, refreshToken, roles} = action.payload;
            console.log(accessToken, refreshToken);
            state.auth = {accessToken, refreshToken};
            localStorage.setItem("token", JSON.stringify({accessToken, refreshToken, roles}));
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAuthentication } = authSlice.actions

export default authSlice.reducer