import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'

import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoDetails from './components/VideoDetails'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import SavedContext from './SavedContext/savedContext'

import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideosList: [],
    selectedOption: 'HOME',
    likedVideoIdStatusList: [],
  }

  changeTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  addSavedVideos = videoDetails => {
    this.setState(prevState => ({
      savedVideosList: [...prevState.savedVideosList, videoDetails],
    }))
  }

  removeSavedVideos = videoDetails => {
    const {id} = videoDetails
    const savedVideosList = this.state
    const updatedSavedVideosList = savedVideosList.filter(
      eachVideo => eachVideo.id !== id,
    )
    this.setState({savedVideosList: updatedSavedVideosList})
  }

  changeOption = option => {
    this.setState({selectedOption: option})
  }

  changeLikeStatus = (id, status) => {
    const {likedVideoIdStatusList} = this.state
    const videoIdObject = likedVideoIdStatusList.find(
      eachItem => eachItem.id === id,
    )
    if (videoIdObject === undefined) {
      this.setState(prevState => ({
        likedVideoIdStatusList: [
          ...prevState.likedVideoIdStatusList,
          {id, status},
        ],
      }))
    } else {
      this.setState(prevState => ({
        likedVideoIdStatusList: prevState.likedVideoIdStatusList.map(
          eachObj => {
            if (eachObj.id === id) {
              return {...eachObj, status}
            }
            return eachObj
          },
        ),
      }))
    }
  }

  render() {
    const {
      isDarkTheme,
      selectedOption,
      savedVideosList,
      likedVideoIdStatusList,
    } = this.state

    return (
      <SavedContext.Provider
        value={{
          isDarkTheme,
          savedVideosList,
          selectedOption,
          likedVideoIdStatusList,
          changeTheme: this.changeTheme,
          addSavedVideos: this.addSavedVideos,
          removeSavedVideos: this.removeSavedVideos,
          changeOption: this.changeOption,
          changeLikeStatus: this.changeLikeStatus,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </SavedContext.Provider>
    )
  }
}

export default App
