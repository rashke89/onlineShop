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
                if (item._id === newItem._id) {
                    foundItemIndex = index;
                    return item;
                }
            });

            if (foundItem) {
                state.cart[foundItemIndex].count = state.cart[foundItemIndex].count + 1;
                state.cart[foundItemIndex].totalPrice = state.cart[foundItemIndex].count * state.cart[foundItemIndex].price
            } else {
                newItem.count = 1;
                newItem.totalPrice = newItem.price;
                state.cart.push(newItem);
            }
        },
        removeItem: (state,
                        action) => {
            let cartCopy = [...state.cart];
            cartCopy.splice(action.payload, 1);
            state.cart = cartCopy;
            localStorage.setItem("shopCart", JSON.stringify(cartCopy))
        },
        handleCount: (state,
        action) => {
            let product = state.cart[action.payload.index];
            let count = action.payload.isIncrement ? product.count + 1 : product.count -1;
            state.cart[action.payload.index].count = count < 1 ? 1 : count;
            state.cart[action.payload.index].totalPrice = product.count * product.price
        },
        setCart: (state,
        action) => {
            state.cart = action.payload;
        }
    }
});

export const {addToCart, removeItem, handleCount, setCart} = cartSlice.actions;
export default cartSlice.reducer;
