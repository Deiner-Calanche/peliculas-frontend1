import React, { useState, useEffect } from 'react';
import { getMedios, getMedioById } from '../../services/mediaService';
import { MediaCard } from '../media/MediaCard';
import { MediaNew } from './MediaNew';
import { MediaUpdate } from './MediaUpdate';
import { MediaDetailsModal } from './MediaDetailsModal';
import Swal from 'sweetalert2';
import './MediaView.css';

export const MediaView = () => {
  const [medias, setMedias] = useState([]);
  const [openModalNew, setOpenModalNew] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const listMedias = async () => {
    try {
      Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
      Swal.showLoading();
      const { data } = await getMedios();
      Swal.close();
      setMedias(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al obtener medios:', error);
      Swal.close();
    }
  };

  const fetchMediaDetails = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await getMedioById(id);
      setModalData(data);
    } catch (err) {
      setError('Error al obtener los detalles de la película');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listMedias();
  }, []);

  const handleEdit = (mediaId) => {
    setSelectedMediaId(mediaId);
    setOpenModalUpdate(true);
    setIsModalOpen(false); // Cerrar el modal de detalles cuando abres la edición
  };

  return (
    <div className="container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {medias.length > 0 ? (
          medias.map((media) => (
            <MediaCard key={media._id} media={media} onViewMore={() => {
              setIsModalOpen(true);
              fetchMediaDetails(media._id);
            }} />
          ))
        ) : (
          <p>No hay medios disponibles.</p>
        )}
      </div>

      {openModalNew ? (
        <MediaNew handleOpenModal={() => setOpenModalNew(!openModalNew)} listMedios={listMedias} />
      ) : (
        <button className="btn btn-primary newInv" onClick={() => setOpenModalNew(true)}>
          <i className="fa-solid fa-plus"></i>
        </button>
      )}

      {openModalUpdate && selectedMediaId && (
        <MediaUpdate
          handleOpenModal={() => setOpenModalUpdate(false)}
          medioId={selectedMediaId}
          listMedios={listMedias}
        />
      )}

      {isModalOpen && (
        <MediaDetailsModal
          modalData={modalData}
          loading={loading}
          error={error}
          onClose={() => setIsModalOpen(false)}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};
