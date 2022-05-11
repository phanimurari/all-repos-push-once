import {Component} from 'react'
import './index.css'

class EvenOddApp extends Component {
  state = {
    number: 0,
  }

  onIncrement = () => {
    this.setState(prevValue => ({
      number: prevValue.number + Math.ceil(Math.random() * 100),
    }))
  }

  render() {
    const {number} = this.state
    let message

    if (number % 2 === 0) {
      message = 'Even'
    } else {
      message = 'Odd'
    }

    return (
      <div className="container">
        <h1 className="heading">Count {number}</h1>
        <p className="para">Count is {message}</p>
        <button onClick={this.onIncrement} type="button" className="button">
          Increment
        </button>
        <p className="instruction">
          Increase By Random Number Between 0 to 100
        </p>
      </div>
    )
  }
}

export default EvenOddApp
