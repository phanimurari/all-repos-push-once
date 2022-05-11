import './index.css'
import {BiSearch} from 'react-icons/bi'

const FiltersGroup = props => {
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props

    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const renderSearch = () => {
    const {searchInput} = props

    return (
      <div className="search-container">
        <input
          value={searchInput}
          className="search-input"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
          type="search"
          placeholder="Search"
        />
        <BiSearch />
      </div>
    )
  }

  const renderCategory = () => {
    const {categoryDetails} = props

    return categoryDetails.map(category => {
      const {changeCategory, activeCategoryId} = props
      const onClickCategory = () => changeCategory(category.categoryId)
      const isActive = category.categoryId === activeCategoryId
      const categoryClass = isActive ? 'rating-special' : ''

      return (
        <li
          key={category.categoryId}
          onClick={onClickCategory}
          className="category-list"
        >
          <p className={categoryClass}>{category.name}</p>
        </li>
      )
    })
  }

  const renderRatings = () => {
    const {ratingDetails} = props

    return ratingDetails.map(rating => {
      const {activeRatingId, changeRating} = props

      const onClickRating = () => changeRating(rating.ratingId)

      const ratingClassName =
        activeRatingId === rating.ratingId ? 'rating-special' : 'category-list'

      return (
        <li
          key={rating.ratingId}
          className={ratingClassName}
          onClick={onClickRating}
        >
          <img
            className="rating-image"
            src={rating.imageUrl}
            alt={`rating ${rating.ratingId}`}
          />
          & up
        </li>
      )
    })
  }

  const renderRatingsFilter = () => (
    <div>
      <h1>Rating</h1>
      <ul>{renderRatings()}</ul>
    </div>
  )

  const renderCategoryFilter = () => (
    <div>
      <h1>Category</h1>
      <ul>{renderCategory()}</ul>
    </div>
  )

  const {clearFilters} = props

  return (
    <div className="filters-group-container">
      {/* Replace this element with your code */}
      {renderSearch()}
      {renderCategoryFilter()}
      {renderRatingsFilter()}
      <button type="button" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
