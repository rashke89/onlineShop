import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// store definition
export default configureStore({
	reducer: {
		userStore: userReducer
	}
})