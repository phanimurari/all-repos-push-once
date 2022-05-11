import styled from 'styled-components'

export const GamingContainer = styled.div`
  display: flex;
  min-height: 85vh;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  font-family: 'Roboto';
`

export const GamingTopContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 24px 0 24px 48px;
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ebebeb')};
`

export const GamingIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff0000;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#d7dfe9')};
  font-size: 25px;
  border-radius: 35px;
  margin-right: 18px;
  width: 65px;
  height: 65px;
`

export const GamingHead = styled.h1`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#212121')};
  font-size: 25px;
  font-weight: 600;
`

export const GamingVideosList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 0 24px 48px;
  margin: 0;
  list-style-type: none;
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
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 18px;
`

export const FailureDes = styled.p`
  color: #64748b;
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 18px;
  margin-top: 0;
`

export const FailureRetryBtn = styled.button`
  color: #ffffff;
  background-color: #4f46e5;
  font-size: 12px;
  border-radius: 6px;
  width: 90px;
  height: 40px;
  border: none;
  outline: none;
`

export const GamingVideosListContainer = styled.div`
  flex-grow: 1;
  height: 85vh;
  overflow-y: auto;
`
