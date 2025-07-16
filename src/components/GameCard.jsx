import '../styles/GameCard.css'

function GameCard({name, imageUrl, onClick}) {
  return <div className='gameCard' onClick={() => onClick(name)}>
    <img src={imageUrl}/>
    <p>{name}</p>
  </div>
}

export default GameCard