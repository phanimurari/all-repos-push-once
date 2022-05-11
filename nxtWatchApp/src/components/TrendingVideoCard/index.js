import {formatDistanceToNow} from 'date-fns'

import SavedContext from '../../SavedContext/savedContext'

import {
  LinkTo,
  TrendingVideosItem,
  TrendingVideoImg,
  TrendingVideoCardContainer,
  TrendingVideoCardTitle,
  TrendingVideoCardChannel,
} from './styledComponents'

const TrendingVideoCard = props => {
  const {videoCard} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = videoCard

  const getTime = () => {
    const formattedDate = formatDistanceToNow(new Date(publishedAt))
    return formattedDate
  }

  return (
    <SavedContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <LinkTo to={`/videos/${id}`}>
            <TrendingVideosItem>
              <TrendingVideoImg src={thumbnailUrl} alt="video thumbnail" />
              <TrendingVideoCardContainer>
                <TrendingVideoCardTitle isDarkTheme={isDarkTheme}>
                  {title}
                </TrendingVideoCardTitle>
                <TrendingVideoCardChannel>
                  {channel.name}
                </TrendingVideoCardChannel>
                <TrendingVideoCardChannel>
                  {viewCount} views . {getTime()} ago
                </TrendingVideoCardChannel>
              </TrendingVideoCardContainer>
            </TrendingVideosItem>
          </LinkTo>
        )
      }}
    </SavedContext.Consumer>
  )
}

export default TrendingVideoCard
