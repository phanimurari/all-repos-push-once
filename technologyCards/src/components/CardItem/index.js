import './index.css'

const Component = props => {
  const {details} = props
  const {title, description, imgUrl, className} = details

  return (
    <li className={`${className} list-container`}>
      <h1 className="heading2">{title}</h1>
      <p className="para2">{description}</p>
      <div className="img-container">
        <img src={imgUrl} className="image" alt={title} />
      </div>
    </li>
  )
}

export default Component
