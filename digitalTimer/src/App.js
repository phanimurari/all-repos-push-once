import {Component} from 'react'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,

    elapsedTime: 0,

    timer: 25,
  }

  startOrPauseTimer = async () => {
    await this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))

    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      this.intervalId = setInterval(this.increaseSec, 1000)
    } else {
      clearInterval(this.intervalId)
    }
  }

  increaseSec = () => {
    const {isTimerRunning, timer, elapsedTime} = this.state

    const isTimerCompleted = timer * 60 - 1 === elapsedTime

    if (isTimerCompleted) {
      clearInterval(this.intervalId)
    }

    if (isTimerRunning) {
      this.setState(prevState => ({elapsedTime: prevState.elapsedTime + 1}))
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalId)
  }

  onDecreaseTimer = () => {
    const {timer} = this.state

    if (timer > 1) {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    }
  }

  onIncreaseTimer = () => {
    this.setState(prevState => ({timer: prevState.timer + 1}))
  }

  resetTimer = () => {
    clearInterval(this.intervalId)

    this.setState({
      isTimerRunning: false,

      elapsedTime: 0,

      timer: 25,
    })
  }

  getTimer = () => {
    const {elapsedTime, timer} = this.state

    const remainingTime = timer * 60 - elapsedTime

    const minutes = Math.floor(remainingTime / 60)

    const seconds = Math.floor(remainingTime % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`

    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {timer, isTimerRunning} = this.state

    const imageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const imageAlt = isTimerRunning ? 'pause icon' : 'play icon'

    const text = isTimerRunning ? 'Pause' : 'Start'

    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading">Digital Timer</h1>

          <div className="timer-timerSettings-totalContainer">
            <div className="timer-container">
              <div className="timer-timerStatus-container">
                <h1 className="timer-paragraph">{this.getTimer()}</h1>

                <p className="timerStatus">
                  {isTimerRunning ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>

            <div className="timer-settings-container">
              <div className="start-reset-timer-container">
                <div className="startOrResetTimer">
                  <button
                    type="button"
                    className="button"
                    onClick={this.startOrPauseTimer}
                  >
                    <img
                      src={imageUrl}
                      alt={imageAlt}
                      className="startOrPauseImage"
                    />

                    <p className="startOrPause-para">{text}</p>
                  </button>
                </div>

                <div className="startOrResetTimer">
                  <button
                    type="button"
                    className="button"
                    onClick={this.resetTimer}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="startOrPauseImage"
                    />
                  </button>

                  <p className="startOrPause-para">Reset</p>
                </div>
              </div>

              <p className="para-set-Timer"> Set Timer Limit</p>

              <div className="timer-limit-container">
                <button
                  type="button"
                  className="button"
                  disabled={isTimerRunning}
                  onClick={this.onDecreaseTimer}
                >
                  -
                </button>

                <div className="limit-container">
                  <p className="limit-number">{timer}</p>
                </div>

                <button
                  type="button"
                  className="button"
                  disabled={isTimerRunning}
                  onClick={this.onIncreaseTimer}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
