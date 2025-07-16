import '../styles/ScoreInfo.css'

function ScoreInfo({currentScore, bestScore}) {
  return <div className='scoreInfo'>
    <p className='currentScore'>Score: {currentScore}</p>
    <p className='bestScore'>Best score: {bestScore}</p>
  </div>
}
export default ScoreInfo