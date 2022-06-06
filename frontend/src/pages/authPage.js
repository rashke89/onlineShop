import React, {useState} from 'react';
import * as events from "events";

const AuthPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onUsernameChange = event => setUsername(event.target.value);
	const onPasswordChange = event => setPassword(event.target.value);
	const onSubmitForm = (event) => {
		event.preventDefault();
		console.log({username});
		console.log({password});
	}

	return (
		<div className='auth-wrapper'>
			<h1>Auth login wrapper</h1>
			<form onSubmit={onSubmitForm}>
				<div className="username">
					<label htmlFor='username'>Username</label>
					<input id='username' type='text' onChange={onUsernameChange}/>
				</div>

				<div className="password">
					<label htmlFor='password'>Password</label>
					<input id='password' type='password' onChange={onPasswordChange}/>
				</div>

				<input type='submit' value='Send data'/>
			</form>
		</div>
	);
};

export default AuthPage;