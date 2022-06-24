import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice'
import cartSlice from "./cartSlice";

export default configureStore({
    reducer:{
        userStore:userReducer,
        cartStore: cartSlice
    }
})