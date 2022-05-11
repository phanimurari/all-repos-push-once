import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FoodItem from '../FoodItem'
import Footer from '../Footer'
import './index.css'

const requestStatusConst = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class RestaurantDetailes extends Component {
  state = {
    cartData: localStorage.getItem('cartData'),
    restaurantDetailes: [],
    requestStatus: 'LOADING',
  }

  componentDidMount = () => {
    this.getRestaurantDetailes()
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

  addToCart = itemData => {
    const {cartData} = this.state
    if (cartData === null) {
      const updatedCartList = [itemData]
      const stringifiedCartList = JSON.stringify(updatedCartList)
      localStorage.setItem('cartData', stringifiedCartList)
      this.setState({cartData: localStorage.getItem('cartData')})
    } else {
      const localStoreCartList = JSON.parse(cartData)
      const updatedCartList = [...localStoreCartList, itemData]
      const stringifiedCartList = JSON.stringify(updatedCartList)
      localStorage.setItem('cartData', stringifiedCartList)
      this.setState({cartData: localStorage.getItem('cartData')})
    }
  }

  getUpdatedItem = item => ({
    id: item.id,
    name: item.name,
    cost: item.cost,
    imageUrl: item.image_url,
    foodType: item.food_type,
    rating: item.rating,
  })

  onSuccess = restaurantData => {
    const updatedData = {
      rating: restaurantData.rating,
      id: restaurantData.id,
      name: restaurantData.name,
      costForTwo: restaurantData.cost_for_two,
      cuisine: restaurantData.cuisine,
      imageUrl: restaurantData.image_url,
      reviewsCount: restaurantData.reviews_count,
      opensAt: restaurantData.opens_at,
      location: restaurantData.location,
      foodItems: restaurantData.food_items.map(each =>
        this.getUpdatedItem(each),
      ),
    }
    this.setState({
      restaurantDetailes: updatedData,
      requestStatus: 'SUCCESS',
    })
  }

  getRestaurantDetailes = async () => {
    this.setState({
      requestStatus: 'LOADING',
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      this.onSuccess(fetchedData)
    } else {
      this.setState({
        requestStatus: 'FAILED',
      })
    }
  }

  renderSuccessView = () => {
    const {restaurantDetailes} = this.state
    const {
      imageUrl,
      rating,
      name,
      costForTwo,
      reviewsCount,
      foodItems,
      location,
      cuisine,
    } = restaurantDetailes

    return (
      <>
        <div className="restaurant-detailes">
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurant-thumbnail"
          />
          <div className="detailes-container">
            <h1 className="name">{name}</h1>
            <p className="cuisine">{cuisine}</p>
            <p className="location">{location}</p>
            <div className="ratings-container">
              <div>
                <div className="star-rating-container">
                  <AiFillStar className="restaurant-star" />
                  <p className="restaurant-rating">{rating}</p>
                </div>
                <p className="rating-count">
                  {reviewsCount >= 200
                    ? '200+ Ratings'
                    : `${reviewsCount} Ratings`}
                </p>
              </div>
              <hr />
              <div>
                <p className="cost">
                  <BiRupee className="rupee-icon" /> {costForTwo}
                </p>
                <p className="cost-description">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <div className="items-list-container">
          <ul className="items-list">
            {foodItems.map(eachItem => (
              <FoodItem
                itemData={eachItem}
                addToCart={this.addToCart}
                key={eachItem.id}
                onClickIncrement={this.onClickIncrement}
                onClickDecrement={this.onClickDecrement}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div testid="restaurant-details-loader" className="loading-container">
      <Loader type="TailSpin" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <h1>failed</h1>
    </div>
  )

  renderContent = () => {
    const {requestStatus} = this.state
    switch (requestStatus) {
      case requestStatusConst.loading:
        return this.renderLoadingView()
      case requestStatusConst.success:
        return this.renderSuccessView()
      case requestStatusConst.failed:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          {this.renderContent()}
          <Footer />
        </div>
      </div>
    )
  }
}

export default RestaurantDetailes
