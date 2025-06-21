import React, { useEffect, useState } from 'react';
import { createUsuario, getUsuarios, updateUsuario, deleteUsuario } from '../../services/usuarioService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const UsuarioView = () => {
  const [valuesForm, setValuesForm] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const { nombre = '', email = '', estado = '', rol = '' } = valuesForm;
  const [usuarioSelect, setUsuarioSelect] = useState(null);

  const listUsuarios = async () => {
    try {
      Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
      Swal.showLoading();
      const resp = await getUsuarios();
      setUsuarios(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listUsuarios();
  }, []);

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  };

  const handleCreateUsuario = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({ allowOutsideClick: false, text: 'Guardando...' });
      Swal.showLoading();
      if (usuarioSelect) {
        await updateUsuario(usuarioSelect, valuesForm);
        setUsuarioSelect(null);
      } else {
        await createUsuario(valuesForm);
      }
      setValuesForm({ nombre: '', email: '', estado: '', rol: '' });
      listUsuarios();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleUpdateUsuario = (e, usuario) => {
    e.preventDefault();
    setValuesForm({
      nombre: usuario.nombre,
      email: usuario.email,
      estado: usuario.estado,
      rol: usuario.rol
    });
    setUsuarioSelect(usuario._id);
  };

  const handleDeleteUsuario = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Está seguro de eliminar este usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
        await deleteUsuario(id);
        Swal.fire('Eliminado', 'El usuario fue eliminado.', 'success');
        listUsuarios();
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
    }
  };

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={handleCreateUsuario}>
        <div className="row">
          <div className="col-lg-3">
            <label className="form-label">Nombre</label>
            <input required name='nombre' value={nombre} type="text" className="form-control" onChange={handleOnChange} />
          </div>
          <div className="col-lg-3">
            <label className="form-label">Email</label>
            <input required name='email' value={email} type="email" className="form-control" onChange={handleOnChange} />
          </div>
          <div className="col-lg-3">
            <label className="form-label">Estado</label>
            <select required name='estado' value={estado} className="form-select" onChange={handleOnChange}>
              <option value="">--SELECCIONE--</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div className="col-lg-3">
            <label className="form-label">Rol</label>
            <select required name='rol' value={rol} className="form-select" onChange={handleOnChange}>
              <option value="">--SELECCIONE--</option>
              <option value="Administrador">Administrador</option>
              <option value="Operador">Operador</option>
              <option value="Invitado">Invitado</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary my-3">Guardar</button>
      </form>

      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Rol</th>
            <th>Fecha Creación</th>
            <th>Fecha Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={usuario._id}>
              <td>{index + 1}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.estado}</td>
              <td>{usuario.rol}</td>
              <td>{moment(usuario.createdAt).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(usuario.updatedAt).format('DD-MM-YYYY HH:mm')}</td>
              <td>
                <button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateUsuario(e, usuario)}>Actualizar</button>
                <button className='btn btn-danger btn-sm' onClick={() => handleDeleteUsuario(usuario._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
