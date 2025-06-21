import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMedioById } from '../../services/mediaService';
import './MediaDetail.css';

export const MediaDetail = () => {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const { data } = await getMedioById(id);
        setMedia(data);
        setError(null);
      } catch (err) {
        setError('No se pudo cargar el detalle del medio.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [id]);

  if (loading) return <div className="media-detail-loading">Cargando detalle...</div>;
  if (error) return <p className="media-detail-error">{error}</p>;
  if (!media) return <p className="media-detail-error">No se encontró el medio.</p>;

  return (
    <div className="media-detail-container">
      <div className="media-card">
        {media.imagen && (
          <img
            src={media.imagen}
            alt={media.titulo}
            className="media-image"
          />
        )}
        <div className="media-info">
          <h2 className="media-title">{media.titulo}</h2>
          <ul className="media-list">
            <li><strong>📦 Serial:</strong> {media.serial}</li>
            <li><strong>🎬 Tipo:</strong> {media.tipo?.nombre || 'No definido'}</li>
            <li><strong>🎭 Género:</strong> {media.genero?.nombre || 'No definido'}</li>
            <li><strong>📅 Año de estreno:</strong> {media.anio_estreno || 'N/A'}</li>
            <li>
              <strong>🔗 URL:</strong>{' '}
              <a href={media.url} target="_blank" rel="noopener noreferrer">
                {media.url}
              </a>
            </li>
            <li><strong>📝 Sinopsis:</strong> {media.sinopsis || 'No disponible'}</li>
          </ul>
          <div className="media-back">
            <Link to="/medias" className="media-back-button">
              ← Volver a la lista
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
