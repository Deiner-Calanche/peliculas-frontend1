import React, { useState, useEffect } from 'react';
import { getMedios } from '../../services/mediaService';
import { MediaCard } from './MediaCard';
import { MediaNew } from './MediaNew';
import Swal from 'sweetalert2';

export const MediaView = () => {
  const [medias, setMedias] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listMedias = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getMedios();
      Swal.close();
      setMedias(data);
    } catch (error) {
      console.log(error);
      Swal.close();
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

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className='container'>
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          medias.map((media) => {
            return <MediaCard key={media._id} media={media} />;
          })
        }
      </div>
      {
        openModal ? 
        <MediaNew 
          handleOpenModal={handleOpenModal} 
          listMedias={listMedias} 
        /> :
        <button className='btn btn-primary newInv' onClick={handleOpenModal}>
          <i className="fa-solid fa-plus"></i>
        </button>
      }
    </div>
  );
};