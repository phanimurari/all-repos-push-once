import {Route, Switch} from 'react-router-dom'

import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'
import CourseItemDetails from './components/CourseItemDetails/CourseItemDetails'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
    <Route component={NotFound} />
  </Switch>
)
export default App
