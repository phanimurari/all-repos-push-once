import {Component} from 'react'

import './index.css'

class FruitsCounter extends Component {
  onMangoes = () => {
    console.log('clicked on Mango')
  }

  onBananas = () => {
    console.log('Clicked on Banana')
  }

  render() {
    return (
      <div className="fruits-app-container">
        <div className="fruits-container">
          <h1 className="fruits-result">Bob ate mangoes and bananas</h1>

          <button type="button" className="mangoes" onClick={this.onMangoes}>
            Mangoes
          </button>

          <button type="button" className="bananas" onClick={this.onBananas}>
            Bananas
          </button>
        </div>
      </div>
    )
  }
}

export default FruitsCounter
