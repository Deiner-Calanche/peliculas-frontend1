import React from "react";
import "../views/css/Unauthorized.css";

export const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <h1>⛔ Acceso Denegado</h1>
        <p>No tienes permisos para acceder a esta página.</p>
        <a href="/">🏠 Volver al inicio</a>
      </div>
    </div>
  );
};
