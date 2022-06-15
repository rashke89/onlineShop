import React from "react";
import "./register.css"
import "animate.css"

const Register=({isLogin})=>{
    const loginForm=()=>{isLogin(true)}

    return(

        <div className="form-box-R animate__animated animate__fadeIn animate__fast">
            <div className="button-box">
                <div id="btn-R"></div>
                <button type="button" className="toggle-btn" onClick={loginForm}>Login</button>
                <button type="button" className="toggle-btn">Register</button>
            </div>
        <div className="register-form">
            <form className="input-group-custom">
                <input type="text" className='input-field' placeholder="First name"/>
                <input type="text" className='input-field' placeholder="Last name"/>
                <input type="text" className='input-field' placeholder="Address"/>
                <input type="text" className='input-field' placeholder="City"/>
                <input type="text" className='input-field' placeholder="Email"/>
                <input type="text" className='input-field' placeholder="User name"/>
                <input type="text" className='input-field' placeholder="Password"/>
                <label htmlFor="gender">Gender:</label>
                <div className="gender">
                    <select   id="gender" >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Register</button>
            </form>

        </div>
        </div>
            )
}

export default Register;