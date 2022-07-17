import React from 'react';

const StatsNumber = ({number, label}) => {
	return (
		<div className="col-md-4 p-3">
			<div className="stats-wrapper">
				<h3>{label}</h3>
				<hr className="w-50 mx-auto"/>
				{number}
			</div>
		</div>
	);
};

export default StatsNumber;