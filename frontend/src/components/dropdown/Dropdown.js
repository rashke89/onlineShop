import React from "react";
import {Link, useNavigate} from "react-router-dom";


const Dropdown = ({user}) => {
    const navigate=useNavigate();
    const logOut=()=>{
        localStorage.clear();
        navigate("/auth");
    }
    return (
        <div className="dropdown mx-2">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
                    data-bs-toggle="dropdown" aria-expanded="false">
                {user.username.toUpperCase()}
            </button>
            <ul className="dropdown-menu " aria-labelledby="dropdownMenu2">
                <li><Link className="dropdown-item" to="#">Profile</Link></li>
                <li><Link className="dropdown-item" to="/myProducts">My Products</Link></li>
                <li onClick={logOut}><Link className="dropdown-item" to="#">Logout</Link></li>
            </ul>
        </div>

    )
}

export default Dropdown;