import { createSlice } from "@reduxjs/toolkit";
import { localStorageConfig } from "../../config/localStorageConfig";

const cartSlice = createSlice({
    name: localStorageConfig.CART,
    initialState: {
        cart: [],
        isAddedNew: false,
        isAddedOld: false
    },
    reducers: {
        addItem: (state, action) => {
            let AddedItem = action.payload;
            let doubleItemIndex;

            // * map trought cart and return item if already exist
            let doubleItem = state.cart.find((item, index) => {
                if (item.id === AddedItem.id) {
                    doubleItemIndex = index;
                    return item;
                }
            });

            // * if item does not exist push new item else increase counter for existing item
            if (!doubleItem) {
                AddedItem.count = 1;
                AddedItem.totalPrice = AddedItem.price;
                state.cart.push(AddedItem);
                state.isAddedNew = true;
            } else {
                state.cart[doubleItemIndex].count++;
                state.cart[doubleItemIndex].totalPrice = state.cart[doubleItemIndex].price * state.cart[doubleItemIndex].count;
                state.isAddedOld = true;
            }
        },
        removeItem: (state, action) => {
            state.cart.splice(action.payload, 1);
        },
        handleCount: (state, action) => {
            const itemInfo = action.payload;
            // * 1. NACIN KOJI RADI
            // if(itemInfo.isIncrease === false && state.cart[itemInfo.index].count === 1){
            // // empty
            // } else {
            //     itemInfo.isIncrease ? state.cart[itemInfo.index].count++ : state.cart[itemInfo.index].count--;
            // }
            // * 2. NACIN KOJI RADI
            // if (!itemInfo.isIncrease === false && state.cart[itemInfo.index].count >= 1) {
            //     itemInfo.isIncrease ? state.cart[itemInfo.index].count++ : state.cart[itemInfo.index].count--;
            // } else if (itemInfo.isIncrease === false && state.cart[itemInfo.index].count !== 1) {
            //     itemInfo.isIncrease ? state.cart[itemInfo.index].count++ : state.cart[itemInfo.index].count--;
            // }
            // * 3 NACIN KOJI RADI
            let count = itemInfo.isIncrease ? state.cart[itemInfo.index].count + 1 : state.cart[itemInfo.index].count - 1;
            state.cart[itemInfo.index].count = count < 1 ? 1 : count;
            state.cart[itemInfo.index].totalPrice = state.cart[itemInfo.index].price * state.cart[itemInfo.index].count;
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        addedNewFalse: (state, action) => {
            state.isAddedNew = false;
        },
        addedOldFalse: (state, aciton) => {
            state.isAddedOld = false
        }
    }
});

export const { addItem, removeItem, handleCount, setCart, addedNewFalse, addedOldFalse } = cartSlice.actions;
export default cartSlice.reducer;