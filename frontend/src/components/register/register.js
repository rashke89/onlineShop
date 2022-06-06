import React, {useState} from 'react';
import AuthService from "../../services/authService";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValidForm, setIsValidForm] = useState(true);

    const onFirstNameInput = (e) => setFirstName(e.target.value)
    const onLastNameInput = (e) => setLastName(e.target.value)
    const onUsernameInput = (e) => setUsername(e.target.value)
    const onPasswordChange = (e) => setPassword(e.target.value)

    const onSubmitForm = (e) => {
        e.preventDefault()
        if (!username || !password || !firstName || !lastName) {
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
        <form onSubmit={onSubmitForm} method="post">

            <label htmlFor="first-name">First name</label>
            <input type="text" id="first-name" onInput={onFirstNameInput}/>
            <label htmlFor="last-name">First name</label>
            <input type="text" id="last-name" onInput={onLastNameInput}/>
            <label htmlFor="username">User name</label>
            <input type="text" id="username" onInput={onUsernameInput}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onInput={onPasswordChange}/>
            <button>OK</button>
            {!isValidForm && <p>All fields is required!</p>}
        </form>
    );
}

export default Register;