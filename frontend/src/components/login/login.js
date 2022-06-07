import React, {useEffect, useState} from 'react';

import "./style.scss"
import AuthService from "../../services/authService";

let styleFr = {
    transform: "scale(0)",
    transition: "1s ease"
}

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValidForm, setIsValidForm] = useState(true);
    const [fadeForm, setFadeForm] = useState({
        transform: "scale(0)",
        transition: "1s ease"
    });

    useEffect(() => {
        setFadeForm({
            transform: "scale(1)",
            transition: "1s ease"
        })
    }, []);


    const onUsernameInput = (e) => setUsername(e.target.value)
    const onPasswordChange = (e) => setPassword(e.target.value)


    const onSubmitForm = (e) => {
        e.preventDefault()
        if (!username || !password) {
            setIsValidForm(false)
            return
        }
        setIsValidForm(true);

        AuthService.login({username, password}).then(res => {
            if (res && res.status === 200) {
                console.log(res)
            }
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <form style={fadeForm} className="login-form" onSubmit={onSubmitForm} method="post">
            <label htmlFor="username">User name</label>
            <input type="text" id="username" onInput={onUsernameInput}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onInput={onPasswordChange}/>
            <button>OK</button>
            {!isValidForm && <p>Username and password is required!</p>}
        </form>
    );
}

export default Login;