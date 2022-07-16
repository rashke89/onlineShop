import {ADMIN_SIDEBAR_CONFIG} from "../../config/adminSidebarConfig";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import './sidebar.scss';
import Toggler from "./Toggler";

function Sidebar({sidebarCollapse, setSidebarCollapse}) {
	const [activeName, setActiveName] = useState(ADMIN_SIDEBAR_CONFIG[0].name);
	const navigate = useNavigate();

	const onSideBarItemClick = item => {
		setActiveName(item.name);
		navigate(item.url);
	}

	const sideBarItemsLayout = () => {
		return ADMIN_SIDEBAR_CONFIG.map((item, index) => {
			return <li className="nav-item" key={index} onClick={() => onSideBarItemClick(item)} >
				<p className={`nav-link mb-0 ${activeName === item.name ? "link-active" : ""}`} aria-current="page">
					{item.icon}
					{!sidebarCollapse && item.name}
				</p>
			</li>
		})
	}

	return (
		<>
			<Toggler sidebarCollapse={sidebarCollapse} setSidebarCollapse={setSidebarCollapse} />
				<div className={`d-flex p-3 sidebar ${sidebarCollapse ? 'collapsed' : ''}`}>
					<ul className="nav nav-pills mb-auto mt-5">
						{sideBarItemsLayout()}
					</ul>
				</div>
		</>
	)
}

export default Sidebar;
