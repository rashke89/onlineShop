import {createSlice} from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, action) => {
            let newItem = action.payload;
            let foundItemIndex;
            // TODO: id -> _id
            let foundItem = state.cart.find((item, index) => {
                if (item.id === newItem.id) {

                    if (!item.hasOwnProperty('count')) {
                        item.count = 1;
                    }
                    foundItemIndex = index;
                    return item;
                }
            });

            if (foundItem) {
                state.cart[foundItemIndex].count = state.cart[foundItemIndex].count + 1;
            } else {
                state.cart.push(newItem)
            }
        }
    }
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;
