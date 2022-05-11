// Write your code here
import './index.css'

const DestinationItem = props => {
  const {details} = props
  const {imgUrl, name} = details

  return (
    <li className="each-card">
      <div>
        <img src={imgUrl} alt="alt" className="image" />
      </div>
      <p className="card-name">{name}</p>
    </li>
  )
}

export default DestinationItem
