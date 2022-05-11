import {
  CountryItem,
  Flag,
  CountryDetailes,
  CountryName,
  RemoveBtn,
} from './styledComponents'

const VisitedCountry = props => {
  const {countryData, onClickRemoveFromVisit} = props
  const {id, name, imageUrl} = countryData

  const onClickRemove = () => {
    onClickRemoveFromVisit(id)
  }

  return (
    <CountryItem>
      <Flag src={imageUrl} alt="thumbnail" />
      <CountryDetailes>
        <CountryName>{name}</CountryName>
        <RemoveBtn type="button" onClick={onClickRemove}>
          Remove
        </RemoveBtn>
      </CountryDetailes>
    </CountryItem>
  )
}

export default VisitedCountry
