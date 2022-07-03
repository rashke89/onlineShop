import React from 'react';

const OrderProcessStepTwo = () => {

	const handleSubmit = (e) => {
		e.preventDefault();
	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				step two
			</form>
		</>
	);
};

export default OrderProcessStepTwo;