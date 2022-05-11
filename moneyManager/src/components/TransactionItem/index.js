import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDeleteTransaction} = props
  const {id, title, type, amount} = transactionDetails

  const onDeleteClick = () => {
    onDeleteTransaction(id)
  }

  return (
    <div>
      <div className="details-container">
        <div className="details-sub-container">
          <p className="border">{title}</p>
          <p className="border">{amount}</p>
          <p className="border">{type}</p>
        </div>

        <div className="delete-container">
          <button
            testid="delete"
            className="delete-button"
            type="button"
            onClick={onDeleteClick}
          >
            <img
              className="delete-image"
              alt="delete"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            />
          </button>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default TransactionItem
