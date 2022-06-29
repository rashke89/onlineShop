import React, {useState} from "react";
import "./AuthPage.css"
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";


const AuthPage = () => {

    const [isLogin, setIsLogin]= useState(true);


    return (
        <>
            <div className="hero">
                {isLogin? <Login isLogin={setIsLogin}/> : <Register isLogin={setIsLogin}/>}

            </div>
        </>


)
}
export default AuthPage;