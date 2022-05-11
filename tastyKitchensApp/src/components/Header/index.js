import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdCancel} from 'react-icons/md'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickChangeMenuStatus = () => {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu,
    }))
  }

  render() {
    const {showMenu} = this.state
    const localStorageCartList = localStorage.getItem('cartData')
    const cartList = JSON.parse(localStorageCartList)
    const lenCartList = cartList.length
    const overlayStyle = {
      backgroundColor: '#00000018',
    }

    return (
      <nav>
        <div className="nav-bar">
          <Link to="/">
            <div className="nav-logo-container">
              <img
                className="logo"
                src="https://res.cloudinary.com/aguruprasad/image/upload/v1643612415/Frame_274_aycyqn.png"
                alt="website logo"
              />
              <img
                className="logo-text"
                src="https://res.cloudinary.com/aguruprasad/image/upload/v1643612415/Features_g3bsqp.png"
                alt="website logo"
              />
            </div>
          </Link>
          <ul className="nav-keys-list">
            <Link to="/">
              <li>
                <button className="nav-keys" type="button">
                  Home
                </button>
              </li>
            </Link>
            <Link to="/cart">
              <li>
                <button className="nav-keys" type="button">
                  Cart
                  {lenCartList !== 0 && (
                    <span className="cart-list-length-indicator">
                      {lenCartList}
                    </span>
                  )}
                </button>
              </li>
            </Link>
            <li>
              <Popup
                modal
                overlayStyle={overlayStyle}
                trigger={
                  <button className="logout-btn" type="button">
                    Logout
                  </button>
                }
              >
                {close => (
                  <div className="logout-container">
                    <h1>Confirm</h1>
                    <p>Confirm you really want to Logout</p>
                    <div>
                      <button
                        className="pop-up-btn"
                        type="button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        className="pop-up-btn confirm-btn"
                        type="button"
                        onClick={this.onClickLogout}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </li>
          </ul>
          <GiHamburgerMenu
            className="hand-burger-menu-icon"
            onClick={this.onClickChangeMenuStatus}
          />
        </div>
        {showMenu && (
          <div className="burger-menu-container">
            <ul className="burger-menu">
              <Link to="/">
                <li>
                  <button className="nav-keys" type="button">
                    Home
                  </button>
                </li>
              </Link>
              <Link to="/cart">
                <li>
                  <button className="nav-keys" type="button">
                    Cart
                  </button>
                </li>
              </Link>
              <li>
                <Popup
                  modal
                  overlayStyle={overlayStyle}
                  trigger={
                    <button className="logout-btn" type="button">
                      Logout
                    </button>
                  }
                >
                  {close => (
                    <div className="logout-container">
                      <h1>Confirm</h1>
                      <p>Confirm you really want to Logout</p>
                      <div>
                        <button
                          className="pop-up-btn"
                          type="button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          className="pop-up-btn confirm-btn"
                          type="button"
                          onClick={this.onClickLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </li>
            </ul>
            <MdCancel
              className="cancel-button"
              onClick={this.onClickChangeMenuStatus}
            />
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
