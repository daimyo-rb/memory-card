import ScoreInfo from "./ScoreInfo"
import TitleInstructions from "./TitleInstructions"
import '../styles/Header.css'

function Header({currentScore, bestScore}) {
  return <div className="header">
    <TitleInstructions/>
    <ScoreInfo currentScore={currentScore} bestScore={bestScore}/>
  </div>
}

export default Header