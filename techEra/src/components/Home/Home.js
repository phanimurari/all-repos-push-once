import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CourseMiniCard from '../CourseMiniCard/CourseMiniCard'
import Header from '../Header/Header'

import {
  BgContainer,
  CoursesHeading,
  CoursesContainer,
  LoaderContainer,
  FailureContainer,
  FailureImage,
  FailureHeading,
  FailureText,
  FailureButton,
} from './styledComponents'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    coursesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'

    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {coursesList} = this.state

    return (
      <>
        <Header />
        <BgContainer>
          <CoursesHeading>Courses</CoursesHeading>
          <CoursesContainer>
            {coursesList.map(each => (
              <CourseMiniCard key={each.id} details={each} />
            ))}
          </CoursesContainer>
        </BgContainer>
      </>
    )
  }

  loadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </LoaderContainer>
  )

  renderFailureView = () => (
    <>
      <Header />
      <FailureContainer>
        <FailureImage
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <FailureHeading>Oops! Something Went Wrong</FailureHeading>
        <FailureText>
          We cannot seem to find the page you are looking for
        </FailureText>
        <FailureButton onClick={this.getCourses}>Retry</FailureButton>
      </FailureContainer>
    </>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.inProgress:
        return this.loadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }
}
export default Home
