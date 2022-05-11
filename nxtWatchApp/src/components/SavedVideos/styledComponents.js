import styled from 'styled-components'

export const SavedVideosContainer = styled.div`
  display: flex;
  min-height: 85vh;
  width: 100%;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  font-family: 'Roboto';
`

export const SavedVideosListContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  height: 85vh;
`

export const SavedVideosTopContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ebebeb')};
  padding: 24px 0 24px 48px;
  width: 100%;
`

export const SavedVideosIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff0000;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#d7dfe9')};
  font-size: 25px;
  width: 65px;
  height: 65px;
  border-radius: 35px;
  margin-right: 20px;
`

export const SavedVideosHeading = styled.h1`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#212121')};
  font-size: 28px;
  font-weight: 600;
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
  width: 350px;
  margin-bottom: 35px;
`

export const FailureText = styled.h1`
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

export const SavedVideosList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 32px 24px 24px 48px;
  list-style-type: none;
  margin: 0;
`
