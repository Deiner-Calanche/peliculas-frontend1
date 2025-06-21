import React from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
import "../views/css/LoginView.css";

export const LoginView = () => {
  const history = useHistory();

  const onLogin = (user) => {
    if (user?.rol === "Administrador") {
      history.push("/admin");
    } else {
      history.push("/");
    }
  };

  return (
    <div className="login-view">
      <LoginForm onLogin={onLogin} />
    </div>
  );
};
