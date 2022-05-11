import styled from 'styled-components'

import ReactPlayer from 'react-player'

export const VideoDetailsContainer = styled.div`
  display: flex;
  min-height: 85vh;
  width: 100%;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  font-family: 'Roboto';
`

export const VideoPlayerContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 32px 24px;
  height: 85vh;
  width: 100%;
`

export const VideoDetailsViewContainer = styled.div``

export const ReactPlayerE = styled(ReactPlayer)`
  margin-bottom: 25px;
`

export const VideoTitle = styled.h1`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#1e293b')};
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
`

export const VideoLikesContainer = styled.div`
  display: flex;
`

export const ViewsCount = styled.p`
  color: #64748b;
  font-size: 14px;
  font-weight: 400;
  margin: 8px 0;
`

export const ButtonsContainer = styled.div`
  display: flex;
  margin-left: auto;
`

export const UserActionButton = styled.button`
  display: flex;
  align-items: center;
  color: ${props => (props.isSaved ? '#2563eb  ' : '#64748b')};
  background-color: transparent;
  font-size: 14px;
  padding: 0 8px;
  border: none;
`

export const LikeButton = styled(UserActionButton)`
  color: ${props => (props.likeStatus === 'LIKE' ? '#2563eb  ' : '#64748b')};
`

export const DislikeButton = styled(UserActionButton)`
  color: ${props => (props.likeStatus === 'DISLIKE' ? '#2563eb  ' : '#64748b')};
`

export const UserIconContainer = styled.span`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-right: 6px;
`

export const ChannelContainer = styled.div`
  display: flex;
`

export const ChannelImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 20px;
  margin-right: 15px;
`

export const ChannelNameContainer = styled.div``

export const ChannelName = styled.h1`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#1e293b')};
  font-size: 20px;
  font-weight: ${props => (props.isDarkTheme ? '400' : '500')};
  margin: 0 0 8px;
`

export const ChannelSubscriber = styled.p`
  color: #616e7c;
  font-size: 14px;
  font-weight: 400;
  margin: 0 0 25px;
`

export const ChannelDes = styled.p`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#475569')};
  font-size: 18px;
  font-weight: ${props => (props.isDarkTheme ? '300' : '400')};
`

export const HorizontalLine = styled.hr`
  background-color: #d7dfe9;
  border: 2px solid #d7dfe9;
  width: 100%;
  margin: 18px 0;
`

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-grow: 1;
`

export const FailureImg = styled.img`
  width: 300px;
`

export const FailureHead = styled.h1`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#1e293b')};
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 15px;
`

export const FailureDes = styled.p`
  color: #64748b;
  font-size: 15px;
  margin-bottom: 15px;
  margin-top: 0;
`

export const FailureRetryBtn = styled.button`
  color: #ffffff;
  background-color: #4f46e5;
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  width: 90px;
  height: 40px;
  border: none;
  outline: none;
  cursor: pointer;
`
