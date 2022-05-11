import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const LinkTo = styled(Link)`
  text-decoration: none;
  font-family: 'Roboto';
`

export const GamingVideosItem = styled.li`
  padding: 40px 20px 0 0;
`

export const GamingVideoImg = styled.img`
  width: 220px;
  margin-bottom: 20px;
`

export const GamingVideoCardTitle = styled.h1`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#1e293b')};
  font-size: 20px;
  font-weight: ${props => (props.isDarkTheme ? '400' : '500')};
  margin: 0 0 6px;
`

export const GamingVideoCardCount = styled.p`
  color: #64748b;
  font-size: 14px;
  margin: 0 0 12px;
`
