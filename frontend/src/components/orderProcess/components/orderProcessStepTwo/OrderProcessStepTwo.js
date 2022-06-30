import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateStateTwoForm} from "../../../../redux/orderProcessSlice";

const OrderProcessStepTwo = () => {

    const {form, isSubmit}=useSelector(state=>state.orderProcessStore.orderProcess.stepTwo);
    const {user}=useSelector((state=> state.userStore));
    const dispatch=useDispatch();

    useEffect(()=>{
        console.log("FORM",form);
        console.log("Submit",isSubmit);
        dispatch(updateStateTwoForm({...form,...user}))
    },[])


    useEffect(()=>{

    },[isSubmit])


    const handleFormChange=(event)=>{
        let copyForm={...form};
        copyForm[event.target.name]=event.target.value;
        dispatch(updateStateTwoForm(copyForm));
    }

    const errorMsgLayout=(formPropery)=>{
        return  isSubmit && !formPropery && <small id="emailHelp" className="form-text  text-danger">
            Field is required
        </small>
    }

    return (
        <div className="row order-process-step-two">
            <form>
                <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input type="text"
                               className="form-control"
                               name='firstName'
                               id="firstName"
                               defaultValue={form.firstName}
                               onChange={(event)=>handleFormChange(event)}
                               placeholder="First name"/>
                        {errorMsgLayout(form.firstName)}
                    </div>
                    <div className="form-group">
                        <label htmlFor='lastName'>Last name</label>
                        <input type="text"
                               className="form-control"
                               name='lastName'
                               id="lastName"
                               defaultValue={form.lastName}
                               onChange={(event)=>handleFormChange(event)}
                               placeholder="Last name"/>
                        {errorMsgLayout(form.lastName)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email"
                               className="form-control"
                               name='email'
                               id="email"
                               defaultValue={form.email}
                               onChange={(event)=>handleFormChange(event)}
                               aria-describedby="emailHelp"
                               placeholder="Enter email"/>
                        {errorMsgLayout(form.email)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text"
                               className="form-control"
                               name='address'
                               id="address"
                               defaultValue={form.address}
                               onChange={(event)=>handleFormChange(event)}
                               placeholder="Address"/>
                        {errorMsgLayout(form.address)}
                    </div>
                </div>
                <div className="col-md-6">

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input type="text"
                               className="form-control"
                               name='phoneNumber'
                               id="phoneNumber"
                               defaultValue={form.phoneNumber}
                               onChange={(event)=>handleFormChange(event)}
                               placeholder="Phone number"/>
                        {errorMsgLayout(form.phoneNumber)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text"
                               className="form-control"
                               name='city'
                               id="city"
                               defaultValue={form.city}
                               onChange={(event)=>handleFormChange(event)}
                               placeholder="City"/>
                        {errorMsgLayout(form.city)}

                    </div>
                    <div className="form-group">
                        <label htmlFor="postCode">Post code</label>
                        <input type="text"
                               className="form-control text-capitalize"
                               name='postCode'
                               id="postCode"
                               defaultValue={form.postCode}
                               onChange={(event)=>handleFormChange(event)}
                               placeholder="Post code"/>
                        {errorMsgLayout(form.postCode)}
                    </div>
                    <div className="form-check mt-3">
                        <input type="checkbox" className="form-check-input" id="terms"  onChange={(event)=>handleFormChange(event)}/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Accept terms</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="conditions"  onChange={(event)=>handleFormChange(event)}/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Conditions</label>
                    </div>
                </div>
                </div>





            </form>
            
        </div>
    );
};

export default OrderProcessStepTwo;
