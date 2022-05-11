import './index.css'

const EventItem = props => {
  const {details, onClickingImage} = props
  const {imageUrl, name, location, id} = details
  const sendId = () => {
    onClickingImage(id)
  }
  return (
    <li className="listContainer">
      <button type="button">
        <img src={imageUrl} alt="" onClick={sendId} className="imgSize" />
      </button>
      <h1>{name}</h1>
      <p>{location}</p>
    </li>
  )
}

export default EventItem
