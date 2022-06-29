import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {handleCurrentStep} from "../../../../redux/orderProcessSlice";



const StepperFooter = () => {

    const {currentStep}=useSelector(state=>state.orderProcessStore.orderProcess);
    const dispatch=useDispatch();

    useEffect(() => {

        console.log(currentStep);
    }, [currentStep]);



    const handleOrderStep=(number)=>{
        dispatch(handleCurrentStep(currentStep+number))
    }
    return (
        <div className={`w-100 d-flex justify-content-${currentStep>1? "between":"end"} mt-3`}>
            {currentStep>1? <button className="btn btn-secondary" onClick={(event)=>handleOrderStep(-1)}>Previous step</button>:null}
            {currentStep<=3?  <button className="btn btn-secondary" onClick={(event)=>handleOrderStep(1)}>{currentStep==3?"Pay":"Next step"}</button> :null }
        </div>
    );
};

export default StepperFooter;
