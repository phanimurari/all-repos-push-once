import {Component} from 'react'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamsList: []}

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    // console.log(data)
    // console.log(data.teams)
    const updatedTeamsList = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))

    this.setState({teamsList: updatedTeamsList})
  }

  render() {
    const {teamsList} = this.state

    return (
      <div className="home-container">
        <div className="ipl-logo-heading-container">
          <img
            className="ipl-logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1 className="ipl-heading">IPL Dashboard</h1>
        </div>
        <ul className="unordered-list-container">
          {teamsList.map(each => (
            <TeamCard key={each.id} teamsList={each} />
          ))}
        </ul>
      </div>
    )
  }
}
export default Home
