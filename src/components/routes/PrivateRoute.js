// src/components/routes/PrivateRoute.js
import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, adminOnly = false, ...rest }) => {
  const token = localStorage.getItem("token");
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    // Si el JSON está malformado, limpiamos el localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    user = null;
  }

  const isAuthenticated = !!token && user;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        }

        if (adminOnly && user.rol !== "Administrador") {
          return <Redirect to="/unauthorized" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};
