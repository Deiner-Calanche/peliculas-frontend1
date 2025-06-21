import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import "../views/css/LoginForm.css";

export const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const user = await login(email, password);
      loginUser(user); // ✅ Guardamos en el contexto global
      history.push("/"); // ✅ Redirigir al home después del login
    } catch (err) {
      const msg = err.response?.data?.message || "Error al iniciar sesión";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div className="login-container animate-fade-in">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>🎬 Iniciar sesión</h2>

          {errorMsg && <div className="error-box">{errorMsg}</div>}

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>

          <div className="extra-options">
            <label>
              <input type="checkbox" /> Recordarme
            </label>
            <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
          </div>

          <div className="register-link">
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
