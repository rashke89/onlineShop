import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import ShopCart from "../ShopCart/ShopCart";

function Navigation() {
    // state - redux store from store.js,
    // const user = useSelector((state) => state.userStore.user);
    const {user} = useSelector((state) => state.userStore);
    useEffect(() => {
        console.log('use eff..', user);
    }, []);

    const userBtnLayout = () => {
        return user.hasOwnProperty('username') ?
                user.username :
                <li className="nav-item">
                    <Link className="nav-link" to="/auth">Login/Register</Link>
                </li>
    };
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">E-Shop</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/shop">Shop</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item ">
                            <ShopCart />
                        </li>
                        {userBtnLayout()}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
