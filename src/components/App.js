import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import LandingPage from '../routes/LandingPage';
import './App.css';

class App extends Component {
  render() {
    const isLoggedIn = false;

    return <>
      <nav>
        <div>
          <h1>Spendful</h1>

          {isLoggedIn
            ? <Link to="/logout">Logout</Link>
            : <Link to="/login">Login</Link>}
        </div>
      </nav>

      <div id="app-container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    </>;
  }
}

export default App;
