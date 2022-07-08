import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateStepTwoForm } from '../../../redux-store/cart/orderProcessSlice';

function OrderProcessStepTwo() {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userStore);
    const { form } = useSelector(state => state.orderProcessStore.orderProcess.stepTwo);
    const stepTwoIsSubmit = useSelector(state => state.orderProcessStore.orderProcess.stepTwo.isSubmit);

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
        dispatch(updateStepTwoForm({ ...form, ...userObj }));
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
    }

    const handleInputFields = (e) => {
        let newForm = { ...form };
        newForm[e.target.id] = e.target.value;
        dispatch(updateStepTwoForm(newForm));
    }

    const handleCheckboxs = (e) => {
        let newForm = { ...form };
        newForm[e.target.id] = e.target.checked;
        dispatch(updateStepTwoForm(newForm));
    }

    const checkFieldsValidation = (input) => {
        return stepTwoIsSubmit && !input && <small className="form-text text-danger">Required field</small>
    }

    return (
        <>
            {
                form && <form onSubmit={submitForm} className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input onChange={handleInputFields} type="text" className="form-control" id="firstName" defaultValue={form?.firstName} />
                        {checkFieldsValidation(form.firstName)}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input onChange={handleInputFields} type="text" className="form-control" id="lastName" defaultValue={form?.lastName} />
                        {checkFieldsValidation(form.lastName)}
                    </div>
                    <div className="col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input onChange={handleInputFields} type="text" className="form-control" id="address" placeholder="1234 Main St" defaultValue={form?.address} />
                        {checkFieldsValidation(form.address)}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input onChange={handleInputFields} type="email" className="form-control" id="email" defaultValue={form?.email} />
                        {checkFieldsValidation(form.email)}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">City</label>
                        <input onChange={handleInputFields} type="text" className="form-control" id="city" defaultValue={form?.city} />
                        {checkFieldsValidation(form.city)}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                        <input onChange={handleInputFields} type="number" className="form-control" id="phoneNumber" defaultValue={form?.phoneNumber} />
                        {checkFieldsValidation(form.phoneNumber)}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="postCode" className="form-label">Post code</label>
                        <input onChange={handleInputFields} type="text" className="form-control" id="postCode" defaultValue={form?.postCode} />
                        {checkFieldsValidation(form.postCode)}
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input onClick={handleCheckboxs} className="form-check-input" type="checkbox" id="terms" />
                            <label className="form-check-label" htmlFor="terms">
                                Terms
                            </label>
                        </div>
                        {checkFieldsValidation(form.terms)}
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input onClick={handleCheckboxs} className="form-check-input" type="checkbox" id="conditions" />
                            <label className="form-check-label" htmlFor="conditions">
                                Conditions
                            </label>
                        </div>
                        {checkFieldsValidation(form.conditions)}
                    </div>
                </form>
            }
        </>
    )
}

export default OrderProcessStepTwo;

