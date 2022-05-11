import styled from 'styled-components'

export const NotBgContainer = styled.div`
  display: flex;
  min-height: 90vh;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
`

export const NotContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: 'Roboto';
`

export const NotImg = styled.img`
  width: 500px;
`

export const NotHead = styled.h1`
  font-size: 32;
  color: ${props => (props.isDarkTheme ? 'ebebeb' : '#1e293b')};
  font-weight: 600;
`

export const NotDes = styled.p`
  color: #64748b;
  font-size: 18px;
  font-weight: 500;
`
