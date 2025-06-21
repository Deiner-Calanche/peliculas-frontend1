// src/components/media/MediaView.js
import React, { useState, useEffect } from 'react';
import { getMedios } from '../../services/mediaService';
import { MediaCard } from './MediaCard';
import { MediaNew } from './MediaNew';
import Swal from 'sweetalert2';
import './MediaView.css'; // Asegúrate de tener este archivo

export const MediaView = () => {
  const [medias, setMedias] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listMedias = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        title: 'Cargando',
        text: 'Obteniendo contenido multimedia...',
        didOpen: () => Swal.showLoading()
      });
      const { data } = await getMedios();
      setMedias(data);
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar el contenido multimedia'
      });
    }
  };

  useEffect(() => {
    listMedias();
  }, []);

  const handleOpenModal = () => setOpenModal(!openModal);

  return (
    <div className="media-container">
      <div className="media-header">
        <h2 className="media-title">🎬 Contenido Multimedia</h2>
        <button className="btn btn-primary" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus"></i> Nuevo
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {medias.map((media) => (
          <MediaCard key={media._id} media={media} />
        ))}
      </div>

      {openModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleOpenModal}>&times;</span>
            <MediaNew handleOpenModal={handleOpenModal} listMedias={listMedias} />
          </div>
        </div>
      )}
    </div>
  );
};
