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
            <header className="App-header">
                <BrowserRouter>
                    <Link to="/shop">Shop</Link>
                    <Link to="/about-us">About us</Link>
                    <Link to="/contact">Contact</Link>

                    <div className='form-btns'>
                        <button onClick={showLogin}>Login</button>
                        <button onClick={showRegister}>Register</button>
                    </div>

                    <Routes>
                        <Route path="/" element={loginIsValid ? <Login/> : <Register getLogin={showLogin}/>}/>
                        <Route path="/shop" element={<ShopPage/>}/>
                        <Route path="/about-us" element={<AboutUs/>}/>
                        <Route path="/contact" element={<ContactPage/>}/>
                    </Routes>
                </BrowserRouter>


            </header>
        </div>

    );
}

export default App;
