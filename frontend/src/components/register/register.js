import React, {useEffect, useRef, useState} from 'react';
import AuthService from "../../services/authService";


function Register() {
    const genderSelect = useRef();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [isValidForm, setIsValidForm] = useState(true);
    const [fadeForm, setFadeForm] = useState({
        transform: "scale(0)",
        transition: "1s ease"
    });
    useEffect(() => {
        setGender(genderSelect.current.value);
        setFadeForm({
            transform: "scale(1)",
            transition: "1s ease"
        })
    }, []);

    const onFirstNameInput = (e) => setFirstName(e.target.value)
    const onLastNameInput = (e) => setLastName(e.target.value)
    const onUsernameInput = (e) => setUsername(e.target.value)
    const onPasswordInput = (e) => setPassword(e.target.value)
    const onGenderChange = (e) => setGender(e.target.value)
    const onEmailInput = (e) => setEmail(e.target.value)

    const onSubmitForm = (e) => {
        e.preventDefault()

        if (!username || !password || !firstName || !lastName || !email) {
            setIsValidForm(false)
            return
        }
        setIsValidForm(true);

        AuthService.register({username, password, gender, firstName, lastName, email}).then(res => {
            if (res && res.status === 200) {
                console.log(res)
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (

        <form style={fadeForm} className="register-form" onSubmit={onSubmitForm} method="post">
            <label htmlFor="first-name">First name</label>
            <input type="text" id="first-name" onInput={onFirstNameInput}/>
            <label htmlFor="last-name">Last name</label>
            <input type="text" id="last-name" onInput={onLastNameInput}/>
            <label htmlFor="gender">Gender</label>
            <select ref={genderSelect} id="gender" onChange={onGenderChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onInput={onEmailInput}/>
            <label htmlFor="username">User name</label>
            <input type="text" id="username" onInput={onUsernameInput}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onInput={onPasswordInput}/>
            <button>OK</button>
            {!isValidForm && <p>All fields is required!</p>}
        </form>

    );
}

export default Register;