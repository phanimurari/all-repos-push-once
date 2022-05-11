import {
  NotFoundDiv,
  NotFoundImg,
  NotFoundH1,
  NotFoundP,
} from './styledComponent'

const NotFound = () => (
  <NotFoundDiv>
    <NotFoundImg
      src="https://assets.ccbp.in/frontend/react-js/meetup/not-found-img.png"
      alt="not found"
    />
    <NotFoundH1>Page Not Found</NotFoundH1>
    <NotFoundP>
      We are sorry, the page you requested could not be found
    </NotFoundP>
  </NotFoundDiv>
)

export default NotFound
