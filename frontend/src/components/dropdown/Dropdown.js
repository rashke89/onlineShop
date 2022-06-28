import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {routeConfig} from "../../config/routeConfig";


const Dropdown = ({user}) => {
    const navigate=useNavigate();
    const logOut=()=>{
        localStorage.removeItem("user");
        navigate(routeConfig.AUTH.url);
    }
    const displayUsername=" "+user.username.charAt(0).toUpperCase() + user.username.slice(1);
    return (
        <div className="dropdown mx-2">
            <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
               aria-expanded="false">
                <i className="bi bi-person"></i>
                {displayUsername}
            </a>

            <ul className="dropdown-menu " aria-labelledby="dropdownMenu2">
                <li><Link className="dropdown-item" to="#">{user.isAdmin ?
                    <i className="bi bi-person-workspace me-2"></i> :
                    <i className="bi bi-person-circle me-2"></i>
                }Profile</Link></li>
                <li><Link className="dropdown-item" to={routeConfig.MY_PRODUCTS.url}><i className="bi bi-card-list me-2"></i>My Products</Link></li>
                <li onClick={logOut}><Link className="dropdown-item" to="#"><i className="bi bi-box-arrow-right me-2"></i>Logout</Link></li>
            </ul>
        </div>

    )
}

export default Dropdown;