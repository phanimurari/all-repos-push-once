// Write your code here.
import './index.css'

const Card = props => {
  const {style} = props
  const {headerText, description, className} = {style}

  return (
    <li className={className}>
      <h1>{headerText}</h1>
      <p>{description}</p>
      <button type="button">Show More</button>
    </li>
  )
}

export default Card
