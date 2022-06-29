import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice'
import cartSlice from "./cartSlice";
import orderProcessSlice from "./orderProcessSlice";

export default configureStore({
    reducer:{
        userStore:userReducer,
        cartStore: cartSlice,
        orderProcessStore:orderProcessSlice
    }
})