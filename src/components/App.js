import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import LandingPage from '../routes/LandingPage';
import LoginPage from '../routes/LoginPage'; 
import IncomePage from '../routes/IncomePage';
import DashboardPage from '../routes/DashboardPage';
import './App.css';
import AddItemPage from '../routes/AddItemPage';
import PrivateRoute from '../routes/PrivateRoute';
import PublicOnlyRoute from '../routes/PublicOnlyRoute'
import NotFoundPage from '../routes/NotFoundPage'

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
          <PublicOnlyRoute exact path={'/'} component={LandingPage} />
          <PublicOnlyRoute path={'/login'} component={LoginPage} />
          <PrivateRoute path={'/income'} component={IncomePage} />
          <PrivateRoute path={'/dashboard'} component={DashboardPage} />
          <PrivateRoute path={'/additem'} component={AddItemPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>;
  }
}

export default App;
