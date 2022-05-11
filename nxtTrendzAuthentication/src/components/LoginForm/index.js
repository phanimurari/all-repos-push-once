// Write your JS code here
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', condition: true}

  onSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      this.onSuccess()
      this.setState({
        condition: true,
      })
    } else {
      this.setState({
        condition: false,
      })
    }
    // const data = await response.json()
    // console.log(data)
  }

  onUser = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onPassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {username, password, condition} = this.state

    return (
      <div className="bg-layer">
        <img
          className="logo-pic"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
        />
        <div className="card">
          <img
            className="form-pic"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />
          <form className="form-box" onSubmit={this.submitForm}>
            <label className="label-text" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input-text"
              id="username"
              type="text"
              value={username}
              onChange={this.onUser}
              placeholder="Username"
            />
            <label className="label-text" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input-text"
              id="password"
              type="password"
              onChange={this.onPassword}
              value={password}
              placeholder="Password"
            />
            <button className="login-btn" type="submit">
              Login
            </button>
            {condition ? (
              ''
            ) : (
              <p className="msg">* Username and Password didn&lsquo;t match</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
