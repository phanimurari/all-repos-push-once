import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {MdPlaylistAdd} from 'react-icons/md'
import {GiConsoleController} from 'react-icons/gi'

import SavedContext from '../../SavedContext/savedContext'

import {
  SideBarContainer,
  SideBarList,
  LinkTo,
  SideBarItem,
  SideBarBtn,
  SideBarIconContainer,
  SideBarText,
  FooterContainer,
  FooterHead,
  FooterIconContainer,
  FooterIcon,
  FooterDes,
} from './styledComponents'

const SideMenu = () => (
  <SavedContext.Consumer>
    {value => {
      const {isDarkTheme, selectedOption, changeOption} = value

      const selectOption = option => {
        changeOption(option)
      }

      const renderNavLinks = () => (
        <SideBarList>
          <LinkTo to="/">
            <SideBarItem>
              <SideBarBtn
                isSelected={selectedOption === 'HOME'}
                background={isDarkTheme ? '#424242' : '#f1f5f9'}
                onClick={() => {
                  selectOption('HOME')
                }}
              >
                <SideBarIconContainer>
                  <AiFillHome size={24} />
                  <SideBarText isDarkTheme={isDarkTheme}>Home</SideBarText>
                </SideBarIconContainer>
              </SideBarBtn>
            </SideBarItem>
          </LinkTo>
          <LinkTo to="/trending">
            <SideBarItem>
              <SideBarBtn
                isSelected={selectedOption === 'TRENDING'}
                background={isDarkTheme ? '#424242' : '#f1f5f9'}
                onClick={() => {
                  selectOption('TRENDING')
                }}
              >
                <SideBarIconContainer>
                  <HiFire size={24} />
                  <SideBarText isDarkTheme={isDarkTheme}>Trending</SideBarText>
                </SideBarIconContainer>
              </SideBarBtn>
            </SideBarItem>
          </LinkTo>
          <LinkTo to="/gaming">
            <SideBarItem>
              <SideBarBtn
                isSelected={selectedOption === 'GAMING'}
                background={isDarkTheme ? '#424242' : '#f1f5f9'}
                onClick={() => {
                  selectOption('GAMING')
                }}
              >
                <SideBarIconContainer>
                  <GiConsoleController size={24} />
                  <SideBarText isDarkTheme={isDarkTheme}>Gaming</SideBarText>
                </SideBarIconContainer>
              </SideBarBtn>
            </SideBarItem>
          </LinkTo>
          <LinkTo to="/saved-videos">
            <SideBarItem>
              <SideBarBtn
                isSelected={selectedOption === 'SAVED'}
                background={isDarkTheme ? '#424242' : '#f1f5f9'}
                onClick={() => {
                  selectOption('SAVED')
                }}
              >
                <SideBarIconContainer>
                  <MdPlaylistAdd size={24} />
                  <SideBarText isDarkTheme={isDarkTheme}>
                    Saved Videos
                  </SideBarText>
                </SideBarIconContainer>
              </SideBarBtn>
            </SideBarItem>
          </LinkTo>
        </SideBarList>
      )

      const renderFooterInfo = () => (
        <FooterContainer>
          <FooterHead isDarkTheme={isDarkTheme}>CONTACT US</FooterHead>
          <FooterIconContainer>
            <FooterIcon
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
            />
            <FooterIcon
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
            />
            <FooterIcon
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
            />
          </FooterIconContainer>
          <FooterDes isDarkTheme={isDarkTheme}>
            Enjoy! Now to see your channels and recommendations!
          </FooterDes>
        </FooterContainer>
      )

      return (
        <SideBarContainer isDarkTheme={isDarkTheme}>
          {renderNavLinks()}
          {renderFooterInfo()}
        </SideBarContainer>
      )
    }}
  </SavedContext.Consumer>
)

export default SideMenu
