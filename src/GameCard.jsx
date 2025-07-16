import './styles/GameCard.css'

function GameCard({name, imageUrl}) {
  return <div className='gameCard'>
    <img src={imageUrl}/>
    <p>{name}</p>
  </div>
}

export default GameCard