import React from "react";

function AuthPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onUsernameChange = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
  };

  const onPasswordChange = (event) => setPassword(event.target.value);

  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log(username);
    console.log(password);
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
        {username}
        <br />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" onChange={onPasswordChange} />
        {password}

        <input type="submit" data="send data" />
      </form>
    </div>
  );
}

export default AuthPage;
