import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import LandingPage from '../routes/LandingPage';
import LoginPage from '../routes/LoginPage'; 
import IncomePage from '../routes/IncomePage';
import './App.css';

class App extends Component {
  render() {
    const isLoggedIn = true;
    const navLinks = <>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/income">Income</Link>
      <Link to="/expenses">Expenses</Link>
    </>;

    return <>
      <nav>
        <div>
          <div className="nav-left">
            <Link to="/"><h1>Spendful</h1></Link>
            {isLoggedIn ? navLinks : ''}
          </div>
          <div className="nav-right">
            {isLoggedIn
              ? <Link to="/logout">Logout</Link>
              : <Link to="/login">Login</Link>}
          </div>
        </div>
      </nav>

      <div id="app-container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/income" component={IncomePage} />
        </Switch>
      </div>
    </>;
  }
}

export default App;
