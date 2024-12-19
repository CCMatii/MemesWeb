import { useState, useContext } from 'react';
import './memecard.css';
import { ContextoAutenticacion } from '../context/autenticacionContext';
import { likeMeme } from '../services/memes';

function MemeCard({ meme }) {
  const { credenciales, estaAutenticado } = useContext(ContextoAutenticacion);
  const [likes, actualizaLikes] = useState(meme.likes)

  const manejarLike = () => {
    if (!estaAutenticado || !credenciales) {
      alert("Debe tener inición sesiada para dar like");
      return;
    }likeMeme(credenciales.access_token, meme._id).then(
      ([nuevosLikes, error]) => {
        if (error) {
          alert(error);
          return;
        }
        actualizaLikes(nuevosLikes);
      },
    );
  };

    return (
      <div className="meme-card">
        <h1 className="username">{meme.user} ha publicado:</h1>
        <h2>{meme.title}</h2>
        <img src={meme.img_url} alt={meme.title} />
        <p>{meme.description}</p>
        <div className="likey">
        <button className="heart" onClick={manejarLike}>
          💗
        </button>
        <p>A {likes} personas les ha gustado</p>
        </div>
        
      </div>
    );
  }
  
  export default MemeCard;