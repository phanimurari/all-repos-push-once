import './index.css'

const HistoryItem = props => {
  const {historyItemDetails, deleteItem} = props
  const {id, timeAccessed, logoUrl, title, domainUrl} = historyItemDetails

  const onClickDelete = () => {
    deleteItem(id)
  }

  return (
    <li className="list-item">
      <div className="text-items">
        <p className="time">{timeAccessed}</p>
        <img className="logo" alt={domainUrl} src={logoUrl} />
        <p className="title">{title}</p>
      </div>

      <div className="button-container">
        <button onClick={onClickDelete} type="button" className="button">
          <img
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/delete-img.png"
          />
        </button>
      </div>
    </li>
  )
}

export default HistoryItem
