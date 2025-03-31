import React from "react";

export const GeneroCard = ({ genero }) => {
        return (
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Género</h5>
                        <hr />
                        <p className="card-text">{`Nombre: ${genero.nombres}`}</p>
                        <p className="card-text">{`Estado: ${genero.estado}`}</p>
                        <p className="card-text">{`Creado: ${new Date(genero.createdAt).toLocaleDateString()}`}</p>
                    </div>
                </div>
            </div>
    );
};
