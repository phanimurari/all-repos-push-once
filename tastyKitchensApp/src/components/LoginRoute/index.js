import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')

    const cart = []
    const stringifiedCart = JSON.stringify(cart)
    localStorage.setItem('cartData', stringifiedCart)
  }

  onFailure = errorMsg => {
    this.setState({
      showError: true,
      errorMsg,
    })
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userData = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      this.onSuccess(fetchedData.jwt_token)
    } else {
      this.onFailure(fetchedData.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const {history} = this.props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/')
    }
    return (
      <div className="bg-container">
        <div className="my-form-container">
          <form className="my-form" onSubmit={this.onClickLogin}>
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/aguruprasad/image/upload/v1643612415/Frame_274_aycyqn.png"
                alt="website logo"
                className="logo"
              />
              <h1 className="logo-text">Tasty Kitchens</h1>
            </div>
            <img
              src="https://res.cloudinary.com/aguruprasad/image/upload/v1643367764/mobileLogin_dclnre.png"
              alt="website logo"
              className="login-mobile-img"
            />
            <h1 className="heading">Login</h1>
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              id="username"
              className="input-container"
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={this.onChangeUserName}
            />
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              id="password"
              placeholder="PASSWORD"
              type="password"
              className="input-container"
              value={password}
              onChange={this.onChangePassword}
            />
            <button className="login-btn" type="submit">
              Login
            </button>
            {showError && <p className="error">{errorMsg}</p>}
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/aguruprasad/image/upload/v1643612855/desktop-main_mhdsr1.png"
          alt="website logo"
          className="login-desktop-img"
        />
      </div>
    )
  }
}

export default Login
