import React, { useState, useEffect } from 'react';
import { createGenero, getGeneros, updateGenero, deleteGenero } from '../../services/generoService';
import Swal from 'sweetalert2';
import moment from 'moment';

export const GeneroView = () => {
  const [valuesForm, setValuesForm] = useState({ nombre: '', estado: '', descripcion: '' });
  const [generos, setGeneros] = useState([]);
  const { nombre, estado, descripcion } = valuesForm;
  const [generoSelect, setGeneroSelect] = useState(null);

  const listGeneros = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      const resp = await getGeneros();
      setGeneros(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listGeneros();
  }, []);

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  };

  const handleCreateGenero = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Guardando...',
      });
      Swal.showLoading();
      if (generoSelect) {
        await updateGenero(generoSelect, valuesForm);
        setGeneroSelect(null);
      } else {
        await createGenero(valuesForm);
      }
      setValuesForm({ nombre: '', estado: '', descripcion: '' });
      listGeneros();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleUpdateGenero = (e, genero) => {
    e.preventDefault();
    setValuesForm({
      nombre: genero.nombre,
      estado: genero.estado,
      descripcion: genero.descripcion,
    });
    setGeneroSelect(genero._id);
  };

  const handleDeleteGenero = (e, generoId) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este género se eliminará!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteGenero(generoId);
          listGeneros();
          Swal.fire('Eliminado', 'El género ha sido eliminado', 'success');
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="container-fluid mt-4">
      <form onSubmit={handleCreateGenero}>
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                required
                name="nombre"
                value={nombre}
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
          <div className="col-lg-12">
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                name="descripcion"
                value={descripcion}
                className="form-control"
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
        <button className="btn btn-primary mb-3">Guardar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Descripción</th>
            <th scope="col">Fecha Creación</th>
            <th scope="col">Fecha Actualización</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.length > 0 &&
            generos.map((genero, index) => (
              <tr key={genero._id}>
                <th scope="row">{index + 1}</th>
                <td>{genero.nombre}</td>
                <td>{genero.estado}</td>
                <td>{genero.descripcion}</td>
                <td>{moment(genero.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(genero.updatedAt).format('DD-MM-YYYY HH:mm')}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={(e) => handleUpdateGenero(e, genero)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => handleDeleteGenero(e, genero._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
