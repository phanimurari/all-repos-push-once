import styled from 'styled-components'

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export const CourseCardBgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh;
  margin: 20px auto auto auto;
  padding: 20px;
`
export const CourseCard = styled.div`
  display: flex;
  border-radius: 10px;
  box-shadow: 5px 5px 15px 10px #f1f5f9;
`
export const CourseCardImage = styled.img`
  width: 40%;
  height: 100%;
`

export const CourseCardTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px 0px 20px;
`
export const CourseName = styled.h1`
  font-size: 32px;
`
export const CourseDescription = styled.p`
  font-size: 24px;
  color: #1e293b;
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
