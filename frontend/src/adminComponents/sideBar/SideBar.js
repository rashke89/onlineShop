import {ADMIN_SIDEBAR_CONFIG} from "../../config/adminSideBarConfig";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import './sidebar.scss';
import Toggler from "./components/Toggler";
import {FaChevronCircleDown} from "react-icons/fa";

function SideBar({sidebarCollapse, setSidebarCollapse}) {
    const [activeName, setActiveName] = useState(ADMIN_SIDEBAR_CONFIG[0].name);
    const navigate = useNavigate();
    const [counter, setCounter] = useState(0);
    let c = 0

    const onSideBarItemClick = item => {
        setActiveName(item.name);
        navigate(item.url);
    };
    useEffect(() => {
		ctaCounter()
	}, [])

    const ctaCounter = () => {
		c = c + 1
    	c < 5 && ctaCounter()
	}

    const sideBarItemsLayout = () => {
        return ADMIN_SIDEBAR_CONFIG.map((item, index) => {
            return item?.label ?
                <span className="sidebar-label" key={index}>{item.label}</span> :
                <li className="nav-item" key={index} onClick={e => onSideBarItemClick(item)}>
                    <p className={`nav-link mb-0 ${activeName === item.name ? "link-active" : ""}`} aria-current="page">
                        <span>
							{item.icon}
							{!sidebarCollapse && item.name}
						</span>
                    </p>
                </li>
        })
    };

    return (
        <>
            <Toggler sidebarCollapse={sidebarCollapse} setSidebarCollapse={setSidebarCollapse}/>
            <div className={`d-flex p-3 sidebar ${sidebarCollapse ? 'collapsed' : ''} px-2`}>
                <ul className="nav nav-pills mb-auto mt-5 ms-2">
                    {sideBarItemsLayout()}
                </ul>
            </div>
        </>
    )
}

export default SideBar;
