import {ADMIN_SIDEBAR_CONFIG} from "../../config/adminSideBarConfig";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import './sidebar.scss';
import Toggler from "./components/Toggler";

function SideBar({sidebarCollapse, setSidebarCollapse}) {
	const [activeName, setActiveName] = useState(ADMIN_SIDEBAR_CONFIG[0].name);
	const navigate = useNavigate();

	const onSideBarItemClick = item => {
		setActiveName(item.name);
		navigate(item.url);
	}

	const sideBarItemsLayout = () => {
		return ADMIN_SIDEBAR_CONFIG.map((item, index) => {
			return <li className="nav-item" key={index} onClick={e => onSideBarItemClick(item)} >
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
				<div className={`d-flex flex-column flex-shrink-0 p-3 sidebar ${sidebarCollapse ? 'collapsed' : ''}`}>
					<a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
						{/*<span className="fs-4">Sidebar</span>*/}
					</a>
					<ul className="nav nav-pills flex-column mb-auto mt-5">
						{sideBarItemsLayout()}
					</ul>
				</div>
		</>
	)
}

export default SideBar;
