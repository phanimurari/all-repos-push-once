import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const FoodItem = props => {
  const {itemData} = props
  const cartData = localStorage.getItem('cartData')
  const localStoreCartList = JSON.parse(cartData)
  const {name, cost, rating, imageUrl, id} = itemData
  let itemIsInCart = ''
  let itemCount = 1
  if (localStoreCartList === null) {
    itemIsInCart = false
  } else {
    const itemIsInCartList = localStoreCartList.map(each => id === each.id)
    itemIsInCart = itemIsInCartList.includes(true)
    if (itemIsInCart) {
      const itemDataInLocalStorage = localStoreCartList.filter(
        each => each.id === id,
      )
      const [itemDetailes] = itemDataInLocalStorage
      const {quantity} = itemDetailes
      itemCount = quantity
    }
  }

  const onClickIncrementBtn = () => {
    const {onClickIncrement} = props
    onClickIncrement(id)
  }

  const onClickDecrementBtn = () => {
    const {onClickDecrement} = props
    onClickDecrement(id)
  }

  const onClickAdd = () => {
    const {addToCart} = props
    const updatedFoodItem = {
      id,
      name,
      cost,
      imageUrl,
      quantity: 1,
    }
    addToCart(updatedFoodItem)
  }

  return (
    <li className="item-container" testid="foodItem">
      <img src={imageUrl} className="item-thumbnail" alt="item thumbnail" />
      <div className="item-detailes-container">
        <h1 className="item-name">{name}</h1>
        <div className="cost-container">
          <BiRupee className="rupee-icon" />
          <p className="item-cost">{cost}</p>
        </div>
        <div className="rating-container">
          <AiFillStar className="star" />
          <p className="item-rating">{rating}</p>
        </div>
        {itemIsInCart ? (
          <div className="count-controllers-container">
            <button
              className="count-controls"
              onClick={onClickDecrementBtn}
              testid="decrement-count"
              type="button"
            >
              -
            </button>
            <p testid="active-count">{itemCount}</p>
            <button
              className="count-controls"
              onClick={onClickIncrementBtn}
              type="button"
              testid="increment-count"
            >
              +
            </button>
          </div>
        ) : (
          <button className="add-btn" onClick={onClickAdd} type="button">
            ADD
          </button>
        )}
      </div>
    </li>
  )
}

export default FoodItem
