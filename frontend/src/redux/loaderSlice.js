import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        show: false
    },
    reducers: {
        //action
        showLoader: (state,
                 action ) => {

            // action.payload = arg from setUser act
            state.show = action.payload;
        },
    },
});

export const {showLoader} = loaderSlice.actions;
export default loaderSlice.reducer;
