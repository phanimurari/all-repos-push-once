import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import HistoryContext from './Context/RegisterContext'
import Home from './components/Home'
import Register from './components/Register'
import NotFound from './components/NotFound'

// Replace your code here
class App extends Component {
  state = {
    isRegister: false,
    name: '',
    topic: 'Arts and Culture',
    registerErr: false,
  }

  changeRegistrationStatus = () => {
    this.setState({isRegister: true})
  }

  updateName = updateName => {
    this.setState({name: updateName})
  }

  updateTopic = updateTopic => {
    this.setState({topic: updateTopic})
  }

  updateErr = response => {
    this.setState({registerErr: response})
  }

  render() {
    const {isRegister, name, topic, registerErr} = this.state
    return (
      <Switch>
        <HistoryContext.Provider
          value={{
            isRegister,
            changeRegistrationStatus: this.changeRegistrationStatus,
            name,
            topic,
            updateName: this.updateName,
            updateTopic: this.updateTopic,
            registerErr,
            updateErr: this.updateErr,
          }}
        >
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route component={NotFound} />
        </HistoryContext.Provider>
      </Switch>
    )
  }
}

export default App
