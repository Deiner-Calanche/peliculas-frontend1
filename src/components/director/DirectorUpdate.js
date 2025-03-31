import React, { useState, useEffect } from 'react';
import { updateDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
import { Button } from '../../components/ui/button';




export const DirectorUpdate = ({ handleCloseModal, director }) => {
    const [nombres, setNombres] = useState('');
    const [estado, setEstado] = useState('Activo');

    useEffect(() => {
        if (director) {
            setNombres(director.nombres.trim());
            setEstado(director.estado.trim());
        }
    }, [director]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDirector(director._id, { nombres, estado });
            Swal.fire('Éxito', 'Director actualizado correctamente', 'success');
            handleCloseModal();
        } catch (error) {
            Swal.fire('Error', 'No se pudo actualizar el director', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-lg font-semibold mb-4">Editar Director</h2>
            <label className="block font-medium">Nombres</label>
            <input
                type="text"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                required
                className="w-full p-2 border rounded-md mb-3"
            />
            <label className="block font-medium">Estado</label>
            <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
                className="w-full p-2 border rounded-md mb-4"
            >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
            </select>
            <div className="flex justify-end gap-3">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                    <i className="fa-solid fa-save mr-2"></i> Actualizar
                </Button>
                <Button onClick={handleCloseModal} className="bg-gray-400 hover:bg-gray-500">
                    Cancelar
                </Button>
            </div>
        </form>
    );
};
