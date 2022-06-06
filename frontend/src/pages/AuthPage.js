import React, {useState} from 'react';
import AuthService from "../services/authService";
import "./AuthPage.scss";


function AuthPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValidForm, setIsValidForm] = useState(true);

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
        <div className="auth-wrapper">
            <h1>Authentication login</h1>
            <form onSubmit={onSubmitForm} method="post">
                <label htmlFor="username">User name</label>
                <input type="text" id="username" onInput={onUsernameInput}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onInput={onPasswordChange}/>
                <button>Login</button>

                {!isValidForm && <p>Username and password is required!</p>}
            </form>
        </div>
    );
}

export default AuthPage;