import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  min-height: 85vh;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
  width: 100%;
  font-family: 'Roboto';
`

export const HomeBannerContainer = styled.div`
  height: 90vh;
  flex: 1;
  overflow-y: auto;
`

export const VideosContainer = styled.div`
  padding: 15px;
  height: 70%;
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => (props.isDarkTheme ? '#424242' : '#cbd5e1')};
  width: 450px;
  margin-left: 40px;
`

export const SearchInput = styled.input`
  color: #1e293b;
  background-color: ${props => (props.isDarkTheme ? 'transparent' : '#ffffff')};
  font-size: 16px;
  height: 32px;
  width: 380px;
  border-right: 1px solid
    ${props => (props.isDarkTheme ? '#424242' : '#cbd5e1')};
  padding: 15px;
  border: none;
  outline: none;
`

export const SearchBtn = styled.button`
  color: #909090;
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#f4f4f4')};
  font-size: 12px;
  height: 32px;
  width: 70px;
  border: none;
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

export const FailureImg = styled.img`
  width: 300px;
`

export const FailureHead = styled.h1`
  color: ${props => (props.isDarkTheme ? '#ebebeb' : '#1e293b')};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`

export const FailureDes = styled.p`
  color: #64748b;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
`

export const FailRetryBtn = styled.button`
  color: #ffffff;
  background-color: #4f46e5;
  font-size: 12px;
  height: 35px;
  width: 85px;
  border-radius: 5px;
  border: none;
  outline: none;
`

export const VideosList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
