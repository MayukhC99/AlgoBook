import NavBar from './components/NavBar'
import Home from './components/Home'
import GraphVisualizer from './components/Graph/GraphVisualizer'
import SearchingVisualizer from './components/Searching/SearchingVisualizer'
import SortingVisualizer from './components/Sorting/SortingVisualizer'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/graphVisualizer" component={GraphVisualizer} />
          <Route path="/searchingVisualizer" component={SearchingVisualizer} />
          <Route path="/sortingVisualizer" component={SortingVisualizer} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <Redirect to="/home"></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
