import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {GiConsoleController} from 'react-icons/gi'

import Header from '../Header'
import SideMenu from '../SideMenu'
import GamingVideoCard from '../GamingVideoCard'

import SavedContext from '../../SavedContext/savedContext'

import {
  GamingContainer,
  GamingTopContainer,
  GamingIconContainer,
  GamingHead,
  GamingVideosList,
  LoaderContainer,
  FailureImg,
  FailureHead,
  FailureDes,
  FailureRetryBtn,
  GamingVideosListContainer,
} from './styledComponents'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {loadingStatus: status.loading, videosList: []}

  componentDidMount = () => {
    this.getVideosList()
  }

  getVideosList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({videosList: updatedData, loadingStatus: status.success})
    } else {
      this.setState({loadingStatus: status.failure})
    }
  }

  onClickRetryBtn = () => {
    this.setState({loadingStatus: status.loading}, this.getVideosList)
  }

  render() {
    const {loadingStatus, videosList} = this.state
    return (
      <SavedContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const renderTrending = () => (
            <GamingTopContainer isDarkTheme={isDarkTheme}>
              <GamingIconContainer isDarkTheme={isDarkTheme}>
                <GiConsoleController />
              </GamingIconContainer>
              <GamingHead isDarkTheme={isDarkTheme}>Gaming</GamingHead>
            </GamingTopContainer>
          )

          const renderVideosList = () => (
            <GamingVideosList>
              {videosList.map(eachItem => (
                <GamingVideoCard
                  key={eachItem.id}
                  videoCard={eachItem}
                  isDarkTheme={isDarkTheme}
                />
              ))}
            </GamingVideosList>
          )

          const renderFailureView = () => (
            <LoaderContainer>
              <FailureImg
                src={
                  isDarkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                }
                alt="failure view"
              />
              <FailureHead>Oops! Something Went Wrong</FailureHead>
              <FailureDes>
                We are having some trouble to complete your request. Please try
                again.
              </FailureDes>
              <FailureRetryBtn type="button" onClick={this.onClickRetryBtn}>
                Retry
              </FailureRetryBtn>
            </LoaderContainer>
          )

          const renderTrendingVideosList = () => (
            <GamingVideosListContainer>
              {renderTrending()}
              {renderVideosList()}
            </GamingVideosListContainer>
          )

          const renderLoading = () => (
            <LoaderContainer data-testid="loader">
              <Loader
                type="ThreeDots"
                color={isDarkTheme ? '#ffffff' : '#3b82f6'}
                height="50"
                width="50"
              />
            </LoaderContainer>
          )

          const renderTrendingVideos = () =>
            loadingStatus === status.success
              ? renderTrendingVideosList()
              : renderFailureView()

          return (
            <>
              <Header />
              <GamingContainer isDarkTheme={isDarkTheme} data-testid="gaming">
                <SideMenu />
                {loadingStatus === status.loading
                  ? renderLoading()
                  : renderTrendingVideos()}
              </GamingContainer>
            </>
          )
        }}
      </SavedContext.Consumer>
    )
  }
}

export default Gaming
