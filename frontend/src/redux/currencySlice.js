import { createSlice } from '@reduxjs/toolkit';

const checkSymbol = ()=>{
    if (localStorage.Currency === "USD"){
        return "$"
    }
    if (localStorage.Currency === "EUR"){
        return "€"
    }
    if (localStorage.Currency === "RSD"){
        return "дин"
    }
    else {
        return "$"
    }
}
const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        currency: localStorage.Currency?  localStorage.Currency  : "USD",
        symbol : checkSymbol()
    },
    reducers: {
        //action
        setCurrency: (state,
                 action ) => {
            state.currency = action.payload;
            if (state.currency === "EUR") {
                state.symbol = "€";
            }
            if (state.currency === "USD") {
                state.symbol = "$";
            }
            if (state.currency === "RSD") {
                state.symbol = "дин";
            }
        }
    },
});

export const {setCurrency} = currencySlice.actions;
export default currencySlice.reducer;