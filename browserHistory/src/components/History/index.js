import {Component} from 'react'
import HistoryItem from '../HistoryItem'

import './index.css'

class History extends Component {

  const {historyList} = this.props

  state = {searchInput: '' ,}

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {}

  render() {
    const {searchInput} = this.state
    const filteredList = historyList.filter(eachItem =>
      eachItem.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <div className="nav-bar">
          <img
            className="app-logo"
            alt="app logo"
            src="https://assets.ccbp.in/frontend/react-js/history-website-logo-img.png"
          />
          <div className="search-container">
            <img
              className="search-logo"
              alt="search"
              src="https://assets.ccbp.in/frontend/react-js/search-img.png"
            />
            <input
              onChange={this.onChangeSearchInput}
              type="search"
              value={searchInput}
              placeholder="Search History"
              className="search"
            />
          </div>
        </div>
        <div className="list-container">
          <ul className="list-item-container">
            {filteredList.map(eachItem => (
              <HistoryItem
                deleteItem={this.deleteItem}
                historyItemDetails={eachItem}
                key={eachItem.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default History