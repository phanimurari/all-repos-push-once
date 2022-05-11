import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const LinkTo = styled(Link)`
  width: 100%;
  text-decoration: none;
  font-family: 'Roboto';
`

export const TrendingVideosItem = styled.li`
  display: flex;
  margin-bottom: 65px;
  list-style-type: none;
`

export const TrendingVideoImg = styled.img`
  width: 300px;
  height: 160px;
`

export const TrendingVideoCardContainer = styled.div`
  padding: 10px 18px;
`

export const TrendingVideoCardTitle = styled.h1`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#1e293b')};
  font-size: 20px;
  font-weight: ${props => (props.isDarkTheme ? '400' : '500')};
  margin: 0 0 18px;
`

export const TrendingVideoCardChannel = styled.p`
  color: #94a3b8;
  font-size: 14px;
  margin: 0 0 12px;
`
