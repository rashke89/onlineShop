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
                    return item;
                }
            })

            //if product already in cart, update product count by index
            if (foundItem){
                state.cart[foundItemIndex].count+=1;

                //if product new in cart, add to redux store "cart"
            }else{
                newItem.count=1;
                state.cart.push(newItem)
            }


        },
        removeItem:(state,action)=>{
            state.cart.splice(action.payload,1);
        },

        handleCount:(state,action)=>{

            state.cart[action.payload.index].count=
                action.payload.isIncrement ?
                state.cart[action.payload.index].count+1
                :state.cart[action.payload.index].count-1;

        }

    }
})

export const {addToCart, removeItem, handleCount} = cartSlice.actions;
export default cartSlice.reducer;