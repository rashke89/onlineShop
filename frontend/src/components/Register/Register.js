import React, {useState} from 'react';
import AuthService from "../../services/authService";
import './register.scss';

const Register = ({showLoginForm}) => {
	const [userObj, setUserObj] = useState({
		username: '',
		password: '',
		email: '',
		firstName: '',
		lastName: '',
		address: '',
		city: ''
	});

	const [isFormValid, setIsFormValid] = useState(true);
	const [isApiFinish, setIsApiFinish] = useState(false);
	const [isApiError, setIsApiError] = useState(false);

	const handleInputFieldChange = (e) => {
		let newUserObj = userObj;

		newUserObj[e.target.name] = e.target.value;
		setUserObj(newUserObj);
	}

	const showLogin = () => {
		showLoginForm();
	}

	const onSubmitForm = (e) => {
		e.preventDefault();

		if (!userObj.username || !userObj.password || !userObj.email || !userObj.email.includes('@')) {
			console.log(userObj.email);
			setIsFormValid(false);
			return;
		}
		setIsFormValid(true);

		// API call
		AuthService.register(userObj)
			.then((response) => {
				if (response && response.status === 200) {
					setIsApiFinish(true);
					setIsApiError(false);
					// send user to some page
					if (response.data.registerStatus) {
						showLogin();
					}
				}
			})
			.catch((error) => {
				if (error) {
					setIsApiError(true);
				}
			})
	}

	return (
		<form className='register-form row g-3' onSubmit={onSubmitForm}>
			<div className="col-md-6">
				<label htmlFor="firstName" className="form-label">First name</label>
				<input type="text" className="form-control" id="firstName" name='firstName'
							 onChange={handleInputFieldChange}/>
			</div>
			<div className="col-md-6">
				<label htmlFor="lastName" className="form-label">Last name</label>
				<input type="text" className="form-control" id="lastName" name='lastName' onChange={handleInputFieldChange}/>
			</div>
			<div className="col-12">
				<label htmlFor="email" className="form-label">Email</label>
				<input type="email" className="form-control" id="email" name='email' onChange={handleInputFieldChange}/>
			</div>
			<div className="col-6">
				<label htmlFor="username" className="form-label">Username</label>
				<input type="text" className="form-control" id="username" name='username' onChange={handleInputFieldChange}/>
			</div>
			<div className="col-md-6">
				<label htmlFor="password" className="form-label">Password</label>
				<input type="password" className="form-control" id="password" name='password'
							 onChange={handleInputFieldChange}/>
			</div>
			<div className="col-md-12">
				<label htmlFor="address" className="form-label">Address</label>
				<input type="text" className="form-control" id="address" name='address' onChange={handleInputFieldChange}/>
			</div>
			<div className="col-md-12">
				<label htmlFor="city" className="form-label">City</label>
				<input type="text" className="form-control" id="city" name='city' onChange={handleInputFieldChange}/>
			</div>
			<div className="col-12">
				<button type='submit' class='register-btn'>Register</button>
			</div>


			{/*<label htmlFor='firstName'>Firs name</label>*/}
			{/*<input id='firstName' type='text' name='firstName' onChange={handleInputFieldChange}/>*/}

			{/*<label htmlFor='lastName'>Last name</label>*/}
			{/*<input id='lastName' type='text' name='lastName' onChange={handleInputFieldChange}/>*/}

			{/*<label htmlFor='email'>Email</label>*/}
			{/*<input id='email' type='text' name='email' onChange={handleInputFieldChange}/>*/}

			{/*<label htmlFor='username'>Username</label>*/}
			{/*<input id='username' type='text' name='username' onChange={handleInputFieldChange}/>*/}

			{/*<label htmlFor='password'>Password</label>*/}
			{/*<input id='password' type='password' name='password' onChange={handleInputFieldChange}/>*/}

			{/*<label htmlFor='address'>Address</label>*/}
			{/*<input id='address' type='text' name='address' onChange={handleInputFieldChange}/>*/}

			{/*<label htmlFor='city'>City</label>*/}
			{/*<input id='city' type='text' name='city' onChange={handleInputFieldChange}/>*/}


			{isApiFinish ? <p>Registration successful.</p> : null}
			{isApiError ? <p>Error while registering.</p> : null}
			{!isFormValid ? <p>Please check all fields.</p> : null}
		</form>
	);
};

export default Register;