import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const LinkTo = styled(Link)`
  text-decoration: none;
`

export const VideosItem = styled.li`
  width: 250px;
  min-height: 300px;
  margin: 12px 16px 16px 0;
  list-style-type: none;
`

export const VideoImg = styled.img`
  width: 100%;
  margin-bottom: 10px;
`

export const VideoCardContainer = styled.div`
  display: flex;
  margin-right: 6px;
`

export const VideoImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 15px;
  margin-right: 15px;
`

export const VideoCard = styled.div``

export const VideoCardTitle = styled.p`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#1e293b')};
  font-size: 14px;
  font-weight: ${props => (props.isDarkTheme ? '400' : '500')};
  line-height: 1.7;
  margin: 0;
`

export const VideoCardChannel = styled.p`
  color: #616e7c;
  font-size: 14px;
  font-weight: 400;
  margin: 8px 0;
`
