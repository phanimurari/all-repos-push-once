import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiOutlineSearch} from 'react-icons/ai'

import Header from '../Header'
import SideMenu from '../SideMenu'
import PremiumBanner from '../PremiumBanner'
import HomeVideoCard from '../HomeVideoCard'
import SavedContext from '../../SavedContext/savedContext'

import {
  HomeContainer,
  HomeBannerContainer,
  VideosContainer,
  SearchContainer,
  SearchInput,
  SearchBtn,
  LoaderContainer,
  FailureImg,
  FailureHead,
  FailureDes,
  FailRetryBtn,
  VideosList,
} from './styledComponents'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    videosList: [],
    isLoading: status.loading,
    search: '',
    isBannerClosed: false,
  }

  componentDidMount = () => {
    this.getVideosList()
  }

  getVideosList = async () => {
    const {search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${search}`

    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        channel: {
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        },
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        title: eachVideo.title,
        viewsCount: eachVideo.views_count,
        thumbnailUrl: eachVideo.thumbnail_url,
      }))
      this.setState({videosList: updatedData, isLoading: status.success})
    } else {
      this.setState({isLoading: status.failure})
    }
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  onClickSearch = () => {
    this.setState({isLoading: status.loading}, this.getVideosList)
  }

  closeBanner = () => {
    this.setState({isBannerClosed: true})
  }

  render() {
    const {videosList, isLoading, isBannerClosed} = this.state

    return (
      <SavedContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const renderSearchInput = () => {
            const {search} = this.state
            return (
              <SearchContainer isDarkTheme={isDarkTheme}>
                <SearchInput
                  type="search"
                  value={search}
                  placeholder="Search"
                  isDarkTheme={isDarkTheme}
                  onChange={this.onChangeSearch}
                />
                <SearchBtn
                  type="button"
                  isDarkTheme={isDarkTheme}
                  onClick={this.onClickSearch}
                  data-testid="searchButton"
                >
                  <AiOutlineSearch size={20} />
                </SearchBtn>
              </SearchContainer>
            )
          }

          const renderNoVideosView = () => (
            <LoaderContainer>
              <FailureImg
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                alt="no videos"
              />
              <FailureHead>No Search results found</FailureHead>
              <FailureDes>
                Try different keywords or remove search filter
              </FailureDes>
              <FailRetryBtn type="button" onClick={this.onClickSearch}>
                Retry
              </FailRetryBtn>
            </LoaderContainer>
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
              <FailRetryBtn type="button" onClick={this.onClickSearch}>
                Retry
              </FailRetryBtn>
            </LoaderContainer>
          )

          const renderVideosList = () => {
            if (videosList.length === 0) {
              return renderNoVideosView()
            }
            return (
              <VideosList>
                {videosList.map(eachVideo => (
                  <HomeVideoCard key={eachVideo.id} videoCard={eachVideo} />
                ))}
              </VideosList>
            )
          }

          const renderHomepage = () =>
            isLoading === status.success
              ? renderVideosList()
              : renderFailureView()

          const renderLoader = () => (
            <LoaderContainer data-testid="loader">
              <Loader
                type="ThreeDots"
                color={isDarkTheme ? '#ffffff' : '#3b82f6'}
                width="50"
                height="50"
              />
            </LoaderContainer>
          )

          return (
            <>
              <Header />
              <HomeContainer isDarkTheme={isDarkTheme} data-testid="home">
                <SideMenu />
                <HomeBannerContainer>
                  {isBannerClosed ? (
                    ''
                  ) : (
                    <PremiumBanner closeBanner={this.closeBanner} />
                  )}
                  <VideosContainer>
                    {renderSearchInput()}
                    {isLoading === status.loading
                      ? renderLoader()
                      : renderHomepage()}
                  </VideosContainer>
                </HomeBannerContainer>
              </HomeContainer>
            </>
          )
        }}
      </SavedContext.Consumer>
    )
  }
}

export default Home
