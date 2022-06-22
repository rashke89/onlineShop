import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    acceptCookies: false
}

const cookiesSlice = createSlice({
  name: "cookies",
  initialState,
    reducers: {
        setAcceptCookies: (state, action) => {
            state.acceptCookies = true
      }
  }
});

export const {setAcceptCookies} = cookiesSlice.actions

export default cookiesSlice.reducer