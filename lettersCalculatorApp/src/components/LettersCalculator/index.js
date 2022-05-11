import {Component} from 'react'

import './index.css'

class LettersCalculator extends Component {
  state = {
    count: 0,
  }

  onChangeSearchInput = event => {
    const text = event.target.value
    const l = text.length
    this.setState({count: l})
  }

  render() {
    const {count, text} = this.state

    return (
      <div className="bg-cont">
        <div className="app-cont">
          <div className="head-cont">
            <h1 className="heading">Calculate the letters you enter</h1>
            <div>
              <label className="enter-text" htmlFor="input-text">
                Enter the phrase
              </label>

              <input
                id="input-text"
                type="search"
                className="input"
                onChange={this.onChangeSearchInput}
                placeholder="Enter the phrase"
                value={text}
              />
            </div>
          </div>
          <p className="display">No.of letters: {count}</p>
        </div>
        <div className="image-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stop-watch-with-calculator-img.png"
            alt=" letters calculator"
          />
        </div>
      </div>
    )
  }
}

export default LettersCalculator
