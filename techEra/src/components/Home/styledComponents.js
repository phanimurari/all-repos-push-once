import styled from 'styled-components'

export const BgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80vw;
  margin: 20px auto auto auto;
  padding: 20px;
`
export const CoursesHeading = styled.h1`
  font-weight: 600;
`
export const CoursesContainer = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
`
export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export const FailureContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`
export const FailureImage = styled.img`
  width: 40vw;
  height: 40vh;
`
export const FailureHeading = styled.h1`
  font-size: 38px;
  color: #4656a1;
`
export const FailureText = styled.p`
  color: #1e293b;
  font-size: 18px;
`
export const FailureButton = styled.button`
  width: 150px;
  height: 50px;
  color: #ffffff;
  background-color: #4656a1;
  border: solid white 0px;
`
