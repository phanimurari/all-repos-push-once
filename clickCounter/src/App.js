import {BrowserRouter, Route, Switch} from 'react-router-dom'

// ------------------->> src/components/Geometry/index.js <<-----------------------------
const Geometry = () => <h1>Geometry Part 1</h1>

// ------------------->> src/components/Home/index.js <<-----------------------------
const Home = () => <h1>Geometry is easy</h1>

// ---------------------------->> src/App.js <<-----------------------------------

const NotFound = () => <h1>Not Found</h1>

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/geometry" component={Geometry} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
