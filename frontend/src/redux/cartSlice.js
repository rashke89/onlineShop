import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cart: []
	},
	reducers: {
		addToCart: (state, action) => {
			let newItem = action.payload;
			let addedItemIndex;
			let itemAdded = state.cart.find((item, index) => {
				if(item._id === newItem._id) {

					if(!item.hasOwnProperty("count")) {
						item.count = 1;
					}

					addedItemIndex = index;
					return item;
				}
			});

			if(itemAdded) {
				state.cart[addedItemIndex].count++;
			} else {
				state.cart.push(newItem);
			}
		}
	}
})

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;