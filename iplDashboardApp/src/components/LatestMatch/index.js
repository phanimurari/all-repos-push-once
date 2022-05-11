// Write your code here
import './index.css'

const LatestMatch = props => {
  const {updatedLatestMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    venue,
    result,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = updatedLatestMatchDetails

  return (
    <>
      <div className="latest-matches-card">
        <div className="latest-match-played-container">
          <div className="match-details">
            <p className="competing-team">{competingTeam}</p>
            <p className="date">{date}</p>
            <p className="venue-result-text">{venue}</p>
            <p className="venue-result-text">{result}</p>
          </div>
          <img
            className="competing-team-logo-sm"
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
          />
        </div>
        <img
          className="competing-team-logo"
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
        />
        <hr className="hr-line" />
        <div className="innings-container">
          <p className="key-text">First Innings</p>
          <p className="value-text">{firstInnings}</p>
          <p className="key-text">Second Innings</p>
          <p className="value-text">{secondInnings}</p>
          <p className="key-text">Man Of The Match</p>
          <p className="value-text">{manOfTheMatch}</p>
          <p className="key-text">Umpires</p>
          <p className="value-text">{umpires}</p>
        </div>
      </div>
    </>
  )
}

export default LatestMatch
