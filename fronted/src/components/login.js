import React from "react";
import AuthService from "../services/AuthService";

function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isFormValid, setIsFormValid] = React.useState(true);
    const [apiError, setApiError] = React.useState(false);

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const onPasswordChange = event => setPassword(event.target.value);

    const onSubmitForm = (event) => {
        event.preventDefault();
        console.log('form submit >', username, password);

        if (!username || !password) {
            setIsFormValid(false);
            return;
        }
        setIsFormValid(true);
        let body = {username: username, password: password};

        // api call
        AuthService.login(body)
            .then((response) => {
                if (response && response.status === 200) {
                    console.log('API response -> ', response);
                    //TODO: send user to some page
                }
            })
            .catch((error) => {
                setApiError(true);
                console.log(error);
            });

    };

    return (
        <div className="login-wrapper">
            <h1>Login</h1>
            <form onSubmit={event => onSubmitForm(event)}>
                <label htmlFor="username">User name</label>
                <input id="username" type="text" onChange={(event) => {
                    onUsernameChange(event)
                }}/>
                <br/>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={onPasswordChange}/>

                {!isFormValid ? <p>All fields are required.</p> : null}

                <input type="submit" value="send data"/>

                {apiError ? <p>Doslo je do greske prilikom prijavljivalja, molimo pokusajte ponovo!</p> : ''}
            </form>
        </div>
    )
}

export default Login;

