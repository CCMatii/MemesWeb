import React,{ useState, useContext } from "react";
import { ContextoAutenticacion } from "../context/autenticacionContext";
import { subirMeme } from "../services/memes";
import './memeupload.css';

const ModalSubirMeme = ({ visible, actualizaVisibilidad, actualizarMemes }) => {
    const { credenciales, estaAutenticado } = useContext(ContextoAutenticacion);
  
    const [titulo, actualizaTitulo] = useState("");
    const [descripcion, actualizaDescripcion] = useState("");
    const [imagen, actualizaImagen] = useState(null);
    const [nombreImagen, setNombreImagen] = useState("");
  
    const eligeImagen = (e) => {
      const archivo = e.target.files[0];
      if (archivo) {
        actualizaImagen(archivo);
        setNombreImagen(archivo.name);
      }
    };
  
    const manejaSubida = () => {
      if (!imagen || !titulo || !descripcion) {
        alert("Por favor, complete todos los campos.");
        return;
      }
      if (!estaAutenticado || !credenciales) {
        alert("Debe iniciar sesión para subir memes.");
        return;
      }
      subirMeme(credenciales.access_token, titulo, descripcion, imagen).then(
        ([_, error]) => {
          if (error) {
            alert(error);
            return;
          }
          actualizaVisibilidad(false);
          location.reload();
          return false;
        }
      );
    };
  
    if (!visible) return null;
  
    return (
        <div className="fondoModal">
        <div className="modalSubir">
          <h2>Subir Meme</h2>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => actualizaTitulo(e.target.value)}
          />
    
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => actualizaDescripcion(e.target.value)}
          />
    
          <input
            type="file"
            accept="image/*"
            onChange={eligeImagen}
          />
    
          <button onClick={manejaSubida}>Subir</button>
          <button onClick={() => actualizaVisibilidad(false)}>Cerrar</button>
        </div>
      </div>
    );
  };
  
  export default ModalSubirMeme;
