import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown } from 'react-icons/fa';

import './Navigation.scss';
import { removeUser } from '../../redux-store/users/userSlice';
import { toggleForm } from '../../redux-store/forms/toggleFormSlice';
import ShopCart from '../ShopCart/ShopCart';
import { routeConfig } from '../../config/routeConfig';


function Navigation() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function userLogout() {
        localStorage.removeItem('user');
        dispatch(removeUser());
        navigate(routeConfig.HOME.url);
    }

    function toggleView() {
        dispatch(toggleForm());
    }

    const user = useSelector(state => state.userStore.user);

    const userBtnLayout = () => {
        // * jos jedna sintaksa provere
        // * 'username' in user
        return user.hasOwnProperty('username') ?
            <div className="dropdown">
                <li className="dropbtn"><a>{user.username}<FaAngleDown /></a></li>
                <div className="dropdown-content">
                    <li><a>Profile</a></li>
                    <li><a>Messages</a></li>
                    <li onClick={userLogout}><a>Logout</a></li>
                </div>
            </div> :
            <li><Link to={routeConfig.AUTORIZATION.url} onClick={toggleView}>Login/Register</Link></li>
    }



    return (
        <header>
            <nav>
                <ul>
                    <li className="nav-item"><Link to={routeConfig.HOME.url}>Home</Link></li>
                    <li className="nav-item"><Link to={routeConfig.ABOUT.url}>About</Link></li>
                    <li className="nav-item"><Link to={routeConfig.SHOP.url}>Shop</Link></li>
                    <li className="nav-item"><Link to={routeConfig.CONTACT.url}>Contact</Link></li>
                    <li className="nav-item"><ShopCart /></li>
                    {userBtnLayout()}
                </ul>
            </nav>
        </header>
    )
}

export default Navigation;