function MemeCard({ meme }) {
    return (
      <div className="meme-card">
        <h2>{meme.title}</h2>
        <img src={meme.img_url} alt={meme.title} />
        <p>{meme.description}</p>
      </div>
    );
  }
  
  export default MemeCard;