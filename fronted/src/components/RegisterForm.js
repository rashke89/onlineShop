import React, { useState } from "react";
import AuthService from "../services/AuthService";

function RegisterForm() {
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
                // console.log(e.target.name, e.target.value);
                let newUserObj = userObj;
                newUserObj[e.target.name] = e.target.value;
                setUserObj(newUserObj);
        };

        const onSubmitForm = (e) => {
                e.preventDefault();
                if (!userObj.username || !userObj.password || !userObj.email || !userObj.email.includes('@')) {
                        console.log('invalid form -> ', userObj.email);
                        setIsFormValid(false);
                        return;
                }
                setIsFormValid(true);

                AuthService.register(userObj)
                        .then(res => {
                                if (res.status === 200) {
                                        setIsApiFinish(true);
                                        setIsApiError(false);
                                }
                        })
                        .catch(err => {
                                console.log(err);
                                if (err) setIsApiError(true);
                        })

        };
        // render fn
        // render() {
        return (
                <div>

                        <form onSubmit={onSubmitForm}>
                                <label htmlFor="username">User name</label>
                                <input id="username"
                                        type="text"
                                        name="username"
                                        onChange={(event) => { handleInputFieldChange(event) }} />

                                <label htmlFor="password">Password</label>
                                <input id="password"
                                        type="text"
                                        name="password"
                                        onChange={(event) => { handleInputFieldChange(event) }} />

                                <label htmlFor="email">E-mail</label>
                                <input id="email"
                                        type="text"
                                        name="email"
                                        onChange={(event) => { handleInputFieldChange(event) }} />

                                <label htmlFor="firstName">First name</label>
                                <input id="firstName"
                                        type="text"
                                        name="firstName"
                                        onChange={(event) => { handleInputFieldChange(event) }} />

                                <label htmlFor="lastName">Last name</label>
                                <input id="lastName"
                                        type="text"
                                        name="lastName"
                                        onChange={(event) => { handleInputFieldChange(event) }} />

                                <label htmlFor="address">Address</label>
                                <input id="address"
                                        type="text"
                                        name="address"
                                        onChange={(event) => { handleInputFieldChange(event) }} />

                                <label htmlFor="city">City</label>
                                <input id="city"
                                        type="text"
                                        name="city"
                                        onChange={(event) => { handleInputFieldChange(event) }} />

                                <input type="submit" value="Register" />


                        </form>
                        {!isFormValid ? <p>Invalid form.</p> : null}

                        {isApiFinish ? <p>Successfully registered.</p> : null}

                        {isApiError ? <p>ERROR please try later.</p> : null}
                </div>

        )
        // }

}

export default RegisterForm;
