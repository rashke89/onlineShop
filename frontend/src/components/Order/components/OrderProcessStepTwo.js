import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateStepTwoForm} from "../../../redux/orderProcessSlice";

const OrderProcessStepTwo = () => {
	const {form, isSubmit} = useSelector(state => state.orderProcessStore.orderProcess.stepTwo);
	const {user} = useSelector(state => state.userStore);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateStepTwoForm({...form, ...user}));
	}, []);

	useEffect(() => {

	}, [isSubmit]);

	const handleSubmit = (e) => {
		e.preventDefault();
	}

	const formChangeHandler = (e) => {
		let newForm = {...form};
		newForm[e.target.id] = e.target.value;
		dispatch(updateStepTwoForm(newForm));
	}

	const errorMsgLayout = (formProperty) => {
		return isSubmit && !formProperty ?
			<div id="emailHelp" className="form-text text-danger">Required field.</div> : null;
	}

	return (
		<div className="step-two-wrapper">
			<div className="row w-75 mx-auto">
				{form && <form onSubmit={handleSubmit} className="row g-3">
					<div className="col-md-6">
						<label htmlFor="email" className="form-label">Email</label>
						<input type="email" className="form-control" id="email" defaultValue={form?.email}
									 onChange={(e) => formChangeHandler(e)}/>
						{errorMsgLayout(form?.email)}
					</div>
					<div className="col-md-6">
						<label htmlFor="firstName" className="form-label">First name</label>
						<input type="text" className="form-control" id="firstName" defaultValue={form?.firstName}/>
						{errorMsgLayout(form?.firstName)}
					</div>
					<div className="col-md-6">
						<label htmlFor="lastName" className="form-label">Last name</label>
						<input type="text" className="form-control" id="lastName" defaultValue={form?.lastName}/>
						{errorMsgLayout(form?.lastName)}
					</div>
					<div className="col-md-6">
						<label htmlFor="address" className="form-label">Address</label>
						<input type="text" className="form-control" id="address" defaultValue={form?.address}/>
						{errorMsgLayout(form?.address)}
					</div>
					<div className="col-md-6">
						<label htmlFor="city" className="form-label">City</label>
						<input type="text" className="form-control" id="city" defaultValue={form?.city}/>
						{errorMsgLayout(form?.city)}
					</div>
					<div className="col-md-6">
						<label htmlFor="postCode" className="form-label">Post code</label>
						<input type="text" className="form-control" id="postCode" defaultValue={form?.postCode}/>
						{errorMsgLayout(form?.postCode)}
					</div>
					<div className="col-md-6">
						<label htmlFor="phoneNumber" className="form-label">Phone number</label>
						<input type="number" className="form-control" id="phoneNumber" defaultValue={form?.phoneNumber}/>
						{errorMsgLayout(form?.phoneNumber)}
					</div>
					<div className="col-12">
						<div className="form-check">
							<input className="form-check-input" type="checkbox" id="terms"/>
							<label className="form-check-label" htmlFor="terms">
								Accept terms
							</label>
						</div>
						<div className="form-check">
							<input className="form-check-input" type="checkbox" id="conditions"/>
							<label className="form-check-label" htmlFor="conditions">
								Accept conditions
							</label>
						</div>
					</div>
				</form>}
			</div>
		</div>
	);
};

export default OrderProcessStepTwo;