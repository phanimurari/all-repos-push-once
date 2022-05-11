import {Route} from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <>
    <Route exact path="/about">
      <About />
    </Route>
    <Route exact path="/contact">
      <Contact />
    </Route>
    <Route path="/blogs/:id">
      <BlogItemDetails />
    </Route>
    <Route component={NotFound} />
  </>
)

export default App
