import React from 'react';

export const MediaDetailsModal = ({ modalData, loading, error, onClose, onEdit }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>×</span>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : modalData ? (
          <div>
            <h2>Detalles de la película</h2>
            <img
              src={modalData.imagen || 'placeholder.jpg'}
              alt={modalData.titulo || 'Imagen no disponible'}
              className="img-fluid"
              style={{ maxHeight: '300px', display: 'block', margin: 'auto' }}
            />
            <p><strong>Título:</strong> {modalData.titulo || 'Sin título'}</p>
            <p><strong>Año de Estreno:</strong> {modalData.anioEstreno ? new Date(modalData.anioEstreno).toLocaleDateString('es-ES') : 'No disponible'}</p>
            <p><strong>Género:</strong> {modalData.genero?.nombre || 'No especificado'}</p>
            <p><strong>Productora:</strong> {modalData.productora?.nombre || 'No especificada'}</p>
            <p><strong>Tipo:</strong> {modalData.tipo?.nombre || 'No especificado'}</p>
            
            {/* Botón para editar */}
            <button className="btn btn-warning mt-3" onClick={() => onEdit(modalData._id)}>
              <i className="fa-solid fa-pen"></i> Editar
            </button>
          </div>
        ) : (
          <p>No se encontraron datos adicionales.</p>
        )}
      </div>
    </div>
  );
};
