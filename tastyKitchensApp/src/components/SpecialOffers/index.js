import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import './index.css'

const requestStatusConst = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class SpecialOffers extends Component {
  state = {
    carouselData: [],
    requestStatus: 'LOADING',
  }

  componentDidMount = () => {
    this.getCarouselData()
  }

  onFailure = () => {
    this.setState({
      requestStatus: 'FAILED',
    })
  }

  onSuccess = data => {
    const UpdatedData = data.offers.map(eachOffer => ({
      id: eachOffer.id,
      imageUrl: eachOffer.image_url,
    }))
    this.setState({
      carouselData: UpdatedData,
      requestStatus: 'SUCCESS',
    })
  }

  getCarouselData = async () => {
    this.setState({
      requestStatus: 'LOADING',
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      this.onSuccess(fetchedData)
    } else {
      this.onFailure()
    }
  }

  renderSuccessView = () => {
    const {carouselData} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <Slider {...settings}>
        {carouselData.map(eachOffer => (
          <div key={eachOffer.id} className="carousel-container">
            <img
              src={eachOffer.imageUrl}
              alt="offer"
              className="carousel-image"
            />
          </div>
        ))}
      </Slider>
    )
  }

  renderLoadingView = () => (
    <div
      className="carousel-loading-container"
      testid="restaurants-offers-loader"
    >
      <Loader type="TailSpin" height={50} width={50} />
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
    return <div>{this.renderContent()}</div>
  }
}

export default SpecialOffers
