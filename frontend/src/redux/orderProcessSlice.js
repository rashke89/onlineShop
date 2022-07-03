import {createSlice} from "@reduxjs/toolkit";

const orderProcessSlice = createSlice({
	name: 'orderProcess',
	initialState: {
		orderProcess: {
			currentStep: 1,
			stepTwoForm: {

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