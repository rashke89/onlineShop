import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';

// store definition (state)
export default configureStore({
    reducer: {
        userStore: userReducer
    }
})
