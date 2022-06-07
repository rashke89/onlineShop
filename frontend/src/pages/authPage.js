import React, {useState} from 'react';
import AuthService from '../services/AuthService';
import './authPage.scss';
import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const AuthPage = () => {
	const [isLoginForm, setIsLoginForm] = useState(true);


	const showLoginForm = () => {
		setIsLoginForm(true);
	}

	const showRegisterForm = () => {
		setIsLoginForm(false);
	}

	return (
		<div className='auth-wrapper'>
			<h1>{isLoginForm ? "Login form" : "Register form"}</h1>
			<div>
				<button onClick={showLoginForm}>LOGIN</button>
				<button onClick={showRegisterForm}>REGISTER</button>
			</div>
			{isLoginForm ? <LoginForm /> : <RegisterForm showLoginForm = {showLoginForm}/>}
		</div>
	);
};

export default AuthPage;