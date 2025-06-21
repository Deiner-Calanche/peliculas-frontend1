import React, { useEffect, useState } from "react";
import { getUsuarios, createUsuario } from "../services/usuarioService";
import { UsuarioCard } from "./UsuarioCard";
import { logout } from "../services/authService";
import "../views/css/AdminPanel.css";

export const AdminPanel = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "Administrador",
    estado: "Activo",
  });

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (err) {
      alert("Error al obtener usuarios");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createUsuario(form);
      alert("Usuario creado");
      setForm({
        nombre: "",
        email: "",
        password: "",
        rol: "Administrador",
        estado: "Activo",
      });
      fetchUsuarios();
    } catch (err) {
      alert("Error al crear usuario: " + err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      <button className="logout-btn" onClick={() => { logout(); window.location.reload(); }}>
        Cerrar sesión
      </button>

      <form onSubmit={handleCreate}>
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <input
          placeholder="Correo"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <select
          value={form.rol}
          onChange={(e) => setForm({ ...form, rol: e.target.value })}
        >
          <option value="Administrador">Administrador</option>
          <option value="Usuario">Usuario</option>
        </select>
        <select
          value={form.estado}
          onChange={(e) => setForm({ ...form, estado: e.target.value })}
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <button type="submit">Crear Usuario</button>
      </form>

      <hr />

      {usuarios.map((u) => (
        <UsuarioCard key={u._id} usuario={u} />
      ))}
    </div>
  );
};
