// Write your code here
import './index.css'

const MatchCard = props => {
  const {eachItem} = props
  //   console.log(eachItem)
  const {competingTeam, competingTeamLogo, matchStatus, result} = eachItem
  const recentMatchStatus = matchStatus === 'Won' ? 'won' : 'lost'
  return (
    <li className="recent-match-card">
      <img
        className="recent-match-logo"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p className="recent-match-team-name">{competingTeam}</p>
      <p className="recent-match-result">{result}</p>
      <p className={`recent-match-status ${recentMatchStatus}`}>
        {matchStatus}
      </p>
    </li>
  )
}

export default MatchCard
