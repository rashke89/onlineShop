import { configureStore } from "@reduxjs/toolkit";
import userReducer from './users/userSlice';
import toggleForm from './forms/toggleFormSlice';
import cartReducer from './cart/cartSlice';
import orderProcessSlice from "./cart/orderProcessSlice";
import loaderSlice from "./loader/loaderSlice";

export default configureStore({
    reducer: {
        userStore: userReducer,
        toggleFormStore: toggleForm,
        cartStore: cartReducer,
        orderProcessStore: orderProcessSlice,
        loaderStore: loaderSlice
    }
});