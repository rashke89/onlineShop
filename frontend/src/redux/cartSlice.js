import {createSlice} from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state,
                    action) => {
            let newItem = Object.assign({}, action.payload);
            let foundItemIndex;
            // TODO: id -> _id
            let foundItem = state.cart.find((item, index) => {
                if (item.id === newItem.id) {
                    foundItemIndex = index;
                    return item;
                }
            });

            if (foundItem) {
                state.cart[foundItemIndex].count = state.cart[foundItemIndex].count + 1;
            } else {
                newItem.count = 1;
                state.cart.push(newItem);
            }
        },
        removeItem: (state,
                        action) => {
            state.cart.splice(action.payload, 1)
        },
        handleCount: (state,
        action) => {
            state.cart[action.payload.index].count = action.payload.isIncrement ? state.cart[action.payload.index].count + 1 : state.cart[action.payload.index].count -1;
        }
    }
});

export const {addToCart, removeItem, handleCount} = cartSlice.actions;
export default cartSlice.reducer;
