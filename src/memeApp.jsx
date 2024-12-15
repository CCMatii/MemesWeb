import useMemes from "./hooks/useMemes";
import MemeCard from "./components/meme";
import Top from "./components/Header";

const MemeApp = () => {
  const { memes, estaCargando, cargarMasMemes, actualizarMemes } = useMemes();

  return (
    <div className="meme-app">
      <Top />
      <main>
        {memes.length === 0 && !estaCargando && <p>No hay memes disponibles.</p>}
        <div className="meme-grid">
          {memes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </div>
        {estaCargando && <p>Cargando...</p>}
      </main>

      <footer>
        <button onClick={cargarMasMemes} disabled={estaCargando}>
          Cargar más
        </button>
      </footer>
    </div>
  );
};

export default MemeApp;