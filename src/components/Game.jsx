import { useState, useEffect } from 'react';
import GameCard from './GameCard.jsx'

function Game() {
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
      const pokemons = ['charizard', 'pikachu','lugia',
        'rayquaza','moltres','jigglypuff',
        'ekans','blastoise','regice',
        'beldum','rattata','wailord'];
      const entries = await Promise.all(
        pokemons.map(async(name) => {
          const url = await getPokemonImageUrl(name);
          return [name, url];
        })
      );
      setImageUrls(Object.fromEntries(entries))
    }
    fetchAllImages();
  }, []);

  return <>
    <h1>game</h1>
    {Object.entries(imageUrls).map(([name, url]) => (
      <GameCard key={name} name={name} imageUrl={url}/>
    ))}
  </>
}

export default Game