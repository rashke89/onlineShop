import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import cartSlice from "./cartSlice";
import orderProcessSlice from "./orderProcessSlice";

// store definition (state)
export default configureStore({
    reducer: {
        userStore: userReducer,
        cartStore: cartSlice,
        orderProcessStore: orderProcessSlice
    }
})
