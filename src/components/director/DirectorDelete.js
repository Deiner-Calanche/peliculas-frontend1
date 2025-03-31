import React from 'react';
import { deleteDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
import { Button } from '../../components/ui/button';
import CloseButton from '../../components/ui/CloseButton';


import { motion } from 'framer-motion';

export const DirectorDelete = ({ handleCloseModal, director }) => {
    const handleDelete = async () => {
        try {
            document.body.style.overflow = 'hidden'; // Evita el desplazamiento del fondo

            const confirm = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'No podrás revertir esto.',
                icon: 'warning',
                position: 'center', // Asegura que la alerta esté en el centro
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                allowOutsideClick: false, // Evita cerrar al hacer clic afuera
                allowEscapeKey: false, // Evita cerrar con la tecla Escape
            });

            if (confirm.isConfirmed) {
                await deleteDirector(director._id);
                await Swal.fire({
                    title: 'Eliminado',
                    text: 'El director ha sido eliminado.',
                    icon: 'success',
                    position: 'center',
                    timer: 2000, // Cierra automáticamente en 2 segundos
                    showConfirmButton: false
                });

                handleCloseModal();
            }
        } catch (error) {
            await Swal.fire({
                title: 'Error',
                text: 'No se pudo eliminar el director',
                icon: 'error',
                position: 'center'
            });
        } finally {
            document.body.style.overflow = 'auto'; // Restaura el desplazamiento del fondo
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <CloseButton onClose={handleCloseModal} />  {/* ✅ Agrega el botón de cerrar */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white shadow-lg rounded-xl p-6 w-96 text-center"
            >
                <h2 className="text-lg font-semibold mb-4">Eliminar Director</h2>
                <p className="text-gray-700">
                    ¿Estás seguro de que deseas eliminar a <strong>{director.nombres}</strong>?
                </p>
                <div className="flex justify-center gap-4 mt-6">
                    <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                        <i classNa me="fa-solid fa-trash mr-2"></i> Eliminar
                    </Button>
                    <Button onClick={handleCloseModal} className="bg-gray-400 hover:bg-gray-500">
                        Cancelar
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};
