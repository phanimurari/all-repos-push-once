import styled from 'styled-components'

import {Link} from 'react-router-dom'

export const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 90vh;
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#ffffff')};
  font-family: 'Roboto';
`

export const SideBarList = styled.ul`
  margin-top: 16px;
  padding: 0;
`

export const LinkTo = styled(Link)`
  text-decoration: none;
`

export const SideBarItem = styled.li`
  list-style-type: none;
  margin-left: 25px;
`

export const SideBarBtn = styled.button`
  display: flex;
  align-items: center;
  color: ${props => (props.isSelected ? '#ff0000' : '#606060')};
  background-color: ${props =>
    props.isSelected ? props.background : 'transparent'};
  font-weight: ${props => (props.isSelected ? 700 : 'normal')};
  border: none;
`

export const SideBarIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const SideBarText = styled.p`
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#212121')};
  font-size: 20px;
  margin-left: 15px;
`

export const FooterContainer = styled.div`
  padding: 15px;
  margin-left: 15px;
`

export const FooterHead = styled.h1`
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#1e293b')};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
`

export const FooterIconContainer = styled.div`
  display: flex;
  margin-bottom: 25px;
`

export const FooterIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`

export const FooterDes = styled.p`
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#475569')};
  font-size: 20px;
  margin-top: 0;
`
