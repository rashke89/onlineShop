import React, {useState} from 'react';
import AuthService from "../../services/AuthService";
import './style.scss';

const RegisterForm = ({showLoginForm}) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isFormValid, setIsFormValid] = useState(true);

	const onFirstNameInput = event => setFirstName(event.target.value);
	const onLastNameInput = event => setLastName(event.target.value);
	const onEmailInput = event => setEmail(event.target.value);
	const onUsernameInput = event => setUsername(event.target.value);
	const onPasswordInput = event => setPassword(event.target.value);

	const showLogin = () => {
		showLoginForm();
	}

	const onSubmitForm = (event) => {
		event.preventDefault();

		if(!username || !password || !firstName || !lastName || !email) {
			setIsFormValid(false);
			return;
		}
		setIsFormValid(true);

		// API call
		AuthService.register({username, password, email, firstName, lastName})
			.then((response) => {
				if(response && response.status === 200) {
					console.log('API response ->', response.data.registerStatus);
					// TODO: send user to some page
					if(response.data.registerStatus) {
						showLogin();
					}
				}
			})
			.catch((error) => {
				console.log(error);
			})
	}

	return (
		<form className='register-form' onSubmit={onSubmitForm}>

			<label htmlFor='firstName'>Firs name</label>
			<input id='firstName' type='text' onChange={onFirstNameInput}/>

			<label htmlFor='lastName'>Last name</label>
			<input id='lastName' type='text' onChange={onLastNameInput}/>

			<label htmlFor='email'>Email</label>
			<input id='email' type='text' onChange={onEmailInput}/>

			<label htmlFor='username'>Username</label>
			<input id='username' type='text' onChange={onUsernameInput}/>

			<label htmlFor='password'>Password</label>
			<input id='password' type='password' onChange={onPasswordInput}/>

			<button>Register</button>
			{!isFormValid && <p>Username and password are required!</p>}
		</form>
	);
};

export default RegisterForm;