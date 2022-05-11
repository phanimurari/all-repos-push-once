import Popup from 'reactjs-popup'
import ReactPlayer from 'react-player'
import {IoMdClose} from 'react-icons/io'
import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {thumbnailUrl, videoUrl} = movieDetails

  return (
    <Popup
      modal
      trigger={
        <button type="button" className="trigger-button">
          <img src={thumbnailUrl} alt="thumbnail" className="thumbnail" />
        </button>
      }
      className="popup-content"
    >
      {close => (
        <>
          <button
            type="button"
            className="close-button"
            testid="closeButton"
            onClick={() => close()}
          >
            <IoMdClose className="close-icon" />
          </button>
          <div className="player-container">
            <ReactPlayer url={videoUrl} controls />
          </div>
        </>
      )}
    </Popup>
  )
}
export default MovieItem
