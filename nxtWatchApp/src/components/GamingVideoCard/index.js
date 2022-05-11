import {
  LinkTo,
  GamingVideosItem,
  GamingVideoImg,
  GamingVideoCardTitle,
  GamingVideoCardCount,
} from './styledComponents'

const GamingVideoCard = props => {
  const {videoCard, isDarkTheme} = props
  const {id, title, thumbnailUrl, viewCount} = videoCard

  return (
    <LinkTo to={`/videos/${id}`}>
      <GamingVideosItem>
        <GamingVideoImg src={thumbnailUrl} alt="video thumbnail" />
        <GamingVideoCardTitle isDarkTheme={isDarkTheme}>
          {title}
        </GamingVideoCardTitle>
        <GamingVideoCardCount>
          {viewCount} Watching Worldwide
        </GamingVideoCardCount>
      </GamingVideosItem>
    </LinkTo>
  )
}

export default GamingVideoCard
