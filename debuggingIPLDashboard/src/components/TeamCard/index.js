import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class TeamCard extends Component {
  render() {
    const {teamsList} = this.props
    const {id, name, teamImageUrl} = teamsList

    return (
      <Link to={`/team-matches/${id}`}>
        <li className="team-list-item">
          <img src={teamImageUrl} className="team-image-url" alt="props" />
          <h1 className="name">{name}</h1>
        </li>
      </Link>
    )
  }
}
export default TeamCard
