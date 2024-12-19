import useMemes from "./hooks/useMemes";
import MemeCard from "./components/meme";
import React, { useState, useContext } from "react";
import { ContextoAutenticacion } from "./context/autenticacionContext";
import './memeApp.css';
import ModalAutenticacion from "./components/login";
import ModalRegistro from "./components/registro";

const MemeApp = () => {
  const { memes, estaCargando, cargarMasMemes, actualizarMemes } = useMemes();
  const [modalAutenticacionVisible, setModalAutenticacionVisible] = useState(false);
  const [modalRegistroVisible, setModalRegistroVisible] = useState(false);

  const manejarCambioDeOrden = (e) => {
    const nuevoSort = e.target.value;
    actualizarMemes(nuevoSort);
  };

  const { estaAutenticado } = useContext(ContextoAutenticacion);

  return (
    <div className="meme-app">
      <div className="cabecera">
      <h1 className="title">Galería de Memes</h1>

      {estaAutenticado ? (
        <p>Usuario logueado</p>
      ) : (
        <div>
        <button className="login"
        onClick={() => setModalAutenticacionVisible(true)}>Ingresar</button>
        <button className="register"
        onClick={() => setModalRegistroVisible(true)}>Registrar</button>
        </div>
      )} 
      </div>
      <select onChange={manejarCambioDeOrden}>
        <option value="top">Más likes</option>
        <option value="new">Más recientes</option>
      </select>

      {memes.length === 0 && !estaCargando && <p>No hay memes disponibles.</p>}

      <div className="meme-grid">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>

      {estaCargando && <p>Cargando...</p>}

      <button onClick={cargarMasMemes} disabled={estaCargando}>
        Cargar más
      </button>

      <ModalAutenticacion
        visible={modalAutenticacionVisible}
        actualizaVisibilidad={setModalAutenticacionVisible}
      />

      <ModalRegistro
        visible={modalRegistroVisible}
        actualizaVisibilidad={setModalRegistroVisible}
      />
    </div>
  );
};

export default MemeApp;