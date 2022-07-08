import { createSlice } from '@reduxjs/toolkit';
import { localStorageConfig } from '../../config/localStorageConfig';

const userSlice = createSlice({
    name: localStorageConfig.USER,
    initialState: {
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state, aciton) => {
            state.user = {};
        }
    }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;