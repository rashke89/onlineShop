import { createSlice } from "@reduxjs/toolkit";

const orderProcessSlice = createSlice({
    name: 'orderProcess',
    initialState: {
        orderProcess: {
            currentStep: 1,
            stepOne: {
                isSubmit: false
            },
            stepTwo: {
                form: {
                    email: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    city: '',
                    postCode: '',
                    phoneNumber: '',
                    terms: false,
                    conditions: false
                },
                isSubmit: false,
                isValid: false
            },
            stepTree: {
                isSubmit: false
            }
        }
    },
    reducers: {
        handleCurrentStep: (state, action) => {
            state.orderProcess.currentStep = state.orderProcess.currentStep + action.payload;
        },
        updateStepTwoForm: (state, action) => {
            let form = action.payload;

            state.orderProcess.stepTwo.form = form;
            state.orderProcess.stepTwo.isValid = !Object.values(form).some(property => !property)
        },
        stepTwoIsSubmitted: (state, action) => {
            state.orderProcess.stepTwo.isSubmit = action.payload;
        }
    }
});

export const { handleCurrentStep, updateStepTwoForm, stepTwoIsSubmitted } = orderProcessSlice.actions;
export default orderProcessSlice.reducer;