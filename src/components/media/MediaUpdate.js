import React, { useState, useEffect } from "react";
import { getMedioById, updateMedio } from "../../services/mediaService";
import { getGeneros } from "../../services/generoService";
import { getDirectores } from "../../services/directorService";
import { getProductoras } from "../../services/productoraService";
import { getTipos } from "../../services/tipoService";
import Swal from "sweetalert2";
import { useParams, useHistory } from "react-router-dom";

export const MediaUpdate = () => {
  const { mediaId } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState(null);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [mediaRes, generosRes, directoresRes, productorasRes, tiposRes] =
          await Promise.all([
            getMedioById(mediaId),
            getGeneros(),
            getDirectores(),
            getProductoras(),
            getTipos(),
          ]);
        setMedia(mediaRes.data);
        setGeneros(generosRes.data);
        setDirectores(directoresRes.data);
        setProductoras(productorasRes.data);
        setTipos(tiposRes.data);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error cargando los datos del medio",
        });
      }
    };
    loadData();
  }, [mediaId]);

  const handleChange = (e) => {
    setMedia({
      ...media,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      serial,
      titulo,
      sinopsis,
      url,
      imagen,
      anio_estreno,
      genero,
      director,
      productora,
      tipo,
    } = media;

    if (
      !serial ||
      !titulo ||
      !sinopsis ||
      !url ||
      !imagen ||
      !anio_estreno ||
      !genero ||
      !director ||
      !productora ||
      !tipo
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos obligatorios",
      });
      return;
    }

    try {
      setLoading(true);
      await updateMedio(mediaId, {
        ...media,
        anio_estreno: Number(anio_estreno),
      });
      Swal.fire({
        icon: "success",
        title: "Actualizado",
        text: "Contenido multimedia actualizado correctamente",
      });
      history.push("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.mensaje || "No se pudo actualizar el medio",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!media) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div className="container mt-4">
      <h3>Editar Medio</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Serial:</label>
          <input
            type="text"
            name="serial"
            value={media.serial}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={media.titulo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Sinopsis:</label>
          <textarea
            name="sinopsis"
            value={media.sinopsis}
            onChange={handleChange}
            className="form-control"
            rows="3"
            required
          />
        </div>
        <div className="mb-3">
          <label>URL:</label>
          <input
            type="url"
            name="url"
            value={media.url}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Imagen (URL):</label>
          <input
            type="url"
            name="imagen"
            value={media.imagen}
            onChange={handleChange}
            className="form-control"
            required
          />
          {media.imagen && (
            <div className="mt-2 text-center">
              <img
                src={media.imagen}
                alt="Vista previa"
                style={{
                  maxHeight: "200px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}
        </div>

        <div className="mb-3">
          <label>Año de Estreno:</label>
          <input
            type="number"
            name="anio_estreno"
            value={media.anio_estreno}
            onChange={handleChange}
            className="form-control"
            min="1900"
            max={new Date().getFullYear()}
            required
          />
        </div>
        <div className="mb-3">
          <label>Tipo:</label>
          <select
            name="tipo"
            value={media.tipo}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Seleccione un tipo...</option>
            {tipos.map((tipo) => (
              <option key={tipo._id} value={tipo._id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Género:</label>
          <select
            name="genero"
            value={media.genero}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Seleccione un género...</option>
            {generos.map((genero) => (
              <option key={genero._id} value={genero._id}>
                {genero.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Director:</label>
          <select
            name="director"
            value={media.director}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Seleccione un director...</option>
            {directores.map((director) => (
              <option key={director._id} value={director._id}>
                {director.nombres}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Productora:</label>
          <select
            name="productora"
            value={media.productora}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Seleccione una productora...</option>
            {productoras.map((productora) => (
              <option key={productora._id} value={productora._id}>
                {productora.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-danger"
            title="Cerrar"
            onClick={() => history.push("/")}
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              lineHeight: "1",
              padding: "0.4rem 0.75rem",
            }}
          >
            &times;
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push("/")}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Guardando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
