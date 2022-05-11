import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    title: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onAddClick = event => {
    event.preventDefault()
    const {title, amount, optionId} = this.state
    const transactionType = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type: transactionType.displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      title: '',
      amount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getIncomeAmount = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getExpensesAmount = () => {
    const {transactionList} = this.state
    let expensesAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  // why using onchange of each element on each letter change
  // instead get element.value on AddClick,
  // instead of getting value for each letter change

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onDeleteTransaction = id => {
    const {transactionList} = this.state
    const filteredTransactionList = transactionList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState({transactionList: filteredTransactionList})
  }

  render() {
    const {optionId, title, amount, transactionList} = this.state
    const incomeAmount = this.getIncomeAmount()
    const expensesAmount = this.getExpensesAmount()
    const balanceAmount = incomeAmount - expensesAmount
    // you did all calculation here in this component and passed just props
    // in moneyDetails component you just found balance amount
    // because, there is no possibility to send title and amount as props to moneyDetails
    // even we send any props its not possible to find incomeAmount, expensesAmount
    // you may need to send entire transactionList as prop to MoneyDetails to find
    // incomeAmount and expensesAmount in MoneyDetails component
    // amount, title, type updating on change, to calculate income expensex so,
    // you need to wait untill add, means u have to take from transactionList

    return (
      <div className="money-manager-container">
        <div className="welcome-container">
          <h1>Hi Richard</h1>
          <p>
            Welcome back to your
            <span className="green-text">Money Manager</span>
          </p>
        </div>

        <div className="money-details-container">
          <MoneyDetails
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
            balanceAmount={balanceAmount}
          />
        </div>

        <div className="form-tansaction-item-container">
          <form className="form-container" onSubmit={this.onAddClick}>
            <h1>Add Transaction</h1>
            <label htmlFor="title"> TITLE</label>
            <input
              value={title}
              placeholder="TITLE"
              type="text"
              id="title"
              onChange={this.onChangeTitle}
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              value={amount}
              placeholder="AMOUNT"
              id="amount"
              type="text"
              onChange={this.onChangeAmount}
            />
            <label htmlFor="type"> TYPE</label>

            <select id="type" value={optionId} onChange={this.onChangeOptionId}>
              {transactionTypeOptions.map(eachType => (
                <option value={eachType.optionId} key={eachType.optionId}>
                  {eachType.displayText}
                </option>
              ))}
            </select>
            <div>
              <button type="submit" onClick={this.onAddClick}>
                Add
              </button>
            </div>
          </form>

          <div className="history-container">
            <h1>History</h1>
            <hr className="hor-line" />

            <ul className="history-sub-container">
              <li>
                <div className="history-subheadings-container">
                  <p className="border">Title</p>
                  <p className="border">Amount</p>
                  <p className="border">Type</p>
                  <p> </p>
                </div>
              </li>
              {transactionList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  transactionDetails={eachTransaction}
                  onDeleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
