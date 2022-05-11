import styled from 'styled-components'

export const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
`
export const RegisterCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 80%;
  height: 70vh;
`
export const RegisterImg = styled.img`
  width: 40%;
`
export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 60%;
  align-items: flex-start;
  margin-top: 20px;
`
export const FormH1 = styled.h1`
  font-size: 50px;
  font-weight: 500;
  margin: 0px;
  color: #334155;
  margin-bottom: 15px;
`
export const Label = styled.label`
  font-size: 16px;
  font-weight: 700;
  color: #7b8794;
  margin-bottom: 10px;
`
export const Input = styled.input`
  font-size: 16px;
  font-weight: 700;
  color: #7b8794;
  height: 40px;
  width: 50%;
  outline: none;
  padding-left: 15px;
  border: 1px solid #7b8794;
  margin-bottom: 30px;
`
export const Select = styled.select`
  font-size: 16px;
  background-color: transparent;
  font-weight: 700;
  color: #334155;
  height: 40px;
  width: 50%;
  padding-left: 15px;
  outline: none;
  border: 1px solid #7b8794;
  margin-bottom: 30px;
`
export const Option = styled.option`
  font-size: 16px;
  font-weight: 700;
  color: #334155;
`
export const FormBtn = styled.button`
  background-color: #2563eb;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  height: 40px;
  width: 200px;
  margin-bottom: 25px;
  cursor: pointer;
  margin-top: 20px;
`
export const ErrP = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #ff0b37;
  margin: 0px;
`
