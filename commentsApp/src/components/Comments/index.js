import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentsList: []}

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state

    const initialProfileBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialProfileBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  render() {
    const {commentsList} = this.state
    return (
      <div className="comments-app">
        <h1 className="heading">COMMENTS</h1>
        <div className="app-container">
          <form
            className="upper-content-container"
            onSubmit={this.onAddComment}
          >
            <div className="inputs-container">
              <p className="caption">Say something about 4.0 Technologies</p>
              <input
                type="text"
                placeholder="Your Name"
                className="input-name-style"
                onChange={this.onChangeNameInput}
              />
              <textarea
                type="text"
                rows="6"
                placeholder="Your Comment"
                className="text-box-style"
                onChange={this.onChangeCommentInput}
              />
              <button type="submit" className="btn-submit">
                Add Comment
              </button>
            </div>
          </form>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="image-style"
              alt="comments"
            />
          </div>
        </div>
        <hr className="horizontal-separator" />
        <div className="count-comments-container">
          <p className="count">{commentsList.length}</p>
          <p className="comments-style">Comments</p>
        </div>
        <ul className="comments-container">
          {commentsList.map(eachComment => (
            <CommentItem commentDetails={eachComment} key={eachComment.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
