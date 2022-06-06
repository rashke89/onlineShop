import React, {useState} from 'react';
import Login from "../components/login/login";
import Register from "../components/register/register";
import "./AuthPage.scss";


function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    const loginForm = () => setIsLogin(true)
    const registerForm = () => setIsLogin(false)

    return (
        <div className="auth-wrapper">
            <h1>Authentication</h1>
            <div className="login-register">
                <button onClick={loginForm}>Login</button>
                <button onClick={registerForm}>Register</button>
            </div>
            {isLogin ? <Login/> : <Register/>}
        </div>
    );
}

export default AuthPage;