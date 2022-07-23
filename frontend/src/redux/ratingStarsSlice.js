import {createSlice} from "@reduxjs/toolkit";

const ratingStarsSlice = createSlice({
    name: 'ratingStars',
    initialState: {},

    reducers: {
        setRatingStars:(state,action)=>{
            state.ratingStars = action.payload
            console.log(state.ratingStars, "sdadas")
        },
        flg:(state,action)=>{
            state.flg = action.payload + new Date().getTime()
            console.log(state.flg, "flg")
        }
    }
})

export const {setRatingStars, flg} = ratingStarsSlice.actions;
export default ratingStarsSlice.reducer;
