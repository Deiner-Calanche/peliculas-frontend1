import React from 'react';

export const MediaCard = ({ media, onViewMore }) => {
  return (
    <div className="col">
      <div className="card">
        <img
          className="card-img-top"
          alt={media.titulo || 'Imagen no disponible'}
          src={media.imagen || 'placeholder.jpg'}
        />
        <div className="card-body">
          <h5 className="card-title">Detalles de Media</h5>
          <p className="card-text">Nombre: {media.titulo || 'Desconocido'}</p>
          <p className="card-text">
            Año de Estreno: {media.anioEstreno ? new Date(media.anioEstreno).toLocaleDateString('es-ES') : 'No disponible'}
          </p>
          <p className="card-text">Género: {media.genero?.nombre || 'No especificado'}</p>
          <p className="card-text">Productora: {media.productora?.nombre || 'No especificada'}</p>
          <p className="card-text">Tipo: {media.tipo?.nombre || 'No especificado'}</p>
          <button className="btn btn-primary" onClick={onViewMore}>
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};
