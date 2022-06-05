
import React from "react"; // posto koristimo hook moramo da inportujemo react ovde

function AuthPage(){ // u funkciji se prvo definise state - logika a posle u return ide HTML
    const [username, setUsername] = React.useState('') // prazno je kako bi se moglo menjati  // const predstavlje destrukciju nekog objekta a to je HOOK - username je neka variabla ili state koja ce se koristiti unutar komponente da mi to istisemo negde ako bude trebalo i li da manipulisemo u logici a setusername je funkica kojom cemo mi da setujemo neku vrednost usernama
    // hook setuje state u username // useSTATE je hook koji updatuje state naseg komponenta updatuje ovu variablu
    const [password, setPassword] = React.useState('')

    const onUsernameChange = (event) => {
        console.log(event.target.value); // target value je za username
        setUsername(event.target.value)
    };
    const onPasswordChange = event => setPassword(event.target.value);

    const onSubmitForm = event =>{
        event.preventDefault() // jer je stalno refrasovao stranicu kada opalimo submit
    
       console.log(username)
       console.log(password);

    }
    return(
        <div className="auth-wrapper">
            <h1>Auth login wrapper</h1>
            <form onSubmit = {event => onSubmitForm(event)}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" onChange={(event)=>{onUsernameChange(event)}}></input>
                {username}
                <br/>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange ={onPasswordChange}></input>
                {password}

                <input type ="submit" value="send data"></input>
            </form>

        </div>
    )

}

export default AuthPage; // exportujemo u ekosistem REACT i dostupan je bilo gde

