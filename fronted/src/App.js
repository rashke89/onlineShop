import React from "react";
// * axios nam omogucava da kada pokrenemo api call nas frontend moze da gadja isti server na kome je pokrenut nas backend
// * axios je PROMIS
import axios from "axios";
import './App.css';
// import AuthPage from "./pages/authPage";
import Register from "./components/register";
import Login from "./components/login";

// * podesavamo da axios kada se pokrene api call gadja server na kome je pokrenut backend (u ovom slucaju 4000)
axios.defaults.baseURL = 'http://localhost:4000';


function App() {

    const [loginIsValid, setLoginIsValid] = React.useState(true);

    function showLogin(e) {
        e.preventDefault();
        console.log(loginIsValid)
        setLoginIsValid(true);
    }

    function showRegister(e) {
        e.preventDefault();
        console.log(loginIsValid)
        setLoginIsValid(false);
    }


    return (
        <div className="main-wrapper">
            <header className="App-header">
                <div className='form-btns'>
                    <button onClick={showLogin}>Login</button>
                    <button onClick={showRegister}>Register</button>
                </div>
                {loginIsValid ? <Login/> : <Register/>}
            </header>
        </div>

    );
}

export default App;
