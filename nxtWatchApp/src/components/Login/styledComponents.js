import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #f9f9f9;
  font-family: 'Roboto;';
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 3px 8px #e2e8f0;
  padding: 20px;
  width: 450px;
`

export const LoginLogo = styled.img`
  height: 40px;
  align-self: center;
  margin-top: 30px;
  margin-bottom: 15px;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Label = styled.label`
  color: #616e7c;
  font-size: 15px;
  font-weight: 500;
  margin-top: 25px;
  margin-bottom: 10px;
`

export const Input = styled.input`
  color: #212121;
  font-size: 12px;
  font-weight: 400;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  outline: none;
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px 25px;
`

export const CheckboxInput = styled.input`
  width: 15px;
  height: 15px;
  margin: 0;
`

export const CheckboxLabel = styled.label`
  color: #1e293b;
  font-size: 15px;
  font-weight: 500;
  margin-left: 5px;
`

export const LoginBtn = styled.button`
  color: #ffffff;
  background-color: #3b82f6;
  font-size: 14px;
  height: 40px;
  padding: 5px;
  border-radius: 8px;
  margin-bottom: 25px;
  border: none;
  outline: none;
  cursor: pointer;
`

export const ErrMsg = styled.p`
  color: #ff0000;
  font-size: 12px;
  font-weight: 400;
  margin: 4px 0px;
`
