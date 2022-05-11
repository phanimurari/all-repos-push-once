// Write your code here
import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: 0,
    }
  }

  startBtn = () => {
    this.timerId = setInterval(() => {
      this.setState(prev => ({seconds: prev.seconds + 1}))
    }, 1000)
  }

  stopBtn = () => {
    clearInterval(this.timerId)
    this.setState(prev => ({seconds: prev.seconds + 0}))
  }

  resetBtn = () => {
    this.setState({seconds: 0})
  }

  render() {
    const {seconds} = this.state
    return (
      <div className="bg-con">
        <div className="timer-con">
          <h1 className="main-head">Stopwatch</h1>
          <div className="watch-con">
            <div className="timer-img">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
                className="img-icon"
              />
              <p className="para">Timer</p>
            </div>
            <div className="time">
              <span>
                {
                  (mins = Math.floor(seconds / 60)(mins < 10)
                    ? `0${mins}`
                    : mins)
                }
              </span>
              <span>:</span>
              <span>{(sec = seconds(sec < 10) ? `0${sec}` : sec)}</span>
            </div>
            <div className="btn-con">
              <button className="start-btn" onClick={this.startBtn}>
                Start
              </button>
              <button className="stop-btn" onClick={this.stopBtn}>
                Stop
              </button>
              <button className="reset-btn" onClick={this.resetBtn}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
