import React from 'react';
import OrderProcess from "../../components/Order/OrderProcess";

const Order = () => {
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h2 className="text-center mt-4">Order process</h2>
						<OrderProcess />
					</div>
				</div>
			</div>
		</>
	);
};

export default Order;