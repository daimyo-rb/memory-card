import ScoreInfo from "./ScoreInfo"
import TitleInstructions from "./TitleInstructions"
import '../styles/Header.css'

function Header() {
  return <div className="header">
    <TitleInstructions></TitleInstructions>
    <ScoreInfo></ScoreInfo>
  </div>
}

export default Header