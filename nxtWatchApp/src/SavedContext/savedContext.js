import React from 'react'

const savedContext = React.createContext({
  isDarkTheme: false,
  savedVideosList: [],
  selectedOption: '',
  likedVideoIdStatusList: [],
  changeTheme: () => {},
  addSavedVideos: () => {},
  removeSavedVideos: () => {},
  changeOption: () => {},
  changeLikeStatus: () => {},
})

export default savedContext
