import React, { useState } from "react";
import Login from "../../components/login/login";
import Register from "../../components/register/register";

import "./AuthPage.scss";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-wrapper mx-auto">
      <div className="row">
        <div className="col-md-12 p-5">
          {isLogin ? (
            <Login showLoginForm={setIsLogin} />
          ) : (
            <Register showLoginForm={setIsLogin} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
