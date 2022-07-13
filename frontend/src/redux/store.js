import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartSlice from "./cartSlice";
import orderProcessSlice from "./orderProcessSlice";
import loaderSlice from "./loaderSlice";

// store definition
export default configureStore({
	reducer: {
		userStore: userReducer,
		cartStore: cartSlice,
		orderProcessStore: orderProcessSlice,
		loaderStore: loaderSlice
	}
})