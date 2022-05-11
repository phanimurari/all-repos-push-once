import {Component} from 'react'

class App extends Component {
  handleClick() {
    console.log('clicked')
  }

  render() {
    return (
      <button type="button" onClick={this.handleClick}>
        Click Me
      </button>
    )
  }
}

export default App
