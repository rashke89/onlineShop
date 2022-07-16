import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cart: []
	},
	reducers: {
		addToCart: (state, action) => {
			let newItem = Object.assign({}, action.payload);
			let addedItemIndex;
			let itemAdded = state.cart.find((item, index) => {
				if(item._id === newItem._id) {
					addedItemIndex = index;
					return item;
				}
			});

			if(itemAdded) {
				state.cart[addedItemIndex].count++;
				state.cart[addedItemIndex].totalPrice = state.cart[addedItemIndex].count * state.cart[addedItemIndex].price;
			} else {
				newItem.count = 1;
				newItem.totalPrice = newItem.price;
				state.cart.push(newItem);
			}
		},
		removeItem: (state, action) => {
			let cartCopy = [...state.cart];
			cartCopy.splice(action.payload, 1);
			state.cart = cartCopy;
			localStorage.setItem("shopCart", JSON.stringify(cartCopy));
		},
		handleCount: (state, action) => {
			let cartState = state.cart[action.payload.index];
			let count = action.payload.isIncrement ? cartState.count + 1 : cartState.count - 1;

			state.cart[action.payload.index].count = count < 1 ? 1 : count;
			state.cart[action.payload.index].totalPrice = cartState.count * cartState.price;
		},
		setCart: (state, action) => {
			state.cart = action.payload;
		}
	}
})

export const {addToCart, removeItem, handleCount, setCart} = cartSlice.actions;
export default cartSlice.reducer;