// Write your code here.
import './index.css'

const NavBar = props => {
  const {score, topScore, win, lost} = props
  console.log(typeof topScore)
  const renderOnWinOrLoss = () => {
    if (win === true || lost === true) {
      return null
    }
    return (
      <div className="score-highscore-container">
        <p className="para-text-navbar">Score: {score}</p>
        <p className="para-text-navbar">Top Score: {topScore}</p>
      </div>
    )
  }

  return (
    <nav className="nab-bar-container">
      <div className="emoji-logo-game-name-container">
        <img
          alt="emoji logo"
          src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
        />
        <h1 className="para-text-navbar">Emoji Game</h1>
      </div>
      {renderOnWinOrLoss()}
    </nav>
  )
}
export default NavBar
