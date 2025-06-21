import React from "react";

export const UsuarioCard = ({ usuario }) => {
    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Usuario</h5>
                    <hr />
                    <p className="card-text">{`Nombre: ${usuario.nombre}`}</p>
                    <p className="card-text">{`Email: ${usuario.email}`}</p>
                    <p className="card-text">{`Rol: ${usuario.rol}`}</p>
                    <p className="card-text">{`Estado: ${usuario.estado}`}</p>
                    <p className="card-text">{`Creado: ${new Date(usuario.createdAt).toLocaleDateString()}`}</p>
                    <p className="card-text">{`Actualizado: ${new Date(usuario.updatedAt).toLocaleDateString()}`}</p>
                </div>
            </div>
        </div>
    );
};
