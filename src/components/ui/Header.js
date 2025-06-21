// src/components/ui/Header.js
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Header.css";

export const Header = () => {
  const history = useHistory();
  const { user, logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    history.push("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🎬 PelículasApp</Link>
      </div>

      <nav className="nav">
        {user ? (
          <>
            <Link to="/" className="nav-link">🏠 Inicio</Link>
            <Link to="/medias" className="nav-link">📺 Medios</Link>

            {user.rol === "Administrador" && (
              <>
                <Link to="/genero" className="nav-link">🎭 Géneros</Link>
                <Link to="/productora" className="nav-link">🏢 Productoras</Link>
                <Link to="/tipo" className="nav-link">🎞️ Tipos</Link>
                <Link to="/director" className="nav-link">🎬 Directores</Link>
                <Link to="/admin" className="nav-link">⚙️ Admin(Usuarios)</Link>
              </>
            )}

            <span className="user-info">
              👤 {user.nombre} ({user.rol})
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="login-link">Iniciar sesión</Link>
        )}
      </nav>
    </header>
  );
};
