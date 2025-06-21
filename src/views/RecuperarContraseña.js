import React, { useState } from "react";
import { recuperarContrasena } from "../services/authService";
import "./css/RecuperarContraseña.css";

const RecuperarContraseña = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const response = await recuperarContrasena(email, newPassword);
      setMensaje(response.message);
      setEmail("");
      setNewPassword("");
    } catch (err) {
      const msg = err.response?.data?.message || "Error al actualizar contraseña.";
      setError(msg);
    }
  };

  return (
    <div className="recuperar-container">
      <form className="recuperar-form" onSubmit={handleSubmit}>
        <h2>🔐 Restablecer Contraseña</h2>

        {mensaje && <div className="success-msg">{mensaje}</div>}
        {error && <div className="error-msg">{error}</div>}

        <input
          type="email"
          placeholder="Correo registrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit">Actualizar contraseña</button>
      </form>
    </div>
  );
};

export default RecuperarContraseña;
