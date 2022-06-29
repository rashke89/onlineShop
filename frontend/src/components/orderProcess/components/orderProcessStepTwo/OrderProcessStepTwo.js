import React from 'react';

const OrderProcessStepTwo = () => {


    return (
        <div className="row order-process-step-two">
            <form>
                <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input type="text" className="form-control" name='firstName' id="firstName" placeholder="First name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='lastName'>Last name</label>
                        <input type="text" className="form-control" name='lastName' id="lastName" placeholder="Last name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp"
                               placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" name='address' id="address" placeholder="Address"/>
                    </div>
                </div>
                <div className="col-md-6">

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input type="text" className="form-control" name='phoneNumber' id="phoneNumber" placeholder="Phone number"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" className="form-control" name='city' id="city" placeholder="City"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="postCode">Post code</label>
                        <input type="text" className="form-control text-capitalize" name='postCode' id="postCode" placeholder="Post code"/>
                    </div>
                    <div className="form-check mt-3">
                        <input type="checkbox" className="form-check-input" id="terms"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Accept terms</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="conditions"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Conditions</label>
                    </div>
                </div>
                </div>





            </form>
            
        </div>
    );
};

export default OrderProcessStepTwo;
