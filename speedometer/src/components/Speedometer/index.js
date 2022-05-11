import {Component} from 'react'
import './index.css'

class Speedometer extends Component {
  state = {speed: 0}

  onClickAccelerate = () => {
    const {speed} = this.state
    if (speed < 200) {
      this.setState(prevState => ({speed: prevState + 10}))
    } else {
      this.setState(prevState => ({speed: prevState}))
    }
  }

  onClickBrake = () => {
    const {speed} = this.state
    if (speed > 0) {
      this.setState(prevState => ({speed: prevState - 10}))
    } else {
      this.setState(prevState => ({speed: prevState}))
    }
  }

  render() {
    const {speed} = this.state
    return (
      <div className="container">
        <h1 className="title">SPEEDOMETER</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/speedometer-img.png"
          className="img-size"
          alt="Speedometer"
        />
        <p className="speed-indicator">Speed is {speed}mph</p>
        <p className="limit-indicator">
          Min Limit is 0mph, Max Limit is 200mph
        </p>
        <div className="button-container">
          <button
            className="button accelerate-button"
            onClick={this.onClickAccelerate}
          >
            Accelerate
          </button>
          <button className="button brake-button" onClick={this.onClickBrake}>
            Apply Brake
          </button>
        </div>
      </div>
    )
  }
}

export default Speedometer
