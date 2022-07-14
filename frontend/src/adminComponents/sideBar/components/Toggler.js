import React from 'react';
import {FaArrowRight} from 'react-icons/fa';

function Toggler({sidebarCollapse, setSidebarCollapse}) {
	return (
		<div className="toggler" onClick={() => setSidebarCollapse(!sidebarCollapse)}>
			{sidebarCollapse ?
				<FaArrowRight /> :
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