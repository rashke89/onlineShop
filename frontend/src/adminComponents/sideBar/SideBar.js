import {ADMIN_SIDEBAR_CONFIG} from "../../config/adminSideBarConfig";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function SideBar() {
    const [activeName, setActiveName] = useState(ADMIN_SIDEBAR_CONFIG[0].name);
    const navigate = useNavigate();

    const onSideBarItemClick = item => {
        setActiveName(item.name);
        navigate(item.url);
    }

    const sideBarItemsLayout = () => {
        return ADMIN_SIDEBAR_CONFIG.map((item, index) => {
            return <li className="nav-item" key={index} onClick={e => onSideBarItemClick(item)} >
                <p className={`nav-link mb-0 ${activeName === item.name ? "active" : ""}`} aria-current="page">
                    {item.icon}
                    {item.name}
                </p>
            </li>
        })
    }

    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark ">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4">Sidebar</span>
                </a>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                    {sideBarItemsLayout()}
                </ul>
                <hr/>
                <div className="dropdown">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
                        <strong>mdo</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideBar;
