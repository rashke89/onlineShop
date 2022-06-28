import React from 'react';
import {Link} from "react-router-dom";
import "./Navigation.css"
import {useSelector} from "react-redux";
import Dropdown from "../dropdown/Dropdown";
import logo from '../../assets/shop-icon.png'
import ShopCart from "../shopCart/shopCart";
import {routeConfig} from "../../config/routeConfig";


function Navigation() {
    const user=useSelector((state)=> state.userStore.user);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand mb-0 h1 text-light" to={routeConfig.HOME.url}><img src={logo} alt="Logo"/> OnlineShop</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-auto ">
                        <li className="nav-item">
                            <Link className="nav-link active text-light" aria-current="page" to={routeConfig.HOME.url}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to={routeConfig.ABOUT.url}>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to={routeConfig.SHOP.url}>Shop</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to={routeConfig.CONTACT.url}>Contact</Link>
                        </li>
                        <li className="nav-item">
                            <ShopCart/>
                        </li>
                        {
                         user.hasOwnProperty("username") ?
                             <Dropdown user={user}/>
                            :  <li className="nav-item">
                                 <Link className="nav-link text-light" to={routeConfig.AUTH.url}>Login/Register</Link>
                             </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;

// <img src={logo} alt="Logo"/>
// {
//     user.hasOwnProperty("username") ?
//         <Dropdown user={user}/>
//         :  <li className="nav-item">
//             <Link className="nav-link text-light" to="/auth">Login/Register</Link>
//         </li>
// }