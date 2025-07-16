import { useState } from 'react'
import Game from './components/Game.jsx'
import Header from './components/Header.jsx'
import './styles/App.css'

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  return (
    <>
      <Header currentScore={currentScore} bestScore={bestScore}/>
      <Game
        currentScore={currentScore}
        bestScore={bestScore}
        setCurrentScore={setCurrentScore}
        setBestScore={setBestScore}
      />
    </>
  )
}

export default App
