import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'

import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import SideMenu from '../SideMenu'
import SavedContext from '../../SavedContext/savedContext'

import {
  VideoDetailsContainer,
  VideoPlayerContainer,
  VideoDetailsViewContainer,
  ReactPlayerE,
  VideoTitle,
  VideoLikesContainer,
  ViewsCount,
  ButtonsContainer,
  LikeButton,
  DislikeButton,
  UserActionButton,
  UserIconContainer,
  ChannelContainer,
  ChannelImg,
  ChannelNameContainer,
  ChannelName,
  ChannelSubscriber,
  ChannelDes,
  HorizontalLine,
  LoaderContainer,
  FailureImg,
  FailureHead,
  FailureDes,
  FailureRetryBtn,
} from './styledComponents'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoDetails extends Component {
  state = {videoDetails: [], loadingStatus: status.loading}

  componentDidMount = () => {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const JwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${JwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        id: data.video_details.id,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        publishedAt: data.video_details.published_at,
        viewCount: data.video_details.views_count,
        description: data.video_details.description,
        videoUrl: data.video_details.video_url,
      }
      this.setState({videoDetails: updatedData, loadingStatus: status.success})
    } else {
      this.setState({loadingStatus: status.failure})
    }
  }

  changeSavedStatus = () => {
    this.setState(prevState => ({
      videoDetails: {
        ...prevState.videoDetails,
        isSaved: !prevState.videoDetails.isSaved,
      },
    }))
  }

  render() {
    const {loadingStatus, videoDetails} = this.state

    const {
      id,
      videoUrl,
      title,
      viewCount,
      publishedAt,
      channel,
      description,
    } = videoDetails

    return (
      <SavedContext.Consumer>
        {value => {
          const {
            isDarkTheme,
            savedVideosList,
            likedVideoIdStatusList,
            addSavedVideos,
            removedSavedVideos,
            changeLikeStatus,
          } = value

          const isVideoSaved = () => {
            const videoSaved = savedVideosList.find(
              eachVideo => eachVideo.id === id,
            )
            if (videoSaved === undefined) {
              return false
            }
            return true
          }

          const getVIdeoLikeStatus = () => {
            const videoObject = likedVideoIdStatusList.find(
              eachItem => eachItem.id === id,
            )
            if (videoObject === undefined) {
              return 'NONE'
            }
            return videoObject.status
          }

          const isSaved = isVideoSaved()
          const likeStatus = getVIdeoLikeStatus()

          const onClickLike = () => {
            if (likeStatus === 'LIKE') {
              changeLikeStatus(id, 'NONE')
            } else {
              changeLikeStatus(id, 'LIKE')
            }
          }

          const onClickDislike = () => {
            if (likeStatus === 'DISLIKE') {
              changeLikeStatus(id, 'NONE')
            } else {
              changeLikeStatus(id, 'DISLIKE')
            }
          }

          const onClickSave = () => {
            if (isSaved === false) {
              addSavedVideos(videoDetails)
            } else {
              removedSavedVideos(videoDetails)
            }
          }

          const getTime = () => {
            const formattedDate = formatDistanceToNow(new Date(publishedAt))

            return formattedDate
          }

          const renderLoadingView = () => (
            <LoaderContainer data-testid="loader">
              <Loader
                type="ThreeDots"
                color={isDarkTheme ? '#ffffff' : '#3b82f6'}
                sss
                width="50"
                height="50"
              />
            </LoaderContainer>
          )

          const renderVideoPlayer = () => (
            <ReactPlayerE controls url={videoUrl} width="70%" height="60vh" />
          )

          const renderVideoDetails = () => (
            <>
              <VideoTitle isDarkTheme={isDarkTheme}>{title}</VideoTitle>
              <VideoLikesContainer>
                <ViewsCount>
                  {viewCount} views . {getTime()}
                </ViewsCount>
                <ButtonsContainer>
                  <LikeButton
                    type="button"
                    onClick={onClickLike}
                    likeStatus={likeStatus}
                  >
                    <UserIconContainer>
                      <BiLike />
                    </UserIconContainer>{' '}
                    Like
                  </LikeButton>
                  <DislikeButton
                    type="button"
                    likeStatus={likeStatus}
                    onClick={onClickDislike}
                  >
                    <UserIconContainer>
                      <BiDislike />
                    </UserIconContainer>
                    Dislike
                  </DislikeButton>
                  <UserActionButton
                    type="button"
                    isSaved={isSaved}
                    onClick={onClickSave}
                  >
                    <UserIconContainer>
                      <MdPlaylistAdd />
                    </UserIconContainer>{' '}
                    {isSaved ? 'saved' : 'save'}
                  </UserActionButton>
                </ButtonsContainer>
              </VideoLikesContainer>
            </>
          )

          const renderChannelDetails = () => (
            <ChannelContainer>
              <ChannelImg src={channel.profileImageUrl} alt="channel logo" />
              <ChannelNameContainer>
                <ChannelName isDarkTheme={isDarkTheme}>
                  {channel.name}
                </ChannelName>
                <ChannelSubscriber>{channel.subscriberCount}</ChannelSubscriber>
                <ChannelDes isDarkTheme={isDarkTheme}>{description}</ChannelDes>
              </ChannelNameContainer>
            </ChannelContainer>
          )

          const onClickRetryBtn = () => {
            this.setState({loadingStatus: status.loading}, this.getVideoDetails)
          }

          const renderVideoDetailsFailureView = () => (
            <LoaderContainer>
              <FailureImg
                src={
                  isDarkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                }
                alt="failure view"
              />
              <FailureHead isDarkTheme={isDarkTheme}>
                Oops! Something Went Wrong
              </FailureHead>
              <FailureDes>
                We are having some trouble to complete your request. Please try
                again
              </FailureDes>
              <FailureRetryBtn type="button" onClick={onClickRetryBtn}>
                Retry
              </FailureRetryBtn>
            </LoaderContainer>
          )

          const renderVideoDetailsView = () =>
            loadingStatus === status.success ? (
              <VideoDetailsViewContainer>
                {renderVideoPlayer()}
                {renderVideoDetails()}
                <HorizontalLine />
                {renderChannelDetails()}
              </VideoDetailsViewContainer>
            ) : (
              renderVideoDetailsFailureView()
            )

          return (
            <>
              <Header />
              <VideoDetailsContainer
                isDarkTheme={isDarkTheme}
                data-testid="videoItemDetails"
              >
                <SideMenu />
                <VideoPlayerContainer>
                  {loadingStatus === status.loading
                    ? renderLoadingView()
                    : renderVideoDetailsView()}
                </VideoPlayerContainer>
              </VideoDetailsContainer>
            </>
          )
        }}
      </SavedContext.Consumer>
    )
  }
}

export default VideoDetails
