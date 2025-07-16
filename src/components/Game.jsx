import { useState, useEffect } from 'react';
import GameCard from './GameCard.jsx'
import '../styles/Game.css'

function Game({currentScore, bestScore, setCurrentScore, setBestScore}) {
  const [orderedPokemon, setOrderedPokemon] = useState([
    'charizard', 'pikachu','lugia',
    'rayquaza','moltres','jigglypuff',
    'ekans','blastoise','regice',
    'beldum','rattata','wailord'
  ]);
  const [clickedCardsSet, setClickedCardsSet] = useState(new Set());
  const [imageUrls, setImageUrls] = useState({});
  async function getPokemonImageUrl(pokemon) {
    try {
      const apiDest = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const response = await fetch(apiDest);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const imageUrl = data.sprites.front_shiny;
      return imageUrl;
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  }
  useEffect(() => {
    async function fetchAllImages() {
      const entries = await Promise.all(
        orderedPokemon.map(async(name) => {
          const url = await getPokemonImageUrl(name);
          return [name, url];
        })
      );
      setImageUrls(Object.fromEntries(entries))
    }
    fetchAllImages();
  }, []);
  function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i=shuffled.length-1; i>0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  function shuffleCardOrder() {
    const shuffled = shuffleArray(orderedPokemon);
    setOrderedPokemon(shuffled);
  }
  function handleOldCardClicked() {
    if (currentScore > bestScore) { // update bestScore if needed
      setBestScore(currentScore);
    }
    setCurrentScore(0); // reset score
    setClickedCardsSet(new Set()); // clear out set
  }
  function handleNewCardClicked(name){
    const newScore = currentScore + 1;
    setCurrentScore(newScore); // increment current score
    setClickedCardsSet(prevSet => { // add to set
      const newSet = new Set(prevSet);
      newSet.add(name);
      return newSet;
    })
  }
  function handleCardClick(name) {
    if (clickedCardsSet.has(name)) {
      handleOldCardClicked();
    } else {
      handleNewCardClicked(name);
    }
    shuffleCardOrder();
  }
  return <div className='gameContainer'>
    {orderedPokemon.map((name) => (
      <GameCard onClick={handleCardClick} key={name} name={name} imageUrl={imageUrls[name]}/>
    ))}
  </div>
}

export default Game