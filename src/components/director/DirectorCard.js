import react from "react";

export const DirectorCard = ({ director }) => {
    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Director</h5>
                    <hr />
                    <p className="card-text">{`Nombre:${director.nombres}`}</p>
                    <p className="card-text">{`Estado;${director.estado}`}</p>
                    <p className="card-text">{`Creado: ${new Date(director.createdAt).toLocaleDateString()}`}</p>


                </div>
            </div>

        </div>

    )
}


