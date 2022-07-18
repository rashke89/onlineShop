import {createSlice} from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        categories: []
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        }
    }
})

export const {setCategories} = dashboardSlice.actions
export default dashboardSlice.reducer