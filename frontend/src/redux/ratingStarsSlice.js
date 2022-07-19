import {createSlice} from "@reduxjs/toolkit";

const ratingStarsSlice = createSlice({
    name: 'ratingStars',
    initialState: {},

    reducers: {
        setRatingStars:(state,action)=>{
            state.ratingStars = action.payload
            console.log(state.ratingStars, "sdadas")
        }
    }
})

export const {setRatingStars} = ratingStarsSlice.actions;
export default ratingStarsSlice.reducer;