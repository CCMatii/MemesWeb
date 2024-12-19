import './memecard.css';

function MemeCard({ meme }) {
    return (
      <div className="meme-card">
        <h1 className="username">{meme.user} ha publicado:</h1>
        <h2>{meme.title}</h2>
        <img src={meme.img_url} alt={meme.title} />
        <p>{meme.description}</p>
      </div>
    );
  }
  
  export default MemeCard;