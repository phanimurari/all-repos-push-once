// Write your code here
import {Component} from 'react'
import './index.css'

class CoinToss extends Component {
  state = {tossResult: 0, total: 0, heads: 0, tails: 0}

  changeCoin = () => {
    const toss = Math.floor(Math.random() * 2)
    this.setState(prevState => ({total: prevState.total + 1}))
    if (toss === 0) {
      this.setState(prevState => ({heads: prevState.heads + 1, tossResult: 0}))
    } else {
      this.setState(prevState => ({tails: prevState.tails + 1, tossResult: 1}))
    }
  }

  render() {
    const {tossResult, total, heads, tails} = this.state
    return (
      <div className="bg-container">
        <div className="content-container">
          <h1 className="heading">Coin Toss Game</h1>
          <p className="paragraph">Heads (or) Tails</p>
          {tossResult === 0 ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/heads-img.png"
              alt="toss result"
              className="coin"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/tails-img.png"
              alt="toss result"
              className="coin"
            />
          )}
          <button type="button" className="btn" onClick={this.changeCoin}>
            Toss Coin
          </button>
          <div className="result-container">
            <p className="result">Total: {total}</p>
            <p className="result">Heads: {heads}</p>
            <p className="result">Tails: {tails}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default CoinToss
