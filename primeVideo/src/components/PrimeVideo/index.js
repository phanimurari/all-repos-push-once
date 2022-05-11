import MoviesSlider from '../MoviesSlider'
import './index.css'

const PrimeVideo = props => {
  const {moviesList} = props

  const actionMoviesList = moviesList.filter(
    eachItem => eachItem.categoryId === 'ACTION',
  )

  const comedyMoviesList = moviesList.filter(
    eachItem => eachItem.categoryId === 'COMEDY',
  )

  return (
    <div className="app-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/prime-video-img.png"
        alt="prime video"
        className="prime-video-cover"
      />
      <div className="bottom-container">
        <h1 className="title">Action Movies</h1>
        <div className="slider-container">
          <MoviesSlider filteredMoviesList={actionMoviesList} />
        </div>
        <h1 className="title">Comedy Movies</h1>
        <div className="slider-container">
          <MoviesSlider filteredMoviesList={comedyMoviesList} />
        </div>
      </div>
    </div>
  )
}
export default PrimeVideo
