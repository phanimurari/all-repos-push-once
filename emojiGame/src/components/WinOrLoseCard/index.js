// Write your code here.
import './index.css'

const WinOrLoseCard = props => {
  const {lost, onPlayAgain, score, win} = props

  const onClickPlayAgain = () => {
    onPlayAgain()
  }

  const winORLoss = () => {
    if (lost) {
      return (
        <div className="win-loss-card">
          <div className="text-container">
            <h1 className="win-lose-text">You Lose</h1>
            <p className="score-para">Score</p>
            <p className="score-text">{score}/12</p>
            <button
              className="play-again-button"
              type="button"
              onClick={onClickPlayAgain}
            >
              Play Again
            </button>
          </div>
          <div>
            <img
              className="won-loss-image"
              alt="win or lose"
              src="https://assets.ccbp.in/frontend/react-js/lose-game-img.png"
            />
          </div>
        </div>
      )
    }
    if (win) {
      return (
        <div className="win-loss-card">
          <div>
            <h1 className="win-lose-text">You Won</h1>
            <p className="score-para">Best Score</p>
            <p className="score-text">12/12</p>
            <button
              className="play-again-button"
              type="button"
              onClick={onClickPlayAgain}
            >
              Play Again
            </button>
          </div>
          <div>
            <img
              className="won-loss-image"
              alt="win or lose"
              src="https://assets.ccbp.in/frontend/react-js/won-game-img.png"
            />
          </div>
        </div>
      )
    }
    return null
  }

  return <div className="win-loss-card-container">{winORLoss()}</div>
}

export default WinOrLoseCard
