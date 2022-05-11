// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {isMatchLoading: true, matchData: {}}

  componentDidMount() {
    this.getMatchDetails()
  }

  getMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    // console.log(data)
    const teamBannerUrl = data.team_banner_url
    const latestMatchDetails = data.latest_match_details
    const recentMatches = data.recent_matches
    // console.log(teamBannerUrl)
    // console.log(latestMatchDetails)
    // console.log(recentMatches)

    const updatedLatestMatchDetails = {
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      date: latestMatchDetails.date,
      firstInnings: latestMatchDetails.first_innings,
      id: latestMatchDetails.id,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      matchStatus: latestMatchDetails.match_status,
      result: latestMatchDetails.result,
      secondInnings: latestMatchDetails.second_innings,
      umpires: latestMatchDetails.umpires,
      venue: latestMatchDetails.venue,
    }

    const updatedRecentMatches = recentMatches.map(eachItem => ({
      competingTeam: eachItem.competing_team,
      competingTeamLogo: eachItem.competing_team_logo,
      date: eachItem.date,
      firstInnings: eachItem.first_innings,
      id: eachItem.id,
      manOfTheMatch: eachItem.man_of_the_match,
      matchStatus: eachItem.match_status,
      result: eachItem.result,
      secondInnings: eachItem.second_innings,
      umpires: eachItem.umpires,
      venue: eachItem.venue,
    }))

    // console.log(updatedLatestMatchDetails)
    // console.log(updatedRecentMatches)
    this.setState({
      matchData: {
        teamBannerUrl,
        updatedLatestMatchDetails,
        updatedRecentMatches,
      },
      isMatchLoading: false,
    })
  }

  renderTeamMatches = () => {
    const {matchData} = this.state
    const {
      teamBannerUrl,
      updatedRecentMatches,
      updatedLatestMatchDetails,
    } = matchData

    return (
      <div className="content-container">
        <img className="team-banner" src={teamBannerUrl} alt="team banner" />
        <div className="latest-matches-container">
          <h1 className="latest-matches-heading">Latest Matches</h1>
          <LatestMatch
            key={updatedLatestMatchDetails.id}
            updatedLatestMatchDetails={updatedLatestMatchDetails}
          />

          <ul className="recent-matches-unordered-list">
            {updatedRecentMatches.map(eachItem => (
              <MatchCard key={eachItem.id} eachItem={eachItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isMatchLoading} = this.state

    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const bgColor = id

    return (
      <div className={`team-matches-container ${bgColor}`}>
        {isMatchLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}

export default TeamMatches
