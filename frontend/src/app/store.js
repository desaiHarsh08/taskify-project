import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/authSlice";
import sidebarViewReducer from "./features/sidebarViewSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebarView: sidebarViewReducer,
    },
})