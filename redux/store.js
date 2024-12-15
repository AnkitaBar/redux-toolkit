import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { cmsSlice } from "./cmsSlice";


export const store = configureStore({
    reducer: {
        Auth: authSlice.reducer,
        Cms : cmsSlice.reducer,
        

    }
})
