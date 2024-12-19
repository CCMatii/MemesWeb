import { useState, useContext } from "react";
import { ContextoAutenticacion } from "../context/autenticacionContext";
import './login.css'

const ModalAutenticacion = ({ visible, actualizaVisibilidad }) => {
  const [usuario, actualizaUsuario] = useState("");
  const [contraseña, actualizaContraseña] = useState("");
  const { autenticarUsuario } = useContext(ContextoAutenticacion);

  const manejarEnvio = async () => {
    const esExitoso = await autenticarUsuario(usuario, contraseña);
    if (esExitoso) {
      actualizaVisibilidad(false);
    } else {
      alert("Datos ingresados incorrectamente");
    }
  };

  if (!visible) return null;

  return (
  <div className="fondoModal">
  <div className="modal_autenticacion">
    <h2>Iniciar sesión</h2>
    <input
      type="text"
      placeholder="Usuario"
      value={usuario}
      onChange={(e) => actualizaUsuario(e.target.value)}
      className="datos"
    />
    <input
      type="password"
      placeholder="Contraseña"
      value={contraseña}
      onChange={(e) => actualizaContraseña(e.target.value)}
      className="datos"
    />
    <button className="botonLogin" onClick={manejarEnvio}>Enviar</button>
    <button className="botonLogin" onClick={() => actualizaVisibilidad(false)}>Cerrar</button>
  </div>
  </div>
  );
};

export default ModalAutenticacion;