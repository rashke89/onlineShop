import React from "react";
import AuthService from "../services/AuthService";


function Register() {

    
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [isFormValid, setIsFormValid] = React.useState(true);
    const [apiError, setApiError] = React.useState(false);


    function onUsernameChange(event) {
        setUsername(event.target.value);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
    }

    function onEmailChange(event) {
        setEmail(event.target.value);
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        console.log('form submit >', username, password);

        if (!username || !password || !email) {
            setIsFormValid(false);
            return;
        }
        setIsFormValid(true);
        let body = {email: email, username: username, password: password};

        // api call
        AuthService.register(body)
            .then((response) => {
                if (response && response.status === 200) {
                    console.log('API response -> ', response);
                    //TODO: send user to some page
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="register-wrapper">
            <h1>Register</h1>
            {/*<form>*/}
            <form onSubmit={event => onSubmitForm(event)}>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" onChange={(event) => {
                    onEmailChange(event)
                }}/>
                <label htmlFor="username">User name</label>
                <input id="username" type="text" onChange={(event) => {
                    onUsernameChange(event)
                }}/>
                <br/>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={onPasswordChange}/>

                <input type="submit" value="send data"/>
            </form>
        </div>
    );
}

export default Register;