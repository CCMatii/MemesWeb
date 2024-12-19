import { useState, useEffect } from "react";
import { obtenerMemes } from "../services/memes";

const useMemes = () => {
  const [memes, setMemes] = useState([]);
  const [estaCargando, setEstaCargando] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [hayMas, setHayMas] = useState(true);
  const [sort, setSort] = useState("new");

  const cargarMemes = async () => {
    if (!hayMas || estaCargando) return;
  
    setEstaCargando(true);
  
    const [data, error] = await obtenerMemes(sort, pagina, 10);
    if (error) {
      console.error(error);
      setEstaCargando(false);
      return;
    }
  
    if (data.length < 10) setHayMas(false);
  
    setMemes((prevMemes) => (pagina === 1 ? data : [...prevMemes, ...data]));
    setEstaCargando(false);
  };

  const actualizarMemes = (nuevoSort) => {
    setMemes([]);
    setHayMas(true);
    setPagina(1); 
    setSort(nuevoSort);
  };

  const cargarMasMemes = () => {
    if (hayMas && !estaCargando) {
      setPagina((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    cargarMemes();
  }, [pagina, sort]);

  return { memes, estaCargando, cargarMasMemes, actualizarMemes };
};

export default useMemes;