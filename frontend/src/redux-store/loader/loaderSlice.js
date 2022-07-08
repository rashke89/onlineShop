import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        show: false
    },
    reducers: {
        showLoader: (state, action) => {
            state.show = action.payload;
        }
    }
});

export const { showLoader } = loaderSlice.actions;
export default loaderSlice.reducer;