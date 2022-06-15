import React from 'react';
import {Link} from "react-router-dom";
import "./Navigation.css"

function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand mb-0 h1 text-light" to="/">E-Shop</Link>
                {/*<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"*/}
                {/*        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">*/}
                {/*    /!*<span className="navbar-toggler-icon"></span>*!/*/}
                {/*</button>*/}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
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
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/auth">Login/Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;