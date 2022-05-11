import styled from 'styled-components'

export const CountryItem = styled.li`
  list-style: none;
  width: 28vw;
  margin: 5px;
  background-size: cover;
`

export const Flag = styled.img`
  width: 100%;
  background-size: cover;
`
export const CountryDetailes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: #334155;
  margin-top: -8px;
`

export const CountryName = styled.p`
  margin-bottom: 8px;
  margin-top: 8px;
  color: #ffffff;
`

export const RemoveBtn = styled.button`
  background-color: inherit;
  border: 0.5px solid #f8fafc;
  color: #ffffff;
  padding-left: 18px;
  padding-right: 18px;
`
