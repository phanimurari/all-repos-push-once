import './index.css'

const MoneyDetails = props => {
  const {incomeAmount, expensesAmount, balanceAmount} = props
  return (
    <div className="moneyDetails-container">
      <div className="type-container balance">
        <img
          className="type-image"
          alt="balance"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
        />
        <div>
          <p>Your Balance</p>
          <p testid="balanceAmount">Rs {balanceAmount}</p>
        </div>
      </div>
      <div className="type-container income">
        <img
          className="type-image"
          alt="income"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
        />
        <div>
          <p>Your Income</p>
          <p className="incomeAmount" testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="type-container expenses">
        <img
          className="type-image"
          alt="expenses"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        />
        <div>
          <p>Your Expenses</p>
          <p className="expensesAmount" testid="expensesAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
