import {Link} from 'react-router-dom'

import './index.css'

import {
  MiniCardContainer,
  MiniCardImage,
  LogoName,
  MiniCardButton,
} from './styledComponent'

const CourseMiniCard = props => {
  const {details} = props
  const {logoUrl, name, id} = details

  return (
    <MiniCardContainer>
      <Link to={`/courses/${id}`} className="link-item">
        <MiniCardButton>
          <MiniCardImage alt={name} src={logoUrl} />
          <LogoName>{name}</LogoName>
        </MiniCardButton>
      </Link>
    </MiniCardContainer>
  )
}
export default CourseMiniCard
