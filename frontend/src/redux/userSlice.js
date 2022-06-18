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
            console.log(action.payload);
            // action.payload = arg from setUser act
            state.user = action.payload;
        },
    },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;