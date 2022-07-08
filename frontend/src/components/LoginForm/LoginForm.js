import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaArrowRight } from "react-icons/fa";

import { setUser } from '../../redux-store/users/userSlice';
import { goToRegister } from '../../redux-store/forms/toggleFormSlice';
import AuthService from '../../services/AuthService';
import './LoginForm.scss'



function LoginForm() {

    const [loginUserObject, setLoginUserObject] = useState({
        username: '',
        password: ''
    });

    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    const [isAPIError, setIsAPIError] = useState(false);
    const [isUserFound, setIsUserFound] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function showRegisterForm() {
        dispatch(goToRegister());
    }

    function fillLoginInputs(e) {
        const newLoginUserObject = loginUserObject;
        newLoginUserObject[e.target.name] = e.target.value;
        setLoginUserObject(newLoginUserObject);
    }

    function checkLogin(e) {
        e.preventDefault();
        if (!loginUserObject.username) {
            setIsValidUsername(false);
        } else {
            setIsValidUsername(true);
        }

        if (!loginUserObject.password) {
            setIsValidPassword(false);
        } else {
            setIsValidPassword(true);
        }

        if (loginUserObject.username && loginUserObject.password) {
            AuthService.login(loginUserObject)
                .then(response => {
                    if (response && response.status === 200) {
                        if (response.data === 'User not found, try to register first.') {
                            setIsUserFound(false);
                        } else {
                            localStorage.setItem('user', JSON.stringify(response.data));
                            dispatch(setUser(response.data));
                            navigate('/');
                        }

                    }
                })
                .catch(err => {
                    if (err) {
                        console.log('GRESKA ' + err);
                        setIsAPIError(true);
                    }
                })
        }
    }

    return (

        <>
            <div className="login-register-form">
                <p>Not our member? <span className='register-text-btn' onClick={showRegisterForm}>Go to registration <FaArrowRight /></span></p>
            </div>
            <form action='' className="login-register-form" onSubmit={checkLogin}>
                <label htmlFor="username" style={isValidUsername ? { color: '' } : { color: 'tomato' }}>Username {isValidUsername ? null : 'is required'}</label>
                <input type="text" id="username" name="username" onInput={fillLoginInputs} />

                <label htmlFor="password" style={isValidPassword ? { color: '' } : { color: 'tomato' }}>Password {isValidPassword ? null : 'is required'}</label>
                <input type="password" id="password" name="password" onInput={fillLoginInputs} />

                <br />
                <button className="btn btn-primary">Login</button>

                {isAPIError ? <p>ERROR, please try to register later</p> : null}
                {!isUserFound ? <p>User not found, try to register first.</p> : null}

            </form>
        </>
    )

}

export default LoginForm;