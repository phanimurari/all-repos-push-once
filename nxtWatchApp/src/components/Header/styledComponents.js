import styled from 'styled-components'

export const Navbar = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 10vh;
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#ffffff')};
  padding: 0 32px;
`

export const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding-top: 30px;
  padding-bottom: 30px;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const NavLogo = styled.img`
  height: 35px;
  margin-left: 30px;
`

export const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-self: flex-end;
  flex: 1;
`

export const NavItem = styled.li`
  list-style-type: none;
`

export const ThemeBtn = styled.button`
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#000000')};
  background-color: transparent;
  font-size: 20px;
  margin-left: auto;
  margin-right: 15px;
  border: none;
`

export const DeskLogo = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 20px;
`
