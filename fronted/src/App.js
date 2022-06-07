import React from "react";
import axios from "axios";
import './App.css';
// import AuthPage from "./pages/authPage";
// import Heading from "./pages/heading";
import Register from "./components/register";
import Login from "./components/login";

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
                {/*<FormButtons/>*/}
                {/*<Heading/>*/}
                {loginIsValid ? <Login/> : <Register/>}
                {/*<Login/>*/}
                {/* <Register/>*/}
            </header>
        </div>

    );
}

export default App;
