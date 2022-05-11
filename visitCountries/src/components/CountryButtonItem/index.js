import {
  CountryBtn,
  ButtonContent,
  ButtonText,
  VisitBtn,
  VisitedText,
} from './styledComponents'

const CountryButton = props => {
  const {countryButtonData, onClickVisit} = props
  const {id, name, isVisited} = countryButtonData

  const onClickVisitBtn = () => {
    onClickVisit(id)
  }

  return (
    <li>
      <CountryBtn type="button">
        <ButtonContent>
          <ButtonText>{name}</ButtonText>
          {isVisited ? (
            <VisitedText>Visited</VisitedText>
          ) : (
            <VisitBtn type="button" onClick={onClickVisitBtn}>
              Visit
            </VisitBtn>
          )}
        </ButtonContent>
      </CountryBtn>
    </li>
  )
}

export default CountryButton
