import {createSlice} from "@reduxjs/toolkit";

const orderProcessSlice = createSlice({
	name: 'orderProcess',
	initialState: {
		orderProcess: {
			currentStep: 1,
			stepTwoForm: {
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
			stepThreeForm: {

			}
		}
	},
	reducers: {
		// action
		handleCurrentStep: (state, action) => {
			state.orderProcess.currentStep = action.payload;
		}
	}
});

export const {handleCurrentStep} = orderProcessSlice.actions;
export default orderProcessSlice.reducer;