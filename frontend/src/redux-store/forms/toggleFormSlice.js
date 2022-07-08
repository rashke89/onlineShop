import { createSlice } from '@reduxjs/toolkit';

const toggleFormSlice = createSlice({
    name: 'toggle form',
    initialState: {
        goToLoginForm: true
    },
    reducers: {
        goToLogin(state, action) {
            state.goToLoginForm = true;
        },
        goToRegister(state, action) {
            state.goToLoginForm = false;
        },
        toggleForm(state, action) {
            state.goToLoginForm = !state.goToLoginForm;
        }
    }

});

export const { goToLogin, goToRegister, toggleForm } = toggleFormSlice.actions;
export default toggleFormSlice.reducer;