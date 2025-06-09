import React, { useState, useEffect } from 'react';
import { createMedio } from '../../services/mediaService';
import { getGeneros } from '../../services/generoService';
import { getDirectores } from '../../services/directorService';
import { getProductoras } from '../../services/productoraService';
import { getTipos } from '../../services/tipoService';
import Swal from 'sweetalert2';

export const MediaNew = ({ handleOpenModal, listMedias }) => {
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [media, setMedia] = useState({
        serial: '',
        titulo: '',
        sinopsis: '',
        url: '',
        imagen: '',
        anio_estreno: '',
        genero: '',
        director: '',
        productora: '',
        tipo: ''
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const [generosResponse, directoresResponse, productorasResponse, tiposResponse] = await Promise.all([
                    getGeneros(),
                    getDirectores(),
                    getProductoras(),
                    getTipos()
                ]);
                setGeneros(generosResponse.data);
                setDirectores(directoresResponse.data);
                setProductoras(productorasResponse.data);
                setTipos(tiposResponse.data);
            } catch (error) {
                console.error("Error cargando datos:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar los datos necesarios'
                });
            }
        };
        loadData();
    }, []);

    const handleChange = e => {
        setMedia({
            ...media,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const {
            serial,
            titulo,
            sinopsis,
            url,
            imagen,
            anio_estreno,
            genero,
            director,
            productora,
            tipo
        } = media;

        if (
            !serial.trim() ||
            !titulo.trim() ||
            !sinopsis.trim() ||
            !url.trim() ||
            !imagen.trim() ||
            !anio_estreno.trim() ||
            !genero || !director || !productora || !tipo
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos obligatorios'
            });
            return;
        }

        const medioToSend = {
            ...media,
            anio_estreno: Number(anio_estreno)
        };

        try {
            setLoading(true);
            await createMedio(medioToSend);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Contenido multimedia agregado correctamente'
            });
            listMedias();
            handleOpenModal();
        } catch (error) {
            console.error("Error al crear:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.mensaje || 'No se pudo crear el contenido multimedia'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='modal-background'>
            <div className='modal-container'>
                <div className='modal-header'>
                    <h5>Nueva Película/Serie</h5>
                    <button className='close' onClick={handleOpenModal}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label>Serial:</label>
                        <input
                            type='text'
                            name='serial'
                            value={media.serial}
                            onChange={handleChange}
                            className='form-control'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Título:</label>
                        <input
                            type='text'
                            name='titulo'
                            value={media.titulo}
                            onChange={handleChange}
                            className='form-control'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Sinopsis:</label>
                        <textarea
                            name='sinopsis'
                            value={media.sinopsis}
                            onChange={handleChange}
                            className='form-control'
                            rows='3'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label>URL:</label>
                        <input
                            type='url'
                            name='url'
                            value={media.url}
                            onChange={handleChange}
                            className='form-control'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Imagen (URL):</label>
                        <input
                            type='url'
                            name='imagen'
                            value={media.imagen}
                            onChange={handleChange}
                            className='form-control'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Año de Estreno:</label>
                        <input
                            type='number'
                            name='anio_estreno'
                            value={media.anio_estreno}
                            onChange={handleChange}
                            className='form-control'
                            min='1900'
                            max={new Date().getFullYear()}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Tipo:</label>
                        <select
                            name='tipo'
                            value={media.tipo}
                            onChange={handleChange}
                            className='form-select'
                            required
                        >
                            <option value=''>Seleccione un tipo...</option>
                            {tipos.map(tipo => (
                                <option key={tipo._id} value={tipo._id}>{tipo.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label>Género:</label>
                        <select
                            name='genero'
                            value={media.genero}
                            onChange={handleChange}
                            className='form-select'
                            required
                        >
                            <option value=''>Seleccione un género...</option>
                            {generos.map(genero => (
                                <option key={genero._id} value={genero._id}>{genero.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label>Director:</label>
                        <select
                            name='director'
                            value={media.director}
                            onChange={handleChange}
                            className='form-select'
                            required
                        >
                            <option value=''>Seleccione un director...</option>
                            {directores.map(director => (
                                <option key={director._id} value={director._id}>{director.nombres}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label>Productora:</label>
                        <select
                            name='productora'
                            value={media.productora}
                            onChange={handleChange}
                            className='form-select'
                            required
                        >
                            <option value=''>Seleccione una productora...</option>
                            {productoras.map(productora => (
                                <option key={productora._id} value={productora._id}>{productora.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className='d-flex justify-content-end gap-2'>
                        <button
                            type='button'
                            className='btn btn-secondary'
                            onClick={handleOpenModal}
                        >
                            Cancelar
                        </button>
                        <button
                            type='submit'
                            className='btn btn-success'
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Guardando...
                                </>
                            ) : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
