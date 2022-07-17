import React, {useState} from "react";
import AuthService from "../../services/authService";
import "./login.scss";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/userSlice";
import {routeConfig} from "../../config/routeConfig";
import {showLoader} from "../../redux/loaderSlice";
import {toast, ToastContainer} from "react-toastify";

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isFormValid, setIsFormValid] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onUsernameChange = event => setUsername(event.target.value);
	const onPasswordChange = event => setPassword(event.target.value);
	const onSubmitForm = (event) => {
		event.preventDefault();

		if (!username || !password) {
			setIsFormValid(false);
			return;
		}
		setIsFormValid(true);

		// Show loader after form validation
		dispatch(showLoader(true));

		// API call
		AuthService.login({username, password})
			.then((res) => {
				if (res && res.status === 200) {
					localStorage.setItem('user', JSON.stringify(res.data));
					dispatch(setUser(res.data));
					navigate(`${res.data.isAdmin ? routeConfig.DASHBOARD.url : routeConfig.HOME.url}`);
				} else {
					toast.info(res.data);
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => dispatch(showLoader(false)));
	}

	return (
		<form className="login-form" onSubmit={onSubmitForm}>
			<div className="mb-3">
				<label htmlFor="username" className="form-label">Username</label>
				<input type="text" className="form-control" id="username" placeholder="Username" onChange={onUsernameChange}/>
			</div>
			<div className="mb-3">
				<label htmlFor="password" className="form-label">Password</label>
				<input type="password" className="form-control" id="password" placeholder="Password"
							 onChange={onPasswordChange}/>
			</div>

			<button type="submit">Login</button>
			{!isFormValid && <p>Username and password are required!</p>}
			<ToastContainer />
		</form>
	);
};

export default Login;