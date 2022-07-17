import React, {useState} from 'react';
import './authPage.scss';
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

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
				<button className="auth-btn" onClick={showLoginForm}>Login</button>
				<button className="auth-btn" onClick={showRegisterForm}>Register</button>
			</div>
			{isLoginForm ? <Login/> : <Register showLoginForm={showLoginForm}/>}
		</div>
	);
};

export default AuthPage;