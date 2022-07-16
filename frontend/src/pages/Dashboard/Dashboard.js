import Sidebar from "../../adminComponents/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import {useState} from "react";

function Dashboard() {
	const [sidebarCollapse, setSidebarCollapse] = useState(false);
	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className={`sidebar-wrapper ${sidebarCollapse ? 'col-md-1' : 'col-md-3 col-xl-2'}`}>
						<Sidebar sidebarCollapse={sidebarCollapse} setSidebarCollapse={setSidebarCollapse} />
					</div>

					<div className="col-md-9 mx-auto">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	)
}

export default Dashboard;
