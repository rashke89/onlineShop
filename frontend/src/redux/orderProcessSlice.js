import { createSlice } from '@reduxjs/toolkit';

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

            }
        }
    },
    reducers: {
        //action
        handleCurrentStep: (state,
        action) => {
            state.orderProcess.currentStep = action.payload;
        },
        updateStepTwoForm: (state,
        action) => {
            let payload = action.payload;

            state.orderProcess.stepTwo.isValid = !Object.values(payload).some(item => !item);
            state.orderProcess.stepTwo.form = payload;
        },
        stepTwoIsSubmitted: (state, action) => {
            state.orderProcess.stepTwo.isSubmit = true;
        }
    },
});

export const {handleCurrentStep, updateStepTwoForm, stepTwoIsSubmitted} = orderProcessSlice.actions;
export default orderProcessSlice.reducer;
