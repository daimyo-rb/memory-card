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
      const pokemons = ['charizard', 'pikachu'];
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
    <GameCard name="charizard" imageUrl={imageUrls['charizard']}/>
    <GameCard name="pikachu" imageUrl={imageUrls['pikachu']}/>
  
  </>
}

export default Game