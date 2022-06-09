import React from "react";
import AuthService from "../services/AuthService";
import {resetFirstInputPolyfill} from "web-vitals/dist/modules/lib/polyfills/firstInputPolyfill";
function AuthPage(){
    const [username, setUsername]=React.useState("");
    const [password, setPassword]=React.useState("");
    const [isFormValid,setIsFormValid]=React.useState(true);

    const onUsernameChange=event=>setUsername(event.target.value);
    const onPasswordChange=event=>setPassword(event.target.value)

    const onSubmitForm= event =>{ //what happened when submit form
        event.preventDefault();
        console.log(username);
        console.log(password);
        if(!username || !password){
            setIsFormValid(false);
            return;
        }
        setIsFormValid(true);
        let body={username: username, password:password};
        //api call
        AuthService.login(body)//send data to server
            .then((response)=>{// response from server
                if(response && response.status===200){
                    console.log(response);
                    //ToDO send user to some page

                }
            } )
            .catch((error)=> console.log(error))
    }

    return (
        <div className="auth-wrapper">
        <h1>AUTH LOGIN WRAPPER</h1>
        <form onSubmit={event=>onSubmitForm(event)}>
            <label htmlFor="username">User name:</label>
            <input id="username" type="text" onChange={event =>{
                onUsernameChange(event)}}/><br/>

            <label htmlFor="password">Password:</label>
            <input id="password" type="password" onChange={onPasswordChange}/> <br/>
            { !isFormValid ? <p>All fields are required</p>:null}
            <input type="submit" value="send data"/>
        </form>
    </div>
    )
}

export default AuthPage;