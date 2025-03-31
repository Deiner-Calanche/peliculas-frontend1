import React, { useState, useEffect } from 'react';
import { getGeneros } from '../../services/generoService';
import { getProductoras } from '../../services/productoraService';
import { getDirectores } from '../../services/directorService';
import { getTipos } from '../../services/tipoService';
import { createMedio } from '../../services/mediaService';
import Swal from 'sweetalert2';

export const MediaNew = ({ handleOpenModal, listMedios }) => {
    const [generos, setGeneros] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [valoresForm, setValoresForm] = useState({
        serial: '',
        titulo: '',
        sinopsis: '',
        url: '',
        anioEstreno: '',
        genero: '',
        productora: '',
        director: '',
        tipo: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [generosData, productorasData, directoresData, tiposData] = await Promise.all([
                    getGeneros(), getProductoras(), getDirectores(), getTipos()
                ]);
                setGeneros(generosData.data);
                setProductoras(productorasData.data);
                setDirectores(directoresData.data);
                setTipos(tiposData.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const media = {
            ...valoresForm,
            anioEstreno: new Date(valoresForm.anioEstreno).toISOString(), // Formato ISO
            imagen: valoresForm.url || 'https://via.placeholder.com/200?text=Imagen+no+disponible',
            genero: { _id: valoresForm.genero },
            productora: { _id: valoresForm.productora },
            director: { _id: valoresForm.director },
            tipo: { _id: valoresForm.tipo }
        };
        console.log('Datos enviados:', media);
        try {
            Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
            Swal.showLoading();
            await createMedio(media);
            handleOpenModal();
            listMedios();
            Swal.close();
        } catch (error) {
            console.error(error);
            Swal.close();
        }
    };

    return (
        <div className='sidebar'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3>Nueva Película</h3>
                            <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                        </div>
                    </div>
                </div>
                <div className='row'><div className='col'><hr /></div></div>
                <form onSubmit={handleOnSubmit}>
                    <div className='row'>
                        <div className='col'>
                            <label className='form-label'>Serial</label>
                            <input type='text' name='serial' value={valoresForm.serial} onChange={handleOnChange} required className='form-control' />
                        </div>
                        <div className='col'>
                            <label className='form-label'>Título</label>
                            <input type='text' name='titulo' value={valoresForm.titulo} onChange={handleOnChange} required className='form-control' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label className='form-label'>Sinopsis</label>
                            <input type='text' name='sinopsis' value={valoresForm.sinopsis} onChange={handleOnChange} required className='form-control' />
                        </div>
                        <div className='col'>
                        <label>Año de Estreno</label>
                        <input type='date' name='anioEstreno' value={valoresForm.anioEstreno} onChange={handleOnChange} required className='form-control' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label className='form-label'>URL de Imagen</label>
                            <input type='text' name='url' value={valoresForm.url} onChange={handleOnChange} required className='form-control' />
                        </div>
                    </div>
                    <div className='row'>
                        {valoresForm.url && (
                            <div className='col text-center'>
                                <img src={valoresForm.url} alt="Vista previa" className="img-thumbnail" style={{ maxWidth: '200px' }} />
                            </div>
                        )}
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label className='form-label'>Género</label>
                            <select name='genero' value={valoresForm.genero} onChange={handleOnChange} required className='form-select'>
                                <option value=''>--SELECCIONE--</option>
                                {generos.map(({ _id, nombre }) => <option key={_id} value={_id}>{nombre}</option>)}
                            </select>
                        </div>
                        <div className='col'>
                            <label className='form-label'>Productora</label>
                            <select name='productora' value={valoresForm.productora} onChange={handleOnChange} required className='form-select'>
                                <option value=''>--SELECCIONE--</option>
                                {productoras.map(({ _id, nombre }) => <option key={_id} value={_id}>{nombre}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label className='form-label'>Director</label>
                            <select name='director' value={valoresForm.director} onChange={handleOnChange} required className='form-select'>
                                <option value=''>--SELECCIONE--</option>
                                {directores.map(({ _id, nombres }) => <option key={_id} value={_id}>{nombres}</option>)}
                            </select>
                        </div>
                        <div className='col'>
                            <label className='form-label'>Tipo</label>
                            <select name='tipo' value={valoresForm.tipo} onChange={handleOnChange} required className='form-select'>
                                <option value=''>--SELECCIONE--</option>
                                {tipos.map(({ _id, nombre }) => <option key={_id} value={_id}>{nombre}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'><button className='btn btn-primary'>Guardar</button></div>
                    </div>
                </form>
            </div>
        </div>
    );
};
