import React from 'react';

const OrderProcessStepTwo = () => {

	const handleSubmit = (e) => {
		e.preventDefault();
	}

	return (
		<duv className="step-two-wrapper">
			<div className="row w-75 mx-auto">
				<form onSubmit={handleSubmit} className="row g-3">
					<div className="col-md-6">
						<label htmlFor="email" className="form-label">Email</label>
						<input type="email" className="form-control" id="email" />
					</div>
					<div className="col-md-6">
						<label htmlFor="firstName" className="form-label">First name</label>
						<input type="text" className="form-control" id="firstName" />
					</div>
					<div className="col-md-6">
						<label htmlFor="lastName" className="form-label">Last name</label>
						<input type="text" className="form-control" id="lastName" />
					</div>
					<div className="col-md-6">
						<label htmlFor="address" className="form-label">Address</label>
						<input type="text" className="form-control" id="address" />
					</div>
					<div className="col-md-6">
						<label htmlFor="city" className="form-label">City</label>
						<input type="text" className="form-control" id="city" />
					</div>
					<div className="col-md-6">
						<label htmlFor="postCode" className="form-label">Post code</label>
						<input type="text" className="form-control" id="postCode" />
					</div>
					<div className="col-md-6">
						<label htmlFor="phoneNumber" className="form-label">Phone number</label>
						<input type="number" className="form-control" id="phoneNumber" />
					</div>
					<div className="col-12">
						<div className="form-check">
							<input className="form-check-input" type="checkbox" id="terms" />
							<label className="form-check-label" htmlFor="terms">
								Accept terms
							</label>
						</div>
						<div className="form-check">
							<input className="form-check-input" type="checkbox" id="conditions" />
							<label className="form-check-label" htmlFor="conditions">
								Accept conditions
							</label>
						</div>
					</div>
				</form>
			</div>
		</duv>
	);
};

export default OrderProcessStepTwo;