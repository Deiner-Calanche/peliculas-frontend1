import React, { useState } from 'react';
import { getDirector, createDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
import { Button } from '../../components/ui/button';
import CloseButton from '../../components/ui/CloseButton';



export const DirectorNew = ({ handleCloseModal }) => {
    const [nombres, setNombres] = useState('');
    const [estado, setEstado] = useState('Activo');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Obtener la lista de directores
            const { data: directores } = await getDirector();

            // Verificar si el nombre ya existe (ignorando mayúsculas y espacios)
            const nombreExiste = directores.some(d =>
                d.nombres.trim().toLowerCase() === nombres.trim().toLowerCase()
            );

            if (nombreExiste) {
                return Swal.fire('Error', 'El nombre ya existe. Escriba uno diferente.', 'warning');
            }

            // Si el nombre no existe, proceder con la creación
            await createDirector({ nombres: nombres.trim(), estado });

            Swal.fire('Éxito', 'Director agregado correctamente', 'success');
            handleCloseModal();
        } catch (error) {
            Swal.fire('Error', 'Hubo un problema al agregar el director.', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-xl">
            <CloseButton onClose={handleCloseModal} />  {/* ✅ Agrega el botón de cerrar */}
            <h2 className="text-lg font-semibold mb-4">Agregar Director</h2>
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
                <Button type="submit" className="bg-green-500 hover:bg-green-600">
                    <i className="fa-solid fa-plus mr-2"></i> Agregar
                </Button>
                <Button onClick={handleCloseModal} className="bg-gray-400 hover:bg-gray-500">
                    Cancelar
                </Button>
            </div>
        </form>
    );
};
