import React from 'react';
import { Link } from 'react-router-dom';
import './MediaCard.css';

export const MediaCard = ({ media }) => {
  return (
    <div className="media-card">
      <div className="media-card-inner">
        {media.imagen ? (
          <img
            src={media.imagen}
            alt={media.titulo}
            className="media-image"
          />
        ) : (
          <div className="media-no-image">🎬 Sin imagen</div>
        )}

        <div className="media-info">
          <h5 className="media-title">{media.titulo}</h5>
          <ul className="media-meta">
            <li><strong>🎞️ Serial:</strong> {media.serial}</li>
            <li><strong>🎬 Tipo:</strong> {media.tipo?.nombre || 'No definido'}</li>
            <li><strong>📚 Género:</strong> {media.genero?.nombre || 'No definido'}</li>
            <li><strong>📅 Año:</strong> {media.anio_estreno || 'N/A'}</li>
          </ul>
          {media.sinopsis && (
            <p className="media-sinopsis" title={media.sinopsis}>
              {media.sinopsis}
            </p>
          )}
        </div>

        <div className="media-actions">
          <Link to={`/medias/edit/${media._id}`} className="media-btn edit">
            ✏️ Editar
          </Link>
          <a
            href={media.url}
            target="_blank"
            rel="noopener noreferrer"
            className="media-btn watch"
          >
            ▶️ Ver
          </a>
          <Link to={`/medias/detail/${media._id}`} className="media-btn detail">
            🔍 Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};
