import {createSlice} from "@reduxjs/toolkit";

const ratingStarsSlice = createSlice({
    name: 'ratingStars',
    initialState: {},

    reducers: {
        setRatingStars:(state,action)=>{
            state.ratingStars = action.payload
            console.log(state.ratingStars, "sdadas")
        },
        flag:(state,action)=>{
            state.flag = action.payload + new Date().getTime();
            console.log(state.flag, "flag")
        }
    }
})

export const {setRatingStars,flag} = ratingStarsSlice.actions;
export default ratingStarsSlice.reducer;