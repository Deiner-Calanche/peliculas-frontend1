import React, { useState, useEffect } from 'react';
import { createTipo, getTipos, updateTipo, deleteTipo } from '../../services/tipoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const TipoView = () => {

    const [valuesForm, setValuesForm] = useState({});
    const [tipos, setTipos] = useState([]);
    const { nombre = '', estado = '', descripcion = '' } = valuesForm;
    const [tipoSelect, setTipoSelect] = useState(null);

    const listTipos = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const resp = await getTipos();
            setTipos(resp.data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    };

    useEffect(() => {
        listTipos();
    }, []);

    const handleOnChange = (e) => {
        setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
    };

    const handleCreateTipo = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Guardando...'
            });
            Swal.showLoading();
            if (tipoSelect) {
                await updateTipo(tipoSelect, valuesForm);
                setTipoSelect(null);
            } else {
                await createTipo(valuesForm);
            }
            setValuesForm({ nombre: '', estado: '', descripcion: '' });
            listTipos();
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    };

    const handleUpdateTipo = (e, tipo) => {
        e.preventDefault();
        setValuesForm({
            nombre: tipo.nombre,
            estado: tipo.estado,
            descripcion: tipo.descripcion
        });
        setTipoSelect(tipo._id);
    };

    const handleDeleteTipo = async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Está seguro de eliminar este tipo?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });
            if (result.isConfirmed) {
                await deleteTipo(id);
                Swal.fire('Eliminado', 'El tipo fue eliminado.', 'success');
                listTipos();
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'No se pudo eliminar el tipo.', 'error');
        }
    };

    return (
        <div className='container-fluid mt-4'>
            <form onSubmit={handleCreateTipo}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input required name='nombre' value={nombre} type="text" className="form-control"
                                onChange={handleOnChange} />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Estado</label>
                            <select required name='estado' value={estado} className="form-select" onChange={handleOnChange}>
                                <option value="">--SELECCIONE--</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <textarea name="descripcion" value={descripcion} className="form-control"
                                onChange={handleOnChange} />
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary mb-3">Guardar</button>
            </form>

            <table className='table'>
                <thead>
                    <tr>
                        <th scope='row'>#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Estado</th>
                        <th scope='col'>Descripción</th>
                        <th scope='col'>Fecha Creación</th>
                        <th scope='col'>Fecha Actualización</th>
                        <th scope='col'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tipos.length > 0 && tipos.map((tipo, index) => (
                        <tr key={tipo._id}>
                            <th scope='row'> {index + 1} </th>
                            <td> {tipo.nombre} </td>
                            <td> {tipo.estado} </td>
                            <td> {tipo.descripcion} </td>
                            <td> {moment(tipo.createdAt).format('DD-MM-YYYY HH:mm')} </td>
                            <td> {moment(tipo.updatedAt).format('DD-MM-YYYY HH:mm')} </td>
                            <td>
                                <button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateTipo(e, tipo)}>Actualizar</button>
                                <button className='btn btn-danger btn-sm' onClick={() => handleDeleteTipo(tipo._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
