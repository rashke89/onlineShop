import React from "react";
// * axios nam omogucava da kada pokrenemo api call nas frontend moze da gadja isti server na kome je pokrenut nas backend
// * axios je PROMIS
import axios from "axios";
import './App.css';
import AuthPage from "./pages/authPage";
import Register from "./components/register";
import Login from "./components/login";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import ShopPage from "./pages/ShopPage";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";

// * podesavamo da axios kada se pokrene api call gadja server na kome je pokrenut backend (u ovom slucaju 4000)
axios.defaults.baseURL = 'http://localhost:4000';


function App() {

    const [loginIsValid, setLoginIsValid] = React.useState(true);

    function showLogin(e) {
        e.preventDefault();
        setLoginIsValid(true);
    }

    function showRegister(e) {
        e.preventDefault();
        setLoginIsValid(false);
    }


    return (
        <div className="main-wrapper">
            <BrowserRouter>
                <header>
                    <nav>
                        <ul className="App-andrija">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/about-us">About us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><a className="btn btn-primary" onClick={showLogin}>Login</a></li>
                            <li><a className="btn btn-primary" onClick={showRegister}>Register</a></li>
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={loginIsValid ? <Login /> : <Register getLogin={showLogin} />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
