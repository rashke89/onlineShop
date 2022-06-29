import React from 'react';
import OrderProcessStepOne from "./components/orderProcessStepOne/OrderProcessStepOne";
import {useSelector} from "react-redux";
import OrderProcessStepTwo from "./components/orderProcessStepTwo/OrderProcessStepTwo";
import StepperFooter from "./components/stepperFooter/StepperFooter";

const OrderProcess = () => {

    const {currentStep}=useSelector(state=>state.orderProcessStore.orderProcess);
    const {cart} = useSelector(state => state.cartStore)

    const orderProcessStepsLayout=()=>{
        if(currentStep===1){
            return <OrderProcessStepOne/>
        }else if(currentStep===2){
            return <OrderProcessStepTwo/>
        }
    }
    return (
        <>
           <div className="col-12">

               {orderProcessStepsLayout()}
               {cart.length? <StepperFooter key={currentStep}/>:null}
           </div>
        </>
    );
};

export default OrderProcess;
