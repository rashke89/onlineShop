import React, {useEffect, useState} from 'react';
import Login from "../../components/login/login";
import Register from "../../components/register/register";

import "./AuthPage.scss";

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-wrapper container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <img className=""
                         src="https://images.pexels.com/photos/2451622/pexels-photo-2451622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                         alt=""/>
                </div>
                <div className="col-md-6 p-md-5">
                    {isLogin ? <Login showLoginForm={setIsLogin}/> : <Register showLoginForm={setIsLogin}/>}
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
