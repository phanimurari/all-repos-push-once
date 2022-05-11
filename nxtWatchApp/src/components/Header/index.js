import {FaMoon} from 'react-icons/fa'
import {BiSun} from 'react-icons/bi'

import {withRouter, Link} from 'react-router-dom'

import LogoutPopup from '../LogoutPopup'
import SavedContext from '../../SavedContext/savedContext'

import {
  Navbar,
  NavContent,
  HeaderContainer,
  NavLogo,
  NavList,
  NavItem,
  ThemeBtn,
  DeskLogo,
} from './styledComponents'

const Header = () => (
  <SavedContext.Consumer>
    {value => {
      const {isDarkTheme, changeTheme} = value
      const onChangeTheme = () => {
        changeTheme()
      }

      return (
        <Navbar isDarkTheme={isDarkTheme}>
          <NavContent>
            <HeaderContainer>
              <Link to="/">
                <NavLogo
                  src={
                    isDarkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                />
              </Link>
              <NavList>
                <NavItem>
                  <ThemeBtn
                    isDarkTheme={isDarkTheme}
                    type="button"
                    onClick={onChangeTheme}
                    data-testid="theme"
                  >
                    {isDarkTheme ? <BiSun /> : <FaMoon />}
                  </ThemeBtn>
                </NavItem>
                <NavItem>
                  <DeskLogo
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />
                </NavItem>
              </NavList>
              <LogoutPopup isDarkTheme={isDarkTheme} />
            </HeaderContainer>
          </NavContent>
        </Navbar>
      )
    }}
  </SavedContext.Consumer>
)

export default withRouter(Header)
