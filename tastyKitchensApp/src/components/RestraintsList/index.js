import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdOutlineNavigateBefore, MdOutlineNavigateNext} from 'react-icons/md'
import RestaurantItem from '../RestaurantItem'
import './index.css'

const requestStatusConst = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class RestraintsList extends Component {
  state = {
    sortBy: 'Lowest',
    pagination: 0,
    restaurantsList: [],
    requestStatus: 'Loading',
  }

  componentDidMount = () => {
    this.getRestaurantsList()
  }

  onSuccess = restaurantsData => {
    const updatedData = restaurantsData.map(eachRestaurant => ({
      hasOnlineDelivery: eachRestaurant.has_online_delivery,
      userRating: eachRestaurant.user_rating,
      name: eachRestaurant.name,
      hasTableBooking: eachRestaurant.has_table_booking,
      isDeliveringNow: eachRestaurant.is_delivering_now,
      constForTwo: eachRestaurant.cost_for_two,
      cuisine: eachRestaurant.cuisine,
      imageUrl: eachRestaurant.image_url,
      id: eachRestaurant.id,
      menuType: eachRestaurant.menu_type,
      location: eachRestaurant.location,
      opensAt: eachRestaurant.opens_at,
      groupByTime: eachRestaurant.group_by_time,
    }))
    this.setState({
      requestStatus: 'SUCCESS',
      restaurantsList: updatedData,
    })
  }

  getRestaurantsList = async () => {
    this.setState({
      requestStatus: 'LOADING',
      restaurantsList: [],
    })
    const {sortBy, pagination} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/restaurants-list?offset=${pagination}&limit=9&sort_by_rating=${sortBy}`
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      this.onSuccess(fetchedData.restaurants)
    }
  }

  onChangeShortBy = event => {
    this.setState(
      {
        sortBy: event.target.value,
      },
      this.getRestaurantsList,
    )
  }

  renderLoaderView = () => (
    <div testid="restaurants-list-loader" className="loading-container">
      <Loader type="ThreeDots" height={60} width={60} />
    </div>
  )

  renderSuccessView = () => {
    const {restaurantsList} = this.state
    return (
      <ul className="restaurants-list-container">
        {restaurantsList.map(eachRestaurant => (
          <RestaurantItem
            restaurantData={eachRestaurant}
            key={eachRestaurant.id}
          />
        ))}
      </ul>
    )
  }

  renderContent = () => {
    const {requestStatus} = this.state
    switch (requestStatus) {
      case requestStatusConst.loading:
        return this.renderLoaderView()
      case requestStatusConst.success:
        return this.renderSuccessView()
      case requestStatusConst.failed:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onClickLessThen = () => {
    const {pagination} = this.state
    if (pagination > 1) {
      this.setState(
        {
          pagination: pagination - 1,
        },
        this.getRestaurantsList,
      )
    }
  }

  onClickGreaterThen = () => {
    const {pagination} = this.state
    if (pagination < 20) {
      this.setState(
        {
          pagination: pagination + 1,
        },
        this.getRestaurantsList,
      )
    }
  }

  render() {
    const {sortBy, pagination} = this.state
    const paginationText = `${pagination + 1} of 20`
    return (
      <>
        <h1 className="popular-heading">Popular Restaurants</h1>
        <div className="description-container">
          <p className="description">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div>
            <p>Sort By</p>
            <select
              className="selector"
              value={sortBy}
              onChange={this.onChangeShortBy}
            >
              {sortByOptions.map(each => (
                <option value={each.value} key={each.id}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        {this.renderContent()}
        <div className="offset-controls-container">
          <button
            type="button"
            className="offset-less-then-control"
            onClick={this.onClickLessThen}
            testid="pagination-left-button"
          >
            <MdOutlineNavigateBefore />
          </button>
          <p testid="active-page-number"> {paginationText} </p>
          <button
            type="button"
            onClick={this.onClickGreaterThen}
            className="offset-greater-then-control"
            testid="pagination-right-button"
          >
            <MdOutlineNavigateNext />
          </button>
        </div>
      </>
    )
  }
}

export default RestraintsList
