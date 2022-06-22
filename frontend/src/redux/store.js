import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import cartSlice from "./cartSlice";
import cookiesSlice from "./cookiesSlice";

// store definition (state)
export default configureStore({
    reducer: {
        userStore: userReducer,
        cartStore: cartSlice,
        cookiesStore: cookiesSlice
    }
})
