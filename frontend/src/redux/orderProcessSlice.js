import {createSlice} from "@reduxjs/toolkit";


const orderProcessSlice=createSlice({
    name: 'orderProcess',
    initialState:{
        orderProcess:{
            currentStep:1,
            stepOne:{
                isSubmit: false
            },
            stepTwo:{
                    email: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    city: '',
                    postCode: '',
                    phoneNumber: '',
                    terms:'',
                    conditions:''

            },
            stepThree:{

            }
        }
    },

    reducers:{
        //actions
        handleCurrentStep:(state,action)=>{
            state.orderProcess.currentStep=action.payload;
        }

    }
});


export const {handleCurrentStep}=orderProcessSlice.actions;
export default orderProcessSlice.reducer;