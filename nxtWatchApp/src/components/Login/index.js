import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {
  LoginContainer,
  FormContainer,
  LoginLogo,
  InputContainer,
  Label,
  Input,
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
  LoginBtn,
  ErrMsg,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errMsg: '',
    showSubmitErr: false,
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showSubmitErr: true, errMsg})
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
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <Label htmlFor="username">USERNAME</Label>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password, showPassword} = this.state
    return (
      <>
        <Label htmlFor="password">PASSWORD</Label>
        <Input
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderCheckbox = () => {
    const {showPassword} = this.state
    return (
      <>
        <CheckboxInput
          type="checkbox"
          id="checkbox"
          onChange={this.onChangeCheckbox}
          checked={showPassword}
        />
        <CheckboxLabel htmlFor="checkbox">Show Password</CheckboxLabel>
      </>
    )
  }

  render() {
    const {showSubmitErr, errMsg} = this.state
    const JwtToken = Cookies.get('jwt_token')

    if (JwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <LoginContainer>
        <FormContainer onSubmit={this.submitForm}>
          <LoginLogo
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <InputContainer>{this.renderUsername()}</InputContainer>
          <InputContainer>{this.renderPassword()}</InputContainer>
          <CheckboxContainer>{this.renderCheckbox()}</CheckboxContainer>
          <LoginBtn type="submit">Login</LoginBtn>
          {showSubmitErr ? <ErrMsg>* {errMsg}</ErrMsg> : ''}
        </FormContainer>
      </LoginContainer>
    )
  }
}

export default Login
