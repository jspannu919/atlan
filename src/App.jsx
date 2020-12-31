import './App.css';
import Home from './components/Home';
import Search from './components/Search';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header>
        <img src="/assets/images/ipl.png" alt="iplLogo" className="logo"/>
      </header>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/search" exact component={Search}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
