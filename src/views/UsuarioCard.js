import React from "react";
import "../views/css/UsuarioCard.css";

export const UsuarioCard = ({ usuario }) => (
  <div className="usuario-card">
    <strong>{usuario.nombre}</strong> ({usuario.rol}) - {usuario.estado}
  </div>
);
