import React from "react";
import AuthService from "../services/AuthService";

function AuthPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isFormValid, setIsFormValid] = React.useState(true);

  const onUsernameChange = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
  };

  const onPasswordChange = (event) => setPassword(event.target.value);

  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log(username, password);
    if (!username || !password) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
    // api call
    let body = { username: username, password: password };
    AuthService.login(body)
      .then((response) => {
        if (response && response.status === 200) {
          console.log("API resposne -> ", response);
          //TODO: send user to some page
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="auth-wrapper">
      <h1>Auth Login wrapper</h1>
      <form onSubmit={(event) => onSubmitForm(event)}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={(event) => {
            onUsernameChange(event);
          }}
        />

        <br />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" onChange={onPasswordChange} />
        {!isFormValid ? <p>All fields are required.</p> : null}
        <input type="submit" data="send data" />
      </form>
    </div>
  );
}

export default AuthPage;
