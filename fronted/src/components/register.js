import React from "react";
import AuthService from "../services/AuthService";


function Register(props) {

    // console.log(props);
    // console.log(props.passThis);
    // console.log(props.passThis());

    function showLogin(e) {
        props.getLogin(e);
    }


    const [newUserObj, setNewUserObj] = React.useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: ''
    });

    const [isFormValid, setIsFormValid] = React.useState(true);
    const [isNewUser, setIsNewUser] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isUsernameCorrect, setIsUsernameCorrect] = React.useState(true);

    const onChangeInput = function (e) {
        let newObj = newUserObj;
        newObj[e.target.name] = e.target.value;
        setNewUserObj(newObj);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (!newUserObj.username || !newUserObj.password || !newUserObj.email || !newUserObj.email.includes('@')) {
            setIsFormValid(false);
            return;
        }

        if (newUserObj.firstName.length < 3) {
            console.log(newUserObj.firstName.length);
            setIsUsernameCorrect(false);
            setIsFormValid(false);
            setIsNewUser(false);
            return;
        }

        setIsUsernameCorrect(true);
        setIsFormValid(true);

        // api call
        AuthService.register(newUserObj)
            .then((response) => {
                if (response && response.status === 200) {
                    console.log('API response -> ', response);
                    //TODO: send user to some page
                    setIsError(false);
                    setIsNewUser(true);
                    showLogin(e);
                    newUserObj.username = '';
                    newUserObj.password = '';
                    newUserObj.email = '';
                    newUserObj.firstName = '';
                    newUserObj.lastName = '';
                    newUserObj.address = '';
                    newUserObj.city = '';
                }
            })
            .catch((error) => {
                setIsError(true);
                console.log(error);
            });
    };

    return (
        <div className="register-wrapper">
            <h1>Register</h1>
            <form onSubmit={event => onSubmitForm(event)}>

                <label
                    htmlFor="firstName">{isUsernameCorrect ? 'First name' : 'First name must be more than 2 characters long'}</label>
                <input id="firstName" name='firstName' type="text" onChange={onChangeInput}/>

                <label htmlFor="lastName">Last name</label>
                <input id="lastName" name='lastName' type="text" onChange={onChangeInput}/>

                <label htmlFor="email">Email</label>
                <input id="email" name='email' type="text" onChange={onChangeInput}/>

                <label htmlFor="username">User name</label>
                <input id="username" name='username' type="text" onChange={onChangeInput}/>

                <label htmlFor="password">Password</label>
                <input id="password" name='password' type="password" onChange={onChangeInput}/>

                <label htmlFor="address">Address</label>
                <input id="address" name='address' type="text" onChange={onChangeInput}/>

                <label htmlFor="city">City</label>
                <input id="city" name='city' type="text" onChange={onChangeInput}/>

                <input type="submit" value="send data"/>
            </form>

            {!isFormValid ? <p>Form is invalid please fill up all inputs</p> : null}

            {isNewUser ? <p>Successfully registered. Congrats!</p> : null}

            {isError ? <p>Something went wrong, please to register again later...</p> : null}


        </div>
    );
}

export default Register;