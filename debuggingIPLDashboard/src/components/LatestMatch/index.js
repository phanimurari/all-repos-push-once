import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    // id,
    // matchStatus,
    manOfTheMatch,
    result,
    secondInnings,
    umpires,
    venue,
  } = latestMatchDetails
  return (
    <div className="latest-match-container">
      <div>
        <h1 className="competing-team-heading">{competingTeam}</h1>
        <p className="date">{date}</p>
        <p className="venue">{venue}</p>
        <p className="venue">{result}</p>
      </div>
      <div>
        <img src={competingTeamLogo} alt="prop" className="latest-match-logo" />
      </div>
      <div>
        <h1 className="first-innings-Heading">First Innings</h1>
        <p className="umpires">{firstInnings}</p>
        <h1 className="first-innings-Heading">Second Innings</h1>
        <p className="umpires">{secondInnings}</p>

        <h1 className="first-innings-Heading">Man Of The Matches</h1>
        <p className="umpires">{manOfTheMatch}</p>
        <h1 className="first-innings-Heading">Umpires</h1>
        <p className="umpires">{umpires}</p>
      </div>
    </div>
  )
}
export default LatestMatch
