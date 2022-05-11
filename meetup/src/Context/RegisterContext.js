import React from 'react'

const HistoryContext = React.createContext({
  isRegister: false,
  changeRegistrationStatus: () => {},
  name: '',
  updateName: () => {},
  topic: '',
  updateTopic: () => {},
  registerErr: false,
  updateErr: () => {},
})

export default HistoryContext
