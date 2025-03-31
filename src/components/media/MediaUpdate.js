import React, { useState, useEffect } from 'react';
import { getMedioById, updateMedio } from '../../services/mediaService';
import { getGeneros } from '../../services/generoService';
import { getTipos } from '../../services/tipoService';
import { getProductoras } from '../../services/productoraService';
import { getDirectores } from '../../services/directorService';
import Swal from 'sweetalert2';
import './MediaUpdate.css';

export const MediaUpdate = ({ handleOpenModal, medioId, listMedios }) => {
  const [formData, setFormData] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    anioEstreno: '',
    imagen: '',
    genero: '',
    tipo: '',
    productora: '',
    director: '',
  });

  const [loading, setLoading] = useState(false);
  const [generos, setGeneros] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [directores, setDirectores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (medioId) {
          const { data } = await getMedioById(medioId);
          setFormData({
            serial: data.serial || '',
            titulo: data.titulo || '',
            sinopsis: data.sinopsis || '',
            anioEstreno: data.anioEstreno ? new Date(data.anioEstreno).toISOString().split('T')[0] : '',
            imagen: data.imagen || '',
            genero: data.genero?._id || '',
            tipo: data.tipo?._id || '',
            productora: data.productora?._id || '',
            director: data.director?._id || '',
          });
        }

        // Cargar datos desde el backend
        const [generosRes, tiposRes, productorasRes, directoresRes] = await Promise.all([
          getGeneros(),
          getTipos(),
          getProductoras(),
          getDirectores(),
        ]);

        setGeneros(generosRes.data || []);
        setTipos(tiposRes.data || []);
        setProductoras(productorasRes.data || []);
        setDirectores(directoresRes.data || []);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [medioId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({ allowOutsideClick: false, text: 'Guardando cambios...' });
      Swal.showLoading();
      await updateMedio(medioId, formData);
      Swal.fire('Éxito', 'Película actualizada correctamente', 'success');
      handleOpenModal();
      listMedios();
    } catch (error) {
      console.error('Error al actualizar:', error);
      Swal.fire('Error', 'No se pudo actualizar la película', 'error');
    }
  };

  return (
    <div className="modal" onClick={handleOpenModal}>
      <div className="modal-content p-4" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={handleOpenModal}>×</span>
        <h2 className="mb-3 text-center">Editar Película</h2>
        {loading ? <p className="text-center">Cargando...</p> : (
          <form onSubmit={handleSubmit} className="media-form">
            <div className="row">
              <div className="col-md-6">
                <label>Serial:</label>
                <input type="text" className="form-control" name="serial" value={formData.serial} onChange={handleChange} required />

                <label>Título:</label>
                <input type="text" className="form-control" name="titulo" value={formData.titulo} onChange={handleChange} required />

                <label>Sinopsis:</label>
                <textarea className="form-control" name="sinopsis" value={formData.sinopsis} onChange={handleChange} required />

                <label>Año de Estreno:</label>
                <input type="date" className="form-control" name="anioEstreno" value={formData.anioEstreno} onChange={handleChange} required />

                <label>URL de Imagen:</label>
                <input type="text" className="form-control" name="imagen" value={formData.imagen} onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <label>Género:</label>
                <select className="form-control" name="genero" value={formData.genero} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {generos.map((gen) => (
                    <option key={gen._id} value={gen._id}>{gen.nombre}</option>
                  ))}
                </select>

                <label>Tipo:</label>
                <select className="form-control" name="tipo" value={formData.tipo} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {tipos.map((tip) => (
                    <option key={tip._id} value={tip._id}>{tip.nombre}</option>
                  ))}
                </select>

                <label>Productora:</label>
                <select className="form-control" name="productora" value={formData.productora} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {productoras.map((prod) => (
                    <option key={prod._id} value={prod._id}>{prod.nombre}</option>
                  ))}
                </select>

                <label>Director:</label>
                <select className="form-control" name="director" value={formData.director} onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  {directores.map((dir) => (
                    <option key={dir._id} value={dir._id}>{dir.nombres}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success">Guardar Cambios</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={handleOpenModal}>Cancelar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
