import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import LandingPage from '../routes/LandingPage';
import LoginPage from '../routes/LoginPage'; 
import DashboardPage from '../routes/DashboardPage';
import './App.css';

class App extends Component {
  render() {
    const isLoggedIn = false;

    return <>
      <nav>
        <div>
          <Link to="/"><h1>Spendful</h1></Link>

          {isLoggedIn
            ? <Link to="/logout">Logout</Link>
            : <Link to="/login">Login</Link>}
        </div>
      </nav>

      <div id="app-container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/dashboard" component={DashboardPage} />
        </Switch>
      </div>
    </>;
  }
}

export default App;
