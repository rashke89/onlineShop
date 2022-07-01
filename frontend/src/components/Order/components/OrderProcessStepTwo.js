import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {updateStepTwoForm} from "../../../redux/orderProcessSlice";

function OrderProcessStepTwo() {
    const {form, isSubmit} = useSelector(state => state.orderProcessStore.orderProcess.stepTwo);
    const {user} = useSelector(state => state.userStore);
    const dispatch = useDispatch();


    useEffect(() => {
        let userObj = {
            email: user?.email,
            firstName: user?.firstName,
            lastName: user?.lastName,
            address: user?.address,
            city: user?.city,
            postCode: user?.postCode,
            phoneNumber: user?.phoneNumber,
        }
        dispatch(updateStepTwoForm({...form, ...userObj}))
    }, [])

    useEffect(() => {

    }, [isSubmit])
    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleFormChange = e => {
        let newForm = {...form};
        newForm[e.target.id] = e.target.value;
        dispatch(updateStepTwoForm(newForm));
    };

    const handleCheckboxChange = e => {
        console.log(e);
        let newForm = {...form};
        newForm[e.target.id] = e.target.checked;
        dispatch(updateStepTwoForm(newForm));
    }

    const errorMsgLayout = (formProperty) => {
        return isSubmit && !formProperty ? <small id="emailHelp" className="form-text text-danger d-block">Required field</small> : null;
    }
    return (
        <>
            { form && <form onSubmit={handleSubmit}>
                <div className="row order-process-step-two-wrapper">
                    <div className="col-md-6">
                        <div className="mb-3 form-group">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email"
                                   className="form-control"
                                   id="email"
                                   aria-describedby="emailHelp"
                                   defaultValue={form?.email}
                                   onChange={e => handleFormChange(e)}/>
                            {errorMsgLayout(form?.email)}
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input type="text" className="form-control" id="firstName" defaultValue={form?.firstName} onChange={e => handleFormChange(e)}/>
                            {errorMsgLayout(form?.firstName)}
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="lastName" className="form-label">Last name</label>
                            <input type="text" className="form-control" id="lastName" defaultValue={form?.lastName} onChange={e => handleFormChange(e)}/>
                            {errorMsgLayout(form?.lastName)}
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address" defaultValue={form?.address} onChange={e => handleFormChange(e)}/>
                            {errorMsgLayout(form?.address)}
                        </div>

                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="terms" onChange={e => handleCheckboxChange(e)}/>
                            <label className="form-check-label" htmlFor="terms">Accept terms</label>
                            {errorMsgLayout(form?.terms)}
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="conditions" onChange={e => handleCheckboxChange(e)}/>
                            <label className="form-check-label" htmlFor="conditions">Accept conditions</label>
                            {errorMsgLayout(form?.conditions)}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3 form-group">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" className="form-control" id="city" defaultValue={form?.city} onChange={e => handleFormChange(e)}/>
                            {errorMsgLayout(form?.city)}
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="postCode" className="form-label">Post code</label>
                            <input type="text" className="form-control" id="postCode" defaultValue={form?.postCode} onChange={e => handleFormChange(e)}/>
                            {errorMsgLayout(form?.postCode)}
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                            <input type="text" className="form-control" id="phoneNumber" defaultValue={form?.phoneNumber} onChange={e => handleFormChange(e)}/>
                            {errorMsgLayout(form?.phoneNumber)}
                        </div>
                    </div>
                </div>

            </form> }

        </>
    )
}

export default OrderProcessStepTwo;
