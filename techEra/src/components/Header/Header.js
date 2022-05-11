import {Link} from 'react-router-dom'

import {HeaderBgContainer, HeaderCon, HeaderLogo} from './styledComponent'

const Header = () => (
  <HeaderBgContainer>
    <HeaderCon>
      <Link to="/">
        <HeaderLogo
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        />
      </Link>
    </HeaderCon>
  </HeaderBgContainer>
)
export default Header
