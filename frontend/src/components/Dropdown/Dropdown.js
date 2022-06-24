import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import dropdownStyle from "./dropdownStyle.scss"


function Dropdown() {
    const {user} = useSelector((state) => state.userStore);
    const navigate = useNavigate();
    const ref = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const clickedDropdown = (e) => {
        e.preventDefault();
        setIsMenuOpen(true);
    }
    useEffect(() => {
        const clickedOutside = e => {
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', clickedOutside);

        return () => {
            document.removeEventListener('mousedown', clickedOutside)
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
                <Link className="nav-link dropdown-toggle" onClick={clickedDropdown} to={"#"}>{user.username}</Link>

                <ul className={`list ${isMenuOpen ? 'active' : 'inactive'}` } ref={ref}>
                    <li><Link className="nav-link" to="/userProfile"><i className="bi bi-person mx-2"></i>Profile</Link></li>
                    <li className="nav-link logout" onClick={logOut}><i className="bi bi-box-arrow-right mx-2"></i>Logout</li>
                </ul>
            </div> :
            <li className="nav-item">
                <Link className="nav-link" to={"/auth"}>Login/Register</Link>
            </li>
    )

}

export default Dropdown;