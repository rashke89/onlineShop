import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import cartSlice from "./cartSlice";
import orderProcessSlice from "./orderProcessSlice";
import loaderSlice from "./loaderSlice";
import currencySlice from "./currencySlice";
import ratingStarsSlice from "./ratingStarsSlice";

// store definition (state)
export default configureStore({
    reducer: {
        userStore: userReducer,
        cartStore: cartSlice,
        orderProcessStore: orderProcessSlice,
        loaderStore: loaderSlice,
        currencyStore: currencySlice,
        ratingStarsStore: ratingStarsSlice
    }
})
