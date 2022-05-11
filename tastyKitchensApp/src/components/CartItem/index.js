import {BiRupee} from 'react-icons/bi'
import './index.css'

const CartItem = props => {
  const {itemData} = props
  const {id, name, imageUrl, quantity, cost} = itemData
  const price = cost * quantity

  const onClickDecrementBtn = () => {
    const {onClickDecrement} = props
    onClickDecrement(id)
  }

  const onClickIncrementBtn = () => {
    const {onClickIncrement} = props
    onClickIncrement(id)
  }

  return (
    <li className="cart-item" testid="cartItem">
      <img src={imageUrl} alt="item thumbnail" className="item-image" />
      <div className="cart-item-detailes-container">
        <h1 className="cart-item-name">{name}</h1>
        <div className="count-controllers-container">
          <button
            testid="decrement-quantity"
            className="count-controls"
            onClick={onClickDecrementBtn}
            type="button"
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            testid="increment-quantity"
            className="count-controls"
            onClick={onClickIncrementBtn}
            type="button"
          >
            +
          </button>
        </div>
        <h1 className="price">
          <BiRupee className="cart-rupee-icon" /> {price}
        </h1>
      </div>
    </li>
  )
}

export default CartItem
