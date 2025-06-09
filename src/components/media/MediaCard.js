import React from 'react';
import { Link } from 'react-router-dom';

export const MediaCard = ({ media }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow rounded border-0" style={{ overflow: 'hidden' }}>
        {media.imagen ? (
          <img
            src={media.imagen}
            className="card-img-top"
            alt={media.titulo}
            style={{ height: '300px', objectFit: 'cover' }}
          />
        ) : (
          <div
            className="bg-dark text-white d-flex justify-content-center align-items-center"
            style={{ height: '300px' }}
          >
            <h5 className="text-center">Sin imagen</h5>
          </div>
        )}

        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold text-dark text-center">{media.titulo}</h5>

          <ul className="list-unstyled mb-2 small text-muted">
            <li><strong>Serial:</strong> {media.serial}</li>
            <li><strong>Tipo:</strong> {media.tipo?.nombre || 'No definido'}</li>
            <li><strong>Género:</strong> {media.genero?.nombre || 'No definido'}</li>
            <li><strong>Año:</strong> {media.anio_estreno || 'N/A'}</li>
          </ul>

          {media.sinopsis && (
            <p className="text-muted text-truncate" title={media.sinopsis}>
              {media.sinopsis}
            </p>
          )}
        </div>

        <div className="card-footer bg-white border-top-0 d-flex justify-content-between px-3 pb-3">
          <Link to={`/medias/edit/${media._id}`} className="btn btn-warning btn-sm">
            <i className="fa-solid fa-pen-to-square"></i> Editar
          </Link>

          <a
            href={media.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-info btn-sm text-white"
          >
            <i className="fa-solid fa-play"></i> Ver
          </a>

          <Link to={`/medias/detail/${media._id}`} className="btn btn-primary btn-sm">
            <i className="fa-solid fa-circle-info"></i> Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};
