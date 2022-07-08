import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaArrowRight } from "react-icons/fa";

import AuthService from '../../services/AuthService';
import { goToLogin } from '../../redux-store/forms/toggleFormSlice';
import './RegisterForm.scss';

function RegisterForm() {

    const dispatch = useDispatch();

    function showLoginForm() {
        dispatch(goToLogin());
    }

    const [registerUserObject, setRegisterUserObject] = useState({
        username: '',
        password: '',
        email: ''
    });

    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const [isAPIError, setIsAPIError] = useState(false);
    const [isAPIFinished, setIsAPIFinished] = useState(false);

    function fillRegisterInputs(e) {
        e.preventDefault();
        const newRegisterUserObject = registerUserObject;
        newRegisterUserObject[e.target.name] = e.target.value;
        setRegisterUserObject(newRegisterUserObject);
    }

    function checkRegistration(e) {
        e.preventDefault();
        if (!registerUserObject.username) {
            setIsValidUsername(false);
        } else {
            setIsValidUsername(true);
        }

        if (registerUserObject.password.length < 5) {
            setIsValidPassword(false);
        } else {
            setIsValidPassword(true);
        }

        if (!registerUserObject.email.includes('@')) {
            setIsValidEmail(false);
        } else {
            setIsValidEmail(true);
        }

        if (registerUserObject.username && !registerUserObject.password.length < 5 && registerUserObject.email.includes('@')) {
            AuthService.register(registerUserObject)
                .then(res => {
                    if (res && res.status === 200) {
                        setIsAPIError(false);
                        setIsAPIFinished(true);
                    }
                })
                .catch(err => {
                    if (err) {
                        setIsAPIError(true);
                        setIsAPIFinished(false);
                    }
                })
        }
    }

    return (

        <>
            <div className="login-register-form">
                <p>Already have account? <span className='login-text-btn' onClick={showLoginForm}>Go to login <FaArrowRight /></span></p>
            </div>
            <form action='' className="login-register-form" onSubmit={checkRegistration}>
                <label htmlFor="email" style={isValidEmail ? { color: '' } : { color: 'tomato' }}>Email {isValidEmail ? null : 'is not valid'}</label>
                <input type="text" id="email" name="email" onInput={fillRegisterInputs} />

                <label htmlFor="username" style={isValidUsername ? { color: '' } : { color: 'tomato' }}>Username {isValidUsername ? null : 'required'}</label>
                <input type="text" id="username" name="username" onInput={fillRegisterInputs} />

                <label htmlFor="password" style={isValidPassword ? { color: '' } : { color: 'tomato' }}>Password  {isValidPassword ? null : 'must be at least 5 characters long'}</label>
                <input type="password" id="password" name="password" onInput={fillRegisterInputs} />

                {isAPIError ? <p>ERROR, please try again later</p> : null}
                {isAPIFinished ? showLoginForm() : null}
                <br />
                <button className="btn btn-success register-btn">Register</button>
            </form>
        </>

    )
}

export default RegisterForm;