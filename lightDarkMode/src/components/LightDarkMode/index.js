import {Component} from 'react'
import './index.css'

class LightDarkMode extends Component {
  state = {isSelected: false}

  onSelectionMode = () => {
    this.setState(prevValue => ({isSelected: !prevValue.isSelected}))
  }

  onButtonText = () => {
    const {isSelected} = this.state

    return isSelected ? 'Light Mode' : 'Dark Mode'
  }

  render() {
    const buttonText = this.onButtonText()
    let design
    let bgColor
    if (buttonText === 'Dark Mode') {
      design = 'heading-black'
      bgColor = 'card-bg-light-color'
    } else if (buttonText === 'Light Mode') {
      design = 'heading'
      bgColor = 'card-bg-dark-color'
    }
    return (
      <div className="container">
        <div className={bgColor}>
          <h1 className={design}>Click to Change Mode</h1>
          <button
            type="button"
            className="button"
            onClick={this.onSelectionMode}
          >
            {buttonText}
          </button>
        </div>
      </div>
    )
  }
}

export default LightDarkMode
