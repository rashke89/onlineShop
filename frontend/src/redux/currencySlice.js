import { createSlice } from '@reduxjs/toolkit';


const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        currency: localStorage.Currency?  localStorage.Currency  : "USD"
    },
    reducers: {
        //action
        setCurrency: (state,
                 action ) => {
            state.currency = action.payload;
            console.log(state.currency, "oz ssas");
        },

    },
});

export const {setCurrency} = currencySlice.actions;
export default currencySlice.reducer;