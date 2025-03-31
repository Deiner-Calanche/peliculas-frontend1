import React from "react";

export const TipoCard = ({ tipo }) => {
    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Tipo</h5>
                    <hr />
                    <p className="card-text">{`Nombre: ${tipo.nombres}`}</p>
                    <p className="card-text">{`Estado: ${tipo.estado}`}</p>
                    <p className="card-text">{`Creado: ${new Date(tipo.createdAt).toLocaleDateString()}`}</p>
                </div>
            </div>
        </div>
    );
};
