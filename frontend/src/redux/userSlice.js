import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload))
            state.user = action.payload
        },
        removeUser: (state, action) => {
            state.user = {}
            localStorage.removeItem("user")
        },
        getUser: (state, action) => {
            return state.user
        }
    }
})

export const {setUser, removeUser, getUser} = userSlice.actions;
export default userSlice.reducer;
