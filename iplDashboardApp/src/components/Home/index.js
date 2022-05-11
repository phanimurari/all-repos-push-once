// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamCardList: [], isHomeLoading: true}

  componentDidMount = () => {
    this.getTeamCardList()
  }

  getTeamCardList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    // console.log(data)
    const {teams} = data
    const updatedTeamCardList = teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))
    // console.log(updatedTeamCardList)

    this.setState({teamCardList: updatedTeamCardList, isHomeLoading: false})
  }

  renderTeamCard = () => {
    const {teamCardList} = this.state

    return (
      <>
        <div className="heading-container">
          <img
            className="ipl-logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1 className="main-heading">IPL Dashboard</h1>
        </div>
        <ul className="unordered-list-container">
          {teamCardList.map(eachTeam => (
            <TeamCard key={eachTeam.id} eachTeam={eachTeam} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isHomeLoading} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          {isHomeLoading ? this.renderLoader() : this.renderTeamCard()}
        </div>
      </div>
    )
  }
}

export default Home
