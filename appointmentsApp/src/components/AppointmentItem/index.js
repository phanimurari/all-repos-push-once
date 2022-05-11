import './index.css'

const AppointmentItem = props => {
  const {eachItem, onStarring} = props

  const {id, title, date, isStarred} = eachItem

  const star = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onMarking = () => {
    onStarring(id)
  }

  return (
    <li className="appointmentItemContainer">
      <div className="appointment-name">
        <p className="title">{title}</p>
        <button
          type="button"
          className="starButton"
          onClick={onMarking}
          testid="star"
        >
          <img src={star} alt="star" />
        </button>
      </div>
      <p className="date">
        Date:{` `}
        {date}
      </p>
    </li>
  )
}

export default AppointmentItem
