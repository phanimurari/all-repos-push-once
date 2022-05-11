import {HeaderContainer, ImageContainer, WebsiteLogo} from './styledComponents'

const Header = () => (
  <HeaderContainer>
    <ImageContainer>
      <WebsiteLogo
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
        alt="website logo"
      />
    </ImageContainer>
  </HeaderContainer>
)

export default Header
