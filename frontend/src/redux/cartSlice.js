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
			} else {
				newItem.count = 1;
				state.cart.push(newItem);
			}
		},
		removeItem: (state, action) => {
			state.cart.splice(action.payload, 1);
		},
		handleCount: (state, action) => {
			let count = state.cart[action.payload.index].count;
			state.cart[action.payload.index].count = action.payload.isIncrement ? count + 1 : count - 1;
		}
	}
})

export const {addToCart, removeItem, handleCount} = cartSlice.actions;
export default cartSlice.reducer;