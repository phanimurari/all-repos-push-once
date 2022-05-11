import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {
    id,
    name,
    commentInput,
    date,
    isLiked,
    initialClassName,
  } = commentDetails

  return (
    <li className="each-comment-container">
      <div className="commenter-details">
        <p className={initialClassName}>{name.slice(0, 1).toUpperCase()}</p>

        <p className="commenter-name">{name}</p>
        <p className="time">{formatDistanceToNow(date)}</p>
      </div>
      <p className="comment-content">{commentInput}</p>
      <div className="buttons-container">
        <button type="button" className="btn-like">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png"
            className="like-image"
            alt="like"
          />
        </button>
        <button type="button" className="btn-delete">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-img"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
