import React, {useState} from 'react';
import AuthService from "../../services/AuthService";
import './style.scss';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isFormValid, setIsFormValid] = useState(true);

	const onUsernameChange = event => setUsername(event.target.value);
	const onPasswordChange = event => setPassword(event.target.value);
	const onSubmitForm = (event) => {
		event.preventDefault();
		console.log('form submit >', username, password);

		if(!username || !password) {
			setIsFormValid(false);
			return;
		}
		setIsFormValid(true);

		// API call
		AuthService.login({username, password})
			.then((response) => {
				if(response && response.status === 200) {
					console.log('API response ->', response);
					// TODO: send user to some page
				}
			})
			.catch((error) => {
				console.log(error);
			})
	}

	return (
		<form className='login-form' onSubmit={onSubmitForm}>
			<label htmlFor='username'>Username</label>
			<input id='username' type='text' onChange={onUsernameChange}/>
			<label htmlFor='password'>Password</label>
			<input id='password' type='password' onChange={onPasswordChange}/>
			<button>Login</button>
			{!isFormValid && <p>Username and password are required!</p>}
		</form>
	);
};

export default LoginForm;