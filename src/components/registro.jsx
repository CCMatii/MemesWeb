import React, { useState } from "react";
import { registrar } from "../services/memes";
import './registro.css';

const ModalRegistro = ({ visible, actualizaVisibilidad }) => {
    const [usuario, actualizaUsuario] = useState("");
    const [contraceña, actualizaContraceña] = useState("");
    const [confirmaContraceña, actualizaConfirmaContraceña] = useState("");
    const [cargando, setCargando] = useState(false);
  
    const manejaEnvio = async () => {
      if (usuario.trim() === "" || contraceña.trim() === "" || confirmaContraceña.trim() === "") {
        alert("Por favor, rellena todos los campos.");
        return;
      }
  
      if (contraceña !== confirmaContraceña) {
        alert("Las contraseñas no coinciden");
        return;
      }
  
      setCargando(true);
  
      const [_, error] = await registrar(usuario, contraceña);
      setCargando(false);
  
      if (error) {
        alert(error);
        return;
      }
  
      alert("Usuario registrado correctamente");
      actualizaVisibilidad(false);
    };
  
    if (!visible) return null;
  
    return (
      <div className="fondoModal">
        <div className="modal_registrar">
            <h2>Registro</h2>
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
            value={contraceña}
            onChange={(e) => actualizaContraceña(e.target.value)}
            className="datos"
            />
            <input
            type="password"
            placeholder="Repite la contraseña"
            value={confirmaContraceña}
            onChange={(e) => actualizaConfirmaContraceña(e.target.value)}
            className="datos"
            />
            <button onClick={manejaEnvio} className="botonRegister" disabled={cargando}>
            {cargando ? "Registrando..." : "Enviar"}
            </button>
            <button onClick={() => actualizaVisibilidad(false)} className="botonCerrar">Salir</button>
        </div>
      </div>
    );
  };

export default ModalRegistro;
