import {Component} from 'react'
import './index.css'

class AddPassword extends Component {
  state = {
    websiteUrl: '',
    username: '',
    password: '',
  }

  onChangeWebsiteUrl = event => {
    const {target} = event
    const {value} = target
    this.setState({websiteUrl: value})
  }

  renderWebsiteUrl = () => {
    const {websiteUrl} = this.state
    return (
      <div className="input-container">
        <div className="image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
            className="image"
            alt="website"
          />
        </div>
        <input
          type="text"
          placeholder="Enter the website Url"
          className="input"
          value={websiteUrl}
          onChange={this.onChangeWebsiteUrl}
        />
      </div>
    )
  }

  onChangeUsername = event => {
    const {target} = event
    const {value} = target
    this.setState({username: value})
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <div className="input-container">
        <div className="image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
            className="image"
            alt="username"
          />
        </div>
        <input
          type="text"
          placeholder="Enter the Username"
          className="input"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  onChangePassword = event => {
    const {target} = event
    const {value} = target
    this.setState({password: value})
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <div className="image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
            className="image"
            alt="password"
          />
        </div>
        <input
          type="text"
          placeholder="Enter the Password"
          className="input"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="my-password-container">
        <div className="user-container">
          <h1 className="heading">Add new password </h1>
          <form className="form-container">
            {this.renderWebsiteUrl()}
            {this.renderUsername()}
            {this.renderPassword()}

            <div className="button-container">
              <button type="submit" className="button">
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="my-password-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="my-password-image"
            alt="password manager"
          />
        </div>
      </div>
    )
  }
}

export default AddPassword
