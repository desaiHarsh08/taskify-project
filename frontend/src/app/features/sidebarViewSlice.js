import { createSlice } from '@reduxjs/toolkit'

const token = JSON.parse(localStorage.getItem("token")) || null;

const initialState = {
    flag: false,
}

export const sidebarViewSlice = createSlice({
    name: 'sidebarView',
    initialState,
    reducers: {
        setSidebarView: (state, action) => {
            state.flag = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setSidebarView } = sidebarViewSlice.actions

export default sidebarViewSlice.reducer