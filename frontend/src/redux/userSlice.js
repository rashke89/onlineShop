import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {}
    },
    reducers: {
        //action
        setUser: (state,
                 action ) => {

            // action.payload = arg from setUser act
            state.user = action.payload;
        },
        updateUser: (state, action ) => {
            state.user = action.payload;
        }

    },
});

export const {setUser,updateUser} = userSlice.actions;
export default userSlice.reducer;
