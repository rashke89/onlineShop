import React from 'react';

function Toggler({sidebarCollapse, setSidebarCollapse}) {
	return (
		<div className="toggler" onClick={() => setSidebarCollapse(!sidebarCollapse)}>
			{sidebarCollapse ?
				<i className="bi bi-arrow-right"></i> :
				<>
					<span></span>
					<span></span>
					<span></span>
				</>
			}
		</div>
	);
}

export default Toggler;