import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantItem = props => {
  const {restaurantData} = props
  const {imageUrl, id, name, cuisine, userRating} = restaurantData
  const updatedUserRating = {
    ratingText: userRating.rating_text,
    ratingColor: userRating.ratingColor,
    totalReviews: userRating.total_reviews,
    rating: userRating.rating,
  }

  return (
    <Link to={`/restaurant/${id}`} className="link">
      <li className="restaurant-item" testid="restaurant-item">
        <img className="restaurant-image" src={imageUrl} alt="thumbnail" />
        <div className="restraint-card-detailes-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="type">{cuisine}</p>
          <div className="rating-container">
            <AiFillStar className="star" />
            <p className="rating">
              {updatedUserRating.rating}{' '}
              <span className="ratings-count">
                ({updatedUserRating.totalReviews} ratings)
              </span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
