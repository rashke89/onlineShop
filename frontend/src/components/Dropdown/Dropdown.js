import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {routeConfig} from "../../config/routeConfig";
import "./dropdownStyle.scss"


function Dropdown() {
    const {user} = useSelector((state) => state.userStore);
    const navigate = useNavigate();
    const ref = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const clickedDropdown = (e) => {
        e.preventDefault();
        setIsMenuOpen(!isMenuOpen);
    }
    useEffect(() => {
        const clickedOutside = e => {
            if (isMenuOpen && ref.current !== null && !ref.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        }

        window.addEventListener('mousedown', clickedOutside);

        return () => {
            window.removeEventListener('mousedown', clickedOutside)
        }

    }, [isMenuOpen]);


    const logOut = () => {
        localStorage.clear();
        navigate("/auth");
        setIsMenuOpen(false);
    }

    return (
        localStorage.hasOwnProperty("user") ?
            <div className="wrapper">
                <Link className="nav-link dropdown-toggle menu-trigger" onClick={clickedDropdown} to={"#"}>My
                    account</Link>
                <nav ref={ref} className={`menu ${isMenuOpen ? 'active' : 'inactive'}`}>
                    <ul>
                        <li><Link className="nav-link" to={routeConfig.USER_PROFILE.url}><i
                            className="bi bi-person mx-2"></i>Profile</Link></li>
                        <li className="nav-link logout" onClick={logOut}><i className="bi bi-box-arrow-right mx-2"></i>Logout
                        </li>
                    </ul>
                </nav>
            </div> :
            <li className="nav-item">
                <Link className="nav-link" to={routeConfig.AUTH.url}>Login/Register</Link>
            </li>
    )

}

export default Dropdown;