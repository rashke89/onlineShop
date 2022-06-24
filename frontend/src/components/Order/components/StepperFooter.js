import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {handleCurrentStep} from "../../../redux/orderProcessSlice";

function StepperFooter() {
    const {currentStep} = useSelector(state => state.orderProcessStore.orderProcess);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(currentStep);
    }, [currentStep]);

    const handleCurState = (number) => {
        dispatch(handleCurrentStep(currentStep + number))
    }

    return (
        <div className="w-100 d-flex justify-content-between my-5">
            {currentStep > 1 && <button className="btn btn-primary" onClick={e => handleCurState(-1)}>prev</button>}
            <button className="btn btn-primary" onClick={e => handleCurState(1)}>next</button>
        </div>
    )
}

export default StepperFooter;
