import React, { useState, useEffect } from 'react';
import { createDirector, getDirectores, updateDirector, deleteDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
import moment from 'moment';

export const DirectorView = () => {
  const [valuesForm, setValuesForm] = useState({ nombres: '', estado: '' });
  const [directores, setDirectores] = useState([]);
  const { nombres, estado } = valuesForm;
  const [directorSelect, setDirectorSelect] = useState(null);

  const listDirectores = async () => {
    try {
      Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
      Swal.showLoading();
      const resp = await getDirectores();
      setDirectores(resp.data);
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.close();
      Swal.fire('Error', 'No se pudo cargar la lista de directores', 'error');
    }
  };

  useEffect(() => {
    listDirectores();
  }, []);

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  };

  const handleCreateDirector = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({ allowOutsideClick: false, text: 'Guardando...' });
      Swal.showLoading();
      if (directorSelect) {
        await updateDirector(directorSelect, valuesForm);
        setDirectorSelect(null);
      } else {
        await createDirector(valuesForm);
      }
      setValuesForm({ nombres: '', estado: '' });
      listDirectores();
      Swal.close();
      Swal.fire('Éxito', 'Director guardado correctamente', 'success');
    } catch (error) {
      console.error(error);
      Swal.close();
      Swal.fire('Error', 'No se pudo guardar el director', 'error');
    }
  };

  const handleUpdateDirector = (e, director) => {
    e.preventDefault();
    setValuesForm({ nombres: director.nombres, estado: director.estado });
    setDirectorSelect(director._id);
  };

  const handleDeleteDirector = async (e, directorId) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Este director se eliminará!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        await deleteDirector(directorId);
        listDirectores();
        Swal.fire('Eliminado', 'El director ha sido eliminado', 'success');
      }
    } catch (error) {
      console.error(error);
      Swal.close();
      Swal.fire('Error', 'No se pudo eliminar el director', 'error');
    }
  };

  return (
    <div className="container-fluid mt-4">
      <form onSubmit={handleCreateDirector}>
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-3">
              <label className="form-label">Nombres</label>
              <input
                required
                name="nombres"
                value={nombres}
                type="text"
                className="form-control"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select
                required
                name="estado"
                value={estado}
                className="form-select"
                onChange={handleOnChange}
              >
                <option value="">--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        </div>
        <button className="btn btn-primary mb-3">
          {directorSelect ? 'Actualizar' : 'Guardar'}
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombres</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Creación</th>
            <th scope="col">Fecha Actualización</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.length > 0 ? (
            directores.map((director, index) => (
              <tr key={director._id}>
                <th scope="row">{index + 1}</th>
                <td>{director.nombres}</td>
                <td>{director.estado}</td>
                <td>{moment(director.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(director.updatedAt).format('DD-MM-YYYY HH:mm')}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={(e) => handleUpdateDirector(e, director)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => handleDeleteDirector(e, director._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No hay directores para mostrar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
