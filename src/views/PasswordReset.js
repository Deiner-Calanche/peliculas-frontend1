import React, { useState } from "react";
import "../views/css/LoginForm.css";

export const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      // Aquí llamas a la API real
      console.log("Enviando correo a:", email);
      setMensaje("Si el correo está registrado, se ha enviado el enlace de recuperación.");
    } catch (error) {
      setMensaje("Hubo un error al procesar la solicitud.");
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <form className="login-form" onSubmit={handleReset}>
          <h2>Recuperar contraseña</h2>
          <input
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar enlace</button>
          {mensaje && <p style={{ color: "#ccc", marginTop: "10px" }}>{mensaje}</p>}
        </form>
      </div>
    </div>
  );
};
