import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header/Header'

import {
  LoaderContainer,
  CourseCardBgContainer,
  CourseCard,
  CourseCardImage,
  CourseCardTextContainer,
  CourseName,
  CourseDescription,
  FailureContainer,
  FailureImage,
  FailureHeading,
  FailureText,
  FailureButton,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    courseData: {},
  }

  componentDidMount() {
    this.getCourseData()
  }

  getCourseData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`

    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.course_details.id,
        name: fetchedData.course_details.name,
        imageUrl: fetchedData.course_details.image_url,
        description: fetchedData.course_details.description,
      }
      this.setState({
        courseData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </LoaderContainer>
  )

  renderSuccessView = () => {
    const {courseData} = this.state
    const {imageUrl, name, description} = courseData
    return (
      <>
        <Header />
        <CourseCardBgContainer>
          <CourseCard>
            <CourseCardImage src={imageUrl} alt={name} />
            <CourseCardTextContainer>
              <CourseName>{name}</CourseName>
              <CourseDescription>{description}</CourseDescription>
            </CourseCardTextContainer>
          </CourseCard>
        </CourseCardBgContainer>
      </>
    )
  }

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
        <FailureButton onClick={this.getCourseData}>Retry</FailureButton>
      </FailureContainer>
    </>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }
}
export default CourseItemDetails
