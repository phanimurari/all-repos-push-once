import {MdPlaylistAdd} from 'react-icons/md'

import Header from '../Header'
import SideMenu from '../SideMenu'
import TrendingVideoCard from '../TrendingVideoCard'

import SavedContext from '../../SavedContext/savedContext'

import {
  SavedVideosContainer,
  SavedVideosListContainer,
  SavedVideosTopContainer,
  SavedVideosIconContainer,
  SavedVideosHeading,
  LoaderContainer,
  FailureImg,
  FailureText,
  FailureDes,
  SavedVideosList,
} from './styledComponents'

const SavedVideos = () => (
  <SavedContext.Consumer>
    {value => {
      const {isDarkTheme, savedVideosList} = value

      const renderSavedVideosHeading = () => (
        <SavedVideosTopContainer isDarkTheme={isDarkTheme}>
          <SavedVideosIconContainer isDarkTheme={isDarkTheme}>
            <MdPlaylistAdd />
          </SavedVideosIconContainer>
          <SavedVideosHeading isDarkTheme={isDarkTheme}>
            Saved Videos
          </SavedVideosHeading>
        </SavedVideosTopContainer>
      )

      const renderFailureView = () => (
        <LoaderContainer isDarkTheme={isDarkTheme}>
          <FailureImg
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <FailureText isDarkTheme={isDarkTheme}>
            No saved videos found
          </FailureText>
          <FailureDes>You can save your videos while watching them</FailureDes>
        </LoaderContainer>
      )

      const renderVideosList = () => (
        <SavedVideosList>
          {savedVideosList.map(eachItem => (
            <TrendingVideoCard
              key={eachItem.id}
              videoCard={eachItem}
              isDarkTheme={isDarkTheme}
            />
          ))}
        </SavedVideosList>
      )

      return (
        <>
          <Header />
          <SavedVideosContainer
            isDarkTheme={isDarkTheme}
            data-testid="savedVideos"
          >
            <SideMenu />
            {savedVideosList.length === 0 ? (
              renderFailureView()
            ) : (
              <SavedVideosListContainer>
                {renderSavedVideosHeading()}
                {renderVideosList()}
              </SavedVideosListContainer>
            )}
          </SavedVideosContainer>
        </>
      )
    }}
  </SavedContext.Consumer>
)

export default SavedVideos
