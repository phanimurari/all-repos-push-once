import {MdClose} from 'react-icons/md'

import {
  PremiumContainer,
  PremiumBannerContainer,
  PremiumLogo,
  PremiumText,
  GetItBtn,
  CloseIconBtn,
} from './styledComponents'

const PremiumBanner = props => {
  const {closeBanner} = props

  const onClickClose = () => {
    closeBanner()
  }

  return (
    <PremiumContainer data-testid="banner">
      <PremiumBannerContainer>
        <PremiumLogo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <PremiumText>Buy Nxt Watch Premium prepaid plans with UPI</PremiumText>
        <GetItBtn>GET IT NOW</GetItBtn>
      </PremiumBannerContainer>
      <CloseIconBtn type="button" onClick={onClickClose} data-testid="close">
        <MdClose />
      </CloseIconBtn>
    </PremiumContainer>
  )
}

export default PremiumBanner
