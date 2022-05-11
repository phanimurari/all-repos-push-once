import {Component} from 'react'

import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    teamMatchData: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedDate = dataObject => ({
    competingTeam: dataObject.competing_team,
    competingTeamLogo: dataObject.competing_team_logo,
    date: dataObject.date,
    firstInnings: dataObject.first_innings,
    id: dataObject.id,
    matchStatus: dataObject.match_status,
    manOfTheMatch: dataObject.man_of_the_match,
    result: dataObject.result,
    secondInnings: dataObject.second_innings,
    umpires: dataObject.umpires,
    venue: dataObject.venue,
  })

  getTeamMatches = async () => {
    const {match} = this.props

    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedTeamMatches = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.getFormattedDate(data.latest_match_details),
      recentMatches: data.recent_matches.map(each =>
        this.getFormattedDate(each),
      ),
    }

    this.setState({
      teamMatchData: updatedTeamMatches,
    })
  }

  render() {
    const {teamMatchData, isLoading} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchData

    return (
      <div className="team-matches-container">
        <img src={teamBannerUrl} alt="props" className="team-image" />
        <h1 className="latest-matches-heading">Latest Matches</h1>
        <div className="unordered-latest-match">
          <LatestMatch latestMatchDetails={latestMatchDetails} />
        </div>
        <div>
          <ul className="unordered-recent-match">
            {recentMatches.map(eachMatchData => (
              <li>
                <p>{eachMatchData.id}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default TeamMatches
