import React, {useEffect, useRef, useState} from 'react';
import AuthService from "../../services/authService";

function Register({showLoginForm}) {
    const genderSelect = useRef();
    const [userData, setUserData] = useState({
        username: "",
        lastName: "",
        firstName: "",
        password: "",
        email: "",
        gender: "",
        address: "",
        city: "",
    });

    const [isValidForm, setIsValidForm] = useState(true);
    const [isApiErr, setIsApiErr] = useState(false);
    const [isApiFinish, setIsApiFinish] = useState(false);


    useEffect(() => {
        setUserData({gender: genderSelect.current.value})
    }, []);

    const loginForm = () => showLoginForm(true)
    const onHandleInput = (e) => {
        let newInput = userData
        newInput[e.target.name] = e.target.value
        setUserData(newInput)
    }

    const onSubmitForm = (e) => {
        e.preventDefault()

        if (!userData.username || !userData.password || !userData.firstName || !userData.lastName || !userData.email || !userData.email.includes("@")) {
            setIsValidForm(false)
            return
        }
        setIsValidForm(true);

        AuthService.register(userData).then(res => {
            if (res && res.status === 200) {
                console.log(res)
                setIsApiErr(false)
                setIsApiFinish(true)
            }
        }).catch(err => {
            console.log(err);
            setIsApiErr(true)
        })
    }

    return (
        <form onSubmit={onSubmitForm} method="post">
            <h1>Register</h1>
            <label htmlFor="first-name">First name</label>
            <input className="form-control" type="text" id="first-name" name="firstName" onInput={onHandleInput}/>

            <label htmlFor="last-name">Last name</label>
            <input className="form-control" type="text" id="last-name" name="lastName" onInput={onHandleInput}/>

            <label htmlFor="address">Address</label>
            <input className="form-control" type="text" id="address" name="address" onInput={onHandleInput}/>

            <label htmlFor="city">City</label>
            <input className="form-control" type="text" id="city" name="city" onInput={onHandleInput}/>

            <label htmlFor="gender">Gender</label>
            <select className="form-control" ref={genderSelect} id="gender" onInput={onHandleInput}>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <label htmlFor="email">Email</label>
            <input className="form-control" type="email" id="email" name="email" onInput={onHandleInput}/>

            <label htmlFor="username">User name</label>
            <input className="form-control" type="text" id="username" name="username" onInput={onHandleInput}/>

            <label htmlFor="password">Password</label>
            <input className="form-control mb-3" type="password" id="password" name="password" onInput={onHandleInput}/>

            <button type="button" className="btn btn-primary px-5" onClick={loginForm}>Go to login</button>
            <button className="btn btn-success px-5">OK</button>
            {!isValidForm ? <p>All fields is required!</p> : null}
            {isApiFinish ? <p>You are registered!</p> : null}
            {isApiErr ? <p>ERROR: Something wrong with network, please try later!</p> : null}
        </form>
    );
}

export default Register;
