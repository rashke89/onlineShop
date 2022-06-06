import React, {useState} from 'react';
import "./AuthPage.scss";


function AuthPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onUsernameInput = (e) => setUsername(e.target.value)
    const onPasswordChange = (e) => setPassword(e.target.value)

    const onSubmitForm = (e) => {
        e.preventDefault()

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
            </form>
        </div>
    );
}

export default AuthPage;