import {Link} from 'react-router-dom'
import HistoryContext from '../../Context/RegisterContext'

import {
  MainDiv,
  BeforeRegisH1,
  BeforeRegisP,
  BeforeRegisBtn,
  BeforeRegisImg,
  AfterRegisImg,
  AfterRegisH1,
  AfterRegisP,
} from './styledComponent'
import NavBar from '../Navbar'

const Home = props => {
  const onClickRegister = () => {
    const {history} = props
    history.replace('/register')
  }
  const renderBeforeRegisteredView = () => (
    <>
      <BeforeRegisH1>Welcome to Meetup</BeforeRegisH1>
      <BeforeRegisP>Please register for the topic</BeforeRegisP>
      <Link to="/register">
        <BeforeRegisBtn onClick={onClickRegister}>Register</BeforeRegisBtn>
      </Link>
      <BeforeRegisImg
        src="https://assets.ccbp.in/frontend/react-js/meetup/meetup-img.png"
        alt="meetup"
      />
    </>
  )
  const renderAfterRegisteredView = (name, topic) => (
    <>
      <AfterRegisH1>{`Hello ${name}`}</AfterRegisH1>
      <AfterRegisP>{`Welcome to ${topic}`}</AfterRegisP>
      <AfterRegisImg
        src="https://assets.ccbp.in/frontend/react-js/meetup/meetup-img.png"
        alt="meetup"
      />
    </>
  )
  return (
    <HistoryContext.Consumer>
      {value => {
        const {isRegister, name, topic} = value
        return (
          <>
            <NavBar />
            <MainDiv>
              {isRegister
                ? renderAfterRegisteredView(name, topic)
                : renderBeforeRegisteredView()}
            </MainDiv>
          </>
        )
      }}
    </HistoryContext.Consumer>
  )
}
export default Home
