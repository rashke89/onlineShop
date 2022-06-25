import React from "react";
import AuthService from "../services/AuthService";
import {Axios} from "axios";
import authService from "../services/AuthService";

// state is value which we use in component (defined value in component)

// auth component:
// 1. user start typing > get state
// 2. validation > both field must be required
//    2.1 show required msg
// call API > create body, url ...

function AuthPage(){

    const [username, setUsername] = React.useState('');  //hook useState, empty string on load
    const [password, setPassword] = React.useState('');
    const [isFormValid, setIsFormValid] = React.useState(true);

    // const [apiError, setApiError] = React.useState(false);

    const onUsernameChange = (event) => {  //user start typing > get state
        console.log(event.target.value);
        setUsername(event.target.value);
    };
    const onPasswordChange = event => setPassword(event.target.value);
    const onSubmitForm = (event)=>{
        event.preventDefault();
        console.log('form submit >',username, password);
        // validation
        if (!username || !password){
            setIsFormValid(false);
            return;
        }
        setIsFormValid(true);

        let body = {username:username, password:password};
        //api call
        AuthService.login(body) //body from postman
            .then((response) => {
                if(response && response.status === 200){
                    console.log('API response ->', response);
                    //TODO: send user to some page
                }
        })
            .catch((error) => {
                console.log(error);
            });

    }

    return(
        <div className='auth-wrapper'>   {/*form login user*/}
            <h1>Auth login wrapper</h1>
            <form action="" onSubmit={event => onSubmitForm(event)}>
                <label htmlFor="username">User name</label>
                <input id='username' type="text" onChange={( event )=>{onUsernameChange(event)}}/>
                <br/>
                <label htmlFor="password">Password</label>
                <input id='password' type="password" onChange={onPasswordChange}/>

                {!isFormValid ? <p>All fields are required.</p> : null}


                <input type="submit" value="Send"/>
            </form>
        </div>
    )
}

export default AuthPage;