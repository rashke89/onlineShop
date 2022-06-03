import React from "react";

function AuthPage(){
    const [username, setUsername]=React.useState("");
    const onUsernameChange=event=> setUsername(event.target.value);


    const [password, setPassword]=React.useState("");
    const onPasswordChange=event=>setPassword(event.target.value)

    return(
        <div className="auth-wrapper">
            <h1>AUTH LOGIN WRAPPER</h1>
            <form>
                <label htmlFor="username">User name:</label>
                <input id="username" type="text" onChange={(event)=>{
                    onUsernameChange(event)}}/><br/>

                <label htmlFor="password">Password:</label>
                <input id="password" type="password" onChange={onPasswordChange}/>
            </form>
        </div>
    )
}

export default AuthPage;