import {createSlice} from "@reduxjs/toolkit";
import ratingStars from "../components/RatingStars/RatingStars";

const ratingStarsSlice = createSlice({
    name: 'ratingStars',
    initialState: {},

    reducers: {
        setRatingStars:(state,action)=>{
            state.ratingStars = action.payload
            console.log(state.ratingStars)
        }
    }
})

export const {setRatingStars} = ratingStarsSlice.actions;
export default ratingStarsSlice.reducer;