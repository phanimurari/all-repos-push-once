import './index.css'
import {Component} from 'react'
import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'

/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.

let topScore = 0
class EmojiGame extends Component {
  state = {score: 0, clickedEmojisIdList: [], lost: ''}
  // we do all calculations in main component and send
  // little or no calculations to child/sub components
  // total score is based on score, so total score need not be in state
  // for minimal state

  onClickEmoji = id => {
    const {score, clickedEmojisIdList} = this.state
    const newClickedEmojiId = id
    let totalScore
    let lost
    if (clickedEmojisIdList.includes(newClickedEmojiId)) {
      lost = true
      totalScore = score
    } else {
      totalScore = score + 1
    }

    this.setState({
      score: totalScore,
      clickedEmojisIdList: [...clickedEmojisIdList, newClickedEmojiId],
      lost,
    })
  }

  shuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderWinOrLossOrEmojis = win => {
    const {lost, score} = this.state
    const emojisList = this.shuffledEmojisList()

    if (lost === true || win === true) {
      return (
        <WinOrLoseCard
          lost={lost}
          win={win}
          score={score}
          onPlayAgain={this.onPlayAgain}
        />
      )
    }
    return (
      <ul className="emojis-container">
        {emojisList.map(eachEmoji => (
          <EmojiCard
            win={win}
            key={eachEmoji.id}
            emojiDetails={eachEmoji}
            onClickEmoji={this.onClickEmoji}
          />
        ))}
      </ul>
    )
  }

  onPlayAgain = () => {
    const {score} = this.state
    topScore = score > topScore ? score : topScore
    this.setState({score: 0, lost: '', clickedEmojisIdList: []})
  }

  findWin = () => {
    const {clickedEmojisIdList} = this.state
    const {emojisList} = this.props
    if (clickedEmojisIdList.length === emojisList.length) {
      return true
    }
    return null
  }

  render() {
    const {score, lost} = this.state
    const win = this.findWin()

    return (
      <div>
        <div>
          <NavBar score={score} win={win} lost={lost} topScore={topScore} />
        </div>
        <div className="emojis-container-container">
          {
            this.renderWinOrLossOrEmojis(win) // call a fn and in fn return
            // return values that u want to execute in if else statement blocks
            // this fn returns a value
            // if or else is statement { if u write here} it should return some value

            // if we return then, render method returns completely this value.
            // so write other method outside and return value from that method
            // and call from {fn returns}
          }
        </div>
      </div>
    )
  }
}

export default EmojiGame
