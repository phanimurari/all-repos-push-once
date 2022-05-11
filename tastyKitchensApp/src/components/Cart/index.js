import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import CartItem from '../CartItem'
import Footer from '../Footer'
import './index.css'

class Cart extends Component {
  state = {
    cartData: localStorage.getItem('cartData'),
    orderPlaced: false,
  }

  onClickPlaceOrder = () => {
    const updatedCart = []
    const stringifiedCart = JSON.stringify(updatedCart)
    localStorage.setItem('cartData', stringifiedCart)
    this.setState({
      orderPlaced: true,
    })
  }

  onClickIncrement = id => {
    const {cartData} = this.state
    const localStoreCartList = JSON.parse(cartData)
    const foodItemData = localStoreCartList.filter(
      eachFoodItem => eachFoodItem.id === id,
    )
    const [foodItem] = foodItemData
    const {quantity} = foodItem

    const updatedCartList = localStoreCartList.map(eachItem => {
      if (eachItem.id === id) {
        const updatedFoodItem = {
          ...eachItem,
          quantity: quantity + 1,
        }
        return updatedFoodItem
      }
      return eachItem
    })
    const stringifiedCartList = JSON.stringify(updatedCartList)
    localStorage.setItem('cartData', stringifiedCartList)
    this.setState({
      cartData: localStorage.getItem('cartData'),
    })
  }

  onClickDecrement = id => {
    const {cartData} = this.state
    const localStoreCartList = JSON.parse(cartData)
    const foodItemData = localStoreCartList.filter(
      eachFoodItem => eachFoodItem.id === id,
    )
    const [foodItem] = foodItemData
    const {quantity} = foodItem
    if (quantity === 1) {
      const updatedCartList = localStoreCartList.filter(each => each.id !== id)
      const stringifiedCartList = JSON.stringify(updatedCartList)
      localStorage.setItem('cartData', stringifiedCartList)
    } else {
      const updatedCartList = localStoreCartList.map(eachItem => {
        if (eachItem.id === id) {
          const updatedFoodItem = {
            ...eachItem,
            quantity: quantity - 1,
          }
          return updatedFoodItem
        }
        return eachItem
      })
      const stringifiedCartList = JSON.stringify(updatedCartList)
      localStorage.setItem('cartData', stringifiedCartList)
    }
    this.setState({
      cartData: localStorage.getItem('cartData'),
    })
  }

  getTotalPrice = cartList => {
    const amountsList = cartList.map(each => each.cost * each.quantity)
    const initialAmount = 0
    const totalAmount = amountsList.reduce(
      (prevAmount, currentAmount) => prevAmount + currentAmount,
      initialAmount,
    )
    return totalAmount
  }

  render() {
    const {cartData, orderPlaced} = this.state
    const localStorageCartList = JSON.parse(cartData)
    const cartListLength = localStorageCartList.length
    const orderTotal = this.getTotalPrice(localStorageCartList)

    return (
      <div>
        <Header />
        {orderPlaced ? (
          <div className="order-placed-container">
            <img
              src="https://res.cloudinary.com/aguruprasad/image/upload/v1643367667/success_vpigfs.png"
              alt="order placed"
            />
            <h1>Payment Successful</h1>
            <p>
              Thank you for ordering Your payment is successfully completed.
            </p>
            <Link to="/">
              <button className="go-to-home-btn" type="button">
                Go To Home Page
              </button>
            </Link>
          </div>
        ) : (
          <div>
            {cartListLength < 1 ? (
              <div className="no-orders-yet-container">
                <img
                  src="https://res.cloudinary.com/aguruprasad/image/upload/v1644737619/no-items_imo6en.png"
                  alt="empty cart"
                />
                <h1>No Order Yet!</h1>
                <p>Your cart is empty. Add something from the menu.</p>
                <Link to="/">
                  <button type="button" className="order-now-btn">
                    Order Now
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <ul className="cart-items-list">
                  <li key="cart-items-header" className="cart-list-header">
                    <h1 className="cartList-header-item">Item</h1>
                    <div className="cart-item-detailes-header-container">
                      <h1 className="cartList-header-item">Quantity</h1>
                      <h1 className="cartList-header-item">Price</h1>
                    </div>
                  </li>
                  {localStorageCartList.map(eachItem => (
                    <CartItem
                      itemData={eachItem}
                      key={eachItem.id}
                      onClickIncrement={this.onClickIncrement}
                      onClickDecrement={this.onClickDecrement}
                    />
                  ))}
                </ul>
                <div className="cart-list-footer-container">
                  <h1 className="order-total-heading">Order Total:</h1>
                  <div>
                    <p testid="total-price" className="order-total">
                      <BiRupee className="cart-rupee-icon" />
                      {orderTotal}
                    </p>
                    <button
                      className="place-order-button"
                      onClick={this.onClickPlaceOrder}
                      type="button"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <Footer />
      </div>
    )
  }
}

export default Cart
