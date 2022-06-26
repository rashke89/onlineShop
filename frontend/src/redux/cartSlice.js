import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {

        addToCart: (state, action) => {

            let newItem = action.payload;
            let foundItemIndex;

            //compare new product(action.payload) with products in cartSummary
            let foundItem = state.cart.find((item,index) => {
                if (item._id === newItem._id) {
                    foundItemIndex=index;
                    //check if item has property "count"
                    if(!item.hasOwnProperty("count")){
                        item.count=1;
                    }
                    return item;
                }
            })

            //if product already in cart, update product count by index
            if (foundItem){
                state.cart[foundItemIndex].count+=1;
                console.log(state.cart[foundItemIndex]);
                //if product new in cart, add to redux store "cart"
            }else{
                state.cart.push(newItem)
            }


        }
    }
})

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;