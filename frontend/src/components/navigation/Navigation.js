import React from 'react';
import {Link} from "react-router-dom";
import "./Navigation.css"
import {useSelector} from "react-redux";
import Dropdown from "../dropdown/Dropdown";
import logo from '../../assets/shop-icon.png'

function Navigation() {
    const user=useSelector((state)=> state.userStore.user);
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container">
                <Link className="navbar-brand mb-0 h1 text-light" to="/"><img src={logo} alt="Logo"/> OnlineShop</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse  d-flex justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link className="nav-link active text-light" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/shop">Shop</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/contact">Contact</Link>
                        </li>
                        {
                         user.hasOwnProperty("username") ?
                             <Dropdown user={user}/>
                            :  <li className="nav-item">
                                 <Link className="nav-link text-light" to="/auth">Login/Register</Link>
                             </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;