import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function Authorization() {

    const isValidLogin = useSelector(state => state.toggleFormStore.goToLoginForm);

    return (
        <div className="login-register-wrapper">
            <div className="login-register-form">
                {
                    isValidLogin ?
                        <h5>Welcome member, login to see a whole another world :)</h5> :
                        <h5>Register to access all possibilities and become our member</h5>
                }
            </div>

            {isValidLogin ? <LoginForm /> : <RegisterForm />}

        </div>
    )
}

export default Authorization;