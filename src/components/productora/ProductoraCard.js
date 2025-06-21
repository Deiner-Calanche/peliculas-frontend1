import React from "react";

export const ProductoraCard = ({ productora }) => {
    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Productora</h5>
                    <hr />
                    <p className="card-text">{`Nombre: ${productora.nombre}`}</p>
                    <p className="card-text">{`Estado: ${productora.estado}`}</p>
                    <p className="card-text">{`Creado: ${new Date(productora.createdAt).toLocaleDateString()}`}</p>
                </div>
            </div>
        </div>
    );
};
